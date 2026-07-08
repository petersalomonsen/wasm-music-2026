precision highp float;

uniform vec2  resolution;
uniform float time;
uniform float smoothedNoteStates[128];
uniform float targetNoteStates[128];

// image/text-card samplers (renderer crossfades cur<-prev over ~1.5s via uMix)
uniform sampler2D uSampler;
uniform sampler2D uSamplerPrev;
uniform float     uMix;

// energy in a MIDI-note band, normalized ~0..1
float band(int lo, int hi, float norm) {
  float e = 0.0;
  for (int i = 0; i < 128; i++) {
    if (i >= lo && i < hi) e += max(0.0, smoothedNoteStates[i] * 0.5 + 0.5);
  }
  return clamp(e / norm, 0.0, 1.0);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * resolution.xy) / resolution.y;
  float t = time;

  float bass = band(0, 45, 6.0);
  float mid  = band(45, 80, 8.0);
  float treb = band(80, 128, 6.0);
  float energy = clamp(bass * 0.6 + mid * 0.4 + treb * 0.5, 0.0, 1.0);

  // ---- flowing horizontal wave layers ----
  float glow = 0.0;
  for (int i = 0; i < 6; i++) {
    float fi = float(i);
    float freq  = 1.5 + fi * 1.3;
    float speed = 0.25 + fi * 0.13;
    float amp   = (0.10 + bass * 0.30) * (1.0 - fi * 0.08);
    float phase = fi * 1.7;
    float y = sin(uv.x * freq + t * speed + phase) * amp
            + sin(uv.x * (freq * 0.5) - t * speed * 0.7) * amp * 0.5;
    y += (fi - 2.5) * 0.14;                               // stack the layers
    float d = abs(uv.y - y);
    glow += (0.006 + 0.010 * energy) / (d + 0.006);       // soft glowing line
  }
  glow /= 6.0;

  // ---- radial pulse from the center, driven by energy ----
  float r = length(uv);
  float pulse = exp(-r * (3.0 - energy * 1.6)) * (0.25 + energy * 0.9);

  // ---- palette: purple -> cyan -> magenta, slowly drifting ----
  vec3 cPurple  = vec3(0.45, 0.12, 0.85);
  vec3 cCyan    = vec3(0.10, 0.80, 0.95);
  vec3 cMagenta = vec3(1.00, 0.20, 0.65);
  float hue = 0.5 + 0.5 * sin(t * 0.15 + uv.x * 1.5 + uv.y);
  vec3 base = mix(cPurple, cCyan, hue);

  vec3 col = base * glow;
  col += cMagenta * pulse * (0.4 + treb * 0.8);
  col += base * pulse * 0.5;

  // background gradient + subtle vignette
  vec3 bg = mix(vec3(0.02, 0.02, 0.07), vec3(0.08, 0.03, 0.14), uv.y * 0.6 + 0.5);
  col += bg;
  col *= 1.0 - 0.35 * r;

  col = pow(clamp(col, 0.0, 1.0), vec3(0.85));            // gentle lift

  // ============================================================
  //  slide cards (screenshots + text) composited over the waves.
  //  cards are 16:9; aspect-fit ("contain") so they never stretch,
  //  and the letterbox bars fall back to the live waves.
  // ============================================================
  float A = 16.0 / 9.0;
  float V = resolution.x / resolution.y;
  vec2  fc = gl_FragCoord.xy / resolution.xy;   // 0..1, y up
  vec2  cuv;
  float inFrame = 1.0;
  if (V > A) {                                  // viewport wider than card
    float w = A / V;
    float x = (fc.x - 0.5) / w + 0.5;
    cuv = vec2(x, fc.y);
    if (x < 0.0 || x > 1.0) inFrame = 0.0;
  } else {                                       // viewport taller than card
    float h = V / A;
    float y = (fc.y - 0.5) / h + 0.5;
    cuv = vec2(fc.x, y);
    if (y < 0.0 || y > 1.0) inFrame = 0.0;
  }
  cuv.y = 1.0 - cuv.y;                          // texture row 0 = top of image

  vec4 cur  = texture2D(uSampler,     cuv);
  vec4 prv  = texture2D(uSamplerPrev, cuv);
  vec4 card = mix(prv, cur, uMix);              // crossfade rgb + alpha
  float ca  = clamp(card.a, 0.0, 1.0) * inFrame;
  col = mix(col, card.rgb, ca);                 // text/shots over the waves

  // gentle fade up from black on start
  col *= smoothstep(0.0, 1.5, time);

  gl_FragColor = vec4(col, 1.0);
}

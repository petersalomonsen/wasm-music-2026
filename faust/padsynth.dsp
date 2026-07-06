import("stdfaust.lib");

// --- standard voice controls ---
freq = hslider("freq", 440, 20, 20000, 0.01);
gate = button("gate");
gain = hslider("gain", 0.5, 0, 1, 0.01);

// One 8-harmonic stack using the ORIGINAL PADsynth spectral profile
//   hmag(n) = exp(-n*0.2) * cos(n*5)   (sign = phase), written explicitly.
// 'm' detunes the whole stack -> lets us stack copies (bandwidth spreading).
toneAt(m) =
    os.osc(freq*1.0*m) *  0.2323
  + os.osc(freq*2.0*m) * -0.5624
  + os.osc(freq*3.0*m) * -0.4169
  + os.osc(freq*4.0*m) *  0.1834
  + os.osc(freq*5.0*m) *  0.3647
  + os.osc(freq*6.0*m) *  0.0465
  + os.osc(freq*7.0*m) * -0.2229
  + os.osc(freq*8.0*m) * -0.1346;

// 3 gaussian-weighted detuned copies = the PADsynth "spread" shimmer
pad = toneAt(0.9940) * 0.7
    + toneAt(1.0000) * 1.0
    + toneAt(1.0060) * 0.7;

env = en.adsr(0.001, 2.5, 0.0, 0.2, gate);

process = pad * 0.12 * gain * env;

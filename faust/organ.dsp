import("stdfaust.lib");

// --- Standard MIDI voice controls ---
freq = hslider("freq", 440, 20, 20000, 0.01);
gate = button("gate");
gain = hslider("gain", 0.5, 0, 1, 0.01);

// resonant lowpass cutoff — becomes a channel CC so the song can sweep it.
// Default fully open so all the non-modulated organ parts sound unchanged.
cutoff = hslider("cutoff", 16000, 200, 16000, 1);

// Electric / tonewheel organ: additive drawbars at harmonic ratios,
// with a gentle scanner-style vibrato and a key-click transient.
vib = 1 + os.osc(5.5) * 0.004;
drawbar(ratio, level) = os.osc(freq * ratio * vib) * level;

tonewheel = drawbar(0.5, 0.6)   // 16'   sub-octave
          + drawbar(1.0, 1.0)   // 8'    fundamental
          + drawbar(1.5, 0.35)  // 5 1/3' quint
          + drawbar(2.0, 0.7)   // 4'    octave
          + drawbar(3.0, 0.3)   // 2 2/3'
          + drawbar(4.0, 0.4);  // 2'    super-octave

env = en.adsr(0.005, 0.0, 1.0, 0.08, gate);
click = en.ar(0.001, 0.02, gate) * no.noise * 0.12;
tremolo = 1 + os.osc(6.7) * 0.07;

// resonant lowpass so the per-beat cutoff sweep is clearly audible
filtered = (tonewheel / 3.4 + click) : fi.resonlp(cutoff, 4, 1);
process = filtered * env * tremolo * gain;

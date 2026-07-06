import("stdfaust.lib");
freq = hslider("freq", 440, 20, 20000, 0.01);
gate = button("gate");
gain = hslider("gain", 0.5, 0, 1, 0.01);
pitchenv = en.adsr(0.001, 0.06, 0, 0.01, gate);
f = 45 + 120 * pitchenv;
ampenv = en.adsr(0.001, 0.35, 0, 0.05, gate);
process = os.osc(f) * ampenv * gain;

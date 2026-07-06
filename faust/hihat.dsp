import("stdfaust.lib");
freq = hslider("freq", 440, 20, 20000, 0.01);
gate = button("gate");
gain = hslider("gain", 0.5, 0, 1, 0.01);
env = en.adsr(0.001, 0.04, 0, 0.01, gate);
process = (no.noise : fi.highpass(2, 6000)) * env * gain;

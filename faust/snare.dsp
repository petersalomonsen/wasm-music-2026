import("stdfaust.lib");
freq = hslider("freq", 440, 20, 20000, 0.01);
gate = button("gate");
gain = hslider("gain", 0.5, 0, 1, 0.01);
env = en.adsr(0.001, 0.14, 0, 0.02, gate);
tone = (os.osc(180) + os.osc(330)) * 0.5;
noise = no.noise : fi.highpass(2, 900);
process = (tone * 0.4 + noise * 0.7) * env * gain;

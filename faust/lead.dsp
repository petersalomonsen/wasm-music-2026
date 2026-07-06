import("stdfaust.lib");

freq = hslider("freq", 440, 20, 20000, 0.01);
gate = button("gate");
gain = hslider("gain", 0.5, 0, 1, 0.01);

// plucky: fast bright attack, quick decay; envelope sweeps a digital lowpass
env = en.adsr(0.002, 0.14, 0.25, 0.1, gate);
cutoff = 350 + env * 4000;
tone = os.sawtooth(freq)*0.7 + os.triangle(freq)*0.3;
process = fi.lowpass(3, cutoff, tone) * env * gain;

import("stdfaust.lib");

freq = hslider("freq", 110, 20, 20000, 0.01);
gate = button("gate");
gain = hslider("gain", 0.5, 0, 1, 0.01);

// warm: sub sine + slightly detuned saw, low-passed, gentle envelope
env = en.adsr(0.008, 0.12, 0.85, 0.18, gate);
sub = os.osc(freq) * 0.6;
saw = (os.sawtooth(freq) + os.sawtooth(freq*1.003)) * 0.5;
cutoff = 200 + env * 900;
process = fi.lowpass(2, cutoff, sub + saw*0.8) * env * gain;

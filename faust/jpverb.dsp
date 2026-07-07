import("stdfaust.lib");

// Dummy silent voice — this "instrument" is never played; we only want the
// effect (jpverb) generated as a MidiChannel subclass we can drive over the
// shared reverb-send bus in postprocess().
freq = hslider("freq", 440, 20, 20000, 0.01);
gate = button("gate");
gain = hslider("gain", 0.5, 0, 1, 0.01);
process = 0.0 * freq * gain * gate;

// The global reverb: pure jpverb (100% wet — dry is the instruments already
// in outputline; per-instrument send amount decides how much enters here).
t60  = hslider("t60",  2.5, 0.1, 12, 0.01);   // reverb time (s)
damp = hslider("damp", 0.35, 0, 1, 0.01);     // hf damping
size = hslider("size", 1.8, 0.5, 5, 0.01);    // room size
effect = re.jpverb(t60, damp, size, 0.707, 0.1, 2, 0.7, 0.8, 0.5, 500, 4000);

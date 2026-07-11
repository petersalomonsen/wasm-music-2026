import("stdfaust.lib");

freq = hslider("freq", 220, 20, 20000, 0.01);
gate = button("gate");
gain = hslider("gain", 0.5, 0, 1, 0.01);

// Lead derived from the bass: sub sine + detuned saws through an
// envelope-swept lowpass. Fatter/richer than the bass via a wider unison
// saw stack plus a sub-octave, and the cutoff tracks pitch so mid/high
// notes keep the same warm character instead of going dull.
env = en.adsr(0.008, 0.12, 0.85, 0.18, gate);

sub    = os.osc(freq) * 0.5;
suboct = os.osc(freq * 0.5) * 0.25;   // extra body one octave down

// fat 7-voice detuned unison saw stack
saws = (os.sawtooth(freq * 0.991)
      + os.sawtooth(freq * 0.994)
      + os.sawtooth(freq * 0.997)
      + os.sawtooth(freq)
      + os.sawtooth(freq * 1.003)
      + os.sawtooth(freq * 1.006)
      + os.sawtooth(freq * 1.009)) / 7;

// cutoff tracks pitch (same bass voicing, bright enough for a lead)
cutoff = min(16000, freq * 3 + 300 + env * 1500);

process = 1.8 * fi.lowpass(3, cutoff, (sub + suboct + saws * 0.9) * 0.6) * env * gain;

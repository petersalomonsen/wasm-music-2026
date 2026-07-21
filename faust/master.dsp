import("stdfaust.lib");

// Dummy silent voice — this DSP is an effect only (2-in/2-out), never played.
freq = hslider("freq", 440, 20, 20000, 0.01);
gate = button("gate");
gain = hslider("gain", 0.5, 0, 1, 0.01);
process = 0.0 * freq * gain * gate;

// ---- Mastering chain for a melodic electronic track ----
// 0. input pre-gain — main loudness lever (the mix was leaving ~5 dB unused)
// 1. sub-rumble highpass (~30 Hz) + a gentle air shelf
// 2. gentle 3-band glue compressor (low band tamed harder so sub/kick don't
//    duck the mids; mid/high stay light)
// 3. modest makeup drive
// 4. bass-safe mid/side widener (widen the side only above ~250 Hz)
// 5. brickwall (1176-style) limiter as the loudness ceiling / safety
input = 2.0;   // +6 dB into the chain; raise for louder / more compression
tone  = fi.highpass(2, 30) : fi.highshelf(1, 3, 9000);
drive = 1.5;

mbcompress = si.bus(2) <: (lo : locomp), (mid : midcomp), (hi : hicomp) :> si.bus(2)
with {
    f1 = 120;
    f2 = 2500;
    lo  = par(i, 2, fi.lowpass(4, f1));
    mid = par(i, 2, fi.highpass(4, f1) : fi.lowpass(4, f2));
    hi  = par(i, 2, fi.highpass(4, f2));
    locomp  = co.compressor_stereo(2.5, -24, 0.015, 0.12);
    midcomp = co.compressor_stereo(2.0, -22, 0.02,  0.18);
    hicomp  = co.compressor_stereo(2.0, -20, 0.03,  0.25);
};

width = 1.4;
fc    = 250;
widen(l, r) = (m + sw), (m - sw)
with {
    m  = 0.5 * (l + r);
    s  = 0.5 * (l - r);
    sw = (s : fi.lowpass(1, fc)) + (s : fi.highpass(1, fc)) * width;
};

effect = par(i, 2, *(input))
       : par(i, 2, tone)
       : mbcompress
       : par(i, 2, *(drive))
       : widen
       : co.limiter_1176_R4_stereo;

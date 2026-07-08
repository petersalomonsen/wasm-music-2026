import { midichannels, MidiChannel, MidiVoice, StereoSignal, outputline } from '../mixes/globalimports';
import { Bass } from '../faust/bass';
import { Lead } from '../faust/lead';
import { Kick } from '../faust/kick';
import { Snare } from '../faust/snare';
import { Hihat } from '../faust/hihat';
import { Padsynth } from '../faust/padsynth';
import { Organ } from '../faust/organ';
import { Jpverb, JpverbChannel } from '../faust/jpverb';

// --- Shared jpverb reverb send bus -----------------------------------------
// Every instrument channel adds a scaled copy of its (pre-fader) signal into
// this accumulator each sample; postprocess() runs the single shared jpverb
// over it and mixes the wet result back into the master output.
const reverbSend = new StereoSignal();
// Created in initializeMidiSynth() — a MidiChannel subclass must not be
// instantiated at module top-level (runs before the core is initialized).
let reverbFx: JpverbChannel = changetype<JpverbChannel>(0);

// A MidiChannel that also feeds the shared reverb send.
class ReverbSendChannel extends MidiChannel {
    send: f32;
    constructor(numvoices: i32, factoryFunc: (channel: MidiChannel, voiceindex: i32) => MidiVoice, send: f32) {
        super(numvoices, factoryFunc);
        this.send = send;
        this.reverb = 0; // disable the built-in freeverb send; jpverb is our reverb
    }
    preprocess(): void {
        reverbSend.left  += this.signal.left  * this.send;
        reverbSend.right += this.signal.right * this.send;
    }
}

export function initializeMidiSynth(): void {
    reverbFx = new JpverbChannel(1, (channel: MidiChannel) => new Jpverb(channel));

    midichannels[0] = new ReverbSendChannel(6, (channel: MidiChannel) => new Bass(channel), 0.10);
    midichannels[1] = new ReverbSendChannel(8, (channel: MidiChannel) => new Lead(channel), 0.30);
    midichannels[2] = new ReverbSendChannel(2, (channel: MidiChannel) => new Kick(channel), 0.05);
    midichannels[3] = new ReverbSendChannel(2, (channel: MidiChannel) => new Snare(channel), 0.25);
    midichannels[4] = new ReverbSendChannel(4, (channel: MidiChannel) => new Hihat(channel), 0.15);
    midichannels[5] = new ReverbSendChannel(6, (channel: MidiChannel) => new Padsynth(channel), 0.60);
    midichannels[6] = new ReverbSendChannel(8, (channel: MidiChannel) => new Organ(channel), 0.35);
  	midichannels[6].controlchange(7,50);
}

export function postprocess(): void {
    // Run the shared jpverb over the summed send, mix wet into the output.
    reverbFx.signal.left  = reverbSend.left;
    reverbFx.signal.right = reverbSend.right;
    reverbFx.preprocess();
    outputline.left  += reverbFx.signal.left;
    outputline.right += reverbFx.signal.right;
    reverbFx.signal.clear();
    reverbSend.clear();
}

import { midichannels, MidiChannel, MidiVoice, StereoSignal, outputline } from '../mixes/globalimports';
import { Bass } from '../faust/bass';
import { Lead } from '../faust/lead';
import { Kick } from '../faust/kick';
import { Snare } from '../faust/snare';
import { Hihat } from '../faust/hihat';
import { Padsynth } from '../faust/padsynth';
import { Organ, OrganChannel } from '../faust/organ';
import { Basslead } from '../faust/basslead';
import { Jpverb, JpverbChannel } from '../faust/jpverb';
import { Master, MasterChannel } from '../faust/master';

// --- Shared jpverb reverb send bus -----------------------------------------
// Every instrument channel adds a scaled copy of its (pre-fader) signal into
// this accumulator each sample; postprocess() runs the single shared jpverb
// over it and mixes the wet result back into the master output.
const reverbSend = new StereoSignal();
// Created in initializeMidiSynth() — a MidiChannel subclass must not be
// instantiated at module top-level (runs before the core is initialized).
let reverbFx: JpverbChannel = changetype<JpverbChannel>(0);
let masterFx: MasterChannel = changetype<MasterChannel>(0);

// A MidiChannel that also feeds the shared reverb send.
class ReverbSendChannel extends MidiChannel {
    send: f32;
    constructor(numvoices: i32, factoryFunc: (channel: MidiChannel, voiceindex: i32) => MidiVoice, send: f32) {
        super(numvoices, factoryFunc);
        this.send = send;
        this.reverb = 0; // disable the built-in freeverb send; jpverb is our reverb
    }
    preprocess(): void {
        // Respect the channel volume (CC7) for the reverb send, matching how
        // volume is applied to the dry signal in the core mixer.
        reverbSend.left  += this.signal.left  * this.send * this.volume;
        reverbSend.right += this.signal.right * this.send * this.volume;
    }
}

// Organ needs its OrganChannel (for the cutoff CC param) AND the shared reverb send.
class OrganReverbChannel extends OrganChannel {
    send: f32;
    constructor(numvoices: i32, factoryFunc: (channel: MidiChannel, voiceindex: i32) => MidiVoice, send: f32) {
        super(numvoices, factoryFunc);
        this.send = send;
        this.reverb = 0;
    }
    preprocess(): void {
        reverbSend.left  += this.signal.left  * this.send * this.volume;
        reverbSend.right += this.signal.right * this.send * this.volume;
    }
}

export function initializeMidiSynth(): void {
    reverbFx = new JpverbChannel(1, (channel: MidiChannel) => new Jpverb(channel));
    masterFx = new MasterChannel(1, (channel: MidiChannel) => new Master(channel));

    midichannels[0] = new ReverbSendChannel(6, (channel: MidiChannel) => new Bass(channel), 0.15);
  	midichannels[0].controlchange(7,106);
    midichannels[1] = new ReverbSendChannel(8, (channel: MidiChannel) => new Lead(channel), 0.30);
    midichannels[2] = new ReverbSendChannel(2, (channel: MidiChannel) => new Kick(channel), 0.05);
    midichannels[3] = new ReverbSendChannel(2, (channel: MidiChannel) => new Snare(channel), 0.25);
    midichannels[4] = new ReverbSendChannel(4, (channel: MidiChannel) => new Hihat(channel), 0.15);
    midichannels[5] = new ReverbSendChannel(6, (channel: MidiChannel) => new Padsynth(channel), 0.60);
  	midichannels[5].controlchange(91,100);
  	midichannels[5].controlchange(7,85);
    midichannels[6] = new OrganReverbChannel(8, (channel: MidiChannel) => new Organ(channel), 0.35);
  	midichannels[6].controlchange(91,90);
    midichannels[7] = new ReverbSendChannel(8, (channel: MidiChannel) => new Basslead(channel), 0.25);
  	midichannels[7].controlchange(91,90);
  	midichannels[7].controlchange(7,80);
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

    // Mastering: run the master chain over the final mix before it is stored.
    masterFx.signal.left  = outputline.left;
    masterFx.signal.right = outputline.right;
    masterFx.preprocess();
    outputline.left  = masterFx.signal.left;
    outputline.right = masterFx.signal.right;
    masterFx.signal.clear();
}

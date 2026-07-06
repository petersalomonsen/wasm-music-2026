import { midichannels, MidiChannel } from '../mixes/globalimports';
import { Bass } from '../faust/bass';
import { Lead } from '../faust/lead';
import { Kick } from '../faust/kick';
import { Snare } from '../faust/snare';
import { Hihat } from '../faust/hihat';
import { Padsynth } from '../faust/padsynth';

export function initializeMidiSynth(): void {
    midichannels[0] = new MidiChannel(6, (channel: MidiChannel) => new Bass(channel));
    midichannels[1] = new MidiChannel(8, (channel: MidiChannel) => new Lead(channel));
    midichannels[2] = new MidiChannel(2, (channel: MidiChannel) => new Kick(channel));
    midichannels[3] = new MidiChannel(2, (channel: MidiChannel) => new Snare(channel));
    midichannels[4] = new MidiChannel(4, (channel: MidiChannel) => new Hihat(channel));
    midichannels[5] = new MidiChannel(6, (channel: MidiChannel) => new Padsynth(channel));
}

export function postprocess(): void {}

import { midichannels, MidiChannel } from '../mixes/globalimports';
import { Bass } from '../faust/bass';
import { Lead } from '../faust/lead';

export function initializeMidiSynth(): void {
    midichannels[0] = new MidiChannel(6, (channel: MidiChannel) => new Bass(channel));
    midichannels[1] = new MidiChannel(8, (channel: MidiChannel) => new Lead(channel));
}

export function postprocess(): void {}

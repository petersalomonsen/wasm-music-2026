// Faust-generated Hihat
// Auto-transpiled from Faust DSP by faust2as.js (AS backend)
// Source: hihat.dsp

import { notefreq, midichannels, MidiChannel, MidiVoice } from '../mixes/globalimports';
import { SAMPLERATE } from '../environment';

export class Hihat extends MidiVoice {
    private fVec61: StaticArray<f32> = new StaticArray<f32>(2);
    private fConst2: f32;
    private fHslider1: f32 = 0.5;
    private fRec500: StaticArray<f32> = new StaticArray<f32>(3);
    private iRec450: i32;
    private fConst4: f32;
    private fConst5: f32;
    private fConst6: f32;
    private fConst7: f32;
    private fConst8: f32;
    private fRec470: f32;
    private fButton0: f32 = 0.0;
    private fConst9: f32;
    private fConst10: f32;
    private iRec480: i32;
    private silentSamples: i32 = 0;
    private releaseSamples: i32 = 0;

    constructor(channel: MidiChannel) {
        super(channel);
        this.instanceConstants();
        this.instanceClear();
    }

    private instanceConstants(): void {
        const fConst0: f32 = min<f32>(192000.0, max<f32>(1.0, SAMPLERATE));
        const fConst1: f32 = Mathf.tan((18849.556640625 / fConst0));
        this.fConst2 = (1.0 / Mathf.pow(fConst1, 2.0));
        const fConst3: f32 = (1.0 / fConst1);
        this.fConst4 = (((fConst3 - 1.4142135381698608) / fConst1) + 1.0);
        this.fConst5 = ((1.0 - this.fConst2) * 2.0);
        this.fConst6 = (((1.4142135381698608 + fConst3) / fConst1) + 1.0);
        this.fConst7 = max<f32>(1.0, (fConst0 * 0.0010000000474974513));
        this.fConst8 = (1.0 / this.fConst7);
        this.fConst9 = (1.0 / max<f32>(1.0, (fConst0 * 0.03999999910593033)));
        this.fConst10 = (1.0 / max<f32>(1.0, (fConst0 * 0.009999999776482582)));
    }

    private instanceClear(): void {
        for (let lDelay0: i32 = 0; lDelay0 < <i32>(2); lDelay0 = lDelay0 + 1) { this.fVec61[lDelay0] = 0.0; }
        for (let lRec1: i32 = 0; lRec1 < <i32>(3); lRec1 = lRec1 + 1) { this.fRec500[lRec1] = 0.0; }
        this.iRec450 = <i32>(0);
        this.fRec470 = 0.0;
        this.iRec480 = <i32>(0);
    }

    noteon(note: u8, velocity: u8): void {
        super.noteon(note, velocity);
        this.fHslider1 = <f32>velocity / 127.0;
        this.fButton0 = 0.0;
        this.nextframe();
        this.fButton0 = 1.0;
        this.silentSamples = 0;
        this.releaseSamples = 0;
    }

    noteoff(): void {
        this.fButton0 = 0.0;
        this.silentSamples = 0;
        this.releaseSamples = 0;
    }

    isDone(): boolean {
        return this.fButton0 == 0.0 && (this.silentSamples > 4410 || this.releaseSamples > 132300);
    }

    nextframe(): void {
        const fSlow0: f32 = (this.fConst2 * <f32>(this.fHslider1));
        const fSlow1: f32 = <f32>(this.fButton0);
        const iSlow0: i32 = (fSlow1 == 0.0);

        let iRecCur450: i32 = ((<i32>(1103515245) * this.iRec450) + <i32>(12345));
        this.fRec500[<i32>(0)] = ((0.0000000004656612873077393 * <f32>(iRecCur450)) - (((this.fRec500[<i32>(2)] * this.fConst4) + (this.fConst5 * this.fRec500[<i32>(1)])) / this.fConst6));
        this.fVec61[<i32>(0)] = fSlow1;
        let fRecCur470: f32 = (fSlow1 + (this.fRec470 * <f32>((this.fVec61[<i32>(1)] >= fSlow1))));
        let iRecCur480: i32 = (iSlow0 * (this.iRec480 + <i32>(1)));
        const output: f32 = <f32>((fSlow0 * ((((this.fRec500[<i32>(0)] + this.fRec500[<i32>(2)]) - (2.0 * this.fRec500[<i32>(1)])) * max<f32>((min<f32>((this.fConst8 * fRecCur470), max<f32>(((this.fConst9 * (this.fConst7 - fRecCur470)) + 1.0), 0.0)) * (1.0 - (this.fConst10 * <f32>(iRecCur480)))), 0.0)) / this.fConst6)));
        this.iRec450 = iRecCur450;

        this.fRec500[<i32>(2)] = this.fRec500[<i32>(1)];
        this.fRec500[<i32>(1)] = this.fRec500[<i32>(0)];
        this.fVec61[<i32>(1)] = this.fVec61[<i32>(0)];
        this.fRec470 = fRecCur470;
        this.iRec480 = iRecCur480;

        if (Mathf.abs(output) < 0.001) {
            this.silentSamples++;
        } else {
            this.silentSamples = 0;
        }
        if (this.fButton0 == 0.0) this.releaseSamples++;

        this.channel.signal.addMonoSignal(output, 0.5, 0.5);
    }
}

export function initializeMidiSynth(): void {
    midichannels[0] = new MidiChannel(10, (channel: MidiChannel) => new Hihat(channel));
    midichannels[0].controlchange(7, 100);
    midichannels[0].controlchange(10, 64);
    midichannels[0].controlchange(91, 10);
}

export function postprocess(): void {
}

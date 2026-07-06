// Faust-generated Lead
// Auto-transpiled from Faust DSP by faust2as.js (AS backend)
// Source: lead.dsp

import { notefreq, midichannels, MidiChannel, MidiVoice } from '../mixes/globalimports';
import { SAMPLERATE } from '../environment';

export class Lead extends MidiVoice {
    private fIOTA: i32;
    private fVec1035: StaticArray<f32> = new StaticArray<f32>(4096);
    private fVec1047: StaticArray<f32> = new StaticArray<f32>(2);
    private fVec11: StaticArray<f32> = new StaticArray<f32>(2);
    private iVec3: StaticArray<i32> = new StaticArray<i32>(2);
    private fVec1031: StaticArray<f32> = new StaticArray<f32>(2);
    private fHslider2: f32 = 0.5;
    private fConst0: f32;
    private fConst1: f32;
    private fConst2: f32;
    private fRec927: f32;
    private fButton1: f32 = 0.0;
    private fConst3: f32;
    private fConst4: f32;
    private iRec937: i32;
    private fRec1065: StaticArray<f32> = new StaticArray<f32>(3);
    private fRec1054: f32;
    private fConst5: f32;
    private fRec962: StaticArray<f32> = new StaticArray<f32>(2);
    private fRec962_1: StaticArray<f32> = new StaticArray<f32>(2);
    private fConst6: f32;
    private fHslider0: f32 = 440.0;
    private fConst7: f32;
    private fRec1044: f32;
    private fConst8: f32;
    private fRec974: f32;
    private fConst9: f32;
    private silentSamples: i32 = 0;
    private releaseSamples: i32 = 0;

    constructor(channel: MidiChannel) {
        super(channel);
        this.instanceConstants();
        this.instanceClear();
    }

    private instanceConstants(): void {
        this.fConst0 = min<f32>(192000.0, max<f32>(1.0, SAMPLERATE));
        this.fConst1 = max<f32>(1.0, (this.fConst0 * 0.0020000000949949026));
        this.fConst2 = (1.0 / this.fConst1);
        this.fConst3 = (0.75 / max<f32>(1.0, (this.fConst0 * 0.14000000059604645)));
        this.fConst4 = (1.0 / max<f32>(1.0, (this.fConst0 * 0.10000000149011612)));
        this.fConst5 = (3.1415927410125732 / this.fConst0);
        this.fConst6 = (1.0 / this.fConst0);
        this.fConst7 = (1.2000000476837158 / this.fConst0);
        this.fConst8 = (this.fConst0 * 0.25);
        this.fConst9 = (this.fConst0 * 0.5);
    }

    private instanceClear(): void {
        this.fIOTA = <i32>(0);
        for (let lDelay0: i32 = 0; lDelay0 < <i32>(4096); lDelay0 = lDelay0 + 1) { this.fVec1035[lDelay0] = 0.0; }
        for (let lDelay1: i32 = 0; lDelay1 < <i32>(2); lDelay1 = lDelay1 + 1) { this.fVec1047[lDelay1] = 0.0; }
        for (let lDelay2: i32 = 0; lDelay2 < <i32>(2); lDelay2 = lDelay2 + 1) { this.fVec11[lDelay2] = 0.0; }
        for (let lDelay3: i32 = 0; lDelay3 < <i32>(2); lDelay3 = lDelay3 + 1) { this.iVec3[lDelay3] = <i32>(0); }
        for (let lDelay4: i32 = 0; lDelay4 < <i32>(2); lDelay4 = lDelay4 + 1) { this.fVec1031[lDelay4] = 0.0; }
        this.fRec927 = 0.0;
        this.iRec937 = <i32>(0);
        for (let lRec5: i32 = 0; lRec5 < <i32>(3); lRec5 = lRec5 + 1) { this.fRec1065[lRec5] = 0.0; }
        this.fRec1054 = 0.0;
        for (let lRec6: i32 = 0; lRec6 < <i32>(2); lRec6 = lRec6 + 1) { this.fRec962[lRec6] = 0.0; }
        for (let lRec7: i32 = 0; lRec7 < <i32>(2); lRec7 = lRec7 + 1) { this.fRec962_1[lRec7] = 0.0; }
        this.fRec1044 = 0.0;
        this.fRec974 = 0.0;
    }

    noteon(note: u8, velocity: u8): void {
        super.noteon(note, velocity);
        this.fHslider0 = notefreq(note);
        this.fHslider2 = <f32>velocity / 127.0;
        this.fButton1 = 0.0;
        this.nextframe();
        this.fButton1 = 1.0;
        this.silentSamples = 0;
        this.releaseSamples = 0;
    }

    noteoff(): void {
        this.fButton1 = 0.0;
        this.silentSamples = 0;
        this.releaseSamples = 0;
    }

    isDone(): boolean {
        return this.fButton1 == 0.0 && (this.silentSamples > 4410 || this.releaseSamples > 132300);
    }

    nextframe(): void {
        const fSlow0: f32 = <f32>(this.fHslider2);
        const fSlow1: f32 = <f32>(this.fButton1);
        const iSlow0: i32 = (fSlow1 == 0.0);
        const fSlow2: f32 = <f32>(this.fHslider0);
        const fSlow3: f32 = max<f32>(0.00000011920928955078125, Mathf.abs(fSlow2));
        const fSlow4: f32 = (this.fConst6 * fSlow3);
        const fSlow5: f32 = (1.0 - (this.fConst0 / fSlow3));
        const fSlow6: f32 = (this.fConst7 * fSlow2);
        const fSlow7: f32 = max<f32>(fSlow2, 23.448949813842773);
        const fSlow8: f32 = max<f32>(20.0, Mathf.abs(fSlow7));
        const fSlow9: f32 = (this.fConst8 / fSlow8);
        const fSlow10: f32 = (this.fConst6 * fSlow8);
        const fSlow11: f32 = max<f32>(0.0, min<f32>(2047.0, (this.fConst9 / fSlow7)));
        const fSlow12: f32 = Mathf.floor(fSlow11);
        const fSlow13: f32 = (fSlow12 + (1.0 - fSlow11));
        const iSlow1: i32 = <i32>(fSlow11);
        const fSlow14: f32 = (fSlow11 - fSlow12);
        const iSlow2: i32 = (iSlow1 + <i32>(1));

        this.fVec11[<i32>(0)] = fSlow1;
        let fRecCur927: f32 = (fSlow1 + (this.fRec927 * <f32>((this.fVec11[<i32>(1)] >= fSlow1))));
        let iRecCur937: i32 = (iSlow0 * (this.iRec937 + <i32>(1)));
        const fTemp0: f32 = (fSlow4 + (this.fRec962[<i32>(1)] - 1.0));
        const iTemp0: i32 = (fTemp0 < 0.0);
        const fTemp1: f32 = (fSlow4 + this.fRec962[<i32>(1)]);
        let fRecBody8: f32 = (iTemp0 ? fTemp1 : fTemp0);
        let fRecBody9: f32 = (iTemp0 ? fTemp1 : (fSlow4 + (this.fRec962[<i32>(1)] + (fSlow5 * fTemp0))));
        this.fRec962[<i32>(0)] = fRecBody8;
        this.fRec962_1[<i32>(0)] = fRecBody9;
        this.iVec3[<i32>(0)] = <i32>(1);
        const fTemp2: f32 = ((<i32>(1) - this.iVec3[<i32>(1)]) ? 0.0 : (fSlow10 + this.fRec974));
        let fRecCur974: f32 = (fTemp2 - Mathf.floor(fTemp2));
        const fTemp3: f32 = Mathf.pow(((2.0 * fRecCur974) - 1.0), 2.0);
        this.fVec1031[<i32>(0)] = fTemp3;
        const fTemp4: f32 = (fSlow9 * (<f32>(this.iVec3[<i32>(1)]) * (fTemp3 - this.fVec1031[<i32>(1)])));
        this.fVec1035[(this.fIOTA & <i32>(4095))] = fTemp4;
        let fRecCur1044: f32 = (((0.9990000128746033 * this.fRec1044) + fTemp4) - ((fSlow13 * this.fVec1035[((this.fIOTA - iSlow1) & <i32>(4095))]) + (fSlow14 * this.fVec1035[((this.fIOTA - iSlow2) & <i32>(4095))])));
        const fTemp5: f32 = ((0.699999988079071 * ((2.0 * this.fRec962_1[<i32>(0)]) - 1.0)) + (fSlow6 * fRecCur1044));
        this.fVec1047[<i32>(0)] = fTemp5;
        const fTemp6: f32 = max<f32>((min<f32>((this.fConst2 * fRecCur927), max<f32>(((this.fConst3 * (this.fConst1 - fRecCur927)) + 1.0), 0.25)) * (1.0 - (this.fConst4 * <f32>(iRecCur937)))), 0.0);
        const fTemp7: f32 = Mathf.tan((this.fConst5 * ((4000.0 * fTemp6) + 350.0)));
        const fTemp8: f32 = (1.0 / fTemp7);
        const fTemp9: f32 = (fTemp8 + 1.0);
        let fRecCur1054: f32 = (-1.0 * (((this.fRec1054 * (1.0 - fTemp8)) - (fTemp5 + this.fVec1047[<i32>(1)])) / fTemp9));
        const fTemp10: f32 = ((fTemp9 / fTemp7) + 1.0);
        this.fRec1065[<i32>(0)] = (fRecCur1054 - (((this.fRec1065[<i32>(2)] * (((fTemp8 - 1.0) / fTemp7) + 1.0)) + (2.0 * (this.fRec1065[<i32>(1)] * (1.0 - (1.0 / Mathf.pow(fTemp7, 2.0)))))) / fTemp10));
        const output: f32 = <f32>((fSlow0 * ((fTemp6 * ((this.fRec1065[<i32>(0)] + (2.0 * this.fRec1065[<i32>(1)])) + this.fRec1065[<i32>(2)])) / fTemp10)));

        this.fVec11[<i32>(1)] = this.fVec11[<i32>(0)];
        this.fRec927 = fRecCur927;
        this.iRec937 = iRecCur937;
        this.fRec962[<i32>(1)] = this.fRec962[<i32>(0)];
        this.fRec962_1[<i32>(1)] = this.fRec962_1[<i32>(0)];
        this.iVec3[<i32>(1)] = this.iVec3[<i32>(0)];
        this.fRec974 = fRecCur974;
        this.fVec1031[<i32>(1)] = this.fVec1031[<i32>(0)];
        this.fRec1044 = fRecCur1044;
        this.fVec1047[<i32>(1)] = this.fVec1047[<i32>(0)];
        this.fRec1054 = fRecCur1054;
        this.fRec1065[<i32>(2)] = this.fRec1065[<i32>(1)];
        this.fRec1065[<i32>(1)] = this.fRec1065[<i32>(0)];
        this.fIOTA = (this.fIOTA + <i32>(1));

        if (Mathf.abs(output) < 0.001) {
            this.silentSamples++;
        } else {
            this.silentSamples = 0;
        }
        if (this.fButton1 == 0.0) this.releaseSamples++;

        this.channel.signal.addMonoSignal(output, 0.5, 0.5);
    }
}

export function initializeMidiSynth(): void {
    midichannels[0] = new MidiChannel(10, (channel: MidiChannel) => new Lead(channel));
    midichannels[0].controlchange(7, 100);
    midichannels[0].controlchange(10, 64);
    midichannels[0].controlchange(91, 10);
}

export function postprocess(): void {
}

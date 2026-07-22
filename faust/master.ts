// Faust-generated Master
// Auto-transpiled from Faust DSP by faust2as.js (AS backend)
// Source: master.dsp

import { notefreq, midichannels, MidiChannel, MidiVoice } from '../mixes/globalimports';
import { SAMPLERATE } from '../environment';

export class Master extends MidiVoice {
    private fHslider0: f32 = 440.0;
    private fHslider1: f32 = 0.5;
    private fButton2: f32 = 0.0;
    private silentSamples: i32 = 0;
    private releaseSamples: i32 = 0;
    typedChannel!: MasterChannel;

    constructor(channel: MidiChannel) {
        super(channel);
        this.typedChannel = changetype<MasterChannel>(changetype<usize>(channel));
        this.instanceConstants();
        this.instanceClear();
    }

    private instanceConstants(): void {
    }

    private instanceClear(): void {
    }

    noteon(note: u8, velocity: u8): void {
        super.noteon(note, velocity);
        this.fHslider0 = notefreq(note);
        this.fHslider1 = <f32>velocity / 127.0;
        this.fButton2 = 0.0;
        this.nextframe();
        this.fButton2 = 1.0;
        this.silentSamples = 0;
        this.releaseSamples = 0;
    }

    noteoff(): void {
        this.fButton2 = 0.0;
        this.silentSamples = 0;
        this.releaseSamples = 0;
    }

    isDone(): boolean {
        return this.fButton2 == 0.0 && (this.silentSamples > 4410 || this.releaseSamples > 132300);
    }

    nextframe(): void {

        const output: f32 = <f32>(0.0);


        if (Mathf.abs(output) < 0.001) {
            this.silentSamples++;
        } else {
            this.silentSamples = 0;
        }
        if (this.fButton2 == 0.0) this.releaseSamples++;

        this.channel.signal.addMonoSignal(output, 0.5, 0.5);
    }
}

export class MasterChannel extends MidiChannel {
    private fVec4807: StaticArray<f32> = new StaticArray<f32>(2);
    private fVec5141: StaticArray<f32> = new StaticArray<f32>(2);
    private fVec4739: StaticArray<f32> = new StaticArray<f32>(2);
    private fConst1: f32;
    private fConst2: f32;
    private fConst3: f32;
    private fConst4: f32;
    private fConst5: f32;
    private fConst6: f32;
    private fConst9: f32;
    private fConst10: f32;
    private fConst13: f32;
    private fConst14: f32;
    private fConst15: f32;
    private fConst16: f32;
    private fConst19: f32;
    private fConst20: f32;
    private fConst21: f32;
    private fConst22: f32;
    private fConst23: f32;
    private fConst25: f32;
    private fConst26: f32;
    private fConst27: f32;
    private fConst28: f32;
    private fConst29: f32;
    private fConst30: f32;
    private fConst31: f32;
    private fConst32: f32;
    private fConst33: f32;
    private fConst34: f32;
    private fConst35: f32;
    private fConst36: f32;
    private fConst37: f32;
    private fConst38: f32;
    private fConst39: f32;
    private fConst40: f32;
    private fConst41: f32;
    private fConst42: f32;
    private fConst43: f32;
    private fConst44: f32;
    private fConst45: f32;
    private fConst46: f32;
    private fRec5148: f32;
    private fRec5130: f32;
    private fRec4747: f32;
    private fRec4731: StaticArray<f32> = new StaticArray<f32>(3);
    private fRec4755: f32;
    private fRec4767: StaticArray<f32> = new StaticArray<f32>(3);
    private fRec4780: StaticArray<f32> = new StaticArray<f32>(3);
    private fRec4874: f32;
    private fRec4815: f32;
    private fRec4799: StaticArray<f32> = new StaticArray<f32>(3);
    private fRec4823: f32;
    private fRec4831: StaticArray<f32> = new StaticArray<f32>(3);
    private fRec4844: StaticArray<f32> = new StaticArray<f32>(3);
    private fRec4864: f32;
    private fRec4889: StaticArray<f32> = new StaticArray<f32>(3);
    private fRec4907: StaticArray<f32> = new StaticArray<f32>(3);
    private fRec4920: StaticArray<f32> = new StaticArray<f32>(3);
    private fRec5002: f32;
    private fRec4943: StaticArray<f32> = new StaticArray<f32>(3);
    private fRec4957: StaticArray<f32> = new StaticArray<f32>(3);
    private fRec4970: StaticArray<f32> = new StaticArray<f32>(3);
    private fRec4992: f32;
    private fRec5012: StaticArray<f32> = new StaticArray<f32>(3);
    private fRec5026: StaticArray<f32> = new StaticArray<f32>(3);
    private fRec5090: f32;
    private fRec5043: StaticArray<f32> = new StaticArray<f32>(3);
    private fRec5057: StaticArray<f32> = new StaticArray<f32>(3);
    private fRec5080: f32;
    private fRec5120: f32;
    private fRec5156: f32;
    private fRec5201: f32;
    private fRec5191: f32;

    constructor(numvoices: i32, factoryFunc: (channel: MidiChannel, voiceindex: i32) => MidiVoice) {
        super(numvoices, factoryFunc);
        this._effectInstanceConstants();
        this._effectInstanceClear();
    }

    private _effectInstanceConstants(): void {
        const fConst0: f32 = min<f32>(192000.0, max<f32>(1.0, SAMPLERATE));
        this.fConst1 = (1.0 / Mathf.tan((28274.333984375 / fConst0)));
        this.fConst2 = (1.0 - this.fConst1);
        this.fConst3 = (1.0 / Mathf.tan((785.398193359375 / fConst0)));
        this.fConst4 = (1.0 - this.fConst3);
        this.fConst5 = (1.0 / (1.0 + this.fConst1));
        this.fConst6 = (1.0 / (1.0 + this.fConst3));
        const fConst7: f32 = Mathf.tan((94.2477798461914 / fConst0));
        const fConst8: f32 = (1.0 / fConst7);
        this.fConst9 = (((fConst8 - 1.4142135381698608) / fConst7) + 1.0);
        this.fConst10 = (((1.4142135381698608 + fConst8) / fConst7) + 1.0);
        const fConst11: f32 = Mathf.tan((376.9911193847656 / fConst0));
        const fConst12: f32 = (1.0 / fConst11);
        this.fConst13 = (((fConst12 - 1.8477590084075928) / fConst11) + 1.0);
        this.fConst14 = (((1.8477590084075928 + fConst12) / fConst11) + 1.0);
        this.fConst15 = (((fConst12 - 0.7653668522834778) / fConst11) + 1.0);
        this.fConst16 = (((0.7653668522834778 + fConst12) / fConst11) + 1.0);
        const fConst17: f32 = Mathf.tan((7853.9814453125 / fConst0));
        const fConst18: f32 = (1.0 / fConst17);
        this.fConst19 = (((fConst18 - 1.8477590084075928) / fConst17) + 1.0);
        this.fConst20 = (((1.8477590084075928 + fConst18) / fConst17) + 1.0);
        this.fConst21 = (((fConst18 - 0.7653668522834778) / fConst17) + 1.0);
        this.fConst22 = (((0.7653668522834778 + fConst18) / fConst17) + 1.0);
        this.fConst23 = Mathf.exp((-1.0 * (66.66666412353516 / fConst0)));
        const fConst24: f32 = (1.0 - this.fConst23);
        this.fConst25 = (fConst24 * 0.3333333432674408);
        this.fConst26 = (1.0 / Mathf.pow(fConst7, 2.0));
        this.fConst27 = ((1.0 - this.fConst26) * 2.0);
        this.fConst28 = (1.0 / Mathf.pow(fConst11, 2.0));
        this.fConst29 = ((1.0 - this.fConst28) * 2.0);
        this.fConst30 = Mathf.exp((-1.0 * (133.3333282470703 / fConst0)));
        this.fConst31 = ((1.0 - this.fConst30) * 0.6000000238418579);
        this.fConst32 = Mathf.exp((-1.0 * (8.333333015441895 / fConst0)));
        this.fConst33 = (1.0 / Mathf.pow(fConst17, 2.0));
        this.fConst34 = ((1.0 - this.fConst33) * 2.0);
        this.fConst35 = Mathf.exp((-1.0 * (100.0 / fConst0)));
        this.fConst36 = ((1.0 - this.fConst35) * 0.5);
        this.fConst37 = Mathf.exp((-1.0 * (5.55555534362793 / fConst0)));
        this.fConst38 = Mathf.exp((-1.0 * (50.0 / fConst0)));
        this.fConst39 = (fConst24 * 0.5);
        this.fConst40 = Mathf.exp((-1.0 * (4.0 / fConst0)));
        this.fConst41 = Mathf.exp((-1.0 * (33.33333206176758 / fConst0)));
        this.fConst42 = Mathf.exp((-1.0 * (6.666666507720947 / fConst0)));
        this.fConst43 = Mathf.exp((-1.0 * (2500.0 / fConst0)));
        this.fConst44 = ((1.0 - this.fConst43) * 0.75);
        this.fConst45 = Mathf.exp((-1.0 * (2.0 / fConst0)));
        this.fConst46 = Mathf.exp((-1.0 * (1250.0 / fConst0)));
    }

    private _effectInstanceClear(): void {
        for (let lDelay0: i32 = 0; lDelay0 < <i32>(2); lDelay0 = lDelay0 + 1) { this.fVec4807[lDelay0] = 0.0; }
        for (let lDelay1: i32 = 0; lDelay1 < <i32>(2); lDelay1 = lDelay1 + 1) { this.fVec5141[lDelay1] = 0.0; }
        for (let lDelay2: i32 = 0; lDelay2 < <i32>(2); lDelay2 = lDelay2 + 1) { this.fVec4739[lDelay2] = 0.0; }
        this.fRec5148 = 0.0;
        this.fRec5130 = 0.0;
        this.fRec4747 = 0.0;
        for (let lRec3: i32 = 0; lRec3 < <i32>(3); lRec3 = lRec3 + 1) { this.fRec4731[lRec3] = 0.0; }
        this.fRec4755 = 0.0;
        for (let lRec4: i32 = 0; lRec4 < <i32>(3); lRec4 = lRec4 + 1) { this.fRec4767[lRec4] = 0.0; }
        for (let lRec5: i32 = 0; lRec5 < <i32>(3); lRec5 = lRec5 + 1) { this.fRec4780[lRec5] = 0.0; }
        this.fRec4874 = 0.0;
        this.fRec4815 = 0.0;
        for (let lRec6: i32 = 0; lRec6 < <i32>(3); lRec6 = lRec6 + 1) { this.fRec4799[lRec6] = 0.0; }
        this.fRec4823 = 0.0;
        for (let lRec7: i32 = 0; lRec7 < <i32>(3); lRec7 = lRec7 + 1) { this.fRec4831[lRec7] = 0.0; }
        for (let lRec8: i32 = 0; lRec8 < <i32>(3); lRec8 = lRec8 + 1) { this.fRec4844[lRec8] = 0.0; }
        this.fRec4864 = 0.0;
        for (let lRec9: i32 = 0; lRec9 < <i32>(3); lRec9 = lRec9 + 1) { this.fRec4889[lRec9] = 0.0; }
        for (let lRec10: i32 = 0; lRec10 < <i32>(3); lRec10 = lRec10 + 1) { this.fRec4907[lRec10] = 0.0; }
        for (let lRec11: i32 = 0; lRec11 < <i32>(3); lRec11 = lRec11 + 1) { this.fRec4920[lRec11] = 0.0; }
        this.fRec5002 = 0.0;
        for (let lRec12: i32 = 0; lRec12 < <i32>(3); lRec12 = lRec12 + 1) { this.fRec4943[lRec12] = 0.0; }
        for (let lRec13: i32 = 0; lRec13 < <i32>(3); lRec13 = lRec13 + 1) { this.fRec4957[lRec13] = 0.0; }
        for (let lRec14: i32 = 0; lRec14 < <i32>(3); lRec14 = lRec14 + 1) { this.fRec4970[lRec14] = 0.0; }
        this.fRec4992 = 0.0;
        for (let lRec15: i32 = 0; lRec15 < <i32>(3); lRec15 = lRec15 + 1) { this.fRec5012[lRec15] = 0.0; }
        for (let lRec16: i32 = 0; lRec16 < <i32>(3); lRec16 = lRec16 + 1) { this.fRec5026[lRec16] = 0.0; }
        this.fRec5090 = 0.0;
        for (let lRec17: i32 = 0; lRec17 < <i32>(3); lRec17 = lRec17 + 1) { this.fRec5043[lRec17] = 0.0; }
        for (let lRec18: i32 = 0; lRec18 < <i32>(3); lRec18 = lRec18 + 1) { this.fRec5057[lRec18] = 0.0; }
        this.fRec5080 = 0.0;
        this.fRec5120 = 0.0;
        this.fRec5156 = 0.0;
        this.fRec5201 = 0.0;
        this.fRec5191 = 0.0;
    }

    preprocess(): void {
        const fTemp0: f32 = this.fRec4731[<i32>(1)];
        this.fRec4731[<i32>(0)] = ((3.0 * <f32>(this.signal.left)) - (((this.fRec4731[<i32>(2)] * this.fConst9) + (this.fConst27 * fTemp0)) / this.fConst10));
        const fTemp1: f32 = (this.fConst26 * (((this.fRec4731[<i32>(0)] + this.fRec4731[<i32>(2)]) - (2.0 * fTemp0)) / this.fConst10));
        this.fVec4739[<i32>(0)] = fTemp1;
        const fTemp2: f32 = this.fVec4739[<i32>(1)];
        let fRecCur4747: f32 = (-1.0 * (this.fConst5 * ((this.fConst2 * this.fRec4747) - (this.fConst1 * (fTemp1 - fTemp2)))));
        let fRecCur4755: f32 = (-1.0 * (this.fConst5 * ((this.fConst2 * this.fRec4755) - (fTemp1 + fTemp2))));
        const fTemp3: f32 = ((1.4125375747680664 * fRecCur4747) + fRecCur4755);
        const fTemp4: f32 = this.fRec4767[<i32>(1)];
        this.fRec4767[<i32>(0)] = (fTemp3 - (((this.fRec4767[<i32>(2)] * this.fConst13) + (this.fConst29 * fTemp4)) / this.fConst14));
        const fTemp5: f32 = (2.0 * fTemp4);
        const fTemp6: f32 = this.fRec4767[<i32>(2)];
        const fTemp7: f32 = this.fRec4780[<i32>(1)];
        this.fRec4780[<i32>(0)] = ((((this.fRec4767[<i32>(0)] + fTemp5) + fTemp6) / this.fConst14) - (((this.fRec4780[<i32>(2)] * this.fConst15) + (this.fConst29 * fTemp7)) / this.fConst16));
        const fTemp8: f32 = ((this.fRec4780[<i32>(0)] + (2.0 * fTemp7)) + this.fRec4780[<i32>(2)]);
        const fTemp9: f32 = this.fRec4799[<i32>(1)];
        this.fRec4799[<i32>(0)] = ((3.0 * <f32>(this.signal.right)) - (((this.fRec4799[<i32>(2)] * this.fConst9) + (this.fConst27 * fTemp9)) / this.fConst10));
        const fTemp10: f32 = (this.fConst26 * (((this.fRec4799[<i32>(0)] + this.fRec4799[<i32>(2)]) - (2.0 * fTemp9)) / this.fConst10));
        this.fVec4807[<i32>(0)] = fTemp10;
        const fTemp11: f32 = this.fVec4807[<i32>(1)];
        let fRecCur4815: f32 = (-1.0 * (this.fConst5 * ((this.fConst2 * this.fRec4815) - (this.fConst1 * (fTemp10 - fTemp11)))));
        let fRecCur4823: f32 = (-1.0 * (this.fConst5 * ((this.fConst2 * this.fRec4823) - (fTemp10 + fTemp11))));
        const fTemp12: f32 = ((1.4125375747680664 * fRecCur4815) + fRecCur4823);
        const fTemp13: f32 = this.fRec4831[<i32>(1)];
        this.fRec4831[<i32>(0)] = (fTemp12 - (((this.fRec4831[<i32>(2)] * this.fConst13) + (this.fConst29 * fTemp13)) / this.fConst14));
        const fTemp14: f32 = (2.0 * fTemp13);
        const fTemp15: f32 = this.fRec4831[<i32>(2)];
        const fTemp16: f32 = this.fRec4844[<i32>(1)];
        this.fRec4844[<i32>(0)] = ((((this.fRec4831[<i32>(0)] + fTemp14) + fTemp15) / this.fConst14) - (((this.fRec4844[<i32>(2)] * this.fConst15) + (this.fConst29 * fTemp16)) / this.fConst16));
        const fTemp17: f32 = ((this.fRec4844[<i32>(0)] + (2.0 * fTemp16)) + this.fRec4844[<i32>(2)]);
        const fTemp18: f32 = Mathf.abs((Mathf.abs((fTemp8 / this.fConst16)) + Mathf.abs((fTemp17 / this.fConst16))));
        const fTemp19: f32 = ((fTemp18 > this.fRec4864) ? this.fConst23 : this.fConst32);
        let fRecCur4864: f32 = ((fTemp18 * (1.0 - fTemp19)) + (this.fRec4864 * fTemp19));
        let fRecCur4874: f32 = ((this.fConst30 * this.fRec4874) - (this.fConst31 * max<f32>(((20.0 * Mathf.log10(max<f32>(0.000000000000000000000000000000000000011754943508222875, fRecCur4864))) + 24.0), 0.0)));
        const fTemp20: f32 = Mathf.pow(10.0, (0.05000000074505806 * fRecCur4874));
        const fTemp21: f32 = this.fRec4889[<i32>(1)];
        this.fRec4889[<i32>(0)] = ((this.fConst28 * (((this.fRec4767[<i32>(0)] + fTemp6) - fTemp5) / this.fConst14)) - (((this.fRec4889[<i32>(2)] * this.fConst15) + (this.fConst29 * fTemp21)) / this.fConst16));
        const fTemp22: f32 = this.fRec4907[<i32>(1)];
        this.fRec4907[<i32>(0)] = ((this.fConst28 * (((this.fRec4889[<i32>(0)] + this.fRec4889[<i32>(2)]) - (2.0 * fTemp21)) / this.fConst16)) - (((this.fRec4907[<i32>(2)] * this.fConst19) + (this.fConst34 * fTemp22)) / this.fConst20));
        const fTemp23: f32 = this.fRec4920[<i32>(1)];
        this.fRec4920[<i32>(0)] = ((((this.fRec4907[<i32>(0)] + (2.0 * fTemp22)) + this.fRec4907[<i32>(2)]) / this.fConst20) - (((this.fRec4920[<i32>(2)] * this.fConst21) + (this.fConst34 * fTemp23)) / this.fConst22));
        const fTemp24: f32 = ((this.fRec4920[<i32>(0)] + (2.0 * fTemp23)) + this.fRec4920[<i32>(2)]);
        const fTemp25: f32 = this.fRec4943[<i32>(1)];
        this.fRec4943[<i32>(0)] = ((this.fConst28 * (((this.fRec4831[<i32>(0)] + fTemp15) - fTemp14) / this.fConst14)) - (((this.fRec4943[<i32>(2)] * this.fConst15) + (this.fConst29 * fTemp25)) / this.fConst16));
        const fTemp26: f32 = this.fRec4957[<i32>(1)];
        this.fRec4957[<i32>(0)] = ((this.fConst28 * (((this.fRec4943[<i32>(0)] + this.fRec4943[<i32>(2)]) - (2.0 * fTemp25)) / this.fConst16)) - (((this.fRec4957[<i32>(2)] * this.fConst19) + (this.fConst34 * fTemp26)) / this.fConst20));
        const fTemp27: f32 = this.fRec4970[<i32>(1)];
        this.fRec4970[<i32>(0)] = ((((this.fRec4957[<i32>(0)] + (2.0 * fTemp26)) + this.fRec4957[<i32>(2)]) / this.fConst20) - (((this.fRec4970[<i32>(2)] * this.fConst21) + (this.fConst34 * fTemp27)) / this.fConst22));
        const fTemp28: f32 = ((this.fRec4970[<i32>(0)] + (2.0 * fTemp27)) + this.fRec4970[<i32>(2)]);
        const fTemp29: f32 = Mathf.abs((Mathf.abs((fTemp24 / this.fConst22)) + Mathf.abs((fTemp28 / this.fConst22))));
        const fTemp30: f32 = ((fTemp29 > this.fRec4992) ? this.fConst38 : this.fConst37);
        let fRecCur4992: f32 = ((fTemp29 * (1.0 - fTemp30)) + (this.fRec4992 * fTemp30));
        let fRecCur5002: f32 = ((this.fConst35 * this.fRec5002) - (this.fConst36 * max<f32>(((20.0 * Mathf.log10(max<f32>(0.000000000000000000000000000000000000011754943508222875, fRecCur4992))) + 22.0), 0.0)));
        const fTemp31: f32 = Mathf.pow(10.0, (0.05000000074505806 * fRecCur5002));
        const fTemp32: f32 = this.fRec5012[<i32>(1)];
        this.fRec5012[<i32>(0)] = (fTemp3 - (((this.fRec5012[<i32>(2)] * this.fConst19) + (this.fConst34 * fTemp32)) / this.fConst20));
        const fTemp33: f32 = this.fRec5026[<i32>(1)];
        this.fRec5026[<i32>(0)] = ((this.fConst33 * (((this.fRec5012[<i32>(0)] + this.fRec5012[<i32>(2)]) - (2.0 * fTemp32)) / this.fConst20)) - (((this.fRec5026[<i32>(2)] * this.fConst21) + (this.fConst34 * fTemp33)) / this.fConst22));
        const fTemp34: f32 = ((this.fRec5026[<i32>(0)] + this.fRec5026[<i32>(2)]) - (2.0 * fTemp33));
        const fTemp35: f32 = this.fRec5043[<i32>(1)];
        this.fRec5043[<i32>(0)] = (fTemp12 - (((this.fRec5043[<i32>(2)] * this.fConst19) + (this.fConst34 * fTemp35)) / this.fConst20));
        const fTemp36: f32 = this.fRec5057[<i32>(1)];
        this.fRec5057[<i32>(0)] = ((this.fConst33 * (((this.fRec5043[<i32>(0)] + this.fRec5043[<i32>(2)]) - (2.0 * fTemp35)) / this.fConst20)) - (((this.fRec5057[<i32>(2)] * this.fConst21) + (this.fConst34 * fTemp36)) / this.fConst22));
        const fTemp37: f32 = ((this.fRec5057[<i32>(0)] + this.fRec5057[<i32>(2)]) - (2.0 * fTemp36));
        const fTemp38: f32 = Mathf.abs((Mathf.abs((this.fConst33 * (fTemp34 / this.fConst22))) + Mathf.abs((this.fConst33 * (fTemp37 / this.fConst22)))));
        const fTemp39: f32 = ((fTemp38 > this.fRec5080) ? this.fConst41 : this.fConst40);
        let fRecCur5080: f32 = ((fTemp38 * (1.0 - fTemp39)) + (this.fRec5080 * fTemp39));
        let fRecCur5090: f32 = ((this.fConst23 * this.fRec5090) - (this.fConst39 * max<f32>((20.0 * (Mathf.log10(max<f32>(0.000000000000000000000000000000000000011754943508222875, fRecCur5080)) + 1.0)), 0.0)));
        const fTemp40: f32 = Mathf.pow(10.0, (0.05000000074505806 * fRecCur5090));
        const fTemp41: f32 = ((fTemp24 * fTemp31) + (this.fConst33 * (fTemp34 * fTemp40)));
        const fTemp42: f32 = ((fTemp28 * fTemp31) + (this.fConst33 * (fTemp37 * fTemp40)));
        const fTemp43: f32 = Mathf.abs((Mathf.abs((((fTemp8 * fTemp20) / this.fConst16) + (fTemp41 / this.fConst22))) + Mathf.abs((((fTemp17 * fTemp20) / this.fConst16) + (fTemp42 / this.fConst22)))));
        const fTemp44: f32 = ((fTemp43 > this.fRec5120) ? this.fConst41 : this.fConst42);
        let fRecCur5120: f32 = ((fTemp43 * (1.0 - fTemp44)) + (this.fRec5120 * fTemp44));
        let fRecCur5130: f32 = ((this.fConst23 * this.fRec5130) - (this.fConst25 * max<f32>(((20.0 * Mathf.log10(max<f32>(0.000000000000000000000000000000000000011754943508222875, fRecCur5120))) + 18.0), 0.0)));
        const fTemp45: f32 = Mathf.pow(10.0, (0.05000000074505806 * fRecCur5130));
        const fTemp46: f32 = (1.6875 * (fTemp45 * (((fTemp20 * (fTemp8 - fTemp17)) / this.fConst16) + ((fTemp41 - fTemp42) / this.fConst22))));
        this.fVec5141[<i32>(0)] = fTemp46;
        const fTemp47: f32 = this.fVec5141[<i32>(1)];
        let fRecCur5148: f32 = (-1.0 * (this.fConst6 * ((this.fConst4 * this.fRec5148) - (fTemp46 + fTemp47))));
        let fRecCur5156: f32 = (-1.0 * (this.fConst6 * ((this.fConst4 * this.fRec5156) - (this.fConst3 * (fTemp46 - fTemp47)))));
        const fTemp48: f32 = (1.5 * fRecCur5156);
        const fTemp49: f32 = (1.6875 * (fTemp45 * (((fTemp20 * (fTemp8 + fTemp17)) / this.fConst16) + ((fTemp41 + fTemp42) / this.fConst22))));
        const fTemp50: f32 = (fRecCur5148 + (fTemp48 + fTemp49));
        const fTemp51: f32 = (fTemp49 - (fTemp48 + fRecCur5148));
        const fTemp52: f32 = Mathf.abs((Mathf.abs(fTemp50) + Mathf.abs(fTemp51)));
        const fTemp53: f32 = ((fTemp52 > this.fRec5191) ? this.fConst46 : this.fConst45);
        let fRecCur5191: f32 = ((fTemp52 * (1.0 - fTemp53)) + (this.fRec5191 * fTemp53));
        let fRecCur5201: f32 = ((this.fConst43 * this.fRec5201) - (this.fConst44 * max<f32>(((20.0 * Mathf.log10(max<f32>(0.000000000000000000000000000000000000011754943508222875, fRecCur5191))) + 6.0), 0.0)));
        const fTemp54: f32 = Mathf.pow(10.0, (0.05000000074505806 * fRecCur5201));
        this.signal.left = <f32>(max<f32>(min<f32>((1.2999999523162842 * (fTemp50 * fTemp54)), 0.9800000190734863), -0.9800000190734863));
        this.signal.right = <f32>(max<f32>(min<f32>((1.2999999523162842 * (fTemp51 * fTemp54)), 0.9800000190734863), -0.9800000190734863));

        this.fRec4731[<i32>(2)] = this.fRec4731[<i32>(1)];
        this.fRec4731[<i32>(1)] = this.fRec4731[<i32>(0)];
        this.fVec4739[<i32>(1)] = this.fVec4739[<i32>(0)];
        this.fRec4747 = fRecCur4747;
        this.fRec4755 = fRecCur4755;
        this.fRec4767[<i32>(2)] = this.fRec4767[<i32>(1)];
        this.fRec4767[<i32>(1)] = this.fRec4767[<i32>(0)];
        this.fRec4780[<i32>(2)] = this.fRec4780[<i32>(1)];
        this.fRec4780[<i32>(1)] = this.fRec4780[<i32>(0)];
        this.fRec4799[<i32>(2)] = this.fRec4799[<i32>(1)];
        this.fRec4799[<i32>(1)] = this.fRec4799[<i32>(0)];
        this.fVec4807[<i32>(1)] = this.fVec4807[<i32>(0)];
        this.fRec4815 = fRecCur4815;
        this.fRec4823 = fRecCur4823;
        this.fRec4831[<i32>(2)] = this.fRec4831[<i32>(1)];
        this.fRec4831[<i32>(1)] = this.fRec4831[<i32>(0)];
        this.fRec4844[<i32>(2)] = this.fRec4844[<i32>(1)];
        this.fRec4844[<i32>(1)] = this.fRec4844[<i32>(0)];
        this.fRec4864 = fRecCur4864;
        this.fRec4874 = fRecCur4874;
        this.fRec4889[<i32>(2)] = this.fRec4889[<i32>(1)];
        this.fRec4889[<i32>(1)] = this.fRec4889[<i32>(0)];
        this.fRec4907[<i32>(2)] = this.fRec4907[<i32>(1)];
        this.fRec4907[<i32>(1)] = this.fRec4907[<i32>(0)];
        this.fRec4920[<i32>(2)] = this.fRec4920[<i32>(1)];
        this.fRec4920[<i32>(1)] = this.fRec4920[<i32>(0)];
        this.fRec4943[<i32>(2)] = this.fRec4943[<i32>(1)];
        this.fRec4943[<i32>(1)] = this.fRec4943[<i32>(0)];
        this.fRec4957[<i32>(2)] = this.fRec4957[<i32>(1)];
        this.fRec4957[<i32>(1)] = this.fRec4957[<i32>(0)];
        this.fRec4970[<i32>(2)] = this.fRec4970[<i32>(1)];
        this.fRec4970[<i32>(1)] = this.fRec4970[<i32>(0)];
        this.fRec4992 = fRecCur4992;
        this.fRec5002 = fRecCur5002;
        this.fRec5012[<i32>(2)] = this.fRec5012[<i32>(1)];
        this.fRec5012[<i32>(1)] = this.fRec5012[<i32>(0)];
        this.fRec5026[<i32>(2)] = this.fRec5026[<i32>(1)];
        this.fRec5026[<i32>(1)] = this.fRec5026[<i32>(0)];
        this.fRec5043[<i32>(2)] = this.fRec5043[<i32>(1)];
        this.fRec5043[<i32>(1)] = this.fRec5043[<i32>(0)];
        this.fRec5057[<i32>(2)] = this.fRec5057[<i32>(1)];
        this.fRec5057[<i32>(1)] = this.fRec5057[<i32>(0)];
        this.fRec5080 = fRecCur5080;
        this.fRec5090 = fRecCur5090;
        this.fRec5120 = fRecCur5120;
        this.fRec5130 = fRecCur5130;
        this.fVec5141[<i32>(1)] = this.fVec5141[<i32>(0)];
        this.fRec5148 = fRecCur5148;
        this.fRec5156 = fRecCur5156;
        this.fRec5191 = fRecCur5191;
        this.fRec5201 = fRecCur5201;
    }
}

export function initializeMidiSynth(): void {
    midichannels[0] = new MasterChannel(10, (channel: MidiChannel) => new Master(channel));
    midichannels[0].controlchange(7, 100);
    midichannels[0].controlchange(10, 64);
    midichannels[0].controlchange(91, 10);
}

export function postprocess(): void {
}

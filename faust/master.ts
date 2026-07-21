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
    private fVec4556: StaticArray<f32> = new StaticArray<f32>(2);
    private fVec4862: StaticArray<f32> = new StaticArray<f32>(2);
    private fVec4493: StaticArray<f32> = new StaticArray<f32>(2);
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
    private fConst24: f32;
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
    private fRec4625: f32;
    private fRec4521: StaticArray<f32> = new StaticArray<f32>(3);
    private fRec4501: f32;
    private fRec4485: StaticArray<f32> = new StaticArray<f32>(3);
    private fRec4509: f32;
    private fRec4534: StaticArray<f32> = new StaticArray<f32>(3);
    private fRec4580: StaticArray<f32> = new StaticArray<f32>(3);
    private fRec4564: f32;
    private fRec4548: StaticArray<f32> = new StaticArray<f32>(3);
    private fRec4572: f32;
    private fRec4593: StaticArray<f32> = new StaticArray<f32>(3);
    private fRec4615: f32;
    private fRec4870: f32;
    private fRec4648: StaticArray<f32> = new StaticArray<f32>(3);
    private fRec4666: StaticArray<f32> = new StaticArray<f32>(3);
    private fRec4679: StaticArray<f32> = new StaticArray<f32>(3);
    private fRec4760: f32;
    private fRec4701: StaticArray<f32> = new StaticArray<f32>(3);
    private fRec4715: StaticArray<f32> = new StaticArray<f32>(3);
    private fRec4728: StaticArray<f32> = new StaticArray<f32>(3);
    private fRec4750: f32;
    private fRec4770: StaticArray<f32> = new StaticArray<f32>(3);
    private fRec4784: StaticArray<f32> = new StaticArray<f32>(3);
    private fRec4849: f32;
    private fRec4802: StaticArray<f32> = new StaticArray<f32>(3);
    private fRec4816: StaticArray<f32> = new StaticArray<f32>(3);
    private fRec4839: f32;
    private fRec4885: f32;
    private fRec4923: f32;
    private fRec4913: f32;

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
        this.fConst23 = Mathf.exp((-1.0 * (133.3333282470703 / fConst0)));
        this.fConst24 = ((1.0 - this.fConst23) * 0.6000000238418579);
        this.fConst25 = (1.0 / Mathf.pow(fConst7, 2.0));
        this.fConst26 = ((1.0 - this.fConst25) * 2.0);
        this.fConst27 = (1.0 / Mathf.pow(fConst11, 2.0));
        this.fConst28 = ((1.0 - this.fConst27) * 2.0);
        this.fConst29 = Mathf.exp((-1.0 * (8.333333015441895 / fConst0)));
        this.fConst30 = (1.0 / Mathf.pow(fConst17, 2.0));
        this.fConst31 = ((1.0 - this.fConst30) * 2.0);
        this.fConst32 = Mathf.exp((-1.0 * (100.0 / fConst0)));
        this.fConst33 = ((1.0 - this.fConst32) * 0.5);
        this.fConst34 = Mathf.exp((-1.0 * (5.55555534362793 / fConst0)));
        this.fConst35 = Mathf.exp((-1.0 * (50.0 / fConst0)));
        this.fConst36 = Mathf.exp((-1.0 * (66.66666412353516 / fConst0)));
        this.fConst37 = ((1.0 - this.fConst36) * 0.5);
        this.fConst38 = Mathf.exp((-1.0 * (4.0 / fConst0)));
        this.fConst39 = Mathf.exp((-1.0 * (33.33333206176758 / fConst0)));
        this.fConst40 = Mathf.exp((-1.0 * (2500.0 / fConst0)));
        this.fConst41 = ((1.0 - this.fConst40) * 0.75);
        this.fConst42 = Mathf.exp((-1.0 * (2.0 / fConst0)));
        this.fConst43 = Mathf.exp((-1.0 * (1250.0 / fConst0)));
    }

    private _effectInstanceClear(): void {
        for (let lDelay0: i32 = 0; lDelay0 < <i32>(2); lDelay0 = lDelay0 + 1) { this.fVec4556[lDelay0] = 0.0; }
        for (let lDelay1: i32 = 0; lDelay1 < <i32>(2); lDelay1 = lDelay1 + 1) { this.fVec4862[lDelay1] = 0.0; }
        for (let lDelay2: i32 = 0; lDelay2 < <i32>(2); lDelay2 = lDelay2 + 1) { this.fVec4493[lDelay2] = 0.0; }
        this.fRec4625 = 0.0;
        for (let lRec3: i32 = 0; lRec3 < <i32>(3); lRec3 = lRec3 + 1) { this.fRec4521[lRec3] = 0.0; }
        this.fRec4501 = 0.0;
        for (let lRec4: i32 = 0; lRec4 < <i32>(3); lRec4 = lRec4 + 1) { this.fRec4485[lRec4] = 0.0; }
        this.fRec4509 = 0.0;
        for (let lRec5: i32 = 0; lRec5 < <i32>(3); lRec5 = lRec5 + 1) { this.fRec4534[lRec5] = 0.0; }
        for (let lRec6: i32 = 0; lRec6 < <i32>(3); lRec6 = lRec6 + 1) { this.fRec4580[lRec6] = 0.0; }
        this.fRec4564 = 0.0;
        for (let lRec7: i32 = 0; lRec7 < <i32>(3); lRec7 = lRec7 + 1) { this.fRec4548[lRec7] = 0.0; }
        this.fRec4572 = 0.0;
        for (let lRec8: i32 = 0; lRec8 < <i32>(3); lRec8 = lRec8 + 1) { this.fRec4593[lRec8] = 0.0; }
        this.fRec4615 = 0.0;
        this.fRec4870 = 0.0;
        for (let lRec9: i32 = 0; lRec9 < <i32>(3); lRec9 = lRec9 + 1) { this.fRec4648[lRec9] = 0.0; }
        for (let lRec10: i32 = 0; lRec10 < <i32>(3); lRec10 = lRec10 + 1) { this.fRec4666[lRec10] = 0.0; }
        for (let lRec11: i32 = 0; lRec11 < <i32>(3); lRec11 = lRec11 + 1) { this.fRec4679[lRec11] = 0.0; }
        this.fRec4760 = 0.0;
        for (let lRec12: i32 = 0; lRec12 < <i32>(3); lRec12 = lRec12 + 1) { this.fRec4701[lRec12] = 0.0; }
        for (let lRec13: i32 = 0; lRec13 < <i32>(3); lRec13 = lRec13 + 1) { this.fRec4715[lRec13] = 0.0; }
        for (let lRec14: i32 = 0; lRec14 < <i32>(3); lRec14 = lRec14 + 1) { this.fRec4728[lRec14] = 0.0; }
        this.fRec4750 = 0.0;
        for (let lRec15: i32 = 0; lRec15 < <i32>(3); lRec15 = lRec15 + 1) { this.fRec4770[lRec15] = 0.0; }
        for (let lRec16: i32 = 0; lRec16 < <i32>(3); lRec16 = lRec16 + 1) { this.fRec4784[lRec16] = 0.0; }
        this.fRec4849 = 0.0;
        for (let lRec17: i32 = 0; lRec17 < <i32>(3); lRec17 = lRec17 + 1) { this.fRec4802[lRec17] = 0.0; }
        for (let lRec18: i32 = 0; lRec18 < <i32>(3); lRec18 = lRec18 + 1) { this.fRec4816[lRec18] = 0.0; }
        this.fRec4839 = 0.0;
        this.fRec4885 = 0.0;
        this.fRec4923 = 0.0;
        this.fRec4913 = 0.0;
    }

    preprocess(): void {
        const fTemp0: f32 = (2.0 * this.fRec4521[<i32>(1)]);
        const fTemp1: f32 = this.fRec4485[<i32>(1)];
        this.fRec4485[<i32>(0)] = ((5.0 * <f32>(this.signal.left)) - (((this.fRec4485[<i32>(2)] * this.fConst9) + (this.fConst26 * fTemp1)) / this.fConst10));
        const fTemp2: f32 = (this.fConst25 * (((this.fRec4485[<i32>(0)] + this.fRec4485[<i32>(2)]) - (2.0 * fTemp1)) / this.fConst10));
        this.fVec4493[<i32>(0)] = fTemp2;
        const fTemp3: f32 = this.fVec4493[<i32>(1)];
        let fRecCur4501: f32 = (-1.0 * (this.fConst5 * ((this.fConst2 * this.fRec4501) - (this.fConst1 * (fTemp2 - fTemp3)))));
        let fRecCur4509: f32 = (-1.0 * (this.fConst5 * ((this.fConst2 * this.fRec4509) - (fTemp2 + fTemp3))));
        const fTemp4: f32 = ((1.4125375747680664 * fRecCur4501) + fRecCur4509);
        const fTemp5: f32 = this.fRec4521[<i32>(1)];
        this.fRec4521[<i32>(0)] = (fTemp4 - (((this.fRec4521[<i32>(2)] * this.fConst13) + (this.fConst28 * fTemp5)) / this.fConst14));
        const fTemp6: f32 = (this.fRec4521[<i32>(0)] + this.fRec4521[<i32>(2)]);
        const fTemp7: f32 = this.fRec4534[<i32>(1)];
        this.fRec4534[<i32>(0)] = (((fTemp0 + fTemp6) / this.fConst14) - (((this.fRec4534[<i32>(2)] * this.fConst15) + (this.fConst28 * fTemp7)) / this.fConst16));
        const fTemp9: f32 = this.fRec4534[<i32>(2)];
        const fTemp10: f32 = ((this.fRec4534[<i32>(0)] + (2.0 * fTemp7)) + fTemp9);
        const fTemp11: f32 = (2.0 * this.fRec4580[<i32>(1)]);
        const fTemp12: f32 = this.fRec4548[<i32>(1)];
        this.fRec4548[<i32>(0)] = ((5.0 * <f32>(this.signal.right)) - (((this.fRec4548[<i32>(2)] * this.fConst9) + (this.fConst26 * fTemp12)) / this.fConst10));
        const fTemp13: f32 = (this.fConst25 * (((this.fRec4548[<i32>(0)] + this.fRec4548[<i32>(2)]) - (2.0 * fTemp12)) / this.fConst10));
        this.fVec4556[<i32>(0)] = fTemp13;
        const fTemp14: f32 = this.fVec4556[<i32>(1)];
        let fRecCur4564: f32 = (-1.0 * (this.fConst5 * ((this.fConst2 * this.fRec4564) - (this.fConst1 * (fTemp13 - fTemp14)))));
        let fRecCur4572: f32 = (-1.0 * (this.fConst5 * ((this.fConst2 * this.fRec4572) - (fTemp13 + fTemp14))));
        const fTemp15: f32 = ((1.4125375747680664 * fRecCur4564) + fRecCur4572);
        const fTemp16: f32 = this.fRec4580[<i32>(1)];
        this.fRec4580[<i32>(0)] = (fTemp15 - (((this.fRec4580[<i32>(2)] * this.fConst13) + (this.fConst28 * fTemp16)) / this.fConst14));
        const fTemp17: f32 = (this.fRec4580[<i32>(0)] + this.fRec4580[<i32>(2)]);
        const fTemp18: f32 = this.fRec4593[<i32>(1)];
        this.fRec4593[<i32>(0)] = (((fTemp11 + fTemp17) / this.fConst14) - (((this.fRec4593[<i32>(2)] * this.fConst15) + (this.fConst28 * fTemp18)) / this.fConst16));
        const fTemp20: f32 = this.fRec4593[<i32>(2)];
        const fTemp21: f32 = ((this.fRec4593[<i32>(0)] + (2.0 * fTemp18)) + fTemp20);
        const fTemp22: f32 = Mathf.abs((Mathf.abs((fTemp10 / this.fConst16)) + Mathf.abs((fTemp21 / this.fConst16))));
        const fTemp23: f32 = ((fTemp22 > this.fRec4615) ? this.fConst36 : this.fConst29);
        let fRecCur4615: f32 = ((fTemp22 * (1.0 - fTemp23)) + (this.fRec4615 * fTemp23));
        let fRecCur4625: f32 = ((this.fConst23 * this.fRec4625) - (this.fConst24 * max<f32>(((20.0 * Mathf.log10(max<f32>(0.000000000000000000000000000000000000011754943508222875, fRecCur4615))) + 24.0), 0.0)));
        const fTemp24: f32 = Mathf.pow(10.0, (0.05000000074505806 * fRecCur4625));
        const fTemp25: f32 = ((fTemp24 * ((2.0 * (fTemp7 + fTemp18)) + (fTemp20 + (this.fRec4593[<i32>(0)] + (this.fRec4534[<i32>(0)] + fTemp9))))) / this.fConst16);
        const fTemp26: f32 = this.fRec4648[<i32>(1)];
        this.fRec4648[<i32>(0)] = ((this.fConst27 * ((fTemp6 - fTemp0) / this.fConst14)) - (((this.fRec4648[<i32>(2)] * this.fConst15) + (this.fConst28 * fTemp26)) / this.fConst16));
        const fTemp27: f32 = this.fRec4666[<i32>(1)];
        this.fRec4666[<i32>(0)] = ((this.fConst27 * (((this.fRec4648[<i32>(0)] + this.fRec4648[<i32>(2)]) - (2.0 * fTemp26)) / this.fConst16)) - (((this.fRec4666[<i32>(2)] * this.fConst19) + (this.fConst31 * fTemp27)) / this.fConst20));
        const fTemp28: f32 = this.fRec4679[<i32>(1)];
        this.fRec4679[<i32>(0)] = ((((this.fRec4666[<i32>(0)] + (2.0 * fTemp27)) + this.fRec4666[<i32>(2)]) / this.fConst20) - (((this.fRec4679[<i32>(2)] * this.fConst21) + (this.fConst31 * fTemp28)) / this.fConst22));
        const fTemp29: f32 = ((this.fRec4679[<i32>(0)] + (2.0 * fTemp28)) + this.fRec4679[<i32>(2)]);
        const fTemp30: f32 = this.fRec4701[<i32>(1)];
        this.fRec4701[<i32>(0)] = ((this.fConst27 * ((fTemp17 - fTemp11) / this.fConst14)) - (((this.fRec4701[<i32>(2)] * this.fConst15) + (this.fConst28 * fTemp30)) / this.fConst16));
        const fTemp31: f32 = this.fRec4715[<i32>(1)];
        this.fRec4715[<i32>(0)] = ((this.fConst27 * (((this.fRec4701[<i32>(0)] + this.fRec4701[<i32>(2)]) - (2.0 * fTemp30)) / this.fConst16)) - (((this.fRec4715[<i32>(2)] * this.fConst19) + (this.fConst31 * fTemp31)) / this.fConst20));
        const fTemp32: f32 = this.fRec4728[<i32>(1)];
        this.fRec4728[<i32>(0)] = ((((this.fRec4715[<i32>(0)] + (2.0 * fTemp31)) + this.fRec4715[<i32>(2)]) / this.fConst20) - (((this.fRec4728[<i32>(2)] * this.fConst21) + (this.fConst31 * fTemp32)) / this.fConst22));
        const fTemp33: f32 = ((this.fRec4728[<i32>(0)] + (2.0 * fTemp32)) + this.fRec4728[<i32>(2)]);
        const fTemp34: f32 = Mathf.abs((Mathf.abs((fTemp29 / this.fConst22)) + Mathf.abs((fTemp33 / this.fConst22))));
        const fTemp35: f32 = ((fTemp34 > this.fRec4750) ? this.fConst35 : this.fConst34);
        let fRecCur4750: f32 = ((fTemp34 * (1.0 - fTemp35)) + (this.fRec4750 * fTemp35));
        let fRecCur4760: f32 = ((this.fConst32 * this.fRec4760) - (this.fConst33 * max<f32>(((20.0 * Mathf.log10(max<f32>(0.000000000000000000000000000000000000011754943508222875, fRecCur4750))) + 22.0), 0.0)));
        const fTemp36: f32 = Mathf.pow(10.0, (0.05000000074505806 * fRecCur4760));
        const fTemp37: f32 = this.fRec4770[<i32>(1)];
        this.fRec4770[<i32>(0)] = (fTemp4 - (((this.fRec4770[<i32>(2)] * this.fConst19) + (this.fConst31 * fTemp37)) / this.fConst20));
        const fTemp38: f32 = this.fRec4784[<i32>(1)];
        this.fRec4784[<i32>(0)] = ((this.fConst30 * (((this.fRec4770[<i32>(0)] + this.fRec4770[<i32>(2)]) - (2.0 * fTemp37)) / this.fConst20)) - (((this.fRec4784[<i32>(2)] * this.fConst21) + (this.fConst31 * fTemp38)) / this.fConst22));
        const fTemp39: f32 = ((this.fRec4784[<i32>(0)] + this.fRec4784[<i32>(2)]) - (2.0 * fTemp38));
        const fTemp40: f32 = this.fRec4802[<i32>(1)];
        this.fRec4802[<i32>(0)] = (fTemp15 - (((this.fRec4802[<i32>(2)] * this.fConst19) + (this.fConst31 * fTemp40)) / this.fConst20));
        const fTemp41: f32 = this.fRec4816[<i32>(1)];
        this.fRec4816[<i32>(0)] = ((this.fConst30 * (((this.fRec4802[<i32>(0)] + this.fRec4802[<i32>(2)]) - (2.0 * fTemp40)) / this.fConst20)) - (((this.fRec4816[<i32>(2)] * this.fConst21) + (this.fConst31 * fTemp41)) / this.fConst22));
        const fTemp42: f32 = ((this.fRec4816[<i32>(0)] + this.fRec4816[<i32>(2)]) - (2.0 * fTemp41));
        const fTemp43: f32 = Mathf.abs((Mathf.abs((this.fConst30 * (fTemp39 / this.fConst22))) + Mathf.abs((this.fConst30 * (fTemp42 / this.fConst22)))));
        const fTemp44: f32 = ((fTemp43 > this.fRec4839) ? this.fConst39 : this.fConst38);
        let fRecCur4839: f32 = ((fTemp43 * (1.0 - fTemp44)) + (this.fRec4839 * fTemp44));
        let fRecCur4849: f32 = ((this.fConst36 * this.fRec4849) - (this.fConst37 * max<f32>((20.0 * (Mathf.log10(max<f32>(0.000000000000000000000000000000000000011754943508222875, fRecCur4839)) + 1.0)), 0.0)));
        const fTemp45: f32 = Mathf.pow(10.0, (0.05000000074505806 * fRecCur4849));
        const fTemp46: f32 = (((fTemp24 * (fTemp10 - fTemp21)) / this.fConst16) + ((((fTemp29 * fTemp36) + (this.fConst30 * (fTemp39 * fTemp45))) - ((fTemp33 * fTemp36) + (this.fConst30 * (fTemp42 * fTemp45)))) / this.fConst22));
        this.fVec4862[<i32>(0)] = fTemp46;
        const fTemp47: f32 = this.fVec4862[<i32>(1)];
        let fRecCur4870: f32 = (-1.0 * (this.fConst6 * ((this.fConst4 * this.fRec4870) - (this.fConst3 * (fTemp46 - fTemp47)))));
        const fTemp48: f32 = (1.7999999523162842 * fRecCur4870);
        const fTemp49: f32 = (((fTemp36 * (fTemp29 + fTemp33)) + (this.fConst30 * (fTemp45 * (fTemp39 + fTemp42)))) / this.fConst22);
        let fRecCur4885: f32 = (-1.0 * (this.fConst6 * ((this.fConst4 * this.fRec4885) - (fTemp46 + fTemp47))));
        const fTemp50: f32 = (fTemp25 + (fTemp48 + (fTemp49 + fRecCur4885)));
        const fTemp51: f32 = ((fTemp49 + fTemp25) - (fRecCur4885 + fTemp48));
        const fTemp52: f32 = Mathf.abs((Mathf.abs(fTemp50) + Mathf.abs(fTemp51)));
        const fTemp53: f32 = ((fTemp52 > this.fRec4913) ? this.fConst43 : this.fConst42);
        let fRecCur4913: f32 = ((fTemp52 * (1.0 - fTemp53)) + (this.fRec4913 * fTemp53));
        let fRecCur4923: f32 = ((this.fConst40 * this.fRec4923) - (this.fConst41 * max<f32>(((20.0 * Mathf.log10(max<f32>(0.000000000000000000000000000000000000011754943508222875, fRecCur4913))) + 6.0), 0.0)));
        const fTemp54: f32 = Mathf.pow(10.0, (0.05000000074505806 * fRecCur4923));
        this.signal.left = <f32>(max<f32>(min<f32>((1.2999999523162842 * (fTemp50 * fTemp54)), 0.9800000190734863), -0.9800000190734863));
        this.signal.right = <f32>(max<f32>(min<f32>((1.2999999523162842 * (fTemp51 * fTemp54)), 0.9800000190734863), -0.9800000190734863));

        this.fRec4485[<i32>(2)] = this.fRec4485[<i32>(1)];
        this.fRec4485[<i32>(1)] = this.fRec4485[<i32>(0)];
        this.fVec4493[<i32>(1)] = this.fVec4493[<i32>(0)];
        this.fRec4501 = fRecCur4501;
        this.fRec4509 = fRecCur4509;
        this.fRec4521[<i32>(2)] = this.fRec4521[<i32>(1)];
        this.fRec4521[<i32>(1)] = this.fRec4521[<i32>(0)];
        this.fRec4534[<i32>(2)] = this.fRec4534[<i32>(1)];
        this.fRec4534[<i32>(1)] = this.fRec4534[<i32>(0)];
        this.fRec4548[<i32>(2)] = this.fRec4548[<i32>(1)];
        this.fRec4548[<i32>(1)] = this.fRec4548[<i32>(0)];
        this.fVec4556[<i32>(1)] = this.fVec4556[<i32>(0)];
        this.fRec4564 = fRecCur4564;
        this.fRec4572 = fRecCur4572;
        this.fRec4580[<i32>(2)] = this.fRec4580[<i32>(1)];
        this.fRec4580[<i32>(1)] = this.fRec4580[<i32>(0)];
        this.fRec4593[<i32>(2)] = this.fRec4593[<i32>(1)];
        this.fRec4593[<i32>(1)] = this.fRec4593[<i32>(0)];
        this.fRec4615 = fRecCur4615;
        this.fRec4625 = fRecCur4625;
        this.fRec4648[<i32>(2)] = this.fRec4648[<i32>(1)];
        this.fRec4648[<i32>(1)] = this.fRec4648[<i32>(0)];
        this.fRec4666[<i32>(2)] = this.fRec4666[<i32>(1)];
        this.fRec4666[<i32>(1)] = this.fRec4666[<i32>(0)];
        this.fRec4679[<i32>(2)] = this.fRec4679[<i32>(1)];
        this.fRec4679[<i32>(1)] = this.fRec4679[<i32>(0)];
        this.fRec4701[<i32>(2)] = this.fRec4701[<i32>(1)];
        this.fRec4701[<i32>(1)] = this.fRec4701[<i32>(0)];
        this.fRec4715[<i32>(2)] = this.fRec4715[<i32>(1)];
        this.fRec4715[<i32>(1)] = this.fRec4715[<i32>(0)];
        this.fRec4728[<i32>(2)] = this.fRec4728[<i32>(1)];
        this.fRec4728[<i32>(1)] = this.fRec4728[<i32>(0)];
        this.fRec4750 = fRecCur4750;
        this.fRec4760 = fRecCur4760;
        this.fRec4770[<i32>(2)] = this.fRec4770[<i32>(1)];
        this.fRec4770[<i32>(1)] = this.fRec4770[<i32>(0)];
        this.fRec4784[<i32>(2)] = this.fRec4784[<i32>(1)];
        this.fRec4784[<i32>(1)] = this.fRec4784[<i32>(0)];
        this.fRec4802[<i32>(2)] = this.fRec4802[<i32>(1)];
        this.fRec4802[<i32>(1)] = this.fRec4802[<i32>(0)];
        this.fRec4816[<i32>(2)] = this.fRec4816[<i32>(1)];
        this.fRec4816[<i32>(1)] = this.fRec4816[<i32>(0)];
        this.fRec4839 = fRecCur4839;
        this.fRec4849 = fRecCur4849;
        this.fVec4862[<i32>(1)] = this.fVec4862[<i32>(0)];
        this.fRec4870 = fRecCur4870;
        this.fRec4885 = fRecCur4885;
        this.fRec4913 = fRecCur4913;
        this.fRec4923 = fRecCur4923;
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

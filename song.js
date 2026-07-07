setBPM(140);

addInstrument('bass');   // channel 0
addInstrument('lead');   // channel 1
addInstrument('kick');   // channel 2
addInstrument('snare');  // channel 3
addInstrument('hihat');  // channel 4
addInstrument('pad');    // channel 5

// tracks
const bass  = createTrack(0, 4, 100);
const lead  = createTrack(1, 4, 90);
const kick  = createTrack(2, 4, 110);
const snare = createTrack(3, 4, 100);
const hihat = createTrack(4, 4, 70);
const pad   = createTrack(5, 4, 100);

// ---- drum patterns (jungle break) ----
const kickPattern = [
  c3,,,,
  ,,,,
  ,,c3,,
  ,,,,
  c3,,,,
  ,c3,,,
  ,,c3,,
  ,,,,
].repeat(1);

const snarePattern = [
  ,,,,
  d3,,,,
  ,,,,
  d3,,,d3,
  ,,,,
  d3,,,d3,
  ,,,,
  d3,,,,
].repeat(1);

const hihatPattern = [ fs3,,fs3,, ].repeat(15); // 16 beats

// ============================================================
//  INTRO build-up (plays once)
// ============================================================

const bassPattern = [
  f2,,,,
  f2(0.2),,,,
  f2(0.2),,,,
  f2(0.2),,,,
  g2,,,,
  g2(0.2),,,,
  g2(0.2),,,,
  g2(0.2),,,,
  gs2,,,,
  gs2(0.2),,,,
  gs2(0.2),,,,
  gs2(0.2),,,,
  as2,,,,
  as2(0.2),,,,
  as2(0.2),,,,
  as2(0.2),,,,
];

const leadNotes = [[ 0.58, f5(0.06, 42) ],
[ 0.52, gs4(0.26, 63) ],
[ 0.55, c5(0.24, 60) ],
[ 1.56, f5(0.26, 57) ],
[ 1.52, gs4(0.33, 63) ],
[ 1.53, c5(0.31, 65) ],
[ 2.52, f5(0.27, 60) ],
[ 2.50, c5(0.30, 68) ],
[ 2.50, gs4(0.31, 62) ],
[ 3.53, as4(0.36, 71) ],
[ 3.56, g4(0.33, 87) ],
[ 3.55, f5(0.41, 70) ],
[ 4.55, ds5(0.27, 62) ],
[ 4.54, as4(0.29, 69) ],
[ 4.56, g4(0.28, 70) ],
[ 5.51, as4(0.35, 71) ],
[ 5.54, g4(0.33, 58) ],
[ 5.50, ds5(0.37, 61) ],
[ 6.52, g4(0.24, 62) ],
[ 6.52, ds5(0.27, 49) ],
[ 6.50, as4(0.33, 71) ],
[ 7.50, ds5(0.23, 64) ],
[ 7.48, gs4(0.30, 62) ],
[ 7.49, as4(0.33, 68) ],
[ 8.61, gs4(0.22, 59) ],
[ 8.61, ds5(0.23, 56) ],
[ 8.60, as4(0.28, 71) ],
[ 9.49, gs4(0.34, 52) ],
[ 9.51, ds5(0.33, 48) ],
[ 9.47, as4(0.37, 58) ],
[ 10.50, ds5(0.27, 49) ],
[ 10.48, as4(0.31, 66) ],
[ 10.47, gs4(0.35, 63) ],
[ 11.49, f4(0.37, 74) ],
[ 11.48, as4(0.41, 68) ],
[ 11.49, ds5(0.43, 72) ],
[ 12.48, d5(0.35, 52) ],
[ 12.48, f4(0.37, 60) ],
[ 12.46, as4(0.39, 64) ],
[ 13.46, f4(0.34, 64) ],
[ 13.44, as4(0.35, 62) ],
[ 13.43, c5(0.41, 60) ],
[ 14.44, f4(0.36, 63) ],
[ 14.45, d5(0.37, 54) ],
[ 14.43, as4(0.39, 66) ]].quantize(4);

const padNotes = [[ 2.49, ds5(0.42, 100) ],
[ 2.93, f5(0.69, 100) ],
[ 3.97, as5(1.60, 100) ],
[ 6.0, f5(1.69, 100) ],
[ 7.53, ds5(2.83, 100) ],
[ 10.47, f5(0.34, 100) ],
[ 11.01, g5(0.58, 100) ],
[ 11.97, f5(1.72, 100) ],
[ 14.09, g5(1.14, 100) ]].quantize(4);

const playBass  = () => bass.steps(4, bassPattern);
const playLead  = () => lead.play(leadNotes);
const playDrums = () => { kick.steps(4, kickPattern); snare.steps(4, snarePattern); hihat.steps(4, hihatPattern); };
const playPad   = () => pad.play(padNotes);

// 1) bass + lead only
playBass(); playLead();
await waitForBeat(16);

// 2) same sequence + drums
playBass(); playLead(); playDrums();
await waitForBeat(32);

// 3) + pad
playBass(); playLead(); playDrums(); playPad();
await waitForBeat(48);

createTrack(5).play([[ 12.57, ds6(0.42, 69) ],
[ 13.54, controlchange(64, 127) ],
[ 12.99, f6(0.92, 90) ],
[ 13.46, as6(0.56, 82) ],
[ 13.98, ds7(0.58, 83) ],
[ 14.51, d7(0.43, 74) ],
[ 14.91, as6(0.65, 77) ],
[ 15.87, controlchange(64, 0) ],
[ 15.51, c7(2.07, 83) ]].quantize(4));

// 4) pad again (second time)
playBass(); playLead(); playDrums(); playPad();
await waitForBeat(64);

// ============================================================
//  MAIN arrangement of the recorded parts (loops)
// ============================================================

// bass line (channel 0)
const recBass = () => bass.play([
  [ 0.00, f2(3.99, 87) ],
  [ 4.00, c3(3.99, 87) ],
  [ 8.010, ds3(3.99, 81) ],
  [ 12.00, gs2(3.99, 91) ]]);

// chords played with the bass instrument (channel 0)
const recChords = () => bass.play([
  [ 0.0, c5(3.99, 97) ],
  [ 0, gs5(3.99, 84) ],
  [ 0, f5(3.99, 93) ],
  [ 4, c5(3.99, 99) ],
  [ 4, g5(3.99, 94) ],
  [ 4, ds5(3.99, 92) ],
  [ 8, ds5(3.99, 97) ],
  [ 8, g5(3.99, 79) ],
  [ 8, as4(3.99, 94) ],
  [ 12, gs4(3.99, 88) ],
  [ 12, c5(3.99, 94) ]]);

// pad (channel 5)
const recPad = () => pad.play([
  [ 2.97, as6(0.57, 89) ],
  [ 3.97, controlchange(64, 127) ],
  [ 3.52, g6(3.59, 88) ],
  [ 7.34, controlchange(64, 0) ],
  [ 7.11, as6(0.54, 97) ],
  [ 7.95, controlchange(64, 127) ],
  [ 7.57, f6(3.43, 84) ],
  [ 10.99, ds6(0.49, 81) ],
  [ 11.87, controlchange(64, 0) ],
  [ 13.48, controlchange(64, 127) ],
  [ 11.54, c6(4.04, 74) ],
  [ 15.93, controlchange(64, 0) ]].quantize(4));

// lead (channel 1)
const recLead = () => lead.play([
  [ 0.05, f6(0.41, 97) ],
  [ 1.00, f6(0.47, 98) ],
  [ 1.98, ds6(0.43, 84) ],
  [ 2.49, f6(0.57, 89) ],
  [ 3.49, c6(0.49, 70) ],
  [ 4.02, ds6(0.43, 86) ],
  [ 4.97, ds6(0.54, 84) ],
  [ 5.97, c6(0.54, 82) ],
  [ 6.50, ds6(0.34, 83) ],
  [ 7.52, c6(0.38, 68) ],
  [ 8.05, ds6(0.45, 94) ],
  [ 9.02, ds6(0.51, 92) ],
  [ 10.00, c6(0.53, 84) ],
  [ 10.51, ds6(0.42, 77) ],
  [ 11.49, as5(0.57, 83) ],
  [ 12.10, c6(0.49, 84) ],
  [ 13.04, c6(0.49, 83) ],
  [ 14.07, ds6(0.45, 86) ],
  [ 14.51, c6(0.47, 89) ]].quantize(4));

// drums (channels 2,3,4)
const recDrums = () => {
  kick.steps(4, kickPattern);
  snare.steps(4, snarePattern);
  hihat.steps(4, hihatPattern);
};


// A) bass + chords + pad  (x2)
recBass(); recChords(); recPad();
await waitForBeat(80);
recBass(); recChords(); recPad();
await waitForBeat(96);

// B) same + drums + lead  (x2)
recBass(); recChords(); recPad(); recDrums(); recLead();
await waitForBeat(112);
recBass(); recChords(); recPad(); recDrums(); recLead();
await waitForBeat(128);

loopHere();

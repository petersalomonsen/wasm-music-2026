setBPM(140);

addInstrument('bass');   // channel 0
addInstrument('lead');   // channel 1
addInstrument('kick');   // channel 2
addInstrument('snare');  // channel 3
addInstrument('hihat');  // channel 4
addInstrument('pad');    // channel 5

const bass = createTrack(0, 4, 100);
const lead = createTrack(1, 4, 90);
const kick = createTrack(2, 4, 110);
const snare = createTrack(3, 4, 100);
const hihat = createTrack(4, 4, 70);

startRecording();
createTrack(1).play([[ 0.58, f5(0.06, 42) ],
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
[ 14.43, as4(0.39, 66) ]].quantize(4));

createTrack(0).steps(4,[

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
  
]);

// jungle drum break — same 16-beat length as the bass line, all fire-and-forget
kick.steps(4,[
  c3,,,,
  ,,,,
  ,,c3,,
  ,,,,
  c3,,,,
  ,c3,,,
  ,,c3,,
  ,,,,
].repeat(2));

snare.steps(4,[
  ,,,,
  d3,,,,
  ,,,,
  d3,,,d3,
  ,,,,
  d3,,,d3,
  ,,,,
  d3,,,,
].repeat(2));

hihat.steps(4,[ fs3,,fs3,, ].repeat(16));

createTrack(5).play([[ 2.49, ds5(0.42, 100) ],
[ 2.93, f5(0.69, 100) ],
[ 3.97, as5(1.60, 100) ],
[ 6.0, f5(1.69, 100) ],
[ 7.53, ds5(2.83, 100) ],
[ 10.47, f5(0.34, 100) ],
[ 11.01, g5(0.58, 100) ],
[ 11.97, f5(1.72, 100) ],
[ 14.09, g5(1.14, 100) ]].quantize(4));

// wait for the beat (not the bass) so bass, lead and drums all run together
await waitForBeat(16);
stopRecording();
loopHere();
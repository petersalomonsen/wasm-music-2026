setBPM(140);

addInstrument('bass');   // channel 0
addInstrument('lead');   // channel 1
addInstrument('kick');   // channel 2
addInstrument('snare');  // channel 3
addInstrument('hihat');  // channel 4
addInstrument('pad');    // channel 5
addInstrument('organ');  // channel 6
addInstrument('basslead'); // channel 7


// tracks
const bass  = createTrack(0, 4, 100);
const lead  = createTrack(1, 4, 90);
const kick  = createTrack(2, 4, 110);
const snare = createTrack(3, 4, 100);
const hihat = createTrack(4, 4, 70);
const pad   = createTrack(5, 4, 100);
const organ = createTrack(6, 4, 100);

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

const padNotes = [[ 2.49, ds6(0.42, 100) ],
[ 2.93, f6(0.69, 100) ],
[ 3.97, as6(1.60, 100) ],
[ 6.0, f6(1.69, 100) ],
[ 7.53, ds6(2.83, 100) ],
[ 10.47, f6(0.34, 100) ],
[ 11.01, g6(0.58, 100) ],
[ 11.97, f6(1.72, 100) ],
[ 14.09, g6(1.14, 100) ]].quantize(4);

const playBass  = () => bass.steps(4, bassPattern);
const playLead  = () => lead.play(leadNotes);
const playDrums = () => { kick.steps(4, kickPattern); snare.steps(4, snarePattern); hihat.steps(4, hihatPattern); };
const playPad   = () => pad.play(padNotes);
const playOrgan = () => organ.play(padNotes);

// ============================================================
//  TEASER VISUALS — slide cards over the reactive shader.
//  Cards live in images/ (synced to OPFS via the claude-bridge;
//  gitignored). Text cards are transparent PNGs so the waves show
//  through; screenshots are opaque 16:9 panels. See docs/animations.md.
// ============================================================
// NOTE: do NOT await these. addImage registers { schedule: [] } synchronously
// (before its internal src-resolve await), so startVideo() works immediately.
// Awaiting here would stall the compile pump with an empty event queue while
// the OPFS image reads settle — which busy-spins and hangs the page.
addImage('t_title',    'images/t_title.png');
addImage('t_describe', 'images/t_describe.png');
addImage('s_organ',    'images/s_organ.jpg');
addImage('s_song',     'images/s_song.jpg');
addImage('t_composer', 'images/t_composer.png');
addImage('t_direct',   'images/t_direct.png');
addImage('s_github',   'images/s_github.jpg');
addImage('s_repo',     'images/s_repo.jpg');
addImage('t_wasm',     'images/t_wasm.png');
addImage('t_outro',    'images/t_outro.png');

// Concurrent cue track: absolute beats, NOT awaited so the music proceeds.
// Each startVideo supersedes the previous card; the renderer crossfades ~1.5s.
(async () => {
  const cue = async (beat, name) => { await waitForBeat(beat); startVideo(name); };
  await cue(0,   't_title');      // waves + title
  await cue(14,  't_describe');   // "just describe what you want"
  await cue(22,  's_organ');      // build the instrument in Faust
  await cue(38,  's_song');       // fold it into the arrangement
  await cue(52,  't_composer');   // you're still the composer
  await cue(62,  't_direct');     // arrange it, play it in, read the code
  await cue(72,  's_github');     // push to your own GitHub
  await cue(88,  's_repo');       // conversation saved in the repo
  await cue(100, 't_wasm');       // compiles to WebAssembly, runs live
  await cue(112, 't_outro');      // open source — come make something
})();

// 1) bass + lead only
playBass(); playLead();
await waitDuration(16);

// 2) same sequence + drums
playBass(); playLead(); playDrums();
await waitDuration(16);

createTrack(6).play([[0, controlchange(7,65)]]);

// 3) + organ (first pad section, played on the organ)
playBass(); playLead(); playDrums(); playOrgan();
await waitDuration(16);

createTrack(5).play([[ 12.57, ds6(0.42, 69) ],
[ 13.54, controlchange(64, 127) ],
[ 12.99, f6(0.92, 90) ],
[ 13.46, as6(0.56, 82) ],
[ 13.98, ds7(0.58, 83) ],
[ 14.51, d7(0.43, 74) ],
[ 14.91, as6(0.65, 77) ],
[ 15.87, controlchange(64, 0) ],
[ 15.51, c7(2.07, 83) ]].quantize(4));

// 4) organ again (second pad section)
playBass(); playLead(); playDrums(); playOrgan();
await waitDuration(16);

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
await waitDuration(16);
recBass(); recChords(); recPad();
await waitDuration(16);



// B) same + drums + lead  (x2)
recBass(); recChords(); recPad(); recDrums(); recLead();
await waitDuration(16);


recBass(); recChords(); recPad(); recDrums(); recLead();
await waitDuration(16);

                 
// ---- final section, made repeatable (1st pass without basslead, 2nd with) ----
const takeBass = () => createTrack(0).play([[ 0.03, f2(0.81, 72) ],
[ 1.09, f3(0.50, 98) ],
[ 2.39, f3(0.47, 90) ],
[ 3.0, f2(0.50, 89) ],
[ 3.5, f3(0.24, 87) ],
[ 4.0, c3(0.98, 83) ],
[ 4.94, c4(0.73, 94) ],
[ 6.41, c4(0.56, 77) ],
[ 6.98, c3(0.46, 93) ],
[ 7.48, c4(0.07, 77) ],
[ 7.97, ds2(0.99, 87) ],
[ 8.99, ds3(0.95, 92) ],
[ 10.49, ds3(0.51, 73) ],
[ 11.06, ds2(0.47, 94) ],
[ 11.48, ds3(0.27, 64) ],
[ 11.99, as2(0.61, 87) ],
[ 13.00, as2(1.04, 88) ],
[ 14.49, as3(0.49, 93) ]].quantize(4).fixVelocity(100));

const takeOrgan = () => {
  createTrack(6).play([[0, controlchange(7,50)]]);
  createTrack(6).play([[ 1.13, f5(0.81, 68) ],
[ 1.09, f7(0.85, 78) ],
[ 1.06, gs6(0.88, 88) ],
[ 1.10, c6(0.84, 67) ],
[ 1.10, gs5(0.85, 61) ],
[ 1.08, c7(0.88, 90) ],
[ 2.59, f5(0.60, 65) ],
[ 2.53, gs5(0.72, 69) ],
[ 2.59, c6(0.81, 67) ],
[ 2.55, gs6(0.89, 88) ],
[ 2.57, f7(0.92, 83) ],
[ 2.54, c7(0.95, 94) ],
[ 3.99, c5(1.03, 54) ],
[ 3.99, g6(1.06, 88) ],
[ 3.96, c7(1.10, 99) ],
[ 4.00, g5(1.07, 62) ],
[ 4.02, c6(1.06, 38) ],
[ 3.99, ds7(1.10, 84) ],
[ 5.59, c5(2.02, 59) ],
[ 5.55, c6(2.22, 62) ],
[ 5.55, g5(2.28, 67) ],
[ 5.52, c7(2.45, 94) ],
[ 5.55, g6(2.44, 84) ],
[ 5.52, ds7(2.48, 83) ],
[ 8.97, ds5(1.04, 48) ],
[ 9.03, g5(1.02, 69) ],
[ 9.00, as5(1.04, 52) ],
[ 9.00, g6(1.06, 89) ],
[ 8.97, ds7(1.10, 86) ],
[ 8.96, as6(1.14, 88) ],
[ 10.52, g5(0.69, 72) ],
[ 10.50, ds5(0.70, 54) ],
[ 10.52, g6(0.85, 87) ],
[ 10.50, as5(0.88, 68) ],
[ 10.50, ds7(0.88, 88) ],
[ 10.48, as6(0.98, 87) ],
[ 11.89, f6(0.65, 88) ],
[ 11.91, as4(0.62, 71) ],
[ 11.87, as6(0.68, 88) ],
[ 11.91, as5(0.66, 73) ],
[ 11.86, ds7(0.73, 82) ],
[ 12.93, as4(0.58, 73) ],
[ 12.87, as5(0.64, 77) ],
[ 12.93, f6(0.60, 79) ],
[ 12.90, d7(0.65, 87) ],
[ 12.86, as6(0.73, 66) ],
[ 13.99, c7(0.50, 90) ],
[ 13.97, as4(1.69, 77) ],
[ 13.96, as5(1.71, 83) ],
[ 14.00, f6(1.68, 87) ],
[ 14.00, as6(1.71, 83) ],
[ 14.43, d7(1.27, 83) ]].quantize(4));
};

const takeLead = () => createTrack(7).play([[ 1.02, c6(0.56, 82) ],
[ 1.55, ds6(1.11, 91) ],
[ 2.59, f6(1.38, 90) ],
[ 5.00, c6(0.54, 84) ],
[ 5.48, ds6(1.12, 82) ],
[ 6.52, f6(1.68, 83) ],
[ 9.01, c6(0.43, 77) ],
[ 9.47, ds6(1.10, 84) ],
[ 10.50, f6(0.53, 75) ],
[ 11.01, g6(0.98, 82) ],
[ 12.01, f6(0.88, 79) ],
[ 13.10, d6(0.70, 92) ],
[ 14.07, c6(0.35, 75) ],
[ 14.49, as5(1.49, 69) ]].quantize(4));


// 1st time — without basslead
takeBass(); takeOrgan(); recDrums();
await waitDuration(16);

// 2nd time — with basslead
takeBass(); takeOrgan(); takeLead(); recDrums();
await waitDuration(16);
loopHere();

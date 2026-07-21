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
  [ 2.97, as6(0.57, 80) ],
  [ 3.97, controlchange(64, 127) ],
  [ 3.52, g6(3.59, 80) ],
  [ 7.34, controlchange(64, 0) ],
  [ 7.11, as6(0.54, 80) ],
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

// alternative beat for the passes without the basslead:
// four-on-the-floor kick, backbeat snare, offbeat hats.
const altKickPattern  = [ c3,,,, ].repeat(16);     // kick on every beat
const altSnarePattern = [ ,,,,d3,,,, ].repeat(8);  // snare backbeat (beats 2 & 4)
const altHatPattern   = [ ,,fs3,, ].repeat(16);    // hats on the off-beat
const altDrums = () => {
  kick.steps(4, altKickPattern);
  hihat.steps(4, altHatPattern);   // no snare on the no-basslead passes
};

// basslead-section drums: same four-on-the-floor kick + offbeat hats,
// but with the snare on every second kick (backbeat).
const leadSnarePattern = [ ,,,,d3,,,, ].repeat(8);  // snare on every 2nd kick
const leadDrums = () => {
  kick.steps(4, altKickPattern);
  snare.steps(4, leadSnarePattern);
  hihat.steps(4, altHatPattern);
};

// Occasional ghost notes at ~1/4 velocity, placed just BEFORE a main hit as a
// pick-up. Spread out (not every beat) and staggered so the kick / hihat / bass
// ghosts never land at the same moment.
const altGhosts = (withSnare) => {
  // Per 4-beat bar (kicks on beats 1-4 = offsets 0-3):
  //   kick ghost  = pick-up just BEFORE the 3rd kick
  //   snare ghost = just AFTER  the 3rd kick
  //   hihat ghost = just AFTER  the 2nd and 4th kick
  // all at ~1/4 velocity, staggered so none coincide.
  const kickG = [], snareG = [], hatG = [];
  for (let b = 0; b < 16; b += 4) {
    kickG.push([b + 1.75, c3(0.10, 28)]);   // before 3rd kick (.75) (110/4)
    snareG.push([b + 2.25, d3(0.10, 45)]);  // after  3rd kick (.25) (100/4)
    hatG.push([b + 1.25, fs3(0.10, 18)]);   // after  2nd kick (.25) (70/4)
    hatG.push([b + 3.25, fs3(0.10, 18)]);   // after  4th kick (.25)
  }
  createTrack(2).play(kickG);
  if (withSnare) createTrack(3).play(snareG);  // snare ghost only with the main snare
  createTrack(4).play(hatG);
};

// snare drumroll over the last 2 beats — builds up into the basslead drop
const snareRoll = () => createTrack(3).play([
  [14.00, d3(0.24, 35)],
  [14.25, d3(0.24, 42)],
  [14.50, d3(0.24, 50)],
  [14.75, d3(0.24, 68)],
  [15.00, d3(0.12, 78)],
  [15.125, d3(0.12, 86)],
  [15.25, d3(0.12, 94)],
  [15.375, d3(0.12, 102)],
  [15.50, d3(0.12, 90)],
  [15.625, d3(0.12, 116)],
  [15.75, d3(0.12, 100)],
  [15.875, d3(0.12, 127)],
    [16.00, d3(1.00, 127)],

]);

// snare fill over the last 2 beats — closes the two basslead passes
const snareFill = () => createTrack(3).play([
  [13.75, d3(0.24, 40)],
  [14.00, d3(0.24, 105)],
  [14.50, d3(0.24, 80)],
  [14.75, d3(0.24, 108)],
  [15.00, d3(0.12, 112)],
  [15.25, d3(0.12, 100)],
  [15.50, d3(0.12, 118)],
  [15.75, d3(0.12, 90)]
  ]);


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

// same take but ending on g# instead of a# — used only for the last part (final repeat)
const takeBass2 = () => createTrack(0).play([[ 0.03, f2(0.81, 72) ],
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
[ 11.99, gs2(0.61, 87) ],
[ 13.00, gs2(1.04, 88) ],
[ 14.49, gs3(0.49, 93) ]].quantize(4).fixVelocity(100));

const takeOrgan = () => {
  createTrack(6).play([[0, controlchange(7,30)]]);
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

// second basslead pass: the last 3 notes rise (g6, a#6, c7) instead of falling
const takeLead2 = () => createTrack(7).play([[ 1.02, c6(0.56, 82) ],
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
[ 13.10, g6(0.70, 92) ],
[ 14.07, as6(0.35, 75) ],
[ 14.49, c7(1.49, 69) ]].quantize(4));

// basslead doubling the padsynth melody (same notes as recPad, no sustain CCs)
const takePadLead = () => createTrack(7).play([
  [ 2.97, as6(0.57, 89) ],
  [ 3.52, g6(3.59, 88) ],
  [ 7.11, as6(0.54, 97) ],
  [ 7.57, f6(3.43, 84) ],
  [ 10.99, ds6(0.49, 81) ],
  [ 11.54, c6(4.04, 74) ]].quantize(4));

// last-section variants: the final C is one octave up (c7)
const recPadHigh = () => pad.play([
  [ 2.97, as6(0.57, 80) ],
  [ 3.97, controlchange(64, 127) ],
  [ 3.52, g6(3.59, 88) ],
  [ 7.34, controlchange(64, 0) ],
  [ 7.11, as6(0.54, 80) ],
  [ 7.95, controlchange(64, 127) ],
  [ 7.57, f6(3.43, 80) ],
  [ 10.99, ds6(0.49, 81) ],
  [ 11.87, controlchange(64, 0) ],
  [ 13.48, controlchange(64, 127) ],
  [ 11.54, c7(4.04, 74) ],
  [ 15.93, controlchange(64, 0) ]].quantize(4));
const takePadLeadHigh = () => createTrack(7).play([
  [ 2.97, as6(0.57, 80) ],
  [ 3.52, g6(3.59, 80) ],
  [ 7.11, as6(0.54, 80) ],
  [ 7.57, f6(3.43, 80) ],
  [ 10.99, ds6(0.49, 81) ],
  [ 11.54, c7(4.04, 74) ]].quantize(4));

// the C pick-up that leads into the opening A# (missing on the repeats) —
// on both the padsynth (ch5) and the basslead (ch7).
const padLeadInC = () => {
  pad.play([[ 0, c7(3.0, 78) ]]);
  createTrack(7).play([[ 0, c7(3.0, 78) ]]);
};

// steady 8th-note kick for the appended pad part:
// full kick on every 8th, but the LAST 8th of each bar is a ghost;
// the final bar adds an extra kick on the 4th beat (its last 16th).
const padKick = () => {
  const k = [];
  for (let b = 0; b < 16; b += 4) {   // 4 bars — a kick every 2 beats (half the usual density)
    k.push([b,     c3(0.14, 110)]);   // beat 1 (full)
    k.push([b + 2, c3(0.14, 28)]);    // beat 3 (ghost = last kick of the bar)
  }
  k.push([15, c3(0.14, 110)]);        // final bar: extra kick on the 4th beat
  createTrack(2).play(k);
};

// fuller beat for the last two pad repeats:
// kick + hihat on every beat, snare on every second beat.
const padHatEveryBeat = [ fs3,,,, ].repeat(16);   // hat on every beat
const padDrumsFull = () => {
  kick.steps(4, altKickPattern);      // kick on every beat
  hihat.steps(4, padHatEveryBeat);    // hihat on every beat
  snare.steps(4, leadSnarePattern);   // snare on every 2nd beat
};

// last pad round: double the kick density (8th notes), hihat on each kick, and a
// snare crescendo (every 8th) rising from almost nothing up to full velocity.
const padKickEighths = [ c3,,c3,, ].repeat(16);
const padHatEighths  = [ fs3,,fs3,, ].repeat(16);
const padDrumsBuild = () => {
  kick.steps(4, padKickEighths);
  hihat.steps(4, padHatEighths);
  const hits = [];
  for (let beat = 0; beat < 16; beat++) { hits.push(beat); hits.push(beat + 0.5); }
  const s = [];
  const n = hits.length;
  hits.forEach((pos, i) => {
    const vel = Math.round(4 + 116 * (i / (n - 1)));  // ~4 -> 120: gradual crescendo
    s.push([pos, d3(0.12, vel)]);
  });
  createTrack(3).play(s);
};

// per-beat filter sweep for the organ chord-doubling: full open on the beat, half between
const organFilterBeat = () => {
  const f = [];
  for (let b = 0; b < 16; b++) {
    f.push([b, controlchange(0, 127)]);       // full open on the beat
    f.push([b + 0.5, controlchange(0, 10)]);  // half open between
  }
  createTrack(6).play(f);
};

// organ doubling the lead/pad melody (same notes, incl. the C lead-in) for the final repeat
const padOrgan = () => {
  organ.play([[ 0, controlchange(7, 60) ]]);
  organ.play([
    [ 0, c7(3.0, 78) ],
    [ 2.97, as6(0.57, 89) ],
    [ 3.52, g6(3.59, 88) ],
    [ 7.11, as6(0.54, 97) ],
    [ 7.57, f6(3.43, 84) ],
    [ 10.99, ds6(0.49, 81) ],
    [ 11.54, c6(4.04, 74) ]].quantize(4));
  // organ also doubles the chords
  organ.play([
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
};

// same as padOrgan but the final melody C is one octave up (c7) — very last repeat only
const padOrganHigh = () => {
  organ.play([[ 0, controlchange(7, 85) ]]);
  organ.play([
    [ 0, c7(3.0, 78) ],
    [ 2.97, as6(0.57, 89) ],
    [ 3.52, g6(3.59, 88) ],
    [ 7.11, as6(0.54, 97) ],
    [ 7.57, f6(3.43, 84) ],
    [ 10.99, ds6(0.49, 81) ],
    [ 11.54, c7(4.04, 74) ]].quantize(4));
  organ.play([
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
};


// twice — without basslead

 
takeBass(); takeOrgan(); altDrums(); altGhosts(false);
await waitDuration(16);
takeBass(); takeOrgan(); altDrums(); altGhosts(false); snareRoll();
await waitDuration(16);

// twice — with basslead (snare on every 2nd kick); fill closes the 2nd
takeBass(); takeOrgan(); takeLead(); leadDrums(); altGhosts(true);
await waitDuration(16);
takeBass(); takeOrgan(); takeLead2(); leadDrums(); altGhosts(true); snareFill();
await waitDuration(16);

// appended padsynth part (bass + chords + pad) — basslead doubles the pad melody.
// x2 with the sparse half-note kick...
recBass(); recChords(); recPad(); takePadLead(); padLeadInC(); padKick();
await waitDuration(16);
recBass(); recChords(); recPad(); takePadLead(); padLeadInC(); padKick();
await waitDuration(16);

// ...then x2 with a fuller beat: kick + hihat on every beat, snare on every 2nd beat.
recBass(); recChords(); recPad(); takePadLead(); padLeadInC(); padDrumsFull();
await waitDuration(16);
// bass (bassline + chords, ch0) alternates its volume on the 8th grid, matching the kick
const bassVolBeat = () => {
  const v = [];
  const steps = 32;                              // 32 eighth-positions over 16 beats
  for (let i = 0; i < steps; i++) {
    const b = i * 0.5;
    const dip = Math.round(100 - 55 * (i / (steps - 1)));  // 100 (barely) -> 45 (full diff)
    v.push([b, controlchange(7, 100)]);          // full on the 8th
    v.push([b + 0.25, controlchange(7, dip)]);   // dip deepens over time
  }
  v.push([15.99, controlchange(7, 100)]);      // reset to full for the next part
  createTrack(0).play(v);
};

// last round: double kick density (8ths) with snare + hihat on each kick, snare roll at the end.
recBass(); recChords(); recPad(); takePadLead(); padLeadInC(); padDrumsBuild(); bassVolBeat(); snareRoll();
await waitDuration(16);

// final repeat: organ also doubles the lead melody; alternate beat + ghost hits
// (kick/hihat/snare); bass keeps the chords but the low note uses the takeBass style.
recChords(); takeBass2(); recPad(); takePadLead(); padOrgan(); organFilterBeat(); padLeadInC(); leadDrums(); altGhosts(true);
await waitDuration(16);

recChords(); takeBass2(); recPadHigh(); takePadLeadHigh(); padOrganHigh(); organFilterBeat(); padLeadInC(); leadDrums(); altGhosts(true); snareFill();
await waitDuration(16);

// ============================================================
//  WRAP-UP: back to the intro (bass + melody) with matching organ chords and
//  the end drum beat; x2, then out on just a kick and a hihat.
// ============================================================
// organ chords matching the intro progression (bass roots f, g, g#, a#)
const wrapOrganChords = () => {
  organ.play([[ 0, controlchange(7, 70) ]]);
  organ.play([
    [ 0,  f5(3.99, 80) ], [ 0,  gs5(3.99, 74) ], [ 0,  c6(3.99, 78) ],   // Fm
    [ 4,  g5(3.99, 80) ], [ 4,  as5(3.99, 74) ], [ 4,  ds6(3.99, 78) ],  // D#/Eb major, G in bass
    [ 8,  gs5(3.99, 80) ], [ 8, c6(3.99, 74) ],  [ 8,  ds6(3.99, 78) ],  // Ab
    [ 12, as5(3.99, 80) ], [ 12, d6(3.99, 74) ], [ 12, f6(3.99, 78) ]]); // Bb
};
// double the intro melody with the basslead (ch7)
const wrapBassLead = () => createTrack(7).play(padNotes);
// the recorded bass, quantized to a 1/2-beat step grid: root, root, +oct, root,
// rest, root, +oct, root — walking F, G, G#, A#. Used for both wrap-up rounds.
const wrapBassPattern = [
  f2,f2,f3,f2,,f2,f3,f2,
  g2,g2,g3,g2,,g2,g3,g2,
  gs2,gs2,gs3,gs2,,gs2,gs3,gs2,
  as2,as2,as3,as2,,as2,as3,,
];
const wrapBass = () => bass.steps(2, wrapBassPattern);
// organ plays the intro melody (instead of the basslead)
const wrapOrgan = () => {
  organ.play([[ 0, controlchange(7, 75) ], [ 0, controlchange(0, 127) ]]);  // reset cutoff open
  organ.play(padNotes);
};
// the padsynth ending flourish (7 notes) from the intro — played at the end of each round
const padEnding = () => pad.play([
  [ 12.57, ds6(0.42, 69) ],
  [ 13.54, controlchange(64, 127) ],
  [ 12.99, f6(0.92, 90) ],
  [ 13.46, as6(0.56, 82) ],
  [ 13.98, ds7(0.58, 83) ],
  [ 14.51, d7(0.43, 74) ],
  [ 14.91, as6(0.65, 77) ],
  [ 15.87, controlchange(64, 0) ],
  [ 15.51, c7(2.07, 83) ]].quantize(4));
// outro: a single kick + hihat hit (not a rhythm)
const outroKickHat = () => {
  createTrack(2).play([[ 0, c3(1.0, 110) ]]);   // fresh track -> lands at the current global beat
  createTrack(4).play([[ 0, fs3(1.0, 70) ]]);   // (the reused kick/hihat cursors have drifted)
};


const upliftpads = () => createTrack(7).play([
  [ 0.0, as6(0.49, 72) ],
  [ 0.48, as6(0.49, 72) ],
[ 0.99, ds7(0.38, 87) ],
[ 1.45, as6(0.41, 76) ],
[ 1.99, ds7(0.47, 83) ],
[ 2.44, as6(0.41, 71) ],
[ 2.97, f7(0.56, 72) ],
[ 3.47, ds7(0.53, 84) ],
[ 3.94, as6(0.28, 77) ],
[ 4.49, as6(0.45, 64) ],
[ 5.01, ds7(0.45, 82) ],
[ 5.50, as6(0.34, 69) ],
[ 6.00, ds7(0.47, 83) ],
[ 6.48, as6(0.45, 61) ],
[ 7.02, f7(0.50, 78) ],
[ 7.52, ds7(0.54, 73) ],
[ 8.02, as6(0.27, 77) ],
[ 8.52, as6(0.43, 66) ],
[ 9.00, ds7(0.50, 83) ],
[ 9.51, as6(0.24, 58) ],
[ 9.97, ds7(0.53, 78) ],
[ 10.47, as6(0.39, 66) ],
[ 10.99, f7(0.49, 69) ],
[ 11.47, ds7(0.56, 69) ],
[ 12.02, as6(0.22, 78) ],
[ 12.50, as6(0.41, 61) ],
[ 12.99, ds7(0.50, 78) ],
[ 13.48, as6(0.42, 57) ],
[ 14.02, gs7(0.60, 91) ],
[ 14.54, g7(0.51, 77) ],
[ 15.02, f7(0.57, 78) ],
[ 15.51, ds7(0.57, 81) ],
[ 16.05, as6(0.22, 81) ],
[ 16.49, as6(0.46, 69) ],
[ 16.97, ds7(0.46, 81) ],
[ 17.45, as6(0.37, 72) ],
[ 17.98, ds7(0.46, 76) ],
[ 18.44, as6(0.47, 66) ],
[ 18.98, f7(0.51, 72) ],
[ 19.47, ds7(0.56, 82) ],
[ 19.98, as6(0.24, 78) ],
[ 20.45, as6(0.45, 68) ],
[ 20.98, ds7(0.46, 78) ],
[ 21.47, as6(0.37, 71) ],
[ 22.00, ds7(0.50, 82) ],
[ 22.47, as6(0.43, 71) ],
[ 22.97, f7(0.51, 74) ],
[ 23.46, ds7(0.57, 73) ],
[ 23.96, as6(0.30, 73) ],
[ 24.52, as6(0.49, 69) ],
[ 25.02, ds7(0.47, 78) ],
[ 25.51, as6(0.30, 71) ],
[ 25.97, ds7(0.51, 77) ],
[ 26.46, as6(0.39, 59) ],
[ 26.97, f7(0.56, 75) ],
[ 27.46, ds7(0.57, 86) ],
[ 28.01, as6(0.24, 83) ],
[ 28.47, as6(0.43, 68) ],
[ 28.97, ds7(0.53, 78) ],
[ 29.48, as6(0.41, 66) ],
[ 29.96, gs7(0.68, 88) ],
[ 30.48, g7(0.64, 74) ],
[ 31.03, f7(0.53, 75) ]].quantize(4));

upliftpads(); wrapBass(); playLead(); wrapOrgan(); padEnding(); leadDrums(); altGhosts(true);
await waitDuration(16);
wrapBass(); playLead(); wrapOrgan(); padEnding();  leadDrums(); altGhosts(true);
await waitDuration(16);

createTrack(0).play([[ 1.07, gs5(0.88, 81) ],
[ 1.05, as5(0.91, 88) ],
[ 1.05, ds6(0.92, 82) ],
[ 2.46, gs5(1.16, 88) ],
[ 2.46, ds6(1.16, 86) ],
[ 2.44, as5(1.21, 88) ],
[ 3.98, as5(1.18, 76) ],
[ 4.02, g5(1.15, 92) ],
[ 4.01, ds6(1.18, 88) ],
[ 5.62, g5(1.02, 87) ],
[ 5.61, ds6(1.04, 77) ],
[ 5.59, as5(1.07, 83) ],
[ 6.97, g5(1.07, 74) ],
[ 6.97, ds6(1.08, 76) ],
[ 6.95, as5(1.12, 72) ],
[ 9.03, gs5(1.10, 84) ],
[ 9.03, ds6(1.11, 88) ],
[ 9.01, as5(1.15, 94) ],
[ 10.58, gs5(0.95, 87) ],
[ 10.58, ds6(0.98, 88) ],
[ 10.55, as5(1.04, 96) ],
[ 12.05, f5(0.57, 89) ],
[ 12.04, as5(0.62, 91) ],
[ 12.04, ds6(0.68, 86) ],
[ 13.00, f5(0.58, 92) ],
[ 12.99, d6(0.61, 87) ],
[ 12.97, as5(0.65, 81) ],
[ 14.00, f5(0.30, 94) ],
[ 13.99, c6(0.35, 84) ],
[ 13.98, as5(0.37, 77) ],
[ 14.50, f5(1.18, 84) ],
[ 14.52, d6(1.25, 87) ],
[ 14.55, as5(1.23, 94) ],
[ 16.98, gs5(1.00, 83) ],
[ 16.96, as5(1.03, 93) ],
[ 16.98, ds6(1.04, 82) ],
[ 18.57, gs5(1.10, 81) ],
[ 18.57, ds6(1.11, 78) ],
[ 18.54, as5(1.14, 73) ],
[ 20.09, ds6(1.15, 84) ],
[ 20.11, g5(1.14, 94) ],
[ 20.10, as5(1.15, 93) ],
[ 21.60, g5(1.04, 82) ],
[ 21.59, ds6(1.06, 88) ],
[ 21.58, as5(1.08, 83) ],
[ 23.08, g5(0.93, 92) ],
[ 23.05, ds6(1.00, 82) ],
[ 23.07, as5(1.00, 93) ],
[ 24.96, ds6(1.11, 88) ],
[ 24.98, gs5(1.12, 83) ],
[ 24.93, as5(1.23, 98) ],
[ 26.52, ds6(0.68, 87) ],
[ 26.49, as5(0.70, 78) ],
[ 26.52, gs5(0.70, 88) ],
[ 28.06, g6(0.64, 90) ],
[ 28.08, as5(0.62, 97) ],
[ 28.05, ds6(0.76, 91) ],
[ 29.03, as5(1.02, 97) ],
[ 29.04, f6(1.03, 94) ],
[ 29.01, ds6(1.07, 94) ],
[ 30.54, as5(1.54, 97) ],
[ 30.53, d6(1.56, 94) ],
[ 30.56, f6(1.54, 89) ]].quantize(4));

// Two more times
upliftpads(); wrapBass(); playLead(); wrapOrgan(); padEnding();  leadDrums(); altGhosts(true);
await waitDuration(16);

wrapBass(); playLead(); wrapOrgan(); padEnding();  leadDrums(); altGhosts(true);
await waitDuration(16);


// ends with just a kick and a hihat
outroKickHat();
createTrack(0).play([[ 1.07, gs5(0.84, 72) ],
[ 1.04, ds5(0.89, 72) ],
[ 1.04, gs4(0.92, 71) ],
[ 1.10, f3(0.91, 83) ],
[ 2.55, gs4(0.81, 71) ],
[ 2.57, ds5(0.81, 64) ],
[ 2.55, gs5(0.88, 68) ],
[ 2.61, f3(0.89, 75) ],
[ 4.09, g3(0.79, 69) ],
[ 4.09, as5(0.80, 72) ],
[ 4.08, ds5(0.84, 72) ],
[ 4.10, as4(0.84, 69) ],
[ 5.53, ds5(0.68, 64) ],
[ 5.53, as4(0.69, 72) ],
[ 5.50, as5(0.72, 78) ],
[ 5.53, g3(0.74, 75) ],
[ 6.99, as4(7.04, 72) ],
[ 7.02, gs3(7.04, 64) ],
[ 7.02, ds5(7.06, 76) ]].quantize(4));

createTrack(7).play([
[ 0.5, as5(0.70, 68) ],
[ 1.0, ds6(0.45, 44) ],
[ 1.5, gs6(0.49, 81) ],
[ 2.0, g6(0.45, 69) ],
[ 2.5, f6(0.45, 63) ],

[ 3.0, ds6(0.54, 52) ],

[ 3.5, as6(0.99, 82) ],
[ 4.5, gs6(0.74, 63) ],
[ 5.5, g6(0.93, 70) ],
[ 6.5, gs6(0.43, 59) ],
[ 7.0, as6(0.53, 78) ],
[ 7.5, ds6(2.02, 56) ],
[ 9.50, as5(2.0, 61) ],
[ 11.5, ds5(2.75, 55) ],
[ 15.37, controlchange(64, 0) ]].quantize(4));


await waitDuration(16);

// 4 beats of silence at the end
await waitDuration(4);
loopHere();


# WebAssembly Music — an agentic composition

A single song made with **[WebAssembly Music](https://github.com/petersalomonsen/javascriptmusic)** —
a browser DAW where the notes, the arrangement, the synth instruments (written
in the [Faust](https://faust.grame.fr/) DSP language) and the reactive visuals
are all *code* that compiles to WebAssembly and runs live in the page.

This track was built by talking to an in-browser AI agent. The whole story —
with screenshots of the agent authoring instruments, editing the arrangement and
pushing to GitHub — is in the article:

📖 **[Agentic Composition](https://github.com/petersalomonsen/javascriptmusic/blob/master/wasmaudioworklet/docs/agenticcomposition.md)**

> **But make no mistake — the human is still the composer.** This isn't Suno or a
> diffusion model that hands back an opaque blob of audio. Every part is directed:
> the arrangement, patterns played in on a MIDI keyboard, and code read and edited
> by hand where it matters. The AI writes and reorganises code on instruction — it
> doesn't compose *for* you.

## ▶ Play & edit it live

Open it straight in the app — it clones this repo, compiles, and plays entirely
in your browser:

**[▶ Open this song in WebAssembly Music](https://webassemblymusic.pages.dev/?gitrepo=july26song&remote=https://git-cors-proxy.webassemblymusic.pages.dev/gitproxy/github.com/petersalomonsen/wasm-music-2026.git)**

## What's in here

| file | what it is |
| --- | --- |
| `song.js` | the sequence — notes, arrangement, and the teaser slide cues |
| `synth.ts` | the synth: the instruments combined in AssemblyScript |
| `faust/` | the instruments themselves, in the Faust DSP language |
| `shader.glsl` | the music-reactive visualizer (and the slide compositing) |
| `images/` | the teaser slide cards |
| `studioagent-session.json` | the AI conversation that built it — it travels with the repo |

## License

[GPL-3.0](LICENSE), matching the WebAssembly Music project.

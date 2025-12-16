# v0.1.0 — Ascension Anthem + Suite Ceremonies

This release checkpoints the musical-cinematic layer: a five-part Ascension Anthem, an 18-movement Symphonic Suite replay, a master Infinity Prestige Cycle ceremony, and supporting soundscape mappings and CLI scripts.

## Highlights
- Ceremonies:
  - `configs/ceremonies/ascension_anthem.json` — 5-part anthem sequence (dialogue, music, overlays; broadcast on Horizon).
  - `configs/ceremonies/symphonic_suite_replay.json` — 18 movements mirroring the prestige cycle with music cues.
  - `configs/ceremonies/infinity_prestige_cycle.json` — Master, chained 18-stage cycle.
- Soundscape & Program:
  - `configs/audio/soundscape_map.json` — Anthem sections, motifs, instrumentation, movement cue map.
  - `docs/SYMPHONIC_SUITE_PROGRAM.md` — Program notes: anthem structure, suite outline, cover-art concepts, run tips.
- Windows CLI Scripts:
  - `scripts/infinity_prestige_cycle.ps1` — Interactive narration of the 18-stage cycle.
  - `scripts/ascension_anthem.ps1` — Interactive 5-section anthem walkthrough (press Enter to advance).

## Try It (Windows PowerShell)
```powershell
# Run the 18-stage Infinity Prestige Cycle CLI walkthrough
powershell -ExecutionPolicy Bypass -File \\?\c:\Users\Brian\OneDrive\Desktop\soulvan-racing-main\scripts\infinity_prestige_cycle.ps1

# Run the 5-section Ascension Anthem CLI walkthrough
powershell -ExecutionPolicy Bypass -File \\?\c:\Users\Brian\OneDrive\Desktop\soulvan-racing-main\scripts\ascension_anthem.ps1
```

## Unity Integration Notes
- Ceremonies live under `configs/ceremonies/`. Load and run via your `CeremonyManager`/ceremony runner.
- Music cues use `trackKey`/`context` per `CinematicMusicManager`. Map keys per `configs/audio/soundscape_map.json`.
- No C# API changes required; existing handlers and fallbacks remain compatible.

## Compatibility
- Breaking changes: None expected.
- C# build: No new engine-side code in this tag; compile state unaffected by these assets.

## What’s Next
- Optional: Auto-wire CLI steps to trigger ceremony runners and music cues.
- Optional: Consolidate README quick-start for master cycle + anthem replay.

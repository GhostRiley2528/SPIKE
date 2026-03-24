# SPIKE! Volleyball - Multiplayer

A browser volleyball game with local play, AI play, and online multiplayer.

## Setup

1. Install Node.js LTS from `https://nodejs.org`
2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm start
```

4. Open `http://localhost:3000`

## Modes

- Online Multiplayer: play with a friend via a room code
- vs AI: single-player match against the computer
- 1v1 Local: two players on the same keyboard

## Controls

- Move: `A / D`
- Jump: `Space`
- Serve: `F`
- Bump: hold `E`
- Set: hold `Q`
- Spike: click while airborne
- Tip: hold `T`
- Block: hold `R`

## AI Training Dataset

In `vs AI` mode, every scored point is recorded as structured gameplay data.

The data is stored in two places:
- locally in the browser for quick export/debugging
- centrally in Firebase Realtime Database at `training/pointClips/YYYY-MM-DD/...`

This is training data, not MP4 video.

Each uploaded point contains:
- metadata: timestamp, difficulty, theme, source app, page origin
- outcome: scorer, winner, loser, rally hit count, last hitter
- frames: sampled ball and player state across the rally
- events: serve and hit actions with frame indexes
- derivedTargets: first-pass supervised labels for later training, including `aiShotChoice`

The current in-game AI memory also ignores unforced points where the scorer did not create the final winning action. That prevents the local learner from treating obvious drops/errors as a good strategy.

## Shot Policy Training

The repo now includes a first-pass offline trainer:

```bash
npm run train:shot-policy -- path/to/exported-dataset.json ai-shot-policy.json
```

It reads the exported dataset from `admin.html`, trains a simple lookup policy for AI shot choice, and writes [ai-shot-policy.json](/C:/Users/arnav/Downloads/volleyball-mp%20(1)/volleyball-mp/ai-shot-policy.json).

When the game loads, [index.html](/C:/Users/arnav/Downloads/volleyball-mp%20(1)/volleyball-mp/index.html) automatically fetches `ai-shot-policy.json`. If the file contains trained samples, the AI uses that policy for shot selection in `vs AI`; otherwise it falls back to the built-in rule logic.

## GitHub Pages Behavior

If the game is deployed on GitHub Pages and Firebase is configured correctly, the shared dataset is updated automatically after every point scored in `vs AI` mode.

## Admin-Only Dataset Access

The intended access model is:
- public clients can write training clips
- public clients cannot read training clips
- admin reads and exports happen from [admin.html](/C:/Users/arnav/Downloads/volleyball-mp%20(1)/volleyball-mp/admin.html) or from Firebase Console/private scripts

Apply the rules in [firebase.database.rules.json](/C:/Users/arnav/Downloads/volleyball-mp%20(1)/volleyball-mp/firebase.database.rules.json).

Before the admin page works, replace `REPLACE_WITH_YOUR_FIREBASE_UID` in:
- [admin.html](/C:/Users/arnav/Downloads/volleyball-mp%20(1)/volleyball-mp/admin.html)
- [firebase.database.rules.json](/C:/Users/arnav/Downloads/volleyball-mp%20(1)/volleyball-mp/firebase.database.rules.json)

Then create or use a Firebase Auth email/password account for yourself and sign in through `admin.html`.

Do not place admin credentials in the client or in GitHub Pages.

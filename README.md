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

## GitHub Pages Behavior

If the game is deployed on GitHub Pages and Firebase is configured correctly, the shared dataset is updated automatically after every point scored in `vs AI` mode.

## Admin-Only Dataset Access

The intended access model is:
- public clients can write training clips
- public clients cannot read training clips
- admin reads and exports happen from Firebase Console or a private server/admin script

Apply the rules in [firebase.database.rules.json](/C:/Users/arnav/Downloads/volleyball-mp%20(1)/volleyball-mp/firebase.database.rules.json).

Do not place admin credentials in the client or in GitHub Pages.

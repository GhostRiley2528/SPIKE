# 🏐 SPIKE! Volleyball — Multiplayer

A full beach volleyball game with online multiplayer via lobby codes.

---

## Setup (takes ~1 minute)

### 1. Install Node.js
Download from https://nodejs.org (choose the LTS version)

### 2. Install dependencies
Open a terminal in this folder and run:
```
npm install
```

### 3. Start the server
```
npm start
```
You'll see:
```
  🏐 SPIKE! Volleyball Server
  ─────────────────────────────
  Local:   http://localhost:3000
```

### 4. Open the game
- Open **http://localhost:3000** in your browser

---

## Playing with a friend on the same Wi-Fi

1. Find your local IP address:
   - **Mac/Linux:** run `ifconfig` in terminal, look for `192.168.x.x`
   - **Windows:** run `ipconfig`, look for `IPv4 Address`

2. Tell your friend to open `http://YOUR_IP:3000` in their browser

3. One person clicks **"Online Multiplayer" → "Create Room"** — share the 4-letter code

4. Friend clicks **"Online Multiplayer" → "Join Room"** and enters the code

5. Game starts automatically!

---

## Controls

| Action     | Player 1     | Player 2     |
|------------|-------------|-------------|
| Move       | A / D        | ← / →        |
| Jump       | Space        | ↑            |
| Serve      | F            | Enter        |

## Hit System (like real volleyball!)

| Hit   | Touch | What it does                    |
|-------|-------|---------------------------------|
| Bump  | 1st   | Soft upward pass                |
| Set   | 2nd   | Precise toss toward net         |
| Spike | 3rd   | Powerful smash over the net     |

- Max **3 hits per side**
- 4th hit on same side = **fault** (other team gets point)
- First to **7 points** wins a set — best of **3 sets** wins

---

## Modes
- 🌐 **Online Multiplayer** — play with a friend via lobby code
- 🤖 **vs AI** — single player against the computer
- 👥 **1v1 Local** — two players on the same keyboard

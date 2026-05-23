# Game Studio Launcher – System Plan

## Overview

This project is a desktop game launcher ecosystem that will serve as the central hub for all current and future games developed in the studio. It supports authentication, game installation, patching, rewards, and cross-game identity management.

The launcher is designed to work alongside platforms like Steam while maintaining an independent studio ecosystem.

---

## Core Vision

- One unified account system for all games
- Multiple independent games under one launcher
- Cross-game rewards and achievements
- Secure authentication and identity system
- Fast and lightweight desktop launcher application
- Scalable backend for future MMORPG systems

---

## Tech Stack

### Launcher Client
- React + Vite (UI)
- Tauri (desktop wrapper)

### Backend API
- FastAPI (Python)
  - game catalog
  - patch/version system
  - reward system API
  - launcher logic endpoints

### Authentication & Platform Database
- Supabase
  - user accounts
  - login/session handling
  - global user ID
  - cross-game rewards
  - achievements

### Game File Hosting / CDN
- Cloudflare R2
  - game builds
  - patch files
  - asset delivery

### Code Repository
- GitHub
  - source control
  - portfolio documentation
  - version tracking

---

## System Architecture

```
Launcher (Tauri + React)
        ↓
FastAPI Backend
        ↓
Supabase (Auth + Identity + Rewards)
        ↓
Cloudflare R2 (Game Files / Patches)
```

---

## Core Features

### 1. Authentication System
- User sign-up and login
- Session token management
- Global user ID system (cross-game identity)

### 2. Game Library
- List available games
- Install / uninstall games
- Launch installed games

### 3. Patch & Update System
- Version checking
- File manifest comparison
- Incremental updates (future goal)
- Auto-update support

### 4. Reward System (Cross-Game)
- Track player achievements across games
- Grant global rewards (titles, cosmetics, vouchers)
- Sync rewards between games via user ID

### 5. Community Features (Future Phase)
- News feed
- Announcements
- Player profiles
- Friend system (optional expansion)

---

## Data Design Concept

### Platform Layer (Supabase)
- `users` (auth)
- `profiles`
- `rewards`
- `achievements`
- `cross_game_entitlements`

### Game Layer (Isolated per game)

**MMORPG:**
- characters
- inventory
- world state

**RPG:**
- save files
- story progression
- choices

Each game maintains its own database while referencing the same global user ID from Supabase.

---

## Key Design Principles

- Identity is centralized (Supabase)
- Game data is isolated per title
- Launcher acts as ecosystem gateway
- Fast iteration over premature scaling
- Modular architecture for future expansion

---

## Future Expansion Goals

- MMORPG integration with persistent world servers
- Cross-game cosmetic systems
- Seasonal events and global rewards
- Dedicated launcher updates system (patcher v2)
- Possible multiplayer social hub inside launcher

---

## Development Philosophy

- Build small systems first, not full MMO infrastructure
- Prioritize shipping playable games early
- Iterate launcher alongside real game development
- Avoid overengineering early backend scaling

# Changelog

All notable changes to Rebbit Hole will be documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

## [23/05/2026]

### Added

- Initial project scaffolding and monorepo structure (`launcher/`, `backend/`, `docs/`)
- README, .gitignore, and system plan documentation
- Tauri + React + Vite launcher shell (`launcher/`)
- Confirmed desktop window renders correctly via `npx tauri dev`
- FastAPI backend stub with health endpoint (`backend/`)
- Environment variable template (`backend/.env.example`)
- Verify FastAPI running with health and docs endpoints

## [21/10/2026]

- Resolved Tauri compilation on 4GB RAM via paging file tuning and jobs = 1
- Confirmed Tauri desktop window launches successfully
- Verified Supabase client connects from within the desktop app

## [22/10/2026]

- Added cottagecore theme system via theme.css
- Built AuthForm, Login, and SignUp components
- Wired Supabase auth into App.tsx with session handling
- Confirmed sign up, email confirmation, and login all working

- Added retractable sidebar with Library, Rewards, Ranks, Activity, News, Forums, Settings nav
- Built GameCard, GameDetail, and Library page components
- Added Placeholder page for unbuilt sections
- Cottagecore theme applied across full launcher layout
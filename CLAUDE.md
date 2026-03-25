# CLAUDE.md — In-Vehicle-UI

## Project Overview

This repository contains **UI/UX design mockups** for a teen driver monitoring and in-vehicle management application. It is a design-asset repository — there is no application source code, build system, or runtime.

The application concept targets **iOS** and provides parents/guardians with tools to monitor and manage teen driver behavior, including speed limits, geofence boundaries, curfews, volume controls, passenger limits, and fuel alerts.

## Repository Structure

```
In-Vehicle-UI/
├── CLAUDE.md                  # This file
├── README.md                  # Project title only
├── 01A–01C-Home-*.png         # Home / Teen Driver Status screens (3 variants)
├── 02-MyFamily-Account-Home.png
├── 03-Teen-Driver-Active-Settings.png
├── 04-Teen-Driver-Settings-Menu.png
├── 05-Teen-Driving-Latest-Report.png
├── 06-Teen-Driving-Reports-Index.png
├── 07-Teen-Driving-Logged-Report.png
├── 08-Transparency-Ledger-Log.png
├── 09-Transparency-Ledger-Current.png
├── 01_FEATURE_Speed-Limiting_*.png   # Speed Limiting feature (6 screens)
├── 02_FEATURE_Boundary-Limits_*.png  # Boundary/Geofence feature (5 screens)
├── 03_FEATURE_Curfew-Limits_*.png    # Curfew Limits feature (6 screens)
├── 04_FEATURE_Volume-Limits_*.png    # Volume Limits feature (4 screens)
├── 05_FEATURE_Passenger-Limit_*.png  # Passenger Limits feature (4 screens)
├── 06_FEATURE_Low-Fuel-Alerts_*.png  # Low Fuel Alerts feature (4 screens)
├── App-slide-out-Navigation-Menu_*.png  # Navigation menu (4 variants)
└── PUSH-01–06_iOS-Push_*.png         # iOS push notification mockups (6 alerts)
```

**Total assets:** ~50 PNG mockup images.

## Design Features

| # | Feature | Screens | Description |
|---|---------|---------|-------------|
| 1 | Speed Limiting | 6 | Configure and monitor speed limits for teen drivers |
| 2 | Boundary Limits | 5 | Geofence/boundary alerts when driver leaves allowed area |
| 3 | Curfew Limits | 6 | Time-based driving restrictions |
| 4 | Volume Limits | 4 | Audio volume control restrictions |
| 5 | Passenger Limits | 4 | Maximum passenger count enforcement |
| 6 | Low Fuel Alerts | 4 | Fuel level monitoring and notifications |

### Additional Screens
- **Home / Status** — Teen driver status with optional messages (3 variants)
- **MyFamily Account Home** — Family account management
- **Teen Driver Settings** — Active settings and settings menu
- **Driving Reports** — Latest report, report index, logged report
- **Transparency Ledger** — Activity log and current state
- **Navigation Menu** — Slide-out app navigation (4 variants)
- **Push Notifications** — iOS push alerts for speed, curfew, boundary, passenger limit, low fuel, and volume override

## File Naming Conventions

- **Core screens:** `NN-ScreenName.png` (e.g., `02-MyFamily-Account-Home.png`)
- **Feature flows:** `NN_FEATURE - Feature Name_NN.png` (e.g., `01_FEATURE _ Speed Limitiing_01.png`)
- **Push notifications:** `PUSH-NN · iOS Push — Alert Type.png`
- **Navigation:** `App slide-out Navigation Menu_NNN.png`

Note: Some filenames contain spaces and special characters (middot `·`, em-dash `—`). Use proper quoting when referencing them in shell commands.

## Tech Stack

**None** — This is a design-only repository. There are no:
- Programming languages or frameworks
- Package managers or dependency files
- Build tools or CI/CD pipelines
- Test suites
- Configuration files (beyond Git)

## Git Conventions

- **Default branch:** `main`
- **Commit style:** Short, descriptive messages (e.g., "Add files via upload")
- All design assets live at the repository root (no subdirectories)

## Guidelines for AI Assistants

1. **This is a design repository.** Do not attempt to scaffold application code, install dependencies, or create build configurations unless explicitly asked.
2. **File references require quoting.** Many filenames contain spaces and special characters — always quote paths in shell commands.
3. **Image analysis is the primary task.** When asked about the UI, read the PNG files directly to analyze the designs.
4. **Preserve the naming scheme.** When adding new mockups, follow the existing naming conventions described above.
5. **No source code exists yet.** If asked to implement the application, clarify the desired tech stack and target platform before proceeding.

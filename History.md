# Project History & Milestones 📜

> [!IMPORTANT]
> **🤖 AI HANDOFF NOTES & CURRENT STATE**
> *AI INSTRUCTION: Upon first reading this template, immediately replace the placeholders below with the current project's actual name, tech stack, and primary workflow based on your initial research.*
> 
> Welcome to the **ScrcpyGUI v3** database! This section provides critical context for AI models joining the session.
> 
> **Tech Stack**: Tauri v2, React 19, Rust, TypeScript, Vite, Tailwind CSS 4
> **Design Philosophy**: Modern, high-performance, and visually-rich GUI with custom theme support.
> **Current Flow**: 
> 1. **Discovery**: ADB USB/Wireless device detection and one-click connection history.
> 2. **Operation**: Launching scrcpy sessions (Mirror, Camera, Desktop) with granular bitrate/FPS control.
> 3. **Maintenance**: Integrated binary downloader and real-time log batching for performance.
> 
> **What's Next**: Continue refining performance and integrating upcoming scrcpy 3.x features.
> 
> 🔴 **CRITICAL DIRECTIVE**: Update this `history.md` file with a detailed, structured log of every significant change, feature, or bug fix during your session.
> 
> 📂 **Token Management**: As this file grows, ONLY read the top 100-200 lines to maintain context without hitting generation limits.

### 🚀 Upcoming Release (v1.0.0)
- [ ] **Feature A**: [Description]
- [ ] **Technical Optimization**: [Description]

### 📅 Roadmap
- [ ] **Phase 1**: [Milestone]
- [ ] **Phase 2**: [Milestone]

---

### 🛡️ [Latest Major Update Title] *(Timestamp)*
- **[Component Name]**: [Description of change]
- **[Optimization]**: [Description of performance/stability fix]
- **[Bug Fix]**: [Description of the issue and resolution]

### 🧹 [Earlier Update Title] *(Timestamp)*
- **[Feature]**: [Summary of implementation]
- **[Cleanup]**: [List of removed or refactored items]

---

## [2026-02-23] Performance Optimization - High CPU/Memory Usage Fix

### Problem
Users reported CPU usage >50% and high memory usage when a device was connected via the GUI, while the CLI version remained normal (<20%).

### Root Cause Analysis
- **High IPC Frequency:** The Rust backend was emitting a Tauri event for every single line of scrcpy output (stdout/stderr).
- **Frequent Re-renders:** The React frontend was receiving these events and updating state immediately, causing the entire `App` component (including complex CSS gradients) to re-render dozens of times per second.
- **Log Management:** Continuous appending to a state array without batching caused overhead in React's reconciliation.

### Fixes Implemented
1.  **Backend (Rust):**
    - Implemented **Log Batching** in `src-tauri/src/commands.rs`.
    - Added a 100ms interval buffer for `stdout` and `stderr` reading loops.
    - Multiple lines are now collected and emitted as a single `\n` separated string, significantly reducing the number of IPC calls.
2.  **Frontend (React/TypeScript):**
    - Updated `useScrcpy` hook to handle batched log payloads by splitting them back into lines.
    - **Memoized LogPanel:** Wrapped `LogPanel` in `React.memo` to prevent it from re-rendering unless the `logs` array actually changes.
    - Optimized `LogPanel` scroll-to-bottom logic to only trigger when the number of logs changes, not on every re-render.
3.  **UI/UX:**
    - Reduced the frequency of state updates related to "live" status indicators.


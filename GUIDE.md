# 📖 ScrcpyGUI v3 - User Guide

This guide provides everything you need to know to get started with ScrcpyGUI, from initial setup to advanced feature usage.

---

## 📋 Table of Contents
1. [Prerequisites](#-prerequisites)
2. [Installation Guide](#-installation-guide)
3. [Android Device Setup](#-android-device-setup)
4. [Connecting Your Device](#-connecting-your-device)
5. [Feature Guide](#-feature-guide)
6. [Troubleshooting](#-troubleshooting)

---

## 🛠 Prerequisites

Before using ScrcpyGUI, ensure you have the following:

- **Android Device**: Running Android 5.0 or higher.
- **USB Cable**: A high-quality data cable (avoid charging-only cables).
- **PC**: Windows, macOS, or Linux.
- **Scrcpy Binaries**: The app can download these for you automatically, but you can also provide your own.

---

## 🚀 Installation Guide

### 🪟 Windows
1. Download the latest `.exe` or `.msi` from the [Releases](https://github.com/kil0bit-kb/scrcpy-gui/releases) page.
2. Run the installer or standalone executable.
3. **Smart Setup**: On the first launch, ScrcpyGUI will detect if you have `scrcpy` installed. If not, it will offer a one-click download.

### 🍎 macOS
1. Download the `.dmg` file matching your architecture (**Intel** or **Apple Silicon/M1/M2**).
2. Drag the **ScrcpyGUI** icon into your **Applications** folder.
3. **Security Note**: Since the app is not signed by Apple, you may need to:
   - Go to **System Settings > Privacy & Security**.
   - Scroll down to "Security" and click **Open Anyway**.

### 🐧 Linux
1. Download the `.AppImage` or `.deb` package.
2. **AppImage**: Right-click -> Properties -> Permissions -> **Allow executing file as program**. Double-click to run.
3. **Dependencies**: Ensure you have the following installed if you encounter issues:
   ```bash
   sudo apt install libgtk-3-dev libwebkit2gtk-4.1-dev
   ```

---

## 📱 Android Device Setup

You must enable **Developer Options** and **USB Debugging** on your phone for ScrcpyGUI to communicate with it.

### 1. Enable Developer Options
1. Open **Settings** on your Android device.
2. Go to **About Phone** (usually at the bottom).
3. Find the **Build Number** and tap it **7 times** rapidly.
4. You will see a toast message: "You are now a developer!"

### 2. Enable USB Debugging
1. Go back to the main **Settings** menu.
2. Go to **System > Developer Options** (or search for it).
3. Toggle ON **USB Debugging**.
4. **Important for Mice/Keyboards**: If you see options like **Install via USB** or **USB Debugging (Security Settings)**, enable them too.

---

## 🌐 Connecting Your Device

### USB Connection (Recommended)
1. Plug your phone into your PC via USB.
2. A prompt will appear on your phone: "Allow USB Debugging?".
3. Check **Always allow from this computer** and tap **Allow**.
4. In ScrcpyGUI, click the **Refresh** button in the header if the device doesn't appear automatically.

### Wireless Connection (Android 11+)
1. Ensure both your Phone and PC are on the **same Wi-Fi network**.
2. In **Developer Options**, toggle ON **Wireless Debugging**.
3. Tap on the **Wireless Debugging** text to enter its settings.
4. In ScrcpyGUI, click the **🌐 Wireless Connect** button in the sidebar.
5. Tap **Pair device with pairing code** on your phone.
6. Enter the **IP Address**, **Port**, and **Pairing Code** shown on your phone into ScrcpyGUI.
7. Once paired, ScrcpyGUI will remember your device for future one-click connections!

---

## 🎮 Feature Guide

### ⌨️ HID Keyboard & Mouse (OTG Mode)
ScrcpyGUI v3 features advanced hardware simulation (HID) for a lag-free experience.
- **HID Keyboard**: Simulates a real USB keyboard. This is the **only way** to fix issues with Polish accents, special characters, and international layouts.
- **HID Mouse**: Provides a high-precision, native cursor feel. Eliminates the "double cursor" or lag found in standard mirroring.
- **Pure HID (No Mirror)**: Perfect for when you only want to use your PC as a "controller" for your phone (e.g., typing long messages or playing games while looking at the phone screen).

### 📹 Pro Camera Mode (Webcam)
Turn your phone into a professional webcam.
1. Change **Capture Source** to **Camera**.
2. Select your lens (Back, Front, or even the Ultra-Wide lens).
3. Set your desired **FPS** (up to 60fps supported on most modern phones).
4. **OBS Integration**: Open **OBS Studio**, add a "Window Capture" source, and select the ScrcpyGUI window. Use OBS's **Virtual Camera** to use your phone in Zoom, Teams, or Discord.

### 📂 File Transfers & APKs
- **Install Apps**: Just drag an `.apk` file from your PC and drop it anywhere into the ScrcpyGUI window.
- **Transfer Files**: Drag any file into the window to automatically push it to your device's `/sdcard/Download/` folder.

---

## 🔧 Troubleshooting

- **Device not found?**: Try a different USB port or cable. Ensure "USB Debugging" is still active.
- **Laggy video?**: Lower the **Bitrate** (8M-12M is usually perfect) or the **Resolution**.
- **ADB Error?**: If commands are failing, click the **Kill ADB** button in the sidebar. This resets the connection bridge without closing the app.
- **Binary Error?**: If the app says it cannot find scrcpy, use the **Downloader** in the top right corner.

---

*Found a bug or have a suggestion? Open an issue on [GitHub](https://github.com/kil0bit-kb/scrcpy-gui/issues)!*

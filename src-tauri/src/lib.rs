mod commands;
use std::collections::HashMap;
use std::sync::Mutex;
use tauri::Manager;
use tokio::process::Child;

pub struct ScrcpyState {
    pub processes: Mutex<HashMap<String, Child>>,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    // Fix for white screen on Linux (Wayland/NVIDIA)
    #[cfg(target_os = "linux")]
    {
        if std::env::var("WEBKIT_DISABLE_COMPOSITING_MODE").is_err() {
            std::env::set_var("WEBKIT_DISABLE_COMPOSITING_MODE", "1");
        }
    }

    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_dialog::init())
        .setup(|app| {
            app.manage(ScrcpyState {
                processes: Mutex::new(HashMap::new()),
            });

            // Show splashscreen instantly
            if let Some(splash_window) = app.get_webview_window("splashscreen") {
                splash_window.show().unwrap();
            }

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            commands::greet,
            commands::check_scrcpy,
            commands::get_devices,
            commands::adb_connect,
            commands::get_mdns_devices,
            commands::adb_pair,
            commands::adb_shell,
            commands::push_file,
            commands::install_apk,
            commands::kill_adb,
            commands::run_scrcpy,
            commands::stop_scrcpy,
            commands::download_scrcpy,
            commands::list_scrcpy_options,
            commands::get_videos_dir,
            commands::save_report,
            commands::run_terminal_command,
            close_splashscreen,
            get_app_version
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn get_app_version(app: tauri::AppHandle) -> String {
    app.package_info().version.to_string()
}

#[tauri::command]
async fn close_splashscreen(window: tauri::Window) {
    // Get the main window
    if let Some(main_window) = window.get_webview_window("main") {
        // Show the main window
        main_window.show().unwrap();
    }
    // Close the splashscreen window
    if let Some(splash_window) = window.get_webview_window("splashscreen") {
        splash_window.close().unwrap();
    }
}

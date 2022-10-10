#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    println!("{}", name);
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn count(mut value: i32) -> String {
    println!("{}", value.to_string());
    value += 1;
    format!("{}", value.to_string())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, count])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

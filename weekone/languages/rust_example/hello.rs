use std::process::Command;
 
fn main() {
    let output = Command::new("date")
        .output()
        .expect("failed to run date command");
    let date = String::from_utf8_lossy(&output.stdout);
    print!("Hello ASL! {}", date);
}
// * completed
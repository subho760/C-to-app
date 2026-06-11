
document.addEventListener("DOMContentLoaded", () => {
    const pingBtn = document.getElementById("btn-ping");
    const themeBtn = document.getElementById("btn-theme");
    const logOutput = document.getElementById("log-output");
    const statusDot = document.getElementById("status-dot");
    const logoSpan = document.querySelector(".logo span");

    // Test Action 1: System Ping Simulator
    pingBtn.addEventListener("click", () => {
        logOutput.innerText = "Sending ping request to native app engine...";
        
        setTimeout(() => {
            const latency = Math.floor(Math.random() * 45) + 5;
            logOutput.innerHTML = `> Ping Successful!<br>> Device Latency: ${latency}ms<br>> Thread Status: Stable`;
            
            // Momentarily trigger pulse animation or shift status
            statusDot.classList.remove("status-online");
            statusDot.classList.add("status-online");
        }, 600);
    });

    // Test Action 2: Dynamic Theme/UI Modifier
    themeBtn.addEventListener("click", () => {
        const currentText = logoSpan.style.color;
        
        if (currentText === "rgb(236, 72, 153)" || currentText === "pink") {
            logoSpan.style.color = "#3b82f6"; // Reset to Blue
            pingBtn.style.background = "#3b82f6";
            statusDot.className = "status-online";
            logOutput.innerText = "Accent theme changed back to default Blue.";
        } else {
            logoSpan.style.color = "#ec4899"; // Change to Neon Pink
            pingBtn.style.background = "#ec4899";
            statusDot.className = "status-alert";
            logOutput.innerText = "Accent theme changed to Neon Pink. Web view styles updated dynamically.";
        }
    });
});

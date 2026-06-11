document.addEventListener("DOMContentLoaded", () => {
    const pingBtn = document.getElementById("btn-ping");
    const logOutput = document.getElementById("log-output");

    // This button now wakes up the C# Native Engine!
    pingBtn.addEventListener("click", () => {
        logOutput.innerText = "Calling native C# backend engine...";
        
        // We trigger our custom URL scheme. The C# code will intercept this immediately!
        window.location.href = "hybrid:run_c_logic";
    });
});

// This function is executed automatically by the C# engine when it finishes its calculations
function displayNativeResult(nativeMessage) {
    const logOutput = document.getElementById("log-output");
    logOutput.innerHTML = `<strong>[SYSTEM RUNTIME EXECUTED]</strong><br>${nativeMessage}`;
}

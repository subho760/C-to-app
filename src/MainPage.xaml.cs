namespace App;

public partial class MainPage : ContentPage
{
    public MainPage()
    {
        InitializeComponent();

        // Listen for when the JavaScript sends a message down to the C# engine
        AppWebView.Navigating += OnWebViewNavigating;
    }

    private async void OnWebViewNavigating(object? sender, WebNavigatingEventArgs e)
    {
        // Check if the web view is trying to talk to our C# logic via a custom URL action
        if (e.Url.StartsWith("hybrid:run_c_logic"))
        {
            // Cancel the actual web navigation (we don't want to load a new page)
            e.Cancel = true;

            // --- NATIVE C# / RUNTIME EXECUTION HAPPENS HERE ---
            string deviceModel = Android.OS.Build.Model;
            string androidVersion = Android.OS.Build.VERSION.Release;
            
            // Perform a calculation or heavy logic string
            string systemMessage = $"Hello from Native Backend! Your device is a {deviceModel} running Android {androidVersion}. This message was processed via C# system threads.";

            // Send the result back up to the HTML/JS frontend page
            string escapeMessage = System.Web.HttpUtility.JavaScriptStringEncode(systemMessage);
            await AppWebView.EvaluateJavaScriptAsync($"displayNativeResult('{escapeMessage}')");
        }
    }
}

namespace App;

public partial class MainPage : ContentPage
{
    // Explicitly define the WebView inside the C# backend engine layer
    private WebView AppWebView;

    public MainPage()
    {
        // Build the invisible full-screen web bridge manually to avoid XAML generation errors
        AppWebView = new WebView
        {
            Source = "index.html",
            HorizontalOptions = LayoutOptions.Fill,
            VerticalOptions = LayoutOptions.Fill
        };

        // Listen for when the JavaScript sends a message down to the C# engine
        AppWebView.Navigating += OnWebViewNavigating;

        // Set the manually built WebView container as the core content of the application screen
        Content = AppWebView;
    }

    private async void OnWebViewNavigating(object? sender, WebNavigatingEventArgs e)
    {
        if (e.Url.StartsWith("hybrid:run_c_logic"))
        {
            e.Cancel = true;

            string deviceModel = Android.OS.Build.Model ?? "Mobile Device";
            string androidVersion = Android.OS.Build.VERSION.Release ?? "Android";
            
            string systemMessage = $"Hello from Native Backend! Your device is a {deviceModel} running Android {androidVersion}. This message was processed via C# system threads.";
            string escapeMessage = System.Web.HttpUtility.JavaScriptStringEncode(systemMessage);
            
            await AppWebView.EvaluateJavaScriptAsync($"displayNativeResult('{escapeMessage}')");
        }
    }
}

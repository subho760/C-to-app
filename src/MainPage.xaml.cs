namespace App;

public partial class MainPage : ContentPage
{
    public MainPage()
    {
        InitializeComponent();
        AppWebView.Navigating += OnWebViewNavigating;
    }

    private async void OnWebViewNavigating(object? sender, WebNavigatingEventArgs e)
    {
        if (e.Url.StartsWith("hybrid:run_c_logic"))
        {
            e.Cancel = true;

            string deviceModel = Android.OS.Build.Model ?? "Unknown Device";
            string androidVersion = Android.OS.Build.VERSION.Release ?? "Unknown Version";
            
            string systemMessage = $"Hello from Native Backend! Your device is a {deviceModel} running Android {androidVersion}. This message was processed via C# system threads.";
            string escapeMessage = System.Web.HttpUtility.JavaScriptStringEncode(systemMessage);
            
            await AppWebView.EvaluateJavaScriptAsync($"displayNativeResult('{escapeMessage}')");
        }
    }
}

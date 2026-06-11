namespace App;

public class MainPage : ContentPage
{
    private WebView AppWebView;

    public MainPage()
    {
        AppWebView = new WebView
        {
            Source = "index.html",
            HorizontalOptions = LayoutOptions.Fill,
            VerticalOptions = LayoutOptions.Fill
        };

        AppWebView.Navigating += OnWebViewNavigating;
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

using Android.App;
using Android.Content.PM;
using Android.OS;

namespace App;

[Activity(
    Label = "NightShadow Racing",
    MainLauncher = true, // 🚀 Makes it show in your app drawer
    ConfigurationChanges = ConfigChanges.ScreenSize | ConfigChanges.Orientation | ConfigChanges.UiMode | ConfigChanges.ScreenLayout | ConfigChanges.SmallestScreenSize | ConfigChanges.Density)]
public class MainActivity : Activity
{
    protected override void OnCreate(Bundle? savedInstanceState)
    {
        base.OnCreate(savedInstanceState);

        // Create the native Android web view browser frame directly
        var webView = new Android.Webkit.WebView(this);
        
        // Enable high-speed JavaScript execution for the 60FPS game loop
        webView.Settings.JavaScriptEnabled = true;
        webView.Settings.DomStorageEnabled = true;
        webView.Settings.AllowFileAccess = true;

        // Point the browser window straight to your offline game asset folder
        webView.LoadUrl("file:///android_asset/wwwroot/index.html");

        // Put the game screen full-screen on the phone
        SetContentView(webView);
    }
}

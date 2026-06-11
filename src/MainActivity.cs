using Android.App;
using Android.Content.PM;
using Android.OS;
using Microsoft.Maui.Embedding;

namespace App;

[Activity(
    Theme = "@style/Maui.MainTheme.NoActionBar", 
    MainLauncher = true, 
    ConfigurationChanges = ConfigChanges.ScreenSize | ConfigChanges.Orientation | ConfigChanges.UiMode | ConfigChanges.ScreenLayout | ConfigChanges.SmallestScreenSize | ConfigChanges.Density)]
public class MainActivity : MauiAppCompatActivity
{
    protected override void OnCreate(Bundle? savedInstanceState)
    {
        var mauiApp = MauiProgram.CreateMauiApp();
        var mauiContext = new MauiContext(mauiApp.Services, this);
        
        base.OnCreate(savedInstanceState);
    }
}

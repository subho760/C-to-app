using Android.App;
using Android.Content.PM;
using Android.OS;

namespace App;

[Activity(
    Theme = "@style/Maui.MainTheme.NoActionBar", 
    MainLauncher = true, // 🚀 THIS makes it show up in your app drawer!
    ConfigurationChanges = ConfigChanges.ScreenSize | ConfigChanges.Orientation | ConfigChanges.UiMode | ConfigChanges.ScreenLayout | ConfigChanges.SmallestScreenSize | ConfigChanges.Density)]
public class MainActivity : MauiAppCompatActivity
{
    protected override void OnCreate(Bundle? savedInstanceState)
    {
        base.OnCreate(savedInstanceState);
    }
}

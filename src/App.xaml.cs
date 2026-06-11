namespace App;

public partial class App : Application
{
    public App()
    {
        // Explicitly bypass dynamic generation and load the main page structure
        MainPage = new MainPage();
    }
}

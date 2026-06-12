namespace App;

public class MainPage : ContentPage
{
    private WebView AppWebView;

    public MainPage()
    {
        // Creates the secure local app browser wrapper
        AppWebView = new WebView
        {
            Source = "index.html",
            HorizontalOptions = LayoutOptions.Fill,
            VerticalOptions = LayoutOptions.Fill
        };

        Content = AppWebView;
    }
}


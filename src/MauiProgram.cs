using Microsoft.Maui.Embedding;

namespace App;

public static class MauiProgram
{
    public static MauiApp CreateMauiApp()
    {
        var builder = MauiApp.CreateBuilder();
        builder.UseMauiEmbedding<App>();
        return builder.Build();
    }
}

namespace Api.Configurations;

public static class MiddlewareConfig
{
    public static async Task<IApplicationBuilder> UseAppMiddlewareAndSeedDatabase(this WebApplication app)
    {
        if (app.Environment.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }
        else
        {
            app.UseDefaultExceptionHandler(); // from FastEndpoints
            app.UseHsts();
        }

        app.UseFastEndpoints()
            .UseSwaggerGen(); // Includes AddFileServer and static files middleware

        app.UseHttpsRedirection(); // Note this will drop Authorization headers


        return app;
    }
}

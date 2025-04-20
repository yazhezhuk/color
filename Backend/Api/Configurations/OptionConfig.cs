namespace Api.Configurations;

public static class OptionConfigs
{
    public static IServiceCollection AddOptionConfigs(this IServiceCollection services,
        IConfiguration configuration,
        Microsoft.Extensions.Logging.ILogger logger,
        WebApplicationBuilder builder)
    {

        services
            // Configure Web Behavior
            .Configure<CookiePolicyOptions>(options =>
            {
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

        services.AddCors(options =>
        {
            options.AddPolicy("AllowFrontend",
                policy =>
                {
                    policy.WithOrigins("http://localhost:3000")
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
        });

        logger.LogInformation("{Project} were configured", "Options");

        return services;
    }
}
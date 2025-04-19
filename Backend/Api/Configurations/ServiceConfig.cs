using Api.Services;
using Core.Interfaces;
using Core.Services;

namespace Api.Configurations;

public static class ServiceConfigs
{
    public static IServiceCollection AddServiceConfigs(this IServiceCollection services, Microsoft.Extensions.Logging.ILogger logger, WebApplicationBuilder builder)
    {
        //services.AddInfrastructureServices(builder.Configuration, logger)
        //    .AddMediatrConfigs();


        if (builder.Environment.IsDevelopment())
        {
            // Use a local test email server
            // See: https://ardalis.com/configuring-a-local-test-email-server/


            // Otherwise use this:
            //builder.Services.AddScoped<IEmailSender, FakeEmailSender>();

            builder.Services.AddTransient<IColorManipulatorService, ColorManipulatorServiceService>();
            builder.Services.AddTransient<IColorParserService, ColorParserService>();

        }

        logger.LogInformation("{Project} services registered", "Mediatr and Email Sender");

        return services;
    }
}
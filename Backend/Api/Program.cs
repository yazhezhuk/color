using Api.Configurations;

var builder = WebApplication.CreateBuilder(args);

var logger = Log.Logger = new LoggerConfiguration()
    .Enrich.FromLogContext()
    .WriteTo.Console()
    .CreateLogger();

logger.Information("Starting web host");

builder.AddLoggerConfigs();

var appLogger = new SerilogLoggerFactory(logger)
    .CreateLogger<Program>();

builder.Services.AddOptionConfigs(builder.Configuration, appLogger, builder);
builder.Services.AddServiceConfigs(appLogger, builder);

builder.Services.AddFastEndpoints()
    .SwaggerDocument(o =>
    {
        o.ShortSchemaNames = true;
    });

var app = builder.Build();

await app.UseAppMiddlewareAndSeedDatabase();

app.Run();

public partial class Program { }
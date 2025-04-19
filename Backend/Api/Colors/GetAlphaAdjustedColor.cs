using System.Drawing;
using Ardalis.GuardClauses;
using Core;
using Core.Interfaces;

namespace Api.Colors;

public class GetAlphaAdjustedColor(IColorManipulatorService colorManipulatorService, IColorParserService colorParserService)
    : Endpoint<GetAlphaAdjustedColorRequest>
{
    public override void Configure()
    {
        Post(GetAlphaAdjustedColorRequest.Route);
        AllowAnonymous();
    }

    public override async Task HandleAsync(
        GetAlphaAdjustedColorRequest request,
        CancellationToken cancellationToken)
    {
        try
        {
            Guard.Against.NullOrEmpty(request.ForegroundColor);
            Guard.Against.NullOrEmpty(request.BackgroundColor);

            var foregroundColor = colorParserService.GetColor(ColorInputType.FromName(request.ForegroundColorInputType), request.ForegroundColor);
            var backgroundColor = colorParserService.GetColor(ColorInputType.FromName(request.BackgroundColorInputType), request.BackgroundColor);

            Response =  colorManipulatorService.GetAlphaAdjustedColors(foregroundColor, backgroundColor);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
        }
    }
}
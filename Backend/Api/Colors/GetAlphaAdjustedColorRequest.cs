using System.ComponentModel.DataAnnotations;

namespace Api.Colors;

public class GetAlphaAdjustedColorRequest
{
    public const string Route = "/Color/AlphaAdjustedColor";

    [Required]
    public string? ForegroundColor {get; set;}
    public string ForegroundColorInputType {get; set; }
    public string? BackgroundColor {get; set;}
    public string BackgroundColorInputType {get; set; }

}
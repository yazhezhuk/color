using System.Drawing;
using Core;
using Core.Interfaces;

namespace Api.Services;

public class ColorParserService : IColorParserService
{
    public Color GetColor(ColorInputType inputType, string colorString)
    {
        return inputType.Name switch
        {
            "hex" => ParseHex(colorString),
            "rgb" => ParseRgb(colorString),
            "rgba" => ParseRgb(colorString),
            _ => throw new ArgumentException($"Unknown color type: {inputType.Name}")
        };
    }

    private Color ParseHex(string hex)
    {
        return ColorTranslator.FromHtml(hex);
    }

    private static Color ParseRgb(string argb)
    {
        var parts = argb.Split(',');

        if (parts.Length == 3)
        {
            return Color.FromArgb(255,
                byte.Parse(parts[0]),
                byte.Parse(parts[1]),
                byte.Parse(parts[2])
            );
        }

        if (parts.Length != 4)
            throw new FormatException("Not argb");

        return Color.FromArgb(byte.Parse(parts[0]),
            byte.Parse(parts[1]),
            byte.Parse(parts[2]),
            byte.Parse(parts[3])
        );
    }
}
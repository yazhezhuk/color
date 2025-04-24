using System.Drawing;
using Core.Interfaces;

namespace Core.Services;

public class ColorManipulatorService : IColorManipulatorService
{
    public List<Color> GetAlphaAdjustedColors(Color foregroundColor, Color backgroundColor)
    {
        var result = new List<Color>();

        // Loop alpha from 1 to 254 (excluding 0 and 255)
        for (var alpha = 1; alpha < 255; alpha++)
        {
            // Calculate possible RGB values that would produce the target color when blended over background
            // var r = CalculateSourceChannel(foregroundColor.R, backgroundColor.R, alpha);
            // var g = CalculateSourceChannel(foregroundColor.G, backgroundColor.G, alpha);
            // var b = CalculateSourceChannel(foregroundColor.B, backgroundColor.B, alpha);
            //
            // // Blend to confirm it matches the target
            // var blended = BlendWithBackground(Color.FromArgb(alpha, r, g, b), backgroundColor);
            // if (blended.R == foregroundColor.R && blended.G == foregroundColor.G && blended.B == foregroundColor.B)
            // {
            //     result.Add(Color.FromArgb(alpha, r, g, b));
            // }

            double a = alpha / 255.0;

            int r = (int)Math.Round((foregroundColor.R - (1 - a) * backgroundColor.R) / a);
            int g = (int)Math.Round((foregroundColor.G - (1 - a) * backgroundColor.G) / a);
            int b = (int)Math.Round((foregroundColor.B - (1 - a) * backgroundColor.B) / a);

            if (r is >= 0 and <= 255 && g is >= 0 and <= 255 && b is >= 0 and <= 255)
            {
                result.Add(Color.FromArgb(alpha, r, g, b));
            }

        }

        return result;
    }



    private static byte CalculateSourceChannel(byte target, byte bg, int alpha)
    {
        // Formula: result = src * alpha + bg * (1 - alpha)
        // Solving for src:
        var alphaNorm = alpha / 255.0;
        var src = (target - bg * (1 - alphaNorm)) / alphaNorm;
        src = Math.Round(src);
        return (byte)Math.Clamp((int)src, 0, 255);
    }

    private static Color BlendWithBackground(Color fg, Color bg)
    {
        var a = fg.A / 255f;
        var r = (byte)Math.Round(fg.R * a + bg.R * (1 - a));
        var g = (byte)Math.Round(fg.G * a + bg.G * (1 - a));
        var b = (byte)Math.Round(fg.B * a + bg.B * (1 - a));
        return Color.FromArgb(fg.A, r, g, b);
    }
}
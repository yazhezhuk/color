using System.Drawing;

namespace Core.Interfaces;

public interface IColorManipulatorService
{
    List<Color> GetAlphaAdjustedColors(Color foregroundColor, Color backgroundColor);
}
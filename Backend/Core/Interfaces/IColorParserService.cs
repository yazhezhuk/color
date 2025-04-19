using System.Drawing;

namespace Core.Interfaces;

public interface IColorParserService
{
    Color GetColor(ColorInputType inputType,string colorString);
}
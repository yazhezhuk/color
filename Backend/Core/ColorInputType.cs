namespace Core;

public class ColorInputType(string name, int value) : SmartEnum<ColorInputType>(name, value)
{
    public static readonly ColorInputType Rgb = new ColorInputType("rgb", 1);
    public static readonly ColorInputType Rgba = new ColorInputType("rgba", 2);
    public static readonly ColorInputType Hex = new ColorInputType("hex", 2);


}
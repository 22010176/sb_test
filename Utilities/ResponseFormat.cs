namespace Utilities;

public class ResponseFormat
{
    public string Message { get; set; } = null!;
    public bool Success { get; set; }
    public object? Data { get; set; }
}
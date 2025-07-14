namespace Utilities;

public static class RandomUtils
{
  static readonly string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
  static readonly Random random = new();

  public static string GenerateString(int length)
  {
    return new string([
      ..Enumerable.Repeat(chars, length).Select(s => s[random.Next(s.Length)])
    ]);
  }

  static string GenerateString(int minLength, int maxLength)
  {
    int length = random.Next(minLength, maxLength + 1);
    return new string([.. Enumerable.Repeat(chars, length).Select(s => s[random.Next(s.Length)])]);
  }

  public static DateTime GenerateDate(DateTime start, DateTime end)
  {
    int range = (end - start).Days;
    return start.AddDays(random.Next(range));
  }
  public static DateTime GenerateDate(DateTime start)
  {
    DateTime end = DateTime.Now;
    int range = (end - start).Days;
    return start.AddDays(random.Next(range));
  }

  public static string GeneratePhoneNumber()
  {
    int areaCode = random.Next(200, 999);      // Avoid 0xx or 1xx area codes
    int centralOffice = random.Next(200, 999); // Avoid 0xx or 1xx
    int lineNumber = random.Next(1000, 9999);

    return $"{areaCode}{centralOffice}{lineNumber}";
  }

  public static string GenerateRandomEmail()
  {
    string[] domains = ["gmail.com", "yahoo.com", "outlook.com", "example.com"];
    string user = GenerateString(6, 10).ToLower();
    string domain = domains[random.Next(domains.Length)];
    return $"{user}@{domain}";
  }
}
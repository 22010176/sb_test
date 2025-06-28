using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Configuration;

namespace MailServices;

public interface IEmailSender
{
  Task SendEmailAsync(string toEmail, string subject, string message);
}

public class EmailSender(IConfiguration configuration) : IEmailSender
{
  readonly IConfiguration configuration = configuration;
  public async Task SendEmailAsync(string toEmail, string subject, string message)
  {
    var port = int.Parse(configuration["SMTP:Port"]!);
    var username = configuration["SMTP:Username"];
    var password = configuration["SMTP:Password"];
    var fromEmail = configuration["SMTP:From"];

    var smtp = new SmtpClient(configuration["SMTP:Host"])
    {
      Port = port,
      Credentials = new NetworkCredential(username, password),
      EnableSsl = true,
    };

    var mail = new MailMessage
    {
      From = new MailAddress(fromEmail!),
      Subject = subject,
      Body = message,
      IsBodyHtml = true,
    };

    mail.To.Add(toEmail);
    try
    {
      await smtp.SendMailAsync(mail);
    }
    catch (Exception) { throw; }
  }
}

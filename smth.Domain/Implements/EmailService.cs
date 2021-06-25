using Microsoft.Extensions.Options;
using SendGrid;
using SendGrid.Helpers.Mail;
using smth.Domain.Helper;
using smth.Domain.Interfaces;
using System.IO;
using System.Threading.Tasks;

namespace schoolButNot.Domain.Helper
{
    public class EmailService : IEmailService
    {
        private readonly EmailSettings emailSettings;
        public EmailService(IOptions<EmailSettings> emailSettings)
        {
            this.emailSettings = emailSettings.Value;
        }

        public async Task SendEmailAsync(EmailRequest request)
        {
            var client = new SendGridClient(emailSettings.ApiKey);
            var from = new EmailAddress(emailSettings.Mail, emailSettings.DisplayName);
            var to = new EmailAddress(request.ToEmail, request.ToEmail);
            var plainTextContent = "";
            var htmlContent = "";
            if (request.IsRegistration)
            {
                htmlContent = getRegisterPage(request);
            }
            else
            {
                htmlContent = getCoursePage(request);
            }
            var msg = MailHelper.CreateSingleEmail(from, to, request.Subject, plainTextContent, htmlContent);
            await client.SendEmailAsync(msg);
        }

        public string getRegisterPage(EmailRequest request)
        {
            string FilePath = "..\\aga\\registerPage.html";
            StreamReader str = new StreamReader(FilePath);
            string MailText = str.ReadToEnd();
            str.Close();
            MailText = MailText.Replace("[login]", request.ToEmail).Replace("[link]", $"<a href='{request.CallbackURL}'>Click here</a>");
            return MailText;
        }

        public string getCoursePage(EmailRequest request)
        {
            string FilePath = "..\\aga\\courseNotification.html";
            StreamReader str = new StreamReader(FilePath);
            string MailText = str.ReadToEnd();
            str.Close();
            MailText = MailText.Replace("[date]", request.StudyDate);
            return MailText;
        }
    }
}
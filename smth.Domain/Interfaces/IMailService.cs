using smth.Domain.Helper;
using System.Threading.Tasks;

namespace smth.Domain.Interfaces
{
    public interface IEmailService
    {
        Task SendEmailAsync(EmailRequest mailRequest);
    }
}

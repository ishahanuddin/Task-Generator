using System.Net.Mail;
using Task_Generator___API.Services.Interfaces;

namespace Task_Generator___API.Services
{
    public class UtilityService : IUtilityInterface
    {
        public bool ValidateEmail(string emailAddress)
        {
            try
            {
                var email = new MailAddress(emailAddress);
                return email.Address == emailAddress.Trim();
            }
            catch
            {
                return false;
            }
        }
    }
}

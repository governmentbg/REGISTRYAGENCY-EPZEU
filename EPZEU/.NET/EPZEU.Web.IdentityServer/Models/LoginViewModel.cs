using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EPZEU.Web.IdentityServer.Models
{
    public class LoginInputModel
    {
        [Required]
        [MaxLength(200)]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        public string ReturnUrl { get; set; }
    }

    public class LoginViewModel : LoginInputModel
    {
        public IEnumerable<ExternalProvider> ExternalProviders { get; set; }

        public ExternalProvider WindowsProvider { get; set; }

        public ExternalProvider NRAProvider { get; set; }

        public bool AllowResendProfileRegistrationMail { get; set; }

        public string SuccessMessage { get; set; }

        public bool EnableWindowsAuth { get; set; }

        public bool EnableUsrNamePwdAuth { get; set; }

        public bool EnableKEPAuth { get; set; }

        public bool EnableNRAAuth { get; set; }
    }
}

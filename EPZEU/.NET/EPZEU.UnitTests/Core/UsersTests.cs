using EPZEU.Common;
using EPZEU.Users;
using EPZEU.Users.Models;
using IdentityModel;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace EPZEU.UnitTests.Core
{
    [TestClass]
    public class UsersTests
    {
        private IUsersService UsersService;
        private IUsersLoginService UsersLoginService;

        public UsersTests()
        {
            EPZEUStartupBootstrapper.Run();

            var services = new ServiceCollection();
            var provider = services
                .AddEPZEUServiceClients()
                .AddEPZEUHttpClients(null)
                .AddEPZEUUsersLogin()
                .BuildServiceProvider();

            UsersService = provider.GetRequiredService<IUsersService>();
            UsersLoginService = provider.GetRequiredService<IUsersLoginService>();
        }

        [TestMethod]
        public void Test_Search()
        {
            var users = UsersService.SearchUsers(new UserSearchCriteria()
            {
                Email = "m.grozdanov1@cnsys.bg",
                LoadUserPermissions = true
            }).ToList();

            Assert.IsTrue(users.Count > 0);
        }

        [TestMethod]
        public async Task Test_Authenticate()
        {
            var res = await UsersLoginService.AuthenticateAsync("v.achev@cnsys.bg", "12345678", "192.168.0.11");

            Assert.IsTrue(res.IsSuccess);
        }

        [TestMethod]
        public async Task Test_Authenticate_Fail()
        {
            var res = await UsersLoginService.AuthenticateAsync("m.grozdanov111@cnsys.bg", "wrong_password", null);

            Assert.IsTrue(res.InvalidUsernamePassword);
        }

        [TestMethod]
        public void Test_PasswordHashValidation()
        {
            string secret1 = "".ToSha256();

            string shared = "ILLJ+lwcWlUKWRiahi6g0kZ0RDtsIN8xaRBa510i29E=";
            var  decoded = Convert.FromBase64String(shared);

            TimeConstantComparer.IsEqual(shared, secret1);

            string password = "epzeu.cr.api.client@secret";

            string hash = BCrypt.Net.BCrypt.HashPassword(password);

            var valid = BCrypt.Net.BCrypt.Verify(password, hash);

            Assert.IsTrue(valid);
        }
    }
}

using System.Linq;
using System.Threading.Tasks;
using EPZEU.Users;
using EPZEU.Users.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using StructureMap;

namespace EPZEU.Tests
{
    [TestClass]
    public class UsersTests
    {
        private IUsersService UsersService;
        private IUsersLoginService UsersLoginService;

        public UsersTests()
        {
            var c = new Container(config =>
            {
                config.AddRegistry<UsersDIRegistry>();
            });

            UsersService = c.GetInstance<IUsersService>();
            UsersLoginService = c.GetInstance<IUsersLoginService>();
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
            var res = await UsersLoginService.AuthenticateAsync("m.grozdanov@cnsys.bg", "testtest", null);

            Assert.IsTrue(res.IsSuccess);
        }

        [TestMethod]
        public async Task Test_Authenticate_Fail()
        {
            var res = await UsersLoginService.AuthenticateAsync("m.grozdanov111@cnsys.bg", "wrong_password", null);

            Assert.IsTrue(res.InvalidUsernamePassword);
        }
    }
}

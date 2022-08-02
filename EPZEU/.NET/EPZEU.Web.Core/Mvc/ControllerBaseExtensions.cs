
using EPZEU.Security;

namespace Microsoft.AspNetCore.Mvc
{
    public static class ControllerBaseExtensions
    {
        /// <summary>
        /// Връща EPZEUPrincipal
        /// </summary>
        /// <param name="controllerBase"></param>
        /// <returns></returns>
        public static EPZEUPrincipal EPZEUUser(this ControllerBase controllerBase)
        {
            return (EPZEUPrincipal)controllerBase.User;
        }
    }
}

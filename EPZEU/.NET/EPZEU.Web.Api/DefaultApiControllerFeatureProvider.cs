using Microsoft.AspNetCore.Mvc.ApplicationParts;
using Microsoft.AspNetCore.Mvc.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;

namespace EPZEU.Web.Api
{
    /// <summary>
    /// Имплементация на IApplicationFeatureProvider<ControllerFeature>.
    /// Приема списък от namespace-и на контролери, които да бъдат включени в приложението.
    /// </summary>
    public class DefaultApiControllerFeatureProvider : IApplicationFeatureProvider<ControllerFeature>
    {        
        public DefaultApiControllerFeatureProvider(params string[] enabledControllerNamespacePatterns)
        {
            EnabledControllerNamespacePatterns = enabledControllerNamespacePatterns;
        }

        private readonly string[] EnabledControllerNamespacePatterns;

        public void PopulateFeature(IEnumerable<ApplicationPart> parts, ControllerFeature feature)
        {
            var controllersToIgnore = feature.Controllers.Where(controller => {

                byte countNotMatchedNs = 0;
                foreach (var namespacePattern in EnabledControllerNamespacePatterns)
                {
                    if (!System.Text.RegularExpressions.Regex.IsMatch(controller.Namespace, namespacePattern))
                    {
                        countNotMatchedNs++;
                    }
                }

                return countNotMatchedNs == EnabledControllerNamespacePatterns.Length;
            }).ToList();

            foreach (var controller in controllersToIgnore)
            {
                feature.Controllers.Remove(controller);
            }                        
        }

        public static class ControllerNamespaces
        {
            public static string PublicAndPrivateNamespacePattern = "^EPZEU.Web.Api.Controllers(.Private)?$";
            public static string PublicOnlyNamespacePattern = "^EPZEU.Web.Api.Controllers$";
        }
    }
}

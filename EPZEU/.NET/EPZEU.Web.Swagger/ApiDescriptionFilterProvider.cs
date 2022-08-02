using EPZEU.Web.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Collections.Generic;

namespace EPZEU.Web.Swagger
{
    public class ApiDescriptionFilterProvider : IApiDescriptionProvider
    {
        public int Order => 0;

        public void OnProvidersExecuted(ApiDescriptionProviderContext context)
        {
            foreach (var action in context.Results)
            {
                IApiDescriptionFilter filter = FindEffectivePolicy<IApiDescriptionFilter>(action.ActionDescriptor.FilterDescriptors);

                if (filter != null)
                    filter.Process(action);
            }
        }

        public TMetadata FindEffectivePolicy<TMetadata>(IList<FilterDescriptor> filters) where TMetadata : IFilterMetadata
        {
            // The most specific policy is the one closest to the action (nearest the end of the list).
            for (var i = filters.Count - 1; i >= 0; i--)
            {
                var filter = filters[i];
                if (filter.Filter is TMetadata match)
                {
                    return match;
                }
            }

            return default(TMetadata);
        }

        public void OnProvidersExecuting(ApiDescriptionProviderContext context)
        {

        }
    }
}

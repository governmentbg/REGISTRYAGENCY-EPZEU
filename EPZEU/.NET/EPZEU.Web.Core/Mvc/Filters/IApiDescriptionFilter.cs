using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.AspNetCore.Mvc.Filters;

namespace EPZEU.Web.Mvc.Filters
{
    public interface IApiDescriptionFilter : IFilterMetadata
    {
        void Process(ApiDescription apiDescription);
    }
}

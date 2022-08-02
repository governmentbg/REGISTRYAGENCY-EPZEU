using EPZEU.Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.Generic;

namespace EPZEU.Web.Mvc.Filters
{
    public class ValidateModelAttribute: ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            bool skipValidation = false;

            foreach (FilterDescriptor item in context.ActionDescriptor.FilterDescriptors)
            {
                if(item.Filter is SkipValidateModelAttribute)
                {
                    skipValidation = true;
                    break;
                }
            }

            if (!skipValidation && !context.ModelState.IsValid)
            {
                var apiErrors = new List<ApiError>();

                foreach (var propData in context.ModelState.Values)
                {
                    foreach (var err in propData.Errors)
                    {
                        apiErrors.Add(new ApiError()
                        {
                            Code = err.ErrorMessage,
                            Message = err.ErrorMessage
                        });
                    }
                }

                ApiError result;

                if (apiErrors.Count == 1)
                {
                    result = apiErrors[0];
                }
                else
                {
                    result = new ApiError();
                    result.Code = EPZEUCoreErrorCodes.ValidationError.ToString();
                    result.InnerErrors = apiErrors;
                }

                TryLocalize(result, context);

                context.Result = new BadRequestObjectResult(result);
            }
            else
            {
                base.OnActionExecuting(context);
            }           
        }

        private void TryLocalize(ApiError error, ActionExecutingContext context)
        {
            var stringLocalizer = GetStringLocalizer(context);
            var errorMessageLocalized = stringLocalizer[error.Code];
            if (!string.IsNullOrEmpty(errorMessageLocalized))
            {
                error.Message = errorMessageLocalized;
            }
            if (error.InnerErrors != null)
            {
                foreach (var err in error.InnerErrors)
                {
                    var errMessageLocalized = stringLocalizer[err.Code];
                    if (!string.IsNullOrEmpty(errMessageLocalized))
                    {
                        err.Message = errMessageLocalized;
                    }
                }
            }
        }

        private IStringLocalizer GetStringLocalizer(ActionExecutingContext context)
        {
            return context.HttpContext.RequestServices.GetService<IStringLocalizer>();
        }
    }
}

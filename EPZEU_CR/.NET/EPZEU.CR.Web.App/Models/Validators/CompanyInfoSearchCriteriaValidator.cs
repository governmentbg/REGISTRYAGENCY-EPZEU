using EPZEU.Common;
using EPZEU.CR.Web.App.Models.Deeds;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.Extensions.Options;
using System;

namespace EPZEU.CR.Web.App.Models.Validators
{
    public class CompanyInfoSearchCriteriaValidator : BasePagedSearchCriteriaValidator<CompanyInfoSearchCriteria>
    {
        public CompanyInfoSearchCriteriaValidator(IOptionsMonitor<GlobalOptions> globalOptionsAccessor) : base(globalOptionsAccessor)
        {
        }

        public override ValidationResult Validate(ValidationContext<CompanyInfoSearchCriteria> context)
        {
            var result = base.Validate(context);
            var model = context.InstanceToValidate;

            if (string.IsNullOrEmpty(model.CompanyFirstLatter)
                && model.FromDate == null 
                && model.ToDate == null)
            {
                result.Errors.Add(new ValidationFailure("IncomingNumber", "GL_NOSELECT_SEARCH_CRITERIA_E"));
            }

            if (model.FromDate.HasValue && model.ToDate.HasValue)
            {
                if (model.FromDate > model.ToDate)
                {
                    result.Errors.Add(new ValidationFailure("FromDate", "GL_PERIOD_START_DATE_MUST_LESS_E"));
                }

                if (model.ToDate > new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 23, 59, 59))
                {
                    result.Errors.Add(new ValidationFailure("ToDate", "GL_NO_CAN_EXECUTE_DATE_E"));
                }
            }

            if ((model.FromDate.HasValue && model.ToDate == null) || (model.ToDate.HasValue && model.FromDate == null))
            {
                result.Errors.Add(new ValidationFailure("ToDate", "GL_INVALID_DATE_PERIOD_E"));
            }

            return result;
        }
    }
}

using EPZEU.Common;
using EPZEU.CR.Web.App.Models.Applications;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.Extensions.Options;
using System;

namespace EPZEU.CR.Web.App.Models.Validators
{
    public class ApplicationTransformationsSearchCriteriaValidator : BasePagedSearchCriteriaValidator<ApplicationTransformationsSearchCriteria>
    {
        public ApplicationTransformationsSearchCriteriaValidator(IOptionsMonitor<GlobalOptions> globalOptionsAccessor) : base(globalOptionsAccessor)
        {
        }

        public override ValidationResult Validate(ValidationContext<ApplicationTransformationsSearchCriteria> context)
        {
            var result = base.Validate(context);
            var model = context.InstanceToValidate;

            if (string.IsNullOrEmpty(model.CompanyName.Trim())
                && model.DateFrom == null
                && model.DateTo == null)
            {
                result.Errors.Add(new ValidationFailure("IncomingNumber", "GL_NOSELECT_SEARCH_CRITERIA_E"));
            }
            else
            {
                if (model.DateFrom.HasValue && model.DateTo.HasValue)
                {
                    if (model.DateFrom > model.DateTo)
                    {
                        result.Errors.Add(new ValidationFailure("DateFrom", "GL_PERIOD_START_DATE_MUST_LESS_E"));
                    }
                    else
                    {
                        if (model.DateTo.Value.Subtract(model.DateFrom.Value).Days > 31)
                        {
                            result.Errors.Add(new ValidationFailure("DateTo", "GL_NO_REPORT_INTERVAL_GREAT_MONTH_E"));
                        }
                    }

                    if (model.DateTo > new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 23, 59, 59))
                    {
                        result.Errors.Add(new ValidationFailure("DateTo", "GL_NO_CAN_EXECUTE_DATE_E"));
                    }
                }
                else
                {
                    result.Errors.Add(new ValidationFailure("DateTo", "CR_GL_INPUT_PERIOD_E"));
                }
            }

            return result;
        }
    }
}

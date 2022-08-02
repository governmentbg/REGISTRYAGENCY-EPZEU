using EPZEU.Common;
using FluentValidation;
using FluentValidation.Results;
using Integration.EPZEU.Models.SearchCriteria;
using Microsoft.Extensions.Options;
using System;

namespace EPZEU.CR.Web.App.Models.Validators
{
    public class DeedsInStabilizationSearchCriteriaValidator : CRBasePagedSearchCriteriaValidator<DeedsInStabilizationSearchCriteria>
    {
        public DeedsInStabilizationSearchCriteriaValidator(IOptionsMonitor<GlobalOptions> globalOptionsAccessor) : base(globalOptionsAccessor)
        {
        }

        public override ValidationResult Validate(ValidationContext<DeedsInStabilizationSearchCriteria> context)
        {
            var result = base.Validate(context);
            var model = context.InstanceToValidate;

            if (model.FromDate.HasValue && model.ToDate.HasValue)
            {
                if (model.FromDate > model.ToDate)
                {
                    result.Errors.Add(new ValidationFailure("FromDate", "GL_PERIOD_START_DATE_MUST_LESS_E"));
                }
                else
                {
                    if (model.ToDate.Value.Subtract(model.FromDate.Value).Days > 31)
                    {
                        result.Errors.Add(new ValidationFailure("ToDate", "GL_NO_REPORT_INTERVAL_GREAT_MONTH_E"));
                    }
                }

                if (model.ToDate > new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 23, 59, 59))
                {
                    result.Errors.Add(new ValidationFailure("DateTo", "GL_NO_CAN_EXECUTE_DATE_E"));
                }
            }
            else
            {
                result.Errors.Add(new ValidationFailure("DateFrom", "CR_GL_INPUT_PERIOD_E"));
            }

            return result;
        }
    }
}

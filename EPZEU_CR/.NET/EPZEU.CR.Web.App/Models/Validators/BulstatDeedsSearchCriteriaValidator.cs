using EPZEU.Common;
using EPZEU.CR.Web.App.Models.Deeds;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.Extensions.Options;
using System;

namespace EPZEU.CR.Web.App.Models.Validators
{
    public class BulstatDeedsSearchCriteriaValidator : BasePagedSearchCriteriaValidator<BulstatDeedsSearchCriteria>
    {
        public BulstatDeedsSearchCriteriaValidator(IOptionsMonitor<GlobalOptions> globalOptionsAccessor) : base(globalOptionsAccessor)
        {
            RuleFor(x => x.CourtNumber).NotEmpty().WithMessage("CR_APP_INPUT_COURT_CODE_NAME_E");
            RuleFor(x => x.FromDate).NotEmpty().WithMessage("CR_GL_INPUT_PERIOD_E");
            RuleFor(x => x.ToDate).NotEmpty().WithMessage("CR_GL_INPUT_PERIOD_E");
        }

        public override ValidationResult Validate(ValidationContext<BulstatDeedsSearchCriteria> context)
        {
            var result = base.Validate(context);
            var model = context.InstanceToValidate;

            if(result.IsValid)
            {
                if (model.FromDate > model.ToDate)
                {
                    result.Errors.Add(new ValidationFailure("FromDate", "GL_PERIOD_START_DATE_MUST_LESS_E"));
                }
                else
                {
                    if (model.ToDate.Value.Subtract(model.FromDate.Value).Days >= 31)
                    {
                        result.Errors.Add(new ValidationFailure("ToDate", "GL_NO_REPORT_INTERVAL_GREAT_MONTH_E"));
                    }
                }

                if (model.ToDate > new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 23, 59, 59))
                {
                    result.Errors.Add(new ValidationFailure("ToDate", "GL_NO_CAN_EXECUTE_DATE_E"));
                }
            }

            return result;
        }
    }
}

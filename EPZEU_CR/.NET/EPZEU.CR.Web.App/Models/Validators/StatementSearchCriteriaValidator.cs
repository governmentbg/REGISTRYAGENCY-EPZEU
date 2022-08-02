using EPZEU.Common;
using FluentValidation;
using FluentValidation.Results;
using Integration.EPZEU.Models.SearchCriteria;
using Microsoft.Extensions.Options;
using System;

namespace EPZEU.CR.Web.App.Models.Validators
{
    public class StatementSearchCriteriaValidator : CRBasePagedSearchCriteriaValidator<StatementSearchCriteria>
    {
        public StatementSearchCriteriaValidator(IOptionsMonitor<GlobalOptions> globalOptionsAccessor) : base(globalOptionsAccessor)
        {
        }

        public override ValidationResult Validate(ValidationContext<StatementSearchCriteria> context)
        {
            var result = base.Validate(context);
            var model = context.InstanceToValidate;

            if(string.IsNullOrEmpty(model.FieldIdents))
            {
                result.Errors.Add(new ValidationFailure("DateFrom", "CR_APP_SELECT_ACT_E"));
            }

            if(model.Mode == StatementSearchModes.ByAnounceDate)
            {
                if (model.FromActionDate.HasValue && model.ToActionDate.HasValue)
                {
                    if (model.FromActionDate > model.ToActionDate)
                    {
                        result.Errors.Add(new ValidationFailure("FromActionDate", "GL_PERIOD_START_DATE_MUST_LESS_E"));
                    }
                    else
                    {
                        if (model.ToActionDate.Value.Subtract(model.FromActionDate.Value).Days > 31)
                        {
                            result.Errors.Add(new ValidationFailure("ToActionDate", "GL_NO_REPORT_INTERVAL_GREAT_MONTH_E"));
                        }
                    }

                    if (model.ToActionDate > new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 23, 59, 59))
                    {
                        result.Errors.Add(new ValidationFailure("ToActionDate", "GL_NO_CAN_EXECUTE_DATE_E"));
                    }
                }
                else
                {
                    result.Errors.Add(new ValidationFailure("FromActionDate", "CR_GL_INPUT_PERIOD_E"));
                }
            }

            return result;
        }
    }
}

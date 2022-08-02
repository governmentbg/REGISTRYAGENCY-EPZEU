using EPZEU.Common;
using FluentValidation;
using FluentValidation.Results;
using Integration.EPZEU.Models.SearchCriteria;
using Microsoft.Extensions.Options;
using System;

namespace EPZEU.CR.Web.App.Models.Validators
{
    /// <summary>
    /// Модел на валидатор за търсене за актуално състояние.
    /// </summary>
    public class NotificationSearchCriteriaValidator : CRBasePagedSearchCriteriaValidator<NotificationSearchCriteria>
    {
        public NotificationSearchCriteriaValidator(IOptionsMonitor<GlobalOptions> globalOptionsAccessor) : 
            base(globalOptionsAccessor)
        {
            RuleFor(x => x.UIC).NotEmpty().When(x => x.NotificationType == NotificationTypes.NotificationsFromRA).WithMessage("GL_INVALID_IDENTIFIER_E");
        }

        public override ValidationResult Validate(ValidationContext<NotificationSearchCriteria> context)
        {
            var result = base.Validate(context);
            var model = context.InstanceToValidate;

            if(model.EntryDateFrom.HasValue && model.EntryDateTo.HasValue)
            {
                if (model.EntryDateFrom > model.EntryDateTo)
                {
                    result.Errors.Add(new ValidationFailure("EntryDateFrom", "GL_PERIOD_START_DATE_MUST_LESS_E"));
                }
                else
                {
                    DateTime zeroTime = new DateTime(1, 1, 1);
                    TimeSpan span = model.EntryDateTo.Value - model.EntryDateFrom.Value;
                    // Because we start at year 1 for the Gregorian
                    // calendar, we must subtract a year here.
                    int years = (zeroTime + span).Year - 1;

                    if (years > 1)
                    {
                        result.Errors.Add(new ValidationFailure("EntryDateTo", "CR_GL_00001_E"));
                    }
                }

                if (model.EntryDateTo > new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 23, 59, 59))
                {
                    result.Errors.Add(new ValidationFailure("EntryDateTo", "GL_NO_CAN_EXECUTE_DATE_E"));
                }
            } 
            else if ((model.EntryDateFrom.HasValue && model.EntryDateTo == null) || (model.EntryDateTo.HasValue && model.EntryDateFrom == null))
            {
                result.Errors.Add(new ValidationFailure("EntryDateTo", "GL_INVALID_DATE_PERIOD_E"));
            }

            return result;
        }
    }
}

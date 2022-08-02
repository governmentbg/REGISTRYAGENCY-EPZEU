using EPZEU.Common;
using FluentValidation;
using FluentValidation.Results;
using Integration.EPZEU.Models.SearchCriteria;
using Microsoft.Extensions.Options;
using System;

namespace EPZEU.CR.Web.App.Models.Validators
{
    public class MasterAssignmentSearchCriteriaValidator : AbstractValidator<MasterAssignmentSearchCriteria>
    {
        public MasterAssignmentSearchCriteriaValidator(IOptionsMonitor<GlobalOptions> globalOptionsAccessor) : base()
        {
            RuleFor(m => m.Page).NotNull().When(x => x.Mode != MasterAssignmentSearchSearchMode.ByOutgoingIncomingNumber).WithMessage("GL_PAGE_REQUIRED_E");
            RuleFor(m => m.PageSize).NotNull().When(x => x.Mode != MasterAssignmentSearchSearchMode.ByOutgoingIncomingNumber).WithMessage("GL_PAGE_SIZE_REQUIRED_E");
            RuleFor(m => m.PageSize).LessThanOrEqualTo(globalOptionsAccessor.CurrentValue.GL_ITEMS_PER_PAGE.GetValueOrDefault(10))
                .When(x => x.Mode != MasterAssignmentSearchSearchMode.ByOutgoingIncomingNumber).WithMessage("GL_PAGE_SIZE_MAX_E");
        }

        public override ValidationResult Validate(ValidationContext<MasterAssignmentSearchCriteria> context)
        {
            var result = base.Validate(context);
            var model = context.InstanceToValidate;

            if (model.FromDate.HasValue && model.ToDate.HasValue)
            {
                if (model.FromDate > model.ToDate)
                {
                    result.Errors.Add(new ValidationFailure("EntryDateFrom", "GL_PERIOD_START_DATE_MUST_LESS_E"));
                }
                else
                {
                    DateTime zeroTime = new DateTime(1, 1, 1);
                    TimeSpan span = model.ToDate.Value - model.FromDate.Value;
                    // Because we start at year 1 for the Gregorian
                    // calendar, we must subtract a year here.
                    int years = (zeroTime + span).Year - 1;

                    if (years > 1)
                    {
                        result.Errors.Add(new ValidationFailure("EntryDateTo", "CR_GL_00001_E"));
                    }
                }

                if (model.ToDate > new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 23, 59, 59))
                {
                    result.Errors.Add(new ValidationFailure("EntryDateTo", "GL_NO_CAN_EXECUTE_DATE_E"));
                }
            }
            else
            {
                if (string.IsNullOrEmpty(model.UIC) && string.IsNullOrEmpty(model.IncomingNumber) && string.IsNullOrEmpty(model.OutgoingIncomingNumber))
                {
                    result.Errors.Add(new ValidationFailure("UIC", "GL_NOSELECT_SEARCH_CRITERIA_E"));
                }
            }

            return result;
        }
    }
}

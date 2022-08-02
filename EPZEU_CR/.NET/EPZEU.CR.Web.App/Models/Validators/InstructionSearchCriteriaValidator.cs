using EPZEU.Common;
using FluentValidation;
using FluentValidation.Results;
using Integration.EPZEU.Models.SearchCriteria;
using Microsoft.Extensions.Options;
using System;

namespace EPZEU.CR.Web.App.Models.Validators
{
    public class InstructionSearchCriteriaValidator : AbstractValidator<InstructionSearchCriteria>
    {
        public InstructionSearchCriteriaValidator(IOptionsMonitor<GlobalOptions> globalOptionsAccessor) : base()
        {
            RuleFor(x => x.Mode).NotNull().WithMessage("GL_INSTRUCTION_MODE_REQIURED_E");

            RuleFor(m => m.Page).NotNull().When(x => x.Mode != InstructionSearchMode.ByIncomingNumber).WithMessage("GL_PAGE_REQUIRED_E");
            RuleFor(m => m.PageSize).NotNull().When(x => x.Mode != InstructionSearchMode.ByIncomingNumber).WithMessage("GL_PAGE_SIZE_REQUIRED_E");
            RuleFor(m => m.PageSize).LessThanOrEqualTo(globalOptionsAccessor.CurrentValue.GL_ITEMS_PER_PAGE.GetValueOrDefault(10))
                .When(x => x.Mode != InstructionSearchMode.ByIncomingNumber).WithMessage("GL_PAGE_SIZE_MAX_E");

            RuleFor(x => x.UIC).NotNull().NotEmpty().When(x => x.Mode == InstructionSearchMode.ByUIC).WithMessage("GL_INPUT_FIELD_MUST_E");
            RuleFor(x => x.IncomingNumber).NotNull().NotEmpty().When(x => x.Mode == InstructionSearchMode.ByIncomingNumber).WithMessage("GL_INPUT_INCOMING_NO_E");
            RuleFor(x => x.ApplicationDateFrom).NotNull().When(x => x.Mode == InstructionSearchMode.DocumentsWithoutDeed && !x.IsActiveWithoutDeed.GetValueOrDefault()).WithMessage("GL_INPUT_DATE_E");
            RuleFor(x => x.ApplicationDateTo).NotNull().When(x => x.Mode == InstructionSearchMode.DocumentsWithoutDeed && !x.IsActiveWithoutDeed.GetValueOrDefault()).WithMessage("GL_INPUT_DATE_E");            
        }

        public override ValidationResult Validate(ValidationContext<InstructionSearchCriteria> context)
        {
            var result = base.Validate(context);
            var model = context.InstanceToValidate;

            if (model.Mode == InstructionSearchMode.DocumentsWithoutDeed && 
                !model.IsActiveWithoutDeed.GetValueOrDefault())
            {
                if (model.ApplicationDateFrom.HasValue && model.ApplicationDateTo.HasValue)
                {
                    if (model.ApplicationDateFrom > model.ApplicationDateTo)
                    {
                        result.Errors.Add(new ValidationFailure("ApplicationDateFrom", "GL_PERIOD_START_DATE_MUST_LESS_E"));
                    }
                    else
                    {
                        DateTime zeroTime = new DateTime(1, 1, 1);
                        TimeSpan span = model.ApplicationDateTo.Value - model.ApplicationDateFrom.Value;
                        // Because we start at year 1 for the Gregorian
                        // calendar, we must subtract a year here.
                        int years = (zeroTime + span).Year - 1;

                        if (years > 1)
                        {
                            result.Errors.Add(new ValidationFailure("ApplicationDateTo", "CR_GL_00001_E"));
                        }
                    }

                    if (model.ApplicationDateTo > new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 23, 59, 59))
                    {
                        result.Errors.Add(new ValidationFailure("ApplicationDateTo", "GL_NO_CAN_EXECUTE_DATE_E"));
                    }
                }
                else
                {
                    result.Errors.Add(new ValidationFailure("ApplicationDateTo", "CR_GL_INPUT_PERIOD_E"));
                }
            }
            
            return result;
        }
    }
}

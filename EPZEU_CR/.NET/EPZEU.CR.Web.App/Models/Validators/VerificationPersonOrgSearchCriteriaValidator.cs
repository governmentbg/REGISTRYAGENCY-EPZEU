using EPZEU.Common;
using EPZEU.CR.Web.App.Models.Deeds;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.Extensions.Options;

namespace EPZEU.CR.Web.App.Models.Validators
{
    public class VerificationPersonOrgSearchCriteriaValidator : BasePagedSearchCriteriaValidator<VerificationPersonOrgSearchCriteria>
    {
        public VerificationPersonOrgSearchCriteriaValidator(IOptionsMonitor<GlobalOptions> globalOptionsAccessor) : base(globalOptionsAccessor)
        {
            RuleFor(x => x.Ident).Matches("[0-9]{6,10}").WithMessage("GL_INVALID_IDENTIFIER_E");
        }

        public override ValidationResult Validate(ValidationContext<VerificationPersonOrgSearchCriteria> context)
        {
            var result = base.Validate(context);
            var model = context.InstanceToValidate;

            if (string.IsNullOrEmpty(model.Ident) && string.IsNullOrEmpty(model.Name))
            {
                result.Errors.Add(new ValidationFailure("Ident", "GL_NOSELECT_SEARCH_CRITERIA_E"));
            }

            return result;
        }
    }
}

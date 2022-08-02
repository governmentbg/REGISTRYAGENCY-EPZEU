using EPZEU.CR.Web.App.Models.Deeds;
using FluentValidation;

namespace EPZEU.CR.Web.App.Models.Validators
{
    public class VerificationActsSubSearchCriteriaValidator : AbstractValidator<VerificationActsSubSearchCriteria>
    {
        public VerificationActsSubSearchCriteriaValidator()
        {
            RuleFor(x => x.SelectedFields).NotEmpty().WithMessage("GL_SELECT_FIELD_E");
        }
    }
}

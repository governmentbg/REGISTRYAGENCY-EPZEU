using FluentValidation;
using Integration.EPZEU.Models.SearchCriteria;

namespace EPZEU.CR.Web.App.Models.Validators
{
    public class SubjectInFieldSearchCriteriaValidator : AbstractValidator<SubjectInFieldSearchCriteria>
    {
        public SubjectInFieldSearchCriteriaValidator()
        {
            RuleFor(x => x.UID).NotEmpty().WithMessage("GL_INPUT_FIELD_MUST_E");
        }
    }
}

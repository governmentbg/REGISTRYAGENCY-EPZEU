using EPZEU.Common;
using FluentValidation;
using Integration.EPZEU.Models.SearchCriteria;
using Microsoft.Extensions.Options;

namespace EPZEU.CR.Web.App.Models.Validators
{
    public class CompanyProtrectionRightsSearchCriteriaValidator : CRBasePagedSearchCriteriaValidator<CompanyProtrectionRightsSearchCriteria>
    {
        public CompanyProtrectionRightsSearchCriteriaValidator(IOptionsMonitor<GlobalOptions> globalOptionsAccessor) : base(globalOptionsAccessor)
        {
            RuleFor(x => x.Name).NotEmpty().WithMessage("GL_INPUT_FIELD_MUST_E");
        }
    }
}

using EPZEU.Common;
using FluentValidation;
using Integration.EPZEU.Models.SearchCriteria;
using Microsoft.Extensions.Options;

namespace EPZEU.CR.Web.App.Models.Validators
{
    public class CRBasePagedSearchCriteriaValidator<T> : AbstractValidator<T>
        where T : BasePagedSearchCriteria
    {
        public CRBasePagedSearchCriteriaValidator(IOptionsMonitor<GlobalOptions> globalOptionsAccessor) : base()
        {
            RuleFor(m => m.Page).NotNull().WithMessage("GL_PAGE_REQUIRED_E");
            RuleFor(m => m.PageSize).NotNull().WithMessage("GL_PAGE_SIZE_REQUIRED_E");
            RuleFor(m => m.PageSize).LessThanOrEqualTo(globalOptionsAccessor.CurrentValue.GL_ITEMS_PER_PAGE.GetValueOrDefault(10)).WithMessage("GL_PAGE_SIZE_MAX_E");
        }
    }
}

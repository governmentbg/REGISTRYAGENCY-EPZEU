using EPZEU.Common;
using EPZEU.Common.Models;
using FluentValidation;
using Microsoft.Extensions.Options;

namespace EPZEU.CR.Web.App.Models.Validators
{
    public class BasePagedSearchCriteriaValidator<T> : AbstractValidator<T>
        where T : BasePagedSearchCriteria
    {
        public BasePagedSearchCriteriaValidator(IOptionsMonitor<GlobalOptions> globalOptionsAccessor): base()
        {
            RuleFor(m => m.Page).NotNull().WithMessage("GL_PAGE_REQUIRED_E");
            RuleFor(m => m.Page).GreaterThan(0).WithMessage("GL_INVALID_VALUE_L");
            RuleFor(m => m.PageSize).NotNull().WithMessage("GL_PAGE_SIZE_REQUIRED_E");
            RuleFor(m => m.PageSize).GreaterThan(0).WithMessage("GL_INVALID_VALUE_L");
            RuleFor(m => m.PageSize).LessThanOrEqualTo(globalOptionsAccessor.CurrentValue.GL_ITEMS_PER_PAGE.GetValueOrDefault(10)).WithMessage("GL_PAGE_SIZE_MAX_E");
        }
    }
}

using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F212_PledgeMoneyView : FieldViewBase<F212_PledgeMoney>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F212_PledgeMoney field)
        {
            ObjectHtmlDisplay(writer, field.Price);
        }
    }
}
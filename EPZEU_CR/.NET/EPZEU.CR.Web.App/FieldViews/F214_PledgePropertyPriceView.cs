using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F214_PledgePropertyPriceView : FieldViewBase<F214_PledgePropertyPrice>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F214_PledgePropertyPrice field)
        {
            ObjectHtmlDisplay(writer, field.Price);
        }
    }
}
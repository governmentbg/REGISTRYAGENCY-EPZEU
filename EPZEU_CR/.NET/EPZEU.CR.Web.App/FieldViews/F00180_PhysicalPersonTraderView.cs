using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F018_PhysicalPersonTraderView : FieldViewBase<F018_PhysicalPersonTrader>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F018_PhysicalPersonTrader field)
        {
            ObjectHtmlDisplay(writer, field.Person);
        }
    }
}
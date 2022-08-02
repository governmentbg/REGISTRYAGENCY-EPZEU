using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F005a_SeatForCorrespondenceView : FieldViewBase<F005a_SeatForCorrespondence>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F005a_SeatForCorrespondence field)
        {
            ObjectHtmlDisplay(writer, field.Address);
        }
    }
}
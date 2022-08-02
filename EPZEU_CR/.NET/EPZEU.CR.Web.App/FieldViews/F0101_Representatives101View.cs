using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F0101_Representatives101View : FieldViewBase<F0101_Representatives101>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F0101_Representatives101 field)
        {
            WrapRecordListForDisplay(writer, field.RepresentativeList, (wr, f) =>
            {
                ObjectHtmlDisplay(wr, f.Subject);
            });
        }
    }
}
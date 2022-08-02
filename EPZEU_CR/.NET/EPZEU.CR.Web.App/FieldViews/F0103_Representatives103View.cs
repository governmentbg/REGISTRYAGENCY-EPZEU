using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F0103_Representatives103View : FieldViewBase<F0103_Representatives103>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F0103_Representatives103 field)
        {
            WrapRecordListForDisplay(writer, field.RepresentativeList, (wr, f) =>
            {
                ObjectHtmlDisplay(wr, f.Person);
            });
        }
    }
}
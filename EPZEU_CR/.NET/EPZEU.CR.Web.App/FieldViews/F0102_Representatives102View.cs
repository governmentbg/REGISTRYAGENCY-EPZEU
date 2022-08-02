using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F0102_Representatives102View : FieldViewBase<F0102_Representatives102>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F0102_Representatives102 field)
        {
            WrapRecordListForDisplay(writer, field.RepresentativeList, (wr, f) =>
            {
                ObjectHtmlDisplay(wr, f.Person);
            });
        }
    }
}
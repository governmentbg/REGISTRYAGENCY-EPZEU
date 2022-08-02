using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F201_PledgorsView : FieldViewBase<F201_Pledgors>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F201_Pledgors field)
        {
            WrapRecordListForDisplay(writer, field.PledgorList, (wr, f) =>
            {
                ObjectHtmlDisplay(wr, f.Subject);
                //TRIR-5245
                //wr.Write("<br/>");
                //ObjectHtmlDisplay(wr, f.Address);
                //wr.Write("<br/>");
            });
        }
    }
}
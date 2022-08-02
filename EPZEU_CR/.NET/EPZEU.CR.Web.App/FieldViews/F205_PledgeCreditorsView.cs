using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F205_PledgeCreditorsView : FieldViewBase<F205_PledgeCreditors>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F205_PledgeCreditors field)
        {
            WrapRecordListForDisplay(writer, field.PledgeCreditorsList, (wr, f) =>
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

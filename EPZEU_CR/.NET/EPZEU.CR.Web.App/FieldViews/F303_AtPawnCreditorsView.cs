using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F303_AtPawnCreditorsView : FieldViewBase<F303_AtPawnCreditors>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F303_AtPawnCreditors field)
        {
            WrapRecordListForDisplay(writer, field.AtPawnCreditorsList, (wr, f) => {
                ObjectHtmlDisplay(wr, f.Subject);
                //TRIR-5245
                //writer.Write("<br/>");
                //ObjectHtmlDisplay(wr, f.Address);
            });
        }
    }
}

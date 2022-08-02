using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F401_DistraintsView : FieldViewBase<F401_Distraints>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F401_Distraints field)
        {
            WrapRecordListForDisplay(writer, field.DistraintsList, (wr, f) => {              
                ObjectHtmlDisplay(wr, f.Subject);
                //TRIR-5245
                //writer.Write("<br/>");
                //ObjectHtmlDisplay(wr, f.Address);
            });
        }
    }
}

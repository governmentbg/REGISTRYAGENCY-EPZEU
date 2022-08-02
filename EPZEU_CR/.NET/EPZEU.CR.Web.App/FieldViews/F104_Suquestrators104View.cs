using EPZEU.CR.Domain.Fields;
using System.IO;
using System.Web;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F104_Suquestrators104View : FieldViewBase<F104_Suquestrators104>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F104_Suquestrators104 field)
        {
            WrapRecordListForDisplay(writer, field.SuquestratorList, (wr, f) =>
            {
                ObjectHtmlDisplay(wr, f.Person);
                wr.Write("<br/>");
                wr.Write(LocalizeLabel("CR_APP_APPOINTED_TO_L"));
                wr.Write(": ");
                wr.Write(HttpUtility.HtmlEncode(f.AppointedTill));
                wr.Write(" ");
                wr.Write(LocalizeLabel("GL_YEAR_ABBREVIATION_L"));
            });
        }
    }
}

using EPZEU.CR.Domain.Fields;
using System.IO;
using System.Web;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F109_Suquestrators109View : FieldViewBase<F109_Suquestrators109>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F109_Suquestrators109 field)
        {
            WrapRecordListForDisplay(writer, field.SuquestratorList, (wr, f) =>
            {
                ObjectHtmlDisplay(wr, f.Person);
                writer.Write("<br/>");
                writer.Write(LocalizeLabel("CR_APP_APPOINTED_TO_L"));
                writer.Write(": ");
                writer.Write(HttpUtility.HtmlEncode(f.AppointedTill));
                writer.Write(" ");
                writer.Write(LocalizeLabel("GL_YEAR_ABBREVIATION_L"));
            });
        }
    }
}

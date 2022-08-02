using EPZEU.CR.Domain.Fields;
using System.IO;
using System.Web;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F113_Suquestrators113View : FieldViewBase<F113_Suquestrators113>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F113_Suquestrators113 field)
        {
            WrapRecordListForDisplay(writer, field.SuquestratorsList, (wr, f) =>
            {
                ObjectHtmlDisplay(wr, f.Person);
                wr.Write("<br/>");
                wr.Write(LocalizeLabel("CR_APP_APPOINTED_TO_L")); /*Назначен до*/
                wr.Write(": ");
                wr.Write(HttpUtility.HtmlEncode(f.AppointedTill));
                wr.Write(" ");
                wr.Write(LocalizeLabel("GL_YEAR_ABBREVIATION_L"));
                wr.Write("<br/>");
            });
        }
    }
}

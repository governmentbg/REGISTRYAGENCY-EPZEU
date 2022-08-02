using EPZEU.CR.Domain.Fields;
using System.IO;
using System.Web;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F207a_ContractOfPledgeForShareView : FieldViewBase<F207a_ContractOfPledgeForShare>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F207a_ContractOfPledgeForShare field)
        {
            if (!string.IsNullOrEmpty(field.Text))
            {
                writer.Write(HttpUtility.HtmlEncode(field.Text));
                writer.Write(" ");
                writer.Write(LocalizeLabel("GL_YEAR_ABBREVIATION_L"));
            }
        }
    }
}

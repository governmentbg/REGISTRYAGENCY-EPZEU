using EPZEU.CR.Domain.Fields;
using System.IO;
using System.Web;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F316_PropertyOverExecutionView : FieldViewBase<F316_PropertyOverExecution>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F316_PropertyOverExecution field)
        {
            if (field.WholeCompany)
            {
                writer.Write(LocalizeLabel("CR_APP_ENTERPRISE_AS_WHOLE_L"));
            }

            if (field.PartOfCompany)
            {
                writer.Write(LocalizeLabel("CR_APP_SEPARATE_ASSETS_ENTERPRISE_L"));
                writer.Write(": ");
                writer.Write(HttpUtility.HtmlEncode(field.AssetsOfCompany));
            }
        }
    }
}

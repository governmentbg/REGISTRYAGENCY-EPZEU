using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F311_DescriptionView : FieldViewBase<F311_Description>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F311_Description field)
        {
            string result = string.Empty;

            if (field.WholeCompany)
            {
                writer.Write(LocalizeLabel("CR_APP_ENTERPRISE_AS_WHOLE_L"));
            }
            else
            {
                writer.Write(LocalizeLabel("CR_APP_PART_ENTERPRISE_L"));
            }
        }
    }
}

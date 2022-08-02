using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F326_DateOfRenewingDistraintView : FieldViewBase<F326_DateOfRenewingDistraint>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F326_DateOfRenewingDistraint field)
        {
            if(field.ProcessingRenewDistraintRequired.GetValueOrDefault())
            {
                writer.Write(LocalizeLabel("CR_APP_RENEWAL_ENTRY_BET_L"));
            }

            if(!string.IsNullOrEmpty(field.Text))
            {
                if (field.ProcessingRenewDistraintRequired.GetValueOrDefault())
                    writer.Write("<br/>");

                writer.Write(field.Text);
            }
        }
    }
}

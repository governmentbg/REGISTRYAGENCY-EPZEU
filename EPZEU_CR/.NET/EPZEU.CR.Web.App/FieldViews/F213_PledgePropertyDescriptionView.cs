using EPZEU.CR.Domain.Fields;
using System.IO;
using System.Web;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F213_PledgePropertyDescriptionView : FieldViewBase<F213_PledgePropertyDescription>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F213_PledgePropertyDescription field)
        {
            if (field.CorporateShare)
            {
                writer.Write(LocalizeLabel("CR_APP_CORPORATE_SHARE_L"));
            }

            if (field.PartOfCorporateShare)
            {
                writer.Write(LocalizeLabel("CR_APP_PART_CORPORATE_SHARE_L"));
            }

            if (field.CorporateShare && (!string.IsNullOrEmpty(field.SharesCount) || !string.IsNullOrEmpty(field.Nominal)))
            {
                writer.Write("<br/>");
            }

            if (!string.IsNullOrEmpty(field.SharesCount))
            {
                writer.Write(LocalizeLabel("CR_APP_PROPORTION_NUMBER_PLEDGE_L"));
                writer.Write(": ");
            }

            writer.Write(HttpUtility.HtmlEncode(field.SharesCount));

            if (!string.IsNullOrEmpty(field.Nominal))
            {
                writer.Write("</br>");
                writer.Write(LocalizeLabel("CR_GL_NOMINAL_VALUE_L"));
                writer.Write(": ");
                writer.Write(HttpUtility.HtmlEncode(field.Nominal));
                writer.Write(LocalizeLabel("GL_BGN_ABBRAVETION_L"));
            }

            if (field.CorporateShare || field.PartOfCorporateShare || (!string.IsNullOrEmpty(field.SharesCount) || !string.IsNullOrEmpty(field.Nominal)))
            {
                writer.Write("</br>");
            }

            if(!string.IsNullOrEmpty(field.Capital))
            {
                writer.Write(LocalizeLabel("CR_APP_PART_CAPITAL_CORPORATE_SHARE_L"));
                writer.Write(": ");
                writer.Write(field.Capital);
                writer.Write(" ");
                writer.Write(LocalizeLabel("GL_BGN_ABBRAVETION_L"));
            }
        }
    }
}
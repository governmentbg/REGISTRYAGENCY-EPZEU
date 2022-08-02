using EPZEU.CR.Domain.Fields;
using System.IO;
using System.Linq;
using System.Web;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F321_DistraintDataView : FieldViewBase<F321_DistraintData>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F321_DistraintData field)
        {
            ObjectHtmlDisplay(writer, field.Subject);
            //TRIR-5245
            //writer.Write("<br/>");
            //ObjectHtmlDisplay(writer, field.Address);
            writer.Write("<br/>");
            writer.Write(LocalizeLabel("CR_GL_REASON_L"));
            writer.Write(": ");

            if (field.Court)
            {
                writer.Write(LocalizeLabel("GL_COURT_CODE_L"));
                writer.Write("<br/>");
            }

            if (field.LegalExecutor)
            {
                writer.Write(LocalizeLabel("CR_APP_BAILIFF_L"));
                writer.Write("<br/>");
            }

            if (field.ADV)
            {
                writer.Write(LocalizeLabel("CR_APP_ADV_L"));
                writer.Write("<br/>");
            }

            if (!string.IsNullOrEmpty(field.CourtLegalExecutor))
            {
                writer.Write(LocalizeLabel("CR_APP_COURT_BAILIFF_L"));
                writer.Write(": ");

                if (field.Court)
                {
                    var courtLegalExecutor = this.Authorities.GetAuthorities().SingleOrDefault(x => x.AuthorityID.ToString() == field.CourtLegalExecutor);

                    if (courtLegalExecutor != null && !string.IsNullOrEmpty(courtLegalExecutor.AuthorityName))
                    {
                        writer.Write(HttpUtility.HtmlEncode(courtLegalExecutor.AuthorityName));
                    }
                }
                else
                {
                    writer.Write(HttpUtility.HtmlEncode(field.CourtLegalExecutor));
                }

                if (!string.IsNullOrEmpty(field.CaseNumber))
                {
                    writer.Write(", ");
                }
                else
                {
                    writer.Write("<br/>");
                }
            }

            if(!string.IsNullOrEmpty(field.CaseNumber))
            {
                writer.Write(LocalizeLabel("CR_APP_COURT_NUMBER_L"));
                writer.Write(": ");
                writer.Write(HttpUtility.HtmlEncode(field.CaseNumber));
                writer.Write("<br/>");
            }

            if(field.IncomingAmount || field.RemainingAmount || field.EnterprisesLikeCombination || field.SeparateAssets)
            {
                writer.Write(LocalizeLabel("CR_APP_ARREST_ON_L"));
                writer.Write(": ");

                if (field.IncomingAmount)
                {
                    writer.Write(LocalizeLabel("CR_APP_AMOUNT_RECEIVED_DISTRIBUTION_L"));
                    writer.Write("<br/>");
                }

                if (field.RemainingAmount)
                {
                    writer.Write(LocalizeLabel("CR_APP_00046_L"));
                    writer.Write("<br/>");
                }

                if (field.EnterprisesLikeCombination)
                {
                    writer.Write(LocalizeLabel("CR_APP_ENTERPRISE_AS_WHOLE_L"));
                    writer.Write("<br/>");
                }

                if (field.SeparateAssets)
                {
                    writer.Write(LocalizeLabel("CR_APP_SEPARATE_ASSETS_ENTERPRISE_L"));

                    if (!string.IsNullOrEmpty(field.AssetsOfCompany))
                    {
                        writer.Write(" ");
                        writer.Write(HttpUtility.HtmlEncode(field.AssetsOfCompany));
                    }

                    writer.Write("<br/>");
                }
            }

            if (field.Price != null)
            {
                ObjectHtmlDisplay(writer, field.Price);
            }
        }
    }
}

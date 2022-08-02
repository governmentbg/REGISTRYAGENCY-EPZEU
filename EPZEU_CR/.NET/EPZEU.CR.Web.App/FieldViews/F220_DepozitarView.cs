using EPZEU.CR.Domain.Fields;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F220_DepozitarView : FieldViewBase<F220_Depozitar>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F220_Depozitar field)
        {
            if (field.DepozitarDistraintDetails != null)
            {
                WrapRecordForDisplay(writer, field.DepozitarDistraintDetails, (wr, f) =>
                {
                    ObjectHtmlDisplay(wr, f.Subject);
                    writer.Write("<br/>");
                    //TRIR-5245
                    //ObjectHtmlDisplay(wr, f.Address);
                    //writer.Write("<br/>");

                    writer.Write(LocalizeLabel("CR_GL_REASON_L"));
                    writer.Write(": ");

                    if (f.ReasonCourt)
                    {
                        writer.Write(LocalizeLabel("GL_COURT_CODE_L"));
                    }
                    else if (f.ReasonCourtExecuter)
                    {
                        writer.Write(LocalizeLabel("CR_APP_BAILIFF_L"));
                    }
                    else if (f.ReasonADV)
                    {
                        writer.Write(LocalizeLabel("CR_APP_ADV_L"));
                    }

                    writer.Write("<br/>");

                    if (!string.IsNullOrEmpty(f.Court))
                    {
                        writer.Write(LocalizeLabel("CR_APP_COURT_BAILIFF_L"));
                        writer.Write(": ");

                        if (f.ReasonCourt)
                        {
                            var courtLegalExecutor = Authorities.GetAuthorities().SingleOrDefault(x => x.AuthorityID.ToString() == f.Court);

                            if (courtLegalExecutor != null && !string.IsNullOrEmpty(courtLegalExecutor.AuthorityName))
                            {
                                writer.Write(HttpUtility.HtmlEncode(courtLegalExecutor.AuthorityName));
                            }
                        }
                        else
                        {
                            writer.Write(HttpUtility.HtmlEncode(f.Court));
                        }

                        if (!string.IsNullOrEmpty(f.CaseNo))
                        {
                            writer.Write(", ");
                        }
                        else
                        {
                            writer.Write("<br/>");
                        }
                    }

                    if (!string.IsNullOrEmpty(f.CaseNo))
                    {
                        writer.Write(LocalizeLabel("CR_APP_COURT_NUMBER_L"));
                        writer.Write(": ");
                        writer.Write(f.CaseNo);
                        writer.Write("<br />");
                    }

                    if (f.IncomingDistraint)
                    {
                        writer.Write(LocalizeLabel("CR_APP_ARREST_ON_L"));
                        writer.Write(" ");
                        writer.Write(LocalizeLabel("CR_APP_AMOUNT_RECEIVED_DISTRIBUTION_L"));
                        writer.Write("<br/>");

                        writer.Write(LocalizeLabel("CR_APP_00045_L"));
                        writer.Write(": ");
                        writer.Write(LocalizeLabel("CR_GL_PROPORTION_NUMBER_L"));
                        writer.Write(": ");
                        writer.Write(HttpUtility.HtmlEncode(f.PartCount));
                        writer.Write(", ");
                        writer.Write(LocalizeLabel("GL_VALUE_L"));
                        writer.Write(": ");
                        writer.Write(HttpUtility.HtmlEncode(f.PartValue));
                    }
                });
            }


            WrapRecordListForDisplay(writer, field.DepozitarDistraintList, (wr, f) => ObjectHtmlDisplay(wr, f.Subject));

            if (field.DepozitarReminderDistraint != null)
            {
                WrapRecordForDisplay(writer, field.DepozitarReminderDistraint, (wr, f) =>
                {
                    if (f.ReminderDistraint)
                    {
                        wr.Write(LocalizeLabel("CR_APP_ARREST_ON_L"));
                        wr.Write(" ");
                        wr.Write(LocalizeLabel("CR_APP_00046_L"));
                        wr.Write(": ");
                        wr.Write(f.Value);
                        wr.Write(" ");
                        wr.Write(f.Currency);
                    }
                });
            }
        }
    }
}
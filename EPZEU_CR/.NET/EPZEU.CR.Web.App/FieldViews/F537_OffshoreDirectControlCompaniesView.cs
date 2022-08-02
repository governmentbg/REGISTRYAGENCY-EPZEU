using EPZEU.CR.Domain.Fields;
using EPZEU.CR.Domain.Fields.Common;
using System.IO;
using System.Web;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F537_OffshoreDirectControlCompaniesView : FieldViewBase<F537_OffshoreDirectControlCompanies>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F537_OffshoreDirectControlCompanies field)
        {
            if (field.OffshoreDirectControlCompany != null)
            {
                WrapRecordForDisplay(writer, field.OffshoreDirectControlCompany, (w, r) => 
                {
                    if (!string.IsNullOrEmpty(r.Name))
                    {
                        w.Write(LocalizeLabel("CR_GL_COMPANY_NAME_L"));
                        w.Write(": ");
                        w.Write(HttpUtility.HtmlEncode(r.Name));
                    }
                });
            }

            if (field.OffshoreDirectControlCompanyLegalForm != null)
            {
                WrapRecordForDisplay(writer, field.OffshoreDirectControlCompanyLegalForm, (w, r) =>
                {
                    if (!string.IsNullOrEmpty(r.DCLegalForm))
                    {
                        w.Write(LocalizeLabel("GL_LEGAL_FORM_L"));
                        w.Write(": ");
                        w.Write(HttpUtility.HtmlEncode(r.DCLegalForm));
                    }
                });
            }

            if (field.OffshoreDirectControlCompanyTransliteration != null)
            {
                WrapRecordForDisplay(writer, field.OffshoreDirectControlCompanyTransliteration, (w, r) =>
                {
                    if (!string.IsNullOrEmpty(r.DCTransliteration))
                    {
                        w.Write(LocalizeLabel("CR_GL_WRITE_FOREIGN_LANG_L"));
                        w.Write(": ");
                        w.Write(HttpUtility.HtmlEncode(r.DCTransliteration));
                    }
                });
            }

            if (field.OffshoreDirectControlCompanyNumberInRegister != null)
            {
                WrapRecordForDisplay(writer, field.OffshoreDirectControlCompanyNumberInRegister, (w, r) =>
                {
                    if (!string.IsNullOrEmpty(r.DCNumberInRegister))
                    {
                        w.Write(LocalizeLabel("CR_APP_ENTRY_NO_REGISTER_L"));
                        w.Write(": ");
                        w.Write(HttpUtility.HtmlEncode(r.DCNumberInRegister));
                    }
                });
            }

            if (field.OffshoreDirectControlCompanyAddress != null)
            {
                WrapRecordForDisplay(writer, field.OffshoreDirectControlCompanyAddress, (w, r) =>
                {
                    if (!r.Address.IsEmpty())
                    {
                        w.Write(LocalizeLabel("CR_APP_00092_L"));
                        w.Write("<br/>");
                        ObjectHtmlDisplay(w, r.Address);
                        w.Write("<br/>");
                    }

                    ObjectHtmlDisplay(w, r.Contacts);
                });
            }

            if (field.OffshoreDirectControlCompanyWayOfRepresentation != null)
            {
                WrapRecordForDisplay(writer, field.OffshoreDirectControlCompanyWayOfRepresentation, (w, r) =>
                {
                    w.Write(LocalizeLabel("CR_APP_00094_L"));
                    w.Write("<br/>");
                    ObjectHtmlDisplay<MannerRecordHolder>(w, r);
                });
            }
        }
    }
}

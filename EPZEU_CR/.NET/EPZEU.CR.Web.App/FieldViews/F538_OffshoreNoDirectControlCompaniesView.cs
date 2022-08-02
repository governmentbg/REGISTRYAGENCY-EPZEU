using EPZEU.CR.Domain.Fields;
using EPZEU.CR.Domain.Fields.Common;
using System.IO;
using System.Web;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F538_OffshoreNoDirectControlCompaniesView : FieldViewBase<F538_OffshoreNoDirectControlCompanies>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F538_OffshoreNoDirectControlCompanies field)
        {
            //OffshoreNoDirectControlCompany
            if (field.OffshoreNoDirectControlCompany != null)
            {
                WrapRecordForDisplay(writer, field.OffshoreNoDirectControlCompany, (w, r) => 
                {
                    if (!string.IsNullOrEmpty(r.Name))
                    {
                        w.Write(LocalizeLabel("CR_GL_COMPANY_NAME_L"));
                        w.Write(": ");
                        w.Write(HttpUtility.HtmlEncode(r.Name));
                    }
                });
            }

            //OffshoreNoDirectControlCompanyLegalForm
            if (field.OffshoreNoDirectControlCompanyLegalForm != null)
            {
                WrapRecordForDisplay(writer, field.OffshoreNoDirectControlCompanyLegalForm, (w, r) =>
                {
                    if (!string.IsNullOrEmpty(r.NDCLegalForm))
                    {
                        w.Write(LocalizeLabel("GL_LEGAL_FORM_L"));
                        w.Write(": ");
                        w.Write(HttpUtility.HtmlEncode(r.NDCLegalForm));
                    }
                });
            }

            //OffshoreNoDirectControlCompanyTransliteration
            if (field.OffshoreNoDirectControlCompanyTransliteration != null)
            {
                WrapRecordForDisplay(writer, field.OffshoreNoDirectControlCompanyTransliteration, (w, r) =>
                {
                    if (!string.IsNullOrEmpty(r.NDCTransliteration))
                    {
                        w.Write(LocalizeLabel("CR_GL_WRITE_FOREIGN_LANG_L"));
                        w.Write(": ");
                        w.Write(HttpUtility.HtmlEncode(r.NDCTransliteration));
                    }
                });
            }

            //OffshoreNoDirectControlCompanyNumberInRegister
            if (field.OffshoreNoDirectControlCompanyNumberInRegister != null)
            {
                WrapRecordForDisplay(writer, field.OffshoreNoDirectControlCompanyNumberInRegister, (w, r) =>
                {
                    if (!string.IsNullOrEmpty(r.NDCNumberInRegister))
                    {
                        w.Write(LocalizeLabel("CR_APP_ENTRY_NO_REGISTER_L"));
                        w.Write(": ");
                        w.Write(HttpUtility.HtmlEncode(r.NDCNumberInRegister));
                    }
                });
            }

            //OffshoreNoDirectControlCompanyAddress
            if (field.OffshoreNoDirectControlCompanyAddress != null)
            {
                WrapRecordForDisplay(writer, field.OffshoreNoDirectControlCompanyAddress, (w, r) =>
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

            //OffshoreNoDirectControlCompanyWayOfRepresentation
            if (field.OffshoreNoDirectControlCompanyWayOfRepresentation != null)
            {
                WrapRecordForDisplay(writer, field.OffshoreNoDirectControlCompanyWayOfRepresentation, (w, r) =>
                {
                    w.Write(LocalizeLabel("CR_APP_00094_L"));
                    w.Write("<br/>");
                    ObjectHtmlDisplay<MannerRecordHolder>(w, r);
                });
            }
        }
    }
}

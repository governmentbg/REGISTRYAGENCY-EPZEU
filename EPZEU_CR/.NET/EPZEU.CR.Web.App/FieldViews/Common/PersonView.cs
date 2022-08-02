using EPZEU.CR.Domain.Fields.Common;
using System;
using System.IO;
using System.Web;

namespace EPZEU.CR.Web.App.FieldViews.Common
{
    public class PersonView : ObjectViewBase<Person>
    {
        protected override void ToHtmlDisplayInternal(TextWriter writer, Person model)
        {
            if (model.IndentType == IndentTypes.EGN || model.IndentType == IndentTypes.BirthDate || model.IndentType == IndentTypes.LNCH)
            {
                if (!string.IsNullOrEmpty(model.Name))
                    writer.Write(HttpUtility.HtmlEncode(model.Name));
                else
                    writer.Write(LocalizeLabel("CR_GL_MISSING_NAME_L"));

                if (model.IsForeignTrader.GetValueOrDefault())
                {
                    writer.Write(", ");
                    writer.Write(LocalizeLabel("CR_GL_FOREIGN_LEGAL_ENTITY_L"));
                }

                if (!string.IsNullOrEmpty(model.CountryName))
                {
                    writer.Write(", ");
                    writer.Write(LocalizeLabel("GL_COUNTRY_L"));
                    writer.Write(": ");
                    writer.Write(model.CountryName);
                }
            }
            else
            {
                string identType = string.Empty;

                switch (model.IndentType)
                {
                    case IndentTypes.UIC:
                        identType = LocalizeLabel("CR_GL_COMPANY_ID_L");
                        break;
                    case IndentTypes.Bulstat:
                        identType = LocalizeLabel("GL_BULSTAT_L");
                        break;
                    default:
                        identType = LocalizeLabel("GL_IDENTIFICATION_L");
                        break;
                }

                string legalForm = GetLegalFormText(model.ForeignLegalFormCode, model.LegalForm);
                string register = GetRegisterText(model.ForeignRegisterCode, model.CompetentAuthorityForRegistration);

                if (!string.IsNullOrEmpty(model.Name))
                    writer.Write(HttpUtility.HtmlEncode(model.Name));
                else
                    writer.Write(LocalizeLabel("CR_GL_MISSING_NAME_L"));

                if (!string.IsNullOrEmpty(model.Indent))
                {
                    writer.Write(", ");
                    writer.Write(identType);
                    writer.Write(" ");
                    writer.Write(HttpUtility.HtmlEncode(model.Indent));
                }

                if (model.IsForeignTrader.GetValueOrDefault())
                {
                    writer.Write(", ");
                    writer.Write(LocalizeLabel("CR_GL_FOREIGN_LEGAL_ENTITY_L"));
                }

                if (!string.IsNullOrEmpty(model.CountryName))
                {
                    writer.Write(", ");
                    writer.Write(LocalizeLabel("GL_COUNTRY_L"));
                    writer.Write(": ");
                    writer.Write(model.CountryName);
                }

                if (!string.IsNullOrEmpty(legalForm))
                {
                    writer.Write(", ");
                    writer.Write(LocalizeLabel("GL_LEGAL_FORM_L"));
                    writer.Write(": ");
                    writer.Write(legalForm);
                }

                writer.Write(register);

                if (!string.IsNullOrEmpty(model.RegistrationNumber))
                {
                    writer.Write(", ");
                    writer.Write(LocalizeLabel("CR_GL_REGISTRATION_NUMBER_L"));
                    writer.Write(": ");
                    writer.Write(model.RegistrationNumber);
                }

                if (!string.IsNullOrEmpty(model.Position))
                {
                    writer.Write(", ");
                    writer.Write(LocalizeLabel("GL_POSITION_L"));
                    writer.Write(": ");
                    writer.Write(model.Position);
                }
            }
        }

        #region Helpers

        private string GetLegalFormText(string legalFormCode, string legalForm)
        {
            var result = String.Empty;

            if (!string.IsNullOrEmpty(legalFormCode))
            {
                var lf = ForeignLegalForms.GetForeignLegalForm(legalFormCode);

                if (lf != null)
                {
                    if (lf.IsOther)
                        result = legalForm;
                    else
                        result = lf.Name;
                }
            }
            else
                result = legalForm;

            return result;
        }

        private string GetRegisterText(string regCode, string competentAuthorityForRegistration)
        {
            var result = String.Empty;

            if (!string.IsNullOrEmpty(regCode))
            {
                var reg = ForeignComRegisters.GetForeignComRegister(regCode);

                if (reg != null)
                {
                    if (reg.IsOther)
                        result = string.Format(", {0}: {1}", LocalizeLabel("GL_REGISTER_L"), competentAuthorityForRegistration);
                    else
                        result = string.Format(", {0}: {1}", LocalizeLabel("CR_GL_COMPANY_TRADE_CENTRAL_REGISTER_L"), reg.NameOriginal);
                }
            }
            else
            {
                if (!string.IsNullOrEmpty(competentAuthorityForRegistration))
                {
                    result = string.Format(", {0}: {1}", LocalizeLabel("GL_REGISTER_L"), competentAuthorityForRegistration);
                }
            }

            return result;
        }

        #endregion
    }
}

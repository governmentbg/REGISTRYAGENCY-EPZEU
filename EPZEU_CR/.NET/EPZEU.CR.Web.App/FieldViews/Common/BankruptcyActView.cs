using EPZEU.CR.Domain.Fields.Common;
using System.IO;
using System.Linq;

namespace EPZEU.CR.Web.App.FieldViews.Common
{
    public class BankruptcyActView : ObjectViewBase<BankruptcyAct>
    {
        protected override void ToHtmlDisplayInternal(TextWriter writer, BankruptcyAct model)
        {
            if (string.IsNullOrEmpty(model.Type.Name))
            {
                if (model.Type.ID.HasValue)
                {
                    var bankruptcyActType = BankruptcyActTypes.GetAll().SingleOrDefault(el => el.ID == model.Type.ID.Value);
                    model.Type.Name = bankruptcyActType?.Name;
                }
            }

            if (!string.IsNullOrEmpty(model.ActNumber))
            {
                if (!string.IsNullOrEmpty(model.Type.Name))
                {
                    writer.Write(LocalizeLabel("GL_ACT_KIND_L"));
                    writer.Write(": ");
                    writer.Write(model.Type.Name);
                }
                
                writer.Write(", № ");
                writer.Write(model.ActNumber);
            }

            if (!string.IsNullOrEmpty(model.ActDate))
            {
                writer.Write(" ");
                writer.Write(LocalizeLabel("GL_START_DATE_L"));
                writer.Write(" ");
                writer.Write(model.ActDate);
                writer.Write(LocalizeLabel("GL_YEAR_ABBREVIATION_L"));
                writer.Write("<br/>");
            }

            if (!string.IsNullOrEmpty(model.CaseNumber))
            {
                writer.Write(LocalizeLabel("CR_GL_CASE_L"));
                writer.Write(" № ");
                writer.Write(model.CaseNumber);
                writer.Write("/");
                writer.Write(model.CaseYear);
                writer.Write(",");
            }

            if (string.IsNullOrEmpty(model.BankruptcyCourt.Name))
            {
                if (!string.IsNullOrEmpty(model.BankruptcyCourt.Code))
                {
                    var authority = Authorities.GetAuthorityByCourtCode(model.BankruptcyCourt.Code);
                    model.BankruptcyCourt.Name = authority?.AuthorityName;
                }
            }

            if (!string.IsNullOrEmpty(model.BankruptcyCourt.Name))
            {
                writer.Write(" ");
                writer.Write(model.BankruptcyCourt.Name);
                writer.Write("<br/>");
            }

            if (model.Merit.ID.HasValue)
            {
                var marit = BankruptcyMerits.GetBankruptcyMerit(model.Merit.ID.Value);
                model.Merit.Name = marit?.Name;

                if (!string.IsNullOrEmpty(model.Merit.Name))
                {
                    writer.Write(LocalizeLabel("GL_LEGAL_REASON_L"));
                    writer.Write(": ");
                    writer.Write(model.Merit.Name);
                }
            }

            if (model.Execution.ImmediateExecution)
            {
                writer.Write("<br/>");
                writer.Write(LocalizeLabel("CR_APP_IMMEDIATE_EXECUTION_L"));
            }

            if (!model.Execution.ImmediateExecution && model.ComplaintTerm.HasValue)
            {
                //обстоятелството ще бъде в сила след изтичане на срока за обжалване и ако актът не е обжалван
                writer.Write("<br/>");
                writer.Write(LocalizeLabel("CR_APP_CIRCUMSTANCE_IN_EFFECT_AFTER_EXPIRATION_TIME_FOR_APPEAL_L"));
            }

            if (model.ComplaintTerm.HasValue && model.ProclaimMetod.ID != ProclaimMethod.Undefined)
            {
                writer.Write("<br/>");
                writer.Write(LocalizeLabel("CR_APP_APPEAL_TERM_L"));
                writer.Write(" ");
                writer.Write(model.ComplaintTerm.Value.ToString());
                writer.Write(" ");
                writer.Write(LocalizeLabel("GL_DAYS_FROM_DATE_TO_L"));
                writer.Write(" ");
                writer.Write(LocalizeLabel(model.ProclaimMetod.Name));
            }

            if (model.Execution.EffectiveDate.HasValue)
            {
                string dateFormat = string.Format("dd.MM.yyyy {0}", Localizer["GL_YEAR_ABBREVIATION_L"]);
                writer.Write("<br/>");
                writer.Write(LocalizeLabel("GL_FORCE_ENTRY_DATE_L"));
                writer.Write(": ");
                writer.Write(model.Execution.EffectiveDate.Value.ToString(dateFormat));
            }
        }
    }
}

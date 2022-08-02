using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F915_SupervisionBodyFullView : FieldViewBase<F915_SupervisionBodyFull>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F915_SupervisionBodyFull field)
        {
            WrapRecordListForDisplay(writer, field.SupervisionBodyMemberFullList, (w, r) =>
            {
                ObjectHtmlDisplay(w, r.Person);
                w.Write("<br/>");
                ObjectHtmlDisplay(w, r.Address);
                w.Write("<br/>");
                ObjectHtmlDisplay(w, r.Contacts);

                if (!string.IsNullOrEmpty(r.InductionDate))
                {
                    w.Write("<br/>");
                    w.Write(LocalizeLabel("CR_APP_INDUCTION_DATE_L"));
                    w.Write(": ");
                    w.Write(r.InductionDate);
                    w.Write(" ");
                    w.Write(LocalizeLabel("GL_YEAR_ABBREVIATION_L"));
                }

                if (!string.IsNullOrEmpty(r.AcquittanseDate) && (string.Compare(r.AcquittanseDate, "..") > 0))
                {
                    w.Write("<br/>");
                    w.Write(LocalizeLabel("CR_APP_DATE_OF_RELEASE_L"));
                    w.Write(": ");
                    w.Write(r.InductionDate);
                    w.Write(" ");
                    w.Write(LocalizeLabel("GL_YEAR_ABBREVIATION_L"));
                }

                w.Write("<br/>");
                ObjectHtmlDisplay(w, r.ActData);

                if (!string.IsNullOrEmpty(r.EntryType))
                {
                    w.Write("<br/>");
                    w.Write(LocalizeLabel("CR_APP_MEMBER_APPOINTED_L"));
                    w.Write(": ");
                    w.Write(r.EntryType);
                }
            });
        }
    }
}

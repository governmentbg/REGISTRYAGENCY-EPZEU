using EPZEU.CR.Domain.Fields;
using System.IO;
using System.Linq;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F912_3_TrusteesThirdInsView : FieldViewBase<F912_3_TrusteesThirdIns>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F912_3_TrusteesThirdIns field)
        {
            WrapRecordListForDisplay(writer, field.TrusteeThirdInsList, (w, r) =>
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

                if (string.IsNullOrEmpty(r.Status.Name))
                {
                    if (r.Status.ID.HasValue)
                    {
                        var status = TrusteeStatuses.GetAll().SingleOrDefault(s => s.ID == r.Status.ID);
                        r.Status.Name = status?.Name;
                    }
                }
                if (!string.IsNullOrEmpty(r.Status.Name))
                {
                    w.Write("<br/>");
                    w.Write(r.Status.Name);
                }

                w.Write("<br/>");
                ObjectHtmlDisplay(w, r.ActData);
            });
        }
    }
}
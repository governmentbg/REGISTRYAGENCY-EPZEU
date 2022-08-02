using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F020a_UnlimitedLiabilityPartnersEUIEView : FieldViewBase<F020a_UnlimitedLiabilityPartnersEUIE>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F020a_UnlimitedLiabilityPartnersEUIE field)
        {
            WrapRecordListForDisplay(writer, field.UnlimitedLiabilityPartnerEUIEList, (wr, f) =>
            {
                ObjectHtmlDisplay(wr, f.Subject);

                if (!f.Address.IsEmpty())
                {
                    wr.Write("<br/>");
                    ObjectHtmlDisplay(wr, f.Address);
                }

                if (!string.IsNullOrEmpty(f.DateOfAcceptanceEUIE))
                {
                    wr.Write("<br/>");
                    wr.Write(LocalizeLabel("CR_APP_DATE_OF_ACCEPTANCE_EOII_L"));
                    wr.Write(": ");
                    wr.Write(f.DateOfAcceptanceEUIE);
                }

                if (f.NoObligationsEUIE.HasValue && f.NoObligationsEUIE.Value)
                {
                    wr.Write("<br/>");
                    wr.Write(LocalizeLabel("CR_APP_00021_L"));
                }
            });
        }
    }
}
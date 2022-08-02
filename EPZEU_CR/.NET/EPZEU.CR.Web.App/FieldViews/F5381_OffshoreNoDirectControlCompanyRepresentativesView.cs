using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F5381_OffshoreNoDirectControlCompanyRepresentativesView : FieldViewBase<F5381_OffshoreNoDirectControlCompanyRepresentatives>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F5381_OffshoreNoDirectControlCompanyRepresentatives field)
        {
            WrapRecordListForDisplay(writer, field.OffshoreNoDirectControlCompanyRepresentativesList, (w, r) =>
            {
                ObjectHtmlDisplay(w, r.Person);
                if (!r.Address.IsEmpty())
                {
                    w.Write("<br />");
                    ObjectHtmlDisplay(w, r.Address);
                }

                if (!r.CountryOfResidence.IsEmpty())
                {
                    w.Write("<br />");
                    w.Write(LocalizeLabel("CR_APP_COUNTRY_RESIDENCE_L"));
                    w.Write("<br />");
                    ObjectHtmlDisplay(w, r.CountryOfResidence);
                }
            });
        }
    }
}

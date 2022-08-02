using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F550_ActualOwnersView : FieldViewBase<F550_ActualOwners>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F550_ActualOwners field)
        {
            WrapRecordListForDisplay(writer, field.ActualOwnersList, (w, r) =>
            {
                ObjectHtmlDisplay(w, r.Person);

                if (!string.IsNullOrEmpty(r.CountryOfResidence.Country))
                {
                    w.Write("<br/>");
                    w.Write(LocalizeLabel("CR_APP_COUNTRY_RESIDENCE_L"));
                    w.Write("<br/>");
                    w.Write(r.CountryOfResidence.Country);
                }

                if (!string.IsNullOrEmpty(r.OwnedRights))
                {
                    w.Write("<br/>");
                    w.Write(LocalizeLabel("CR_APP_DATA_RIGHTS_OWNED_L"));
                    w.Write(": ");
                    w.Write(r.OwnedRights);
                }
            });
        }
    }
}

using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F534_OffshoreRepresentativesView : FieldViewBase<F534_OffshoreRepresentatives>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F534_OffshoreRepresentatives field)
        {
            WrapRecordListForDisplay(writer, field.OffshoreRepresentativesList, (w, r) =>
            {
                if (string.IsNullOrEmpty(r.Person.Name) && string.IsNullOrEmpty(r.Person.Indent))
                {
                    ObjectHtmlDisplay(w, r.Subject);
                }
                else
                {
                    ObjectHtmlDisplay(w, r.Subject);
                    writer.Write("<br/>");
                    writer.Write(LocalizeLabel("CR_APP_REPRESENTING_LEGAL_ENTITY_L"));
                    writer.Write(":<br/>");
                    ObjectHtmlDisplay(w, r.Person);
                }
            });
        }
    }
}

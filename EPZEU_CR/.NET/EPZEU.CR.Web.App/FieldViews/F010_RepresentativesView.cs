using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F010_RepresentativesView : FieldViewBase<F010_Representatives>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F010_Representatives field)
        {
            WrapRecordListForDisplay(writer, field.RepresentativeList, (wr, f) =>
            {
                if (string.IsNullOrEmpty(f.Person.Name) && string.IsNullOrEmpty(f.Person.Indent))
                {
                    ObjectHtmlDisplay(wr, f.Subject);
                }
                else
                {
                    ObjectHtmlDisplay(wr, f.Subject);
                    wr.Write("<br/>");
                    wr.Write(LocalizeLabel("CR_APP_REPRESENTING_LEGAL_ENTITY_L"));
                    wr.Write(":<br/>");
                    ObjectHtmlDisplay(wr, f.Person);
                }

            });
        }
    }
}
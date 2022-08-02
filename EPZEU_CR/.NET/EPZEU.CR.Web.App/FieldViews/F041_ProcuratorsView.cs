using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F041_ProcuratorsView : FieldViewBase<F041_Procurators>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F041_Procurators field)
        {
            WrapRecordListForDisplay(writer, field.ProcuratorsList, (wr, f) =>
            {
                ObjectHtmlDisplay(wr, f.Person);
                wr.Write("<br/>");
                ObjectHtmlDisplay(wr, f.Address);
            });
        }
    }
}
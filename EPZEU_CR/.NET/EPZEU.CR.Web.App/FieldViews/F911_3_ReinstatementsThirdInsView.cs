using EPZEU.CR.Domain.Fields;
using System.IO;
using System.Linq;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F911_3_ReinstatementsThirdInsView : FieldViewBase<F911_3_ReinstatementsThirdIns>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F911_3_ReinstatementsThirdIns field)
        {
            WrapRecordListForDisplay(writer, field.ReinstatementThirdInsList, (w, r) =>
            {
                if (string.IsNullOrEmpty(r.SenderType.Name))
                {
                    if (r.SenderType.ID.HasValue)
                    {
                        var senderType = BankruptcySenderTypes.GetAll().SingleOrDefault(st => st.ID == r.SenderType.ID);
                        r.SenderType.Name = senderType?.Name;
                    }
                }

                w.Write((r.Title + r.Petitioner.Name));
                w.Write(string.IsNullOrEmpty(r.SenderType.Name) ? "" : r.SenderType.Name);
                w.Write("<br/>");
                ObjectHtmlDisplay(w, r.ActData);
            });
        }
    }
}
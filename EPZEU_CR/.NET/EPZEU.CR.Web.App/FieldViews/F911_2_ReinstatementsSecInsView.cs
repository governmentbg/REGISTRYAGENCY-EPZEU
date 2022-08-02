using EPZEU.CR.Domain.Fields;
using System.IO;
using System.Linq;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F911_2_ReinstatementsSecInsView : FieldViewBase<F911_2_ReinstatementsSecIns>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F911_2_ReinstatementsSecIns field)
        {
            WrapRecordListForDisplay(writer, field.ReinstatementSecInsList, (w, r) =>
            {
                if (r.RecordOperation == Domain.Fields.Common.RecordOperations.Current)
                {
                    if (string.IsNullOrEmpty(r.SenderType.Name))
                    {
                        if (r.SenderType.ID.HasValue)
                        {
                            var senderType = BankruptcySenderTypes.GetAll().SingleOrDefault(st => st.ID == r.SenderType.ID);
                            r.SenderType.Name = senderType?.Name;
                        }

                        w.Write((r.Title + r.Petitioner.Name));
                        w.Write(" ");
                        w.Write(r.SenderType.Name);
                        w.Write("<br/>");
                        ObjectHtmlDisplay(w, r.ActData);
                    }
                }
            });
        }
    }
}

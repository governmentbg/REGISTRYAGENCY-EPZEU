using EPZEU.CR.Domain.Fields;
using EPZEU.CR.Domain.Fields.Common;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F012a_BoardOfManagers3View : FieldViewBase<F012a_BoardOfManagers3>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F012a_BoardOfManagers3 field)
        {
            if (field.ManagerMandate3 != null)
            {
                WrapRecordForDisplay(writer, field.ManagerMandate3, (wr, f) =>
                {
                    ObjectHtmlDisplay<Mandate>(wr, f);
                });
            }

            WrapRecordListForDisplay(writer, field.BoardManagersList, (wr, f) =>
            {
                ObjectHtmlDisplay(wr, f.Subject);
            });
        }
    }
}
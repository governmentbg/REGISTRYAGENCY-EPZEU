using EPZEU.CR.Domain.Fields;
using EPZEU.CR.Domain.Fields.Common;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F012b_AdministrativeBoardView : FieldViewBase<F012b_AdministrativeBoard>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F012b_AdministrativeBoard field)
        {
            if (field.AdministrativeBoardMandate != null)
            {
                WrapRecordForDisplay(writer, field.AdministrativeBoardMandate, (wr, f) =>
                {
                    ObjectHtmlDisplay<Mandate>(wr, f);
                });
            }

            WrapRecordListForDisplay(writer, field.AdministrativeBodyList, (wr, f) =>
            {
                ObjectHtmlDisplay(wr, f.Subject);
            });
        }
    }
}
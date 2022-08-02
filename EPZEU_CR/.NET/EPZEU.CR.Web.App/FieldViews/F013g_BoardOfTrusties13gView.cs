using EPZEU.CR.Domain.Fields;
using EPZEU.CR.Domain.Fields.Common;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F013g_BoardOfTrusties13gView : FieldViewBase<F013g_BoardOfTrusties13g>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F013g_BoardOfTrusties13g field)
        {
            if (field.BoardOfTrusties13gMandate != null)
            {
                WrapRecordForDisplay(writer, field.BoardOfTrusties13gMandate, (wr, f) =>
                {
                    ObjectHtmlDisplay<Mandate>(wr, f);
                });
            }

            WrapRecordListForDisplay(writer, field.Trustees13gList, (wr, f) => ObjectHtmlDisplay(wr, f.Person));
        }
    }
}
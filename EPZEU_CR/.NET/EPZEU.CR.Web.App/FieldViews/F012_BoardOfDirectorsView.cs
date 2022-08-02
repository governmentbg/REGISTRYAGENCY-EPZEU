using EPZEU.CR.Domain.Fields;
using EPZEU.CR.Domain.Fields.Common;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F012_BoardOfDirectorsView : FieldViewBase<F012_BoardOfDirectors>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F012_BoardOfDirectors field)
        {
            if (field.BoardOfDirectorsMandate != null)
            {
                WrapRecordForDisplay(writer, field.BoardOfDirectorsMandate, (wr, f) =>
                {
                    ObjectHtmlDisplay<Mandate>(wr, f);
                });
            }

            WrapRecordListForDisplay(writer, field.DirectorList, (wr, f) =>
            {
                ObjectHtmlDisplay(wr, f.Subject);
            });
        }
    }
}
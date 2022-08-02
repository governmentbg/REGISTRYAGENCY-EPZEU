using EPZEU.CR.Domain.Fields;
using EPZEU.CR.Domain.Fields.Common;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F013_BoardOfManagers2View : FieldViewBase<F013_BoardOfManagers2>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F013_BoardOfManagers2 field)
        {
            if (field.ManagerMandate2 != null)
            {
                WrapRecordForDisplay(writer, field.ManagerMandate2, (wr, f) =>
                {
                    ObjectHtmlDisplay<Mandate>(wr, f);
                });
            }

            WrapRecordListForDisplay(writer, field.BoardManager2List, (wr, f) => ObjectHtmlDisplay(wr, f.Subject));
        }
    }
}
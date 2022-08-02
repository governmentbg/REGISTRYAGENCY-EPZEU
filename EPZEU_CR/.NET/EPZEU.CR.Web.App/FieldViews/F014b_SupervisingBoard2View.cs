using EPZEU.CR.Domain.Fields;
using EPZEU.CR.Domain.Fields.Common;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F014b_SupervisingBoard2View : FieldViewBase<F014b_SupervisingBoard2>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F014b_SupervisingBoard2 field)
        {
            if (field.SupervisingBoard2Mandate != null)
            {
                WrapRecordForDisplay(writer, field.SupervisingBoard2Mandate, (wr, f) =>
                {
                    ObjectHtmlDisplay<Mandate>(wr, f);
                });
            }

            WrapRecordListForDisplay(writer, field.Supervisor2List, (wr, f) => ObjectHtmlDisplay(wr, f.Subject));
        }
    }
}
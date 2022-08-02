using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F013v_BoardManagersSupporter2View : FieldViewBase<F013v_BoardOfManagersSupporters2>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F013v_BoardOfManagersSupporters2 field)
        {
            WrapRecordListForDisplay(writer, field.F01340_BoardManagersSupporter2List, (wr, f) => ObjectHtmlDisplay(wr, f.Subject));
        }
    }
}
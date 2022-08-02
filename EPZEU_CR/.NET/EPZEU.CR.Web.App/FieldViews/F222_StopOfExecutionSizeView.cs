using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F222_StopOfExecutionSizeView : FieldViewBase<F222_StopOfExecutionSize>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F222_StopOfExecutionSize field)
        {
            ObjectHtmlDisplay(writer, field.Price);
        }
    }
}
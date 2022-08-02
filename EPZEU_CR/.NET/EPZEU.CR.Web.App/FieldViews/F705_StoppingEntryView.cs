using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F705_StoppingEntryView : FieldViewBase<F705_StoppingEntry>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F705_StoppingEntry field)
        {
            writer.Write(field.IncomingNumber);
        }
    }
}

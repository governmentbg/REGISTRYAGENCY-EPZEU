using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F009_ChairManView : FieldViewBase<F009_ChairMan>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F009_ChairMan field)
        {
            ObjectHtmlDisplay(writer, field.Person);
        }
    }
}
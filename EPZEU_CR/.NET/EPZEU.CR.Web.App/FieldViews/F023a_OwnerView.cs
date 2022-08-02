using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F023a_OwnerView : FieldViewBase<F023a_Owner>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F023a_Owner field)
        {
            ObjectHtmlDisplay(writer, field.Subject);
        }
    }
}
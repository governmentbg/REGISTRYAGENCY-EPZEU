using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F023_SoleCapitalOwnerView : FieldViewBase<F023_SoleCapitalOwner>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F023_SoleCapitalOwner field)
        {
            ObjectHtmlDisplay(writer, field.Subject);
        }
    }
}
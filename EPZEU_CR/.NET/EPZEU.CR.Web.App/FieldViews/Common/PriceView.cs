using EPZEU.CR.Domain.Fields.Common;
using System.IO;
using System.Web;

namespace EPZEU.CR.Web.App.FieldViews.Common
{
    public class PriceView : ObjectViewBase<Price>
    {
        protected override void ToHtmlDisplayInternal(TextWriter writer, Price model)
        {
            writer.Write(HttpUtility.HtmlEncode(model.Amount));
            writer.Write(" ");
            writer.Write(HttpUtility.HtmlEncode(model.Units));
        }
    }
}
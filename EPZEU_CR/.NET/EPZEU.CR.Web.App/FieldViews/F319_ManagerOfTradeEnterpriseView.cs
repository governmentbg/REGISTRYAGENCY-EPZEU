using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F319_ManagerOfTradeEnterpriseView : FieldViewBase<F319_ManagerOfTradeEnterprise>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F319_ManagerOfTradeEnterprise field)
        {
            ObjectHtmlDisplay(writer, field.Person);
            //TRIR-5245
            //writer.Write("<br/>");
            //ObjectHtmlDisplay(writer, field.Address);
        }
    }
}

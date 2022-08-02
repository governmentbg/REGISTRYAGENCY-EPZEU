using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F601_TransferringEnterpriseView : FieldViewBase<F601_TransferringEnterprise>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F601_TransferringEnterprise field)
        {
            ObjectHtmlDisplay(writer, field.Subject);
        }
    }
}

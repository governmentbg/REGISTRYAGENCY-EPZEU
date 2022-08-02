using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F602_AcquisitionEnterprisesView : FieldViewBase<F602_AcquisitionEnterprises>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F602_AcquisitionEnterprises field)
        {
            WrapRecordListForDisplay(writer, field.AcquisitionEnterpriseList, (w, r) => ObjectHtmlDisplay(w, r.Subject));
        }
    }
}

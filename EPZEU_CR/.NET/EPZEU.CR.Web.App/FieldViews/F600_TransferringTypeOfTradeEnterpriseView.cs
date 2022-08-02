using System.IO;
using EPZEU.CR.Domain.Fields;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F600_TransferringTypeOfTradeEnterpriseView : FieldViewBase<F600_TransferringTypeOfTradeEnterprise>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F600_TransferringTypeOfTradeEnterprise field)
        {
            if (field.Fulltransfer)
            {
                writer.Write(LocalizeLabel("CR_APP_TRANSFER_OF_COMMERCIAL_ENTERPRISE_L"));
            }
            else if (field.Partialtransfer)
            {
                writer.Write(LocalizeLabel("CR_APP_PARTIAL_TRANSFER_OF_COMMERCIAL_ENTERPRISE_L"));
            }
            else if (field.Taketransfer)
            {
                writer.Write(LocalizeLabel("CR_APP_ASSUMPTION_SOLE_TRADERS_COMMERCIAL_ENTERPRISE_BY_HEIR_L"));
            }
        }
    }
}

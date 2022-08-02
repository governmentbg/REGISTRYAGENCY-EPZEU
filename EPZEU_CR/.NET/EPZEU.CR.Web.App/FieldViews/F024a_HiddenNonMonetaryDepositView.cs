using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F024a_HiddenNonMonetaryDepositView : FieldViewBase<F024a_HiddenNonMonetaryDeposit>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F024a_HiddenNonMonetaryDeposit field)
        {
            if (field.Cheked)
                writer.Write(LocalizeLabel("CR_APP_00018_L"));
        }
    }
}
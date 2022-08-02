using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F026a_CessationOfNonProfitLegalEntityView : FieldViewBase<F026a_CessationOfNonProfitLegalEntity>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F026a_CessationOfNonProfitLegalEntity field)
        {
            if (field.Cheked)
                writer.Write(LocalizeLabel("CR_F_26a_L"));
        }
    }
}
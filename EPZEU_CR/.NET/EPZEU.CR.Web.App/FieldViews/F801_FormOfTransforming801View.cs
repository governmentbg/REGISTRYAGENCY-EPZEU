using System.IO;
using EPZEU.CR.Domain.Fields;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F801_FormOfTransforming801View : FieldViewBase<F801_FormOfTransforming801>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F801_FormOfTransforming801 field)
        {
            if (field.Influx) writer.Write(LocalizeLabel("CR_APP_INFUSION_L"));
            if (field.Fusion) writer.Write(LocalizeLabel("CR_APP_INTERFLOW_L"));
            if (field.Division) writer.Write(LocalizeLabel("CR_APP_SEPARATION_L"));
            if (field.Separation) writer.Write(LocalizeLabel("CR_APP_DETACHMENT_L"));
        }
    }
}

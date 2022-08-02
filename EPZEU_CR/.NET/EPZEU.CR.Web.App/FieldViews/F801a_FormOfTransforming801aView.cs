using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F801a_FormOfTransforming801aView : FieldViewBase<F801a_FormOfTransforming801a>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F801a_FormOfTransforming801a field)
        {
            if (field.Influx801a) writer.Write(LocalizeLabel("CR_APP_00014_L"));
            if (field.Fusion801a) writer.Write(LocalizeLabel("CR_APP_00016_L"));
            if (field.ConversionToCoop) writer.Write(LocalizeLabel("CR_APP_TRANSFORMATION_EUROPEAN_COOPERATIVE_COMPANY_TO_COOPERATION_L"));
            if (field.ConversionToEUCoop) writer.Write(LocalizeLabel("CR_APP_TRANSFORMATION_COOPERATION_TO_EUROPEAN_COOPERATIVE_COMPANY_L"));
        }
    }
}

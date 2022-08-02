using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F070_WayOfEstablishingEuropeanCompanyView : FieldViewBase<F070_WayOfEstablishingEuropeanCompany>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F070_WayOfEstablishingEuropeanCompany field)
        {
            if (field.FromAcquisition)
                writer.Write(LocalizeLabel("CR_APP_00030_L"));

            if (field.FromMerge)
                writer.Write(LocalizeLabel("CR_APP_00031_L"));

            if (field.FromHolding)
                writer.Write(LocalizeLabel("CR_APP_00032_L"));

            if (field.FromSubsidiary)
                writer.Write(LocalizeLabel("CR_APP_00033_L"));

            if (field.FromConvert)
                writer.Write(LocalizeLabel("CR_APP_00034_L"));
        }
    }
}

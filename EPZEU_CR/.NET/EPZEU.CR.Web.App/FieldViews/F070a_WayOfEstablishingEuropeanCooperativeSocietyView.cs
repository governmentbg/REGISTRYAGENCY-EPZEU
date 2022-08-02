using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F070a_WayOfEstablishingEuropeanCooperativeSocietyView : FieldViewBase<F070a_WayOfEstablishingEuropeanCooperativeSociety>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F070a_WayOfEstablishingEuropeanCooperativeSociety field)
        {
            if (field.ThroughInitialFormation)
                writer.Write(LocalizeLabel("CR_APP_00039_L"));

            if (field.ThroughAcquisitionOrMerge)
                writer.Write(LocalizeLabel("CR_APP_00040_L"));

            if (field.ByConvertingCooperativeSocietyIntoEuropeanCooperativeSociety)
                writer.Write(LocalizeLabel("CR_APP_00041_L"));
        }
    }
}

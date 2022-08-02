using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F701_FormOfTransforming701View : FieldViewBase<F701_FormOfTransforming701>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F701_FormOfTransforming701 field)
        {
            if (field.Influx)
                writer.Write(LocalizeLabel("CR_APP_INFUSION_L"));
            else if (field.Fusion)
                writer.Write(LocalizeLabel("CR_APP_INTERFLOW_L"));
            else if (field.Division)
                writer.Write(LocalizeLabel("CR_APP_SEPARATION_L"));
            else if (field.Separation)
                writer.Write(LocalizeLabel("CR_APP_DETACHMENT_L"));
            else if (field.ChangeLegalForm)
                writer.Write(LocalizeLabel("CR_APP_CHANGE_LEGAL_FORM_L"));
            else if (field.TransferringProperty)
                writer.Write(LocalizeLabel("CR_APP_TRANSFER_PROPERTY_TO_SOLE_OWNER_L"));
            else if (field.ConversionOfBulgarianEuropeanCompanyIntoBulgarianPLC)
                writer.Write(LocalizeLabel("CR_APP_TRANSFORMATION_EUROPEAN_COMPANY_TO_PUBLIC_LIMITED_COMPANY_L"));
            else if (field.ConversionOfBulgarianPLCIntoBulgarianEuropeanCompany)
                writer.Write(LocalizeLabel("CR_APP_TRANSFORMATION_PUBLIC_LIMITED_COMPANY_TO_EUROPEAN_COMPANY_L"));
        }
    }
}

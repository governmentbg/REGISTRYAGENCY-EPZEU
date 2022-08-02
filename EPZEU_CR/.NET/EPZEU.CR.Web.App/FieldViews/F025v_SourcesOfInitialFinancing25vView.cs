using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F025v_SourcesOfInitialFinancing25vView : FieldViewBase<F025v_SourcesOfInitialFinancing25v>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F025v_SourcesOfInitialFinancing25v field)
        {
            if (field.MembershipFees25v != null && field.MembershipFees25v.Cheked)
            {
                WrapRecordForDisplay(writer, field.MembershipFees25v, (wr, f) =>
                {
                    if (f.Cheked)
                        wr.Write(LocalizeLabel("CR_APP_MEMBERSHIP_FEE_L"));
                });
            }

            if (field.CulturalEducationalAndInformationActivities25v != null && field.CulturalEducationalAndInformationActivities25v.Cheked)
            {
                WrapRecordForDisplay(writer, field.CulturalEducationalAndInformationActivities25v, (wr, f) =>
                {
                    if (f.Cheked)
                        wr.Write(LocalizeLabel("CR_APP_CULTURAL_EDUCATION_ACTIVITIES_L"));
                });
            }

            if (field.SubsidyFromStateAndMunicipalBudgets25v != null && field.SubsidyFromStateAndMunicipalBudgets25v.Cheked)
            {
                WrapRecordForDisplay(writer, field.SubsidyFromStateAndMunicipalBudgets25v, (wr, f) =>
                {
                    if (f.Cheked)
                        wr.Write(LocalizeLabel("CR_APP_SUBSIDIES_L"));
                });
            }

            if (field.RentalOfMovableAndImmovableProperty25v != null && field.RentalOfMovableAndImmovableProperty25v.Cheked)
            {
                WrapRecordForDisplay(writer, field.RentalOfMovableAndImmovableProperty25v, (wr, f) =>
                {
                    if (f.Cheked)
                        wr.Write(LocalizeLabel("CR_APP_RENTAL_L"));
                });
            }

            if (field.DonationAndWills25v != null && field.DonationAndWills25v.Cheked)
            {
                WrapRecordForDisplay(writer, field.DonationAndWills25v, (wr, f) =>
                {
                    if (f.Cheked)
                        wr.Write(LocalizeLabel("CR_APP_DONATIONS_L"));
                });
            }

            if (field.OtherExpenses25v != null && field.OtherExpenses25v.Cheked)
            {
                WrapRecordForDisplay(writer, field.OtherExpenses25v, (wr, f) =>
                {
                    if (f.Cheked)
                        wr.Write(LocalizeLabel("CR_APP_OTHER_INCOMES_L"));

                    wr.Write(": ");

                    if (!string.IsNullOrEmpty(f.Text))
                        wr.Write(f.Text);
                });
            }
        }
    }
}
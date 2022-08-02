using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields;
using System.IO;
using System.Linq;
using System.Web;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F0223_EuropeanEconomicInterestGroupingView : FieldViewBase<F0223_EuropeanEconomicInterestGrouping>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F0223_EuropeanEconomicInterestGrouping field)
        {
            //ForeignCompanyData
            if (field.ForeignCompanyData != null)
            {
                WrapRecordForDisplay(writer, field.ForeignCompanyData, (wr, f) =>
                {
                    if (field.EUIEAddempted != null && field.EUIEAddempted.Addempted)
                    {
                        ObjectHtmlDisplay(wr, field.ForeignCompanyData.CompanyData);
                        wr.Write("<br/>");
                        wr.Write(LocalizeLabel("CR_APP_DELETION_EUROPEAN_UNITED_INTERESTS_L"));
                        wr.Write(" ");
                        wr.Write(LocalizeLabel("GL_DELETED_L"));
                    }
                    else
                        ObjectHtmlDisplay(wr, field.ForeignCompanyData.CompanyData);
                });

                writer.Write("<br/>");
            }

            //Представляващи ЕОИИ
            WrapRecordListForDisplay(writer, field.EuropeanEconomicInterestRepresenterList.Where(el => el.RepresenterType == EuropeanEconomicInterestRepresenterTypes.Regular), (wr, f) =>
            {
                wr.Write(LocalizeLabel("CR_APP_REPRESENTING_EUROPEAN_UNITED_INTERESTS_L"));
                wr.Write(": ");
                wr.Write(f.RepresenterName);
            });

            //Начин на представяне.
            if (field.RepresentersWayOfManagement != null)
            {
                WrapRecordForDisplay(writer, field.RepresentersWayOfManagement, (wr, f) =>
                {
                    if (f.Jointly)
                    {
                        wr.Write(LocalizeLabel("CR_APP_00094_L"));
                        wr.Write(": ");
                        wr.Write(LocalizeLabel("GL_TOGETHER_L"));
                    }
                    else if (f.Severally)
                    {
                        wr.Write(LocalizeLabel("CR_APP_00094_L"));
                        wr.Write(": ");
                        wr.Write(LocalizeLabel("GL_SEPARATELY_L"));
                    }
                    else if (f.OtherWay)
                    {
                        wr.Write(LocalizeLabel("CR_APP_00094_L"));
                        wr.Write(": ");
                        wr.Write(LocalizeLabel("GL_OTHER_WAY_L"));
                        wr.Write("<br/>");
                        wr.Write(f.Text);
                    }
                    else
                        wr.Write(LocalizeLabel("CR_APP_00094_L"));
                });

                writer.Write("<br/>");
            }

            //Ликвидатори.
            WrapRecordListForDisplay(writer, field.EuropeanEconomicInterestRepresenterList.Where(el => el.RepresenterType == EuropeanEconomicInterestRepresenterTypes.Liquidator), (wr, f) =>
            {
                wr.Write(LocalizeLabel("CR_APP_LIQUIDATORS_L"));
                wr.Write(": ");
                wr.Write(f.RepresenterName);
            });

            //Правомощия на ликвидатор.
            if (field.PowerOfLiquidators != null)
            {
                WrapRecordForDisplay(writer, field.PowerOfLiquidators, (wr, f) =>
                {
                    if (!string.IsNullOrEmpty(f.Text))
                    {
                        wr.Write(LocalizeLabel("CR_APP_POWERS_LIQUIDATOR_L"));
                        wr.Write(": ");
                        wr.Write(HttpUtility.HtmlEncode(f.Text));
                    }
                    else
                    {
                        wr.Write(LocalizeLabel("CR_APP_POWERS_LIQUIDATOR_L"));
                        wr.Write(":");
                    }
                });

                writer.Write("<br/>");
            }

            //Синдици.
            WrapRecordListForDisplay(writer, field.EuropeanEconomicInterestRepresenterList.Where(el => el.RepresenterType == EuropeanEconomicInterestRepresenterTypes.Trustee), (wr, f) =>
            {
                wr.Write(LocalizeLabel("CR_APP_SYNDICS_L"));
                wr.Write(": ");
                wr.Write(f.RepresenterName);
            });

            //Правомощия на синдика.
            if (field.PowerOfTrustees != null)
            {
                WrapRecordForDisplay(writer, field.PowerOfTrustees, (wr, f) =>
                {
                    if (!string.IsNullOrEmpty(f.Text))
                    {
                        wr.Write(LocalizeLabel("CR_APP_POWERS_SYNDIC_L"));
                        wr.Write(": ");
                        wr.Write(HttpUtility.HtmlEncode(f.Text));
                    }
                    else
                    {
                        wr.Write(LocalizeLabel("CR_APP_POWERS_SYNDIC_L"));
                        wr.Write(":");
                    }
                });
            }
        }
    }
}
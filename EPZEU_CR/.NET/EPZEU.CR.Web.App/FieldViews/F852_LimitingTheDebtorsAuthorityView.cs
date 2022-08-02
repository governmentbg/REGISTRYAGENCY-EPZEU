using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F8520_StabilizatioLimitingTheDebtorsAuthorityView : FieldViewBase<F8520_StabilizatioLimitingTheDebtorsAuthority>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F8520_StabilizatioLimitingTheDebtorsAuthority field)
        {
            if (field.StabilizationLimitingTheDebtorsAuthorityFirstInstance != null)
            {
                WrapRecordFieldForDisplay(writer, field.StabilizationLimitingTheDebtorsAuthorityFirstInstance, (w, rf) =>
                {
                    w.Write("<b>");
                    w.Write(LocalizeLabel("CR_GL_FIRST_INSTANCE_L").ToUpper());
                    w.Write("</b>");

                    if (!rf.IsEmpty())
                    {
                        w.Write("<br/>");

                        if (rf.TheActivityContinuesUnderTheSupervisionOfTheTrustee)
                        {
                            w.Write(LocalizeLabel("CR_GL_ACT_CONTINUE_TRUSTEE_L"));
                            w.Write("<br/>");
                        }
                        if (rf.TheTraderIsDeprivedOfAuthority)
                        {
                            w.Write(LocalizeLabel("CR_GL_DEPRIVE_POWER_L"));
                            w.Write("<br/>");
                        }
                        if (rf.TheFulfillmentOfTheObligationToTheTraderIsAcceptedByTheTrustee)
                        {
                            w.Write(LocalizeLabel("CR_GL_ACCEPT_TRUSTEE_L"));
                            w.Write("<br/>");
                        }
                        if (rf.TheExecutionOfMonetaryObligationsIsCarriedOutWithTheConsentOfTheTrustee)
                        {
                            w.Write(LocalizeLabel("CR_GL_MONETARY_CONSENT_TRUSTEE_L"));
                            w.Write("<br/>");
                        }
                        
                        ObjectHtmlDisplay(w, rf.ActData);
                    }
                });
            }

            if (field.StabilizationLimitingTheDebtorsAuthoritySecondInstance != null)
            {
                WrapRecordFieldForDisplay(writer, field.StabilizationLimitingTheDebtorsAuthoritySecondInstance, (w, rf) =>
                {
                    w.Write("<b>");
                    w.Write(LocalizeLabel("CR_GL_SECOND_INSTANCE_L").ToUpper());
                    w.Write("</b>");

                    if (!rf.IsEmpty())
                    {
                        w.Write("<br/>");

                        if (rf.TheActivityContinuesUnderTheSupervisionOfTheTrustee)
                        {
                            w.Write(LocalizeLabel("CR_GL_ACT_CONTINUE_TRUSTEE_L"));
                            w.Write("<br/>");
                        }
                        if (rf.TheTraderIsDeprivedOfAuthority)
                        {
                            w.Write(LocalizeLabel("CR_GL_DEPRIVE_POWER_L"));
                            w.Write("<br/>");
                        }
                        if (rf.TheFulfillmentOfTheObligationToTheTraderIsAcceptedByTheTrustee)
                        {
                            w.Write(LocalizeLabel("CR_GL_ACCEPT_TRUSTEE_L"));
                            w.Write("<br/>");
                        }
                        if (rf.TheExecutionOfMonetaryObligationsIsCarriedOutWithTheConsentOfTheTrustee)
                        {
                            w.Write(LocalizeLabel("CR_GL_MONETARY_CONSENT_TRUSTEE_L"));
                            w.Write("<br/>");
                        }

                        ObjectHtmlDisplay(w, rf.ActData);
                    }
                });
            }

            if (field.StabilizationLimitingTheDebtorsAuthorityThirdInstance != null)
            {
                WrapRecordFieldForDisplay(writer, field.StabilizationLimitingTheDebtorsAuthorityThirdInstance, (w, rf) =>
                {
                    w.Write("<b>");
                    w.Write(LocalizeLabel("CR_GL_THIRD_INSTANCE_L").ToUpper());
                    w.Write("</b>");

                    if (!rf.IsEmpty())
                    {
                        w.Write("<br/>");

                        if (rf.TheActivityContinuesUnderTheSupervisionOfTheTrustee)
                        {
                            w.Write(LocalizeLabel("CR_GL_ACT_CONTINUE_TRUSTEE_L"));
                            w.Write("<br/>");
                        }
                        if (rf.TheTraderIsDeprivedOfAuthority)
                        {
                            w.Write(LocalizeLabel("CR_GL_DEPRIVE_POWER_L"));
                            w.Write("<br/>");
                        }
                        if (rf.TheFulfillmentOfTheObligationToTheTraderIsAcceptedByTheTrustee)
                        {
                            w.Write(LocalizeLabel("CR_GL_ACCEPT_TRUSTEE_L"));
                            w.Write("<br/>");
                        }
                        if (rf.TheExecutionOfMonetaryObligationsIsCarriedOutWithTheConsentOfTheTrustee)
                        {
                            w.Write(LocalizeLabel("CR_GL_MONETARY_CONSENT_TRUSTEE_L"));
                            w.Write("<br/>");
                        }

                        ObjectHtmlDisplay(w, rf.ActData);
                    }
                });
            }
        }
    }
}

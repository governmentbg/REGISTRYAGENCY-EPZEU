using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F033_NonMonetaryDepositsView : FieldViewBase<F033_NonMonetaryDeposits>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F033_NonMonetaryDeposits field)
        {
            WrapRecordListForDisplay(writer, field.NonMonetaryDepositsList, (wr, f) =>
            {
                bool hasDescription = !string.IsNullOrEmpty(f.Description);
                bool hasValue = !string.IsNullOrEmpty(f.Value);
                bool hasFullOutgoingNumber = f.OutgoingNumber != null && !string.IsNullOrEmpty(f.OutgoingNumber.FullOutgoingNumber);

                if (hasDescription)
                {
                    wr.Write(LocalizeLabel("GL_DESCRIPTION_L"));
                    wr.Write(": ");
                    wr.Write(f.Description);
                }

                if (hasValue)
                {
                    if (hasDescription)
                        wr.Write("<br/>");

                    wr.Write(LocalizeLabel("GL_VALUE_L"));
                    wr.Write(": ");
                    wr.Write(f.Value);
                    wr.Write(" ");
                    wr.Write(LocalizeLabel("GL_BGN_ABBRAVETION_L"));
                }

                if (hasFullOutgoingNumber)
                {
                    if (hasDescription || hasValue)
                        wr.Write("<br/>");

                    wr.Write(LocalizeLabel("CR_APP_ACT_APPOINT_NO_L"));
                    wr.Write(": ");
                    wr.Write(f.OutgoingNumber.FullOutgoingNumber);
                }
            });
        }
    }
}
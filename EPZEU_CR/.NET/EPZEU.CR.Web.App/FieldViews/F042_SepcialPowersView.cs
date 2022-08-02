using EPZEU.CR.Domain.Fields;
using System.IO;
using System.Web;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F042_SepcialPowersView : FieldViewBase<F042_SepcialPowers>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F042_SepcialPowers field)
        {
            WrapRecordListForDisplay(writer, field.SepcialPowersList, (wr, f) =>
            {
                wr.Write(HttpUtility.HtmlEncode(f.ProcuratorName));

                if (f.RightToAlienate.HasValue && f.RightToAlienate.Value)
                {
                    wr.Write("<br/>");
                    wr.Write(LocalizeLabel("CR_APP_00104_L"));
                }

                if (f.RightToBurden.HasValue && f.RightToBurden.Value)
                {
                    wr.Write("<br/>");
                    wr.Write(LocalizeLabel("CR_APP_00105_L"));
                }

                wr.Write("<br/>");
            });
        }
    }
}
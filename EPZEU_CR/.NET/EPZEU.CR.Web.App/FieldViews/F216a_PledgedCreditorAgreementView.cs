using EPZEU.CR.Domain.Fields;
using System.IO;
using System.Text;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F216a_PledgedCreditorAgreementView : FieldViewBase<F216a_PledgedCreditorAgreement>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F216a_PledgedCreditorAgreement field)
        {
            WrapRecordFieldForDisplay(writer, field, (wr, f) =>
            {
                if (field.Article_8_Para_3_Of_SPA)
                {
                    writer.Write(LocalizeLabel("CR_APP_00106_L"));
                    writer.Write("<br/>");
                }

                if (field.Article_32_Para_5_Of_SPA)
                {
                    writer.Write(LocalizeLabel("CR_APP_00107_L"));
                    writer.Write("<br/>");
                }
            });
        }
    }
}

using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F406_DescriptionsView : FieldViewBase<F406_Descriptions>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F406_Descriptions field)
        {
            //DescriptionCount
            if (field.DescriptionCount != null)
            {
                WrapRecordForDisplay(writer, field.DescriptionCount, (w, r) => 
                {
                    if (!string.IsNullOrEmpty(r.Text))
                    {
                        w.Write(LocalizeLabel("CR_APP_PART_CAPITAL_L"));
                        w.Write(": ");
                        w.Write(r.Text);
                        w.Write(" ");
                        w.Write(LocalizeLabel("GL_BGN_ABBRAVETION_L"));
                    }
                });
            }

            //Description406List
            WrapRecordListForDisplay(writer, field.Description406List, (w, r) => ObjectHtmlDisplay(w, r.Subject));
        }
    }
}

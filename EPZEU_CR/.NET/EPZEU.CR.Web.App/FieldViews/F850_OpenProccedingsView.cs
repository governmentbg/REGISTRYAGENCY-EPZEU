using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F850_OpenProccedingsView : FieldViewBase<F8500_StabilizationOpenProccedings>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F8500_StabilizationOpenProccedings field)
        {
            if (field.StabilizationOpenProccedingFirstInstance != null)
            {
                WrapRecordFieldForDisplay(writer, field.StabilizationOpenProccedingFirstInstance, (w, r) =>
                {
                    w.Write("<b>");
                    w.Write(LocalizeLabel("CR_GL_FIRST_INSTANCE_L").ToUpper());
                    writer.Write("</b>");

                    if(!r.IsEmpty())
                    {
                        w.Write("<br/>");
                        ObjectHtmlDisplay(w, r.ActData);
                    }
                });
            }

            if (field.StabilizationOpenProccedingSecondInstance != null)
            {
                WrapRecordFieldForDisplay(writer, field.StabilizationOpenProccedingSecondInstance, (w, r) =>
                {
                    w.Write("<b>");
                    w.Write(LocalizeLabel("CR_GL_SECOND_INSTANCE_L").ToUpper());
                    w.Write("</b>");

                    if (!r.IsEmpty())
                    {
                        w.Write("<br/>");
                        ObjectHtmlDisplay(w, r.ActData);
                    }
                });
            }

            if (field.StabilizationOpenProccedingThirdInstance != null)
            {
                WrapRecordFieldForDisplay(writer, field.StabilizationOpenProccedingThirdInstance, (w, r) =>
                {
                    w.Write("<b>");
                    w.Write(LocalizeLabel("CR_GL_THIRD_INSTANCE_L").ToUpper());
                    w.Write("</b>");

                    if (!r.IsEmpty())
                    {
                        w.Write("<br/>");
                        ObjectHtmlDisplay(w, r.ActData);
                    }
                });
            }
        }
    }
}

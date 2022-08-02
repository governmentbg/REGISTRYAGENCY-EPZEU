using EPZEU.CR.Domain.Fields;
using System.IO;
using System.Linq;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F8530_StabilizationSuspendProceedingView : FieldViewBase<F8530_StabilizationSuspendProceeding>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F8530_StabilizationSuspendProceeding field)
        {
            if (field.StabilizationSuspendProceedingFirstInstance != null)
            {
                WrapRecordFieldForDisplay(writer, field.StabilizationSuspendProceedingFirstInstance, (w, rf) =>
                {
                    w.Write("<b>");
                    w.Write(LocalizeLabel("CR_GL_FIRST_INSTANCE_L").ToUpper());
                    w.Write("</b>");

                    if (!rf.IsEmpty())
                    {
                        w.Write("<br/>");
                        w.Write(rf.Title);

                        var suspendReson = BankruptcySuspendReasons.GetAll().SingleOrDefault(st => st.ID == field.StabilizationSuspendProceedingFirstInstance.SuspendReson.ID);
                        if (suspendReson != null)
                        {
                            w.Write(" ");
                            w.Write(suspendReson.Name);
                        }

                        w.Write("<br/>");
                        ObjectHtmlDisplay(w, rf.ActData);
                    }
                });
            }

            if (field.StabilizationSuspendProceedingSecondInstance != null)
            {
                WrapRecordFieldForDisplay(writer, field.StabilizationSuspendProceedingSecondInstance, (w, rf) =>
                {
                    w.Write("<b>");
                    w.Write(LocalizeLabel("CR_GL_SECOND_INSTANCE_L").ToUpper());
                    w.Write("</b>");

                    if (!rf.IsEmpty())
                    {
                        w.Write("<br/>");
                        w.Write(rf.Title);

                        var suspendReson = BankruptcySuspendReasons.GetAll().SingleOrDefault(st => st.ID == field.StabilizationSuspendProceedingSecondInstance.SuspendReson.ID);
                        if (suspendReson != null)
                        {
                            w.Write(" ");
                            w.Write(suspendReson.Name);
                        }

                        w.Write("<br/>");
                        ObjectHtmlDisplay(w, rf.ActData);
                    }
                });
            }

            if (field.StabilizationSuspendProceedingThirdInstance != null)
            {
                WrapRecordFieldForDisplay(writer, field.StabilizationSuspendProceedingThirdInstance, (w, rf) =>
                {
                    w.Write("<b>");
                    w.Write(LocalizeLabel("CR_GL_THIRD_INSTANCE_L").ToUpper());
                    w.Write("</b>");

                    if (!rf.IsEmpty())
                    {
                        w.Write("<br/>");
                        w.Write(rf.Title);

                        var suspendReson = BankruptcySuspendReasons.GetAll().SingleOrDefault(st => st.ID == field.StabilizationSuspendProceedingThirdInstance.SuspendReson.ID);
                        if (suspendReson != null)
                        {
                            w.Write(" ");
                            w.Write(suspendReson.Name);
                        }

                        w.Write("<br/>");
                        ObjectHtmlDisplay(w, rf.ActData);
                    }
                });
            }
        }
    }
}
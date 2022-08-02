using EPZEU.CR.Domain.Fields;
using System.IO;
using System.Web;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F8510_StabilizationAdoptionOfPrecautionaryMeasuresView : FieldViewBase<F8510_StabilizationAdoptionOfPrecautionaryMeasures>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F8510_StabilizationAdoptionOfPrecautionaryMeasures field)
        {
            if (field.StabilizationAdoptionOfPrecautionaryMeasuresFirstInstance != null)
            {
                WrapRecordFieldForDisplay(writer, field.StabilizationAdoptionOfPrecautionaryMeasuresFirstInstance, (w, rf) =>
                {
                    w.Write("<b>");
                    w.Write(LocalizeLabel("CR_GL_FIRST_INSTANCE_L").ToUpper());
                    w.Write("</b>");

                    if (!rf.IsEmpty())
                    {
                        w.Write("<br/>");
                        w.Write(LocalizeLabel("CR_GL_DISRESS_L"));
                        w.Write(": ");

                        if(string.Compare(rf.DistraintText, "1", true) == 0)
                        {
                            w.Write(LocalizeLabel("GL_OK_L"));
                        }
                        else
                        {
                            w.Write(LocalizeLabel("GL_NO_L"));
                        }

                        w.Write(", ");
                        w.Write(LocalizeLabel("CR_GL_FORECLOSURE_L"));
                        w.Write(": ");

                        if (string.Compare(rf.ForeclosureText, "1", true) == 0)
                        {
                            w.Write(LocalizeLabel("GL_OK_L"));
                        }
                        else
                        {
                            w.Write(LocalizeLabel("GL_NO_L"));
                        }

                        w.Write(", ");
                        w.Write(LocalizeLabel("CR_GL_ANOTHERS_L"));
                        w.Write(": ");

                        if (string.Compare(rf.OtherText, "1", true) == 0)
                        {
                            w.Write(LocalizeLabel("GL_OK_L"));
                            w.Write(" ");
                            w.Write(HttpUtility.HtmlEncode(rf.description));
                        }
                        else
                        {
                            w.Write(LocalizeLabel("GL_NO_L"));
                            w.Write(" ");
                            w.Write(HttpUtility.HtmlEncode(rf.description));
                        }

                        w.Write("<br/>");
                        ObjectHtmlDisplay(w, rf.ActData);
                    }
                });
            }

            if (field.StabilizationAdoptionOfPrecautionaryMeasuresSecondInstance != null)
            {
                WrapRecordFieldForDisplay(writer, field.StabilizationAdoptionOfPrecautionaryMeasuresSecondInstance, (w, rf) =>
                {
                    w.Write("<b>");
                    w.Write(LocalizeLabel("CR_GL_SECOND_INSTANCE_L").ToUpper());
                    w.Write("</b>");

                    if (!rf.IsEmpty())
                    {
                        w.Write("<br/>");
                        w.Write(LocalizeLabel("CR_GL_DISRESS_L"));
                        w.Write(": ");

                        if (string.Compare(rf.DistraintText, "1", true) == 0)
                        {
                            w.Write(LocalizeLabel("GL_OK_L"));
                        }
                        else
                        {
                            w.Write(LocalizeLabel("GL_NO_L"));
                        }

                        w.Write(", ");
                        w.Write(LocalizeLabel("CR_GL_FORECLOSURE_L"));
                        w.Write(": ");

                        if (string.Compare(rf.ForeclosureText, "1", true) == 0)
                        {
                            w.Write(LocalizeLabel("GL_OK_L"));
                        }
                        else
                        {
                            w.Write(LocalizeLabel("GL_NO_L"));
                        }

                        w.Write(", ");
                        w.Write(LocalizeLabel("CR_GL_ANOTHERS_L"));
                        w.Write(": ");

                        if (string.Compare(rf.OtherText, "1", true) == 0)
                        {
                            w.Write(LocalizeLabel("GL_OK_L"));
                            w.Write(" ");
                            w.Write(HttpUtility.HtmlEncode(rf.description));
                        }
                        else
                        {
                            w.Write(LocalizeLabel("GL_NO_L"));
                            w.Write(" ");
                            w.Write(HttpUtility.HtmlEncode(rf.description));
                        }

                        w.Write("<br/>");
                        ObjectHtmlDisplay(w, rf.ActData);
                    }
                });
            }

            if (field.StabilizationAdoptionOfPrecautionaryMeasuresThirdInstance != null)
            {
                WrapRecordFieldForDisplay(writer, field.StabilizationAdoptionOfPrecautionaryMeasuresThirdInstance, (w, rf) =>
                {
                    w.Write("<b>");
                    w.Write(LocalizeLabel("CR_GL_THIRD_INSTANCE_L").ToUpper());
                    w.Write("</b>");

                    if (!rf.IsEmpty())
                    {
                        w.Write("<br/>");
                        w.Write(LocalizeLabel("CR_GL_DISRESS_L"));
                        w.Write(": ");

                        if (string.Compare(rf.DistraintText, "1", true) == 0)
                        {
                            w.Write(LocalizeLabel("GL_OK_L"));
                        }
                        else
                        {
                            w.Write(LocalizeLabel("GL_NO_L"));
                        }

                        w.Write(", ");
                        w.Write(LocalizeLabel("CR_GL_FORECLOSURE_L"));
                        w.Write(": ");

                        if (string.Compare(rf.ForeclosureText, "1", true) == 0)
                        {
                            w.Write(LocalizeLabel("GL_OK_L"));
                        }
                        else
                        {
                            w.Write(LocalizeLabel("GL_NO_L"));
                        }

                        w.Write(", ");
                        w.Write(LocalizeLabel("CR_GL_ANOTHERS_L"));
                        w.Write(": ");

                        if (string.Compare(rf.OtherText, "1", true) == 0)
                        {
                            w.Write(LocalizeLabel("GL_OK_L"));
                            w.Write(" ");
                            w.Write(HttpUtility.HtmlEncode(rf.description));
                        }
                        else
                        {
                            w.Write(LocalizeLabel("GL_NO_L"));
                            w.Write(" ");
                            w.Write(HttpUtility.HtmlEncode(rf.description));
                        }

                        w.Write("<br/>");
                        ObjectHtmlDisplay(w, rf.ActData);
                    }
                });
            }
        }
    }
}

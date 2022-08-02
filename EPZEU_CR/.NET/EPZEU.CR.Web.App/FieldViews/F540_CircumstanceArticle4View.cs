using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F540_CircumstanceArticle4View : FieldViewBase<F540_CircumstanceArticle4>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F540_CircumstanceArticle4 field)
        {
            WrapRecordFieldForDisplay(writer, field, (w, f) => 
            {
                if (field.IsArticle2)
                {
                    w.Write(LocalizeLabel("CR_APP_00095_L"));
                    w.Write("<br />");
                }

                if (field.IsArticle3)
                {
                    w.Write(LocalizeLabel("CR_APP_00096_L"));
                    w.Write("<br />");
                }

                if (field.IsArticle5)
                {
                    w.Write(LocalizeLabel("CR_APP_00097_L"));
                    w.Write("<br />");
                }

                if (field.IsArticle6)
                {
                    w.Write(LocalizeLabel("CR_APP_00098_L"));
                    w.Write("<br />");
                }

                if (field.IsArticle7)
                {
                    w.Write(LocalizeLabel("CR_APP_00099_L"));
                    w.Write("<br />");
                }

                if (field.IsArticle8)
                {
                    w.Write(LocalizeLabel("CR_APP_00100_L"));
                    w.Write("<br />");
                }
            });
        }
    }
}

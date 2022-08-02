using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F028a_AddemptionOfEUIEView : FieldViewBase<F028a_AddemptionOfEUIE>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F028a_AddemptionOfEUIE field)
        {
            if (field.Cheked)
                writer.Write(LocalizeLabel("GL_EFFACEMENT_L"));
        }
    }
}
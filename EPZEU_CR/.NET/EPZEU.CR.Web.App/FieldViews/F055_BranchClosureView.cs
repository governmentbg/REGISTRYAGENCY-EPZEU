using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F055_BranchClosureView : FieldViewBase<F055_BranchClosure>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F055_BranchClosure field)
        {
            if (field.Closed)
                writer.Write(LocalizeLabel("GL_CLOSED_L"));
        }
    }
}

using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F028_ClosureBranchOfForeignTraderView : FieldViewBase<F028_ClosureBranchOfForeignTrader>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F028_ClosureBranchOfForeignTrader field)
        {
            if (field.Cheked)
                writer.Write(LocalizeLabel("CR_GL_CLOSED_BRANCH_L"));
        }
    }
}
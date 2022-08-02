using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F034_BuyBackDecisionView : FieldViewBase<F034_BuyBackDecision>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F034_BuyBackDecision field)
        {
            if (field.Cheked)
                writer.Write(LocalizeLabel("CR_GL_DECISION_TAKEN_L"));
        }
    }
}
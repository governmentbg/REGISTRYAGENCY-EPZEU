using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F225_PledgeAddemptionView : FieldViewBase<F225_PledgeAddemption>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F225_PledgeAddemption field)
        {
            if (field.Addempted)
            {
                writer.Write(LocalizeLabel("GL_DELETED_L"));
            }
            else
            {
                writer.Write(LocalizeLabel("GL_NO_L"));
            }
        }
    }
}
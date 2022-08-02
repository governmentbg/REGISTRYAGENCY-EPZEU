using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F504_ContinuingTradeActivityView : FieldViewBase<F504_ContinuingTradeActivity>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F504_ContinuingTradeActivity field)
        {
            if (field.Continue)
            {
                writer.Write(LocalizeLabel("CR_APP_CONTINUATION_ENTITY_EEIG_L"));
            }

            if (field.Restore)
            {
                writer.Write(field.Continue ? "<br />" : "");
                writer.Write(LocalizeLabel("CR_APP_RESUMPTION_ACTIVITY_CCS_ECS_L"));
            }
        }
    }
}

using EPZEU.CR.Domain.Fields;
using System.IO;
using System.Text;
using System.Web;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F101_LimitSubjectOfActivity101View : FieldViewBase<F101_LimitSubjectOfActivity101>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F101_LimitSubjectOfActivity101 field)
        {
            string forbiddenDealsStr = HttpUtility.HtmlEncode(field.FobiddenDeals);
            if (!string.IsNullOrEmpty(forbiddenDealsStr))
            {
                writer.Write(LocalizeLabel("CR_APP_PROHIBITION_PERFORM_TRANSACTION_L"));
                writer.Write(": ");
                writer.Write(forbiddenDealsStr);
            }

            string forbiddenActivityStr = HttpUtility.HtmlEncode(field.ForbiddenActivity);
            if (!string.IsNullOrEmpty(forbiddenActivityStr))
            {
                if (!string.IsNullOrEmpty(forbiddenDealsStr))
                {
                    writer.Write("<br/>");
                }
                writer.Write(LocalizeLabel("CR_APP_PROHIBITION_PERFORM_ACTIVITIES_L"));
                writer.Write(": ");
                writer.Write(forbiddenActivityStr);
            }

            string fobiddenOperationsStr = HttpUtility.HtmlEncode(field.FobiddenOperations);
            if (!string.IsNullOrEmpty(fobiddenOperationsStr))
            {
                if (!string.IsNullOrEmpty(forbiddenDealsStr) || !string.IsNullOrEmpty(forbiddenActivityStr))
                {
                    writer.Write("<br/>");
                }
                writer.Write(LocalizeLabel("CR_APP_PROHIBITION_PERFORM_OPERATIONS_L"));
                writer.Write(": ");
                writer.Write(fobiddenOperationsStr);
            }
        }
    }
}

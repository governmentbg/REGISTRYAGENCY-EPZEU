using EPZEU.CR.Domain.Fields;
using EPZEU.CR.Domain.Fields.Common;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F013_BoardOfManagersView : FieldViewBase<F013_BoardOfManagers>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F013_BoardOfManagers field)
        {
            if (field.ManagerMandate != null)
            {
                WrapRecordForDisplay(writer, field.ManagerMandate, (wr, f) =>
                {
                    ObjectHtmlDisplay<Mandate>(wr, f);
                    wr.Write("<br/>");
                });
            }

            WrapRecordListForDisplay(writer, field.BoardManagerList, (wr, f) => ObjectHtmlDisplay(wr, f.Person));
        }
    }
}
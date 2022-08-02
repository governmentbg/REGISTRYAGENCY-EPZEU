using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F013a_BoardOfManagersSupportersView : FieldViewBase<F013a_BoardOfManagersSupporters>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F013a_BoardOfManagersSupporters field)
        {
            WrapRecordListForDisplay(writer, field.BoardOfManagersSupportersPersonList, (wr, f) => ObjectHtmlDisplay(wr, f.Person));
        }
    }
}
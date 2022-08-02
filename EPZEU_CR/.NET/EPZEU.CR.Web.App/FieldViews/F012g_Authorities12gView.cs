using EPZEU.CR.Domain.Fields;
using System.IO;
using System.Web;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F012g_Authorities12gView : FieldViewBase<F012g_Authorities12g>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F012g_Authorities12g field)
        {
            WrapRecordListForDisplay(writer, field.Authorities12gList, (wr, f) =>
            {
                wr.Write(HttpUtility.HtmlEncode(f.Text));
            });
        }
    }
}

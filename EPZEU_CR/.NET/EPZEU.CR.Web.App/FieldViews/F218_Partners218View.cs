using EPZEU.CR.Domain.Fields;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F218_Partners218View : FieldViewBase<F218_Partners218>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F218_Partners218 field)
        {
            if (field.Partner218Part != null)
            {
                WrapRecordForDisplay(writer, field.Partner218Part, (wr, f) =>
                {
                    wr.Write(LocalizeLabel("CR_GL_PROPORTION_NUMBER_L"));
                    wr.Write(": ");
                    wr.Write(HttpUtility.HtmlEncode(f.Count));
                    wr.Write("<br/>");
                    wr.Write(LocalizeLabel("GL_VALUE_L"));
                    wr.Write(": ");
                    wr.Write(HttpUtility.HtmlEncode(f.Value));
                });


            }

            WrapRecordListForDisplay(writer, field.Partner218List, (wr, f) => ObjectHtmlDisplay(wr, f.Subject));
        }
    }
}
using EPZEU.CR.Domain.Fields.Common;
using System.IO;
using System.Web;

namespace EPZEU.CR.Web.App.FieldViews.Common
{
    public class MannerRecordView : ObjectViewBase<MannerRecordHolder>
    {
        protected override void ToHtmlDisplayInternal(TextWriter writer, MannerRecordHolder model)
        {
            if (model.Jointly)
                writer.Write(LocalizeLabel("GL_TOGETHER_L"));
            else if (model.Severally)
                writer.Write(LocalizeLabel("GL_SEPARATELY_L"));
            else if (model.OtherWay)
            {
                writer.Write(LocalizeLabel("GL_OTHER_WAY_L"));
                writer.Write(": ");
                writer.Write(HttpUtility.HtmlEncode(model.Text));
            }
        }
    }
}

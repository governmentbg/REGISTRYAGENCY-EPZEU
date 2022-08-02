using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F103_AuthorizationView : FieldViewBase<F103_Authorization>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F103_Authorization field)
        {
            writer.Write(LocalizeLabel("CR_APP_PERMIT_REVOKED_L"));
            writer.Write(": ");
            if (field.Deprived)
                writer.Write(LocalizeLabel("GL_OK_L"));
            else
                writer.Write(LocalizeLabel("GL_NO_L"));
        }
    }
}

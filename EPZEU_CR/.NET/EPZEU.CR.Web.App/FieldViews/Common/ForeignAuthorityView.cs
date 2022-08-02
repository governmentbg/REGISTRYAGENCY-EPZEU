using EPZEU.CR.Domain.Fields.Common;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews.Common
{
    public class ForeignAuthorityView : ObjectViewBase<ForeignAuthority>
    {
        protected override void ToHtmlDisplayInternal(TextWriter writer, ForeignAuthority model)
        {
            writer.Write(LocalizeLabel("CR_GL_AUTHORITY_REGISTRATION_L"));
            writer.Write(": ");
            writer.Write(model.CompetentAuthorityForRegistration);
            writer.Write("<br/>");
            writer.Write(LocalizeLabel("CR_GL_REGISTRATION_NUMBER_L"));
            writer.Write(": ");
            writer.Write(model.RegistrationNumber);
        }
    }
}
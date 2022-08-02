using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F044_EraseProcuraView : FieldViewBase<F044_EraseProcura>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F044_EraseProcura field)
        {
            if (field.Cheked)
                writer.Write(LocalizeLabel("CR_GL_ERASE_PROCURATOR_L"));
        }
    }
}

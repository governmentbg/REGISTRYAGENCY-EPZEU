using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F551_EraseActualOwnerView : FieldViewBase<F551_EraseActualOwner>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F551_EraseActualOwner field)
        {
            if (field.Cheked)
            {
                writer.Write(LocalizeLabel("CR_GL_DELETED_REAL_OWNER_L"));
            }
        }
    }
}

using System.IO;
using EPZEU.CR.Domain.Fields;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F529_ReasonForEntry529View : FieldViewBase<F529_ReasonForEntry529>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F529_ReasonForEntry529 field)
        {
            if (field.Article63)
                writer.Write(LocalizeLabel("CR_APP_00049_L"));

            if (field.Article6)
                writer.Write(LocalizeLabel("CR_APP_00050_L"));
        }
    }
}

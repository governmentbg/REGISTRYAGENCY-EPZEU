using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F019_PartnersView : FieldViewBase<F019_Partners>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F019_Partners field)
        {
            WrapRecordListForDisplay(writer, field.PartnersList, (wr, f) =>
            {
                ObjectHtmlDisplay(wr, f.Subject);

                if (!string.IsNullOrEmpty(f.Share))
                {
                    wr.Write(", ");
                    wr.Write(LocalizeLabel("CR_GL_PARTICIPATION_AMOUND_L"));
                    wr.Write(": ");
                    wr.Write(f.Share);
                    wr.Write(" ");
                    wr.Write(LocalizeLabel("GL_BGN_ABBRAVETION_L"));
                }
            });
        }
    }
}
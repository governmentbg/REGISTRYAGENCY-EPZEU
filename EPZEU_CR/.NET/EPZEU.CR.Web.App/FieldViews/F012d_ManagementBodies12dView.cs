using EPZEU.CR.Domain.Fields;
using EPZEU.CR.Domain.Fields.Common;
using System.IO;
using System.Web;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F012d_ManagementBodies12dView : FieldViewBase<F012d_ManagementBodies12d>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F012d_ManagementBodies12d field)
        {
            if (field.ManagementBody12dMandate != null)
            {
                WrapRecordForDisplay(writer, field.ManagementBody12dMandate, (wr, f) =>
                {
                    if (!f.IsEmpty())
                    {
                        ObjectHtmlDisplay<Mandate>(wr, f);

                        if (!string.IsNullOrEmpty(field.ManagementBody12dMandate.MandateTypeText))
                            wr.Write("<br/>");
                    }

                    wr.Write(LocalizeLabel("CR_APP_NAME_AUTHORITY_MANAGEMENT_L"));
                    wr.Write(": ");
                    wr.Write(HttpUtility.HtmlEncode(f.ManagementAuthority));
                    wr.Write("<br/>");
                });
            }

            WrapRecordListForDisplay(writer, field.ManagementBodies12dList, (wr, f) =>
            {
                ObjectHtmlDisplay(wr, f.Subject);
            });
        }
    }
}
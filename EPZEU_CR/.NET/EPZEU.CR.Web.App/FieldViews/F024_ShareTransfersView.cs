using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F024_ShareTransfersView : FieldViewBase<F024_ShareTransfers>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F024_ShareTransfers field)
        {
            WrapRecordListForDisplay(writer, field.ShareTransfersList, (wr, f) =>
            {
                wr.Write(LocalizeLabel("CR_GL_TRANSFERER_L"));
                wr.Write(": ");
                ObjectHtmlDisplay(wr, f.OldOwner);

                if (!string.IsNullOrEmpty(f.OldOwnerCountryName))
                {
                    wr.Write(", ");
                    wr.Write(LocalizeLabel("GL_COUNTRY_L"));
                    wr.Write(": ");
                    wr.Write(f.OldOwnerCountryName);
                }

                wr.Write("<br />");
                wr.Write(LocalizeLabel("CR_GL_PARTICIPATION_AMOUND_L"));
                wr.Write(": ");
                wr.Write(f.ShareAmount);
                wr.Write(" ");
                wr.Write(LocalizeLabel("GL_BGN_ABBRAVETION_L"));
                wr.Write("<br />");

                wr.Write(LocalizeLabel("CR_GL_ASSIGNEE_L"));
                wr.Write(": ");
                ObjectHtmlDisplay(wr, f.NewOwner);

                if (!string.IsNullOrEmpty(f.NewOwnerCountryName))
                {
                    wr.Write(", ");
                    wr.Write(LocalizeLabel("GL_COUNTRY_L"));
                    wr.Write(": ");
                    wr.Write(f.NewOwnerCountryName);
                }
                wr.Write("<br />");

                if (!string.IsNullOrEmpty(f.Date))
                {
                    wr.Write(LocalizeLabel("CR_APP_00002_L"));
                    wr.Write(": ");
                    wr.Write(f.Date);
                    wr.Write(" ");
                    wr.Write(LocalizeLabel("GL_YEAR_ABBREVIATION_L"));
                }
            });
        }
    }
}

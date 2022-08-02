using EPZEU.CR.Domain.Fields;
using System.IO;
using System.Web;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F031a_SharesView : FieldViewBase<F031a_Shares>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F031a_Shares field)
        {
            //CredentialsForDifferentTypes
            if (field.CredentialsForDifferentTypes != null)
            {
                WrapRecordForDisplay(writer, field.CredentialsForDifferentTypes, (wr, f) =>
                {
                    wr.Write(LocalizeLabel("CR_GL_RIFHTS_CLASSES_SHARES_L"));
                    wr.Write(": ");
                    wr.Write(HttpUtility.HtmlEncode(f.Text));
                });
            }

            //SpecialConditionsForTransfer
            if (field.SpecialConditionsForTransfer != null)
            {
                WrapRecordForDisplay(writer, field.SpecialConditionsForTransfer, (wr, f) =>
                {
                    wr.Write(LocalizeLabel("CR_GL_CONDITIONS_TRANSFER_SHARE_L"));
                    wr.Write(": ");
                    wr.Write(HttpUtility.HtmlEncode(f.Text));
                });
            }

            //ShareList
            WrapRecordListForDisplay(writer, field.ShareList, (wr, f) =>
            {
                wr.Write(LocalizeLabel("CR_GL_SHARE_L"));
                wr.Write(":<br/>");
                wr.Write(LocalizeLabel("GL_TYPE_L"));
                wr.Write(": ");
                wr.Write(HttpUtility.HtmlEncode(f.Type));
                wr.Write(", ");
                wr.Write(LocalizeLabel("CR_GL_SHARES_NUMBER_L"));
                wr.Write(": ");
                wr.Write(HttpUtility.HtmlEncode(f.Count));
                wr.Write(", ");
                wr.Write(LocalizeLabel("CR_GL_NOMINAL_VALUE_L"));
                wr.Write(": ");
                wr.Write(HttpUtility.HtmlEncode(f.NominalValue));
                wr.Write(" ");
                wr.Write(LocalizeLabel("GL_BGN_ABBRAVETION_L"));
            });
        }
    }
}
using EPZEU.CR.Domain.Fields;
using EPZEU.CR.Domain.Fields.Common;
using System.IO;
using System.Web;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class TextRecordFieldView : FieldViewBase<TextRecordField>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, TextRecordField field)
        {
            if(!string.IsNullOrEmpty(field.Text))
            {
                if(field.FieldIdent == F305a_PledgeContractForTrader.FieldIdentCode)
                {
                    //TRIR-5130
                    writer.Write(LocalizeLabel("GL_DATE_L"));
                    writer.Write(": ");
                    writer.Write(HttpUtility.HtmlEncode(field.Text));
                }
                else
                {
                    writer.Write(HttpUtility.HtmlEncode(field.Text));
                }
            }
        }
    }
}

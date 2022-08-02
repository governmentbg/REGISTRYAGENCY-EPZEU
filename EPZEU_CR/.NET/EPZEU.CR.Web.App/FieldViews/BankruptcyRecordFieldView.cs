using EPZEU.CR.Domain.Fields;
using EPZEU.CR.Domain.Fields.Common;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class BankruptcyRecordFieldView : FieldViewBase<BankruptcyRecordField>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, BankruptcyRecordField field)
        {
            var fieldName = "";
            var insData = "";

            if (field.FieldIdent == F902_InsolvencyData.FieldIdentCode || field.FieldIdent == F902_2_InsolvencyDataSecIns.FieldIdentCode || field.FieldIdent == F902_3_InsolvencyDataThirdIns.FieldIdentCode)
            {
                if (field.FieldIdent == F902_InsolvencyData.FieldIdentCode)
                {
                    F902_InsolvencyData date = (F902_InsolvencyData)field;
                    insData = date.Date;
                    fieldName = LocalizeLabel("CR_F_902_L");
                }
                else if (field.FieldIdent == F902_2_InsolvencyDataSecIns.FieldIdentCode)
                {
                    F902_2_InsolvencyDataSecIns date = (F902_2_InsolvencyDataSecIns)field;
                    insData = date.Date;
                    fieldName = LocalizeLabel("CR_F_902_2_L");
                }
                else if (field.FieldIdent == F902_3_InsolvencyDataThirdIns.FieldIdentCode)
                {
                    F902_3_InsolvencyDataThirdIns date = (F902_3_InsolvencyDataThirdIns)field;
                    insData = date.Date;
                    fieldName = LocalizeLabel("CR_F_902_3_L");
                }

                writer.Write(fieldName.Substring(fieldName.IndexOf(". ") + 2));
                writer.Write(": ");
                writer.Write(insData);
                writer.Write("<br/>");
            }
            else
            {
                writer.Write(field.Title);
                writer.Write("<br/>");
            }

            ObjectHtmlDisplay(writer, field.ActData);
        }
    }
}
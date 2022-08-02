using EPZEU.CR.Domain.Fields;
using System;
using System.IO;
using System.Linq;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F1001_DescriptionOfDeclaredStatementView : FieldViewBase<IStatements>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, IStatements field)
        {
            WrapRecordListForDisplay(writer, field.StatementsList.OrderBy(el => StatmentOrderDate(el)), (wr, f) => ObjectHtmlDisplay<Statement>(wr, f));
        }
        
        private DateTime? StatmentOrderDate(Statement statement)
        {
            DateTime? res = null;

            if (DateTime.TryParseExact(statement.ActDate, "dd.MM.yyyy", null, new System.Globalization.DateTimeStyles(), out DateTime tmpDate))
            {
                res = tmpDate;
                return res;
            }
            else if (statement.RecordIDAttributeSpecified)
            {
                return statement.RecordMinActionDate;
            }
            else
            {
                return res;
            }
        }
    }
}

using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F060_DivisionsOfEuropeanUnificationView : FieldViewBase<F060_DivisionsOfEuropeanUnification>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F060_DivisionsOfEuropeanUnification field)
        {
            WrapRecordListForDisplay(writer, field.DivisionOfEuropeanUnificationList, (wr, f) =>
            {
                ObjectHtmlDisplay(wr, f.ForeignCompanyBaseData);

                if (!f.Address.IsEmpty())
                {
                    writer.Write("<br/>");
                    ObjectHtmlDisplay(wr, f.Address);
                }
            });
        }
    }
}

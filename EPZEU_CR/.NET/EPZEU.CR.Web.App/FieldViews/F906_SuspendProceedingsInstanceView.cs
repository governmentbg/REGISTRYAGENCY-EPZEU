using EPZEU.CR.Domain.Fields;
using EPZEU.CR.Domain.Fields.Common;
using System.IO;
using System.Linq;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F906_SuspendProceedingsInstanceView : FieldViewBase<BankruptcyRecordField>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, BankruptcyRecordField field)
        {
            if (field is F906_SuspendProceedings f906_SuspendProceedings)
            {
                if (string.IsNullOrEmpty(f906_SuspendProceedings.SuspendReson.Name))
                {
                    if (f906_SuspendProceedings.SuspendReson.ID.HasValue)
                    {
                        var suspendReson = BankruptcySuspendReasons.GetAll().SingleOrDefault(st => st.ID == f906_SuspendProceedings.SuspendReson.ID);
                        f906_SuspendProceedings.SuspendReson.Name = suspendReson?.Name;
                    }
                }

                if (!string.IsNullOrEmpty(f906_SuspendProceedings.Title))
                {
                    writer.Write(f906_SuspendProceedings.Title);
                    writer.Write(" ");
                }
                    
                writer.Write(f906_SuspendProceedings.SuspendReson.Name);

                if (!string.IsNullOrEmpty(f906_SuspendProceedings.Title) || !string.IsNullOrEmpty(f906_SuspendProceedings.SuspendReson.Name))
                {
                    writer.Write("<br/>");
                }

                ObjectHtmlDisplay(writer, f906_SuspendProceedings.ActData);
            }
            else if (field is F906_2_SuspendProceedingsSecIns f906_2_SuspendProceedingsSecIns)
            {
                if (string.IsNullOrEmpty(f906_2_SuspendProceedingsSecIns.SuspendReson.Name))
                {
                    if (f906_2_SuspendProceedingsSecIns.SuspendReson.ID.HasValue)
                    {
                        var suspendReson = BankruptcySuspendReasons.GetAll().SingleOrDefault(st => st.ID == f906_2_SuspendProceedingsSecIns.SuspendReson.ID);
                        f906_2_SuspendProceedingsSecIns.SuspendReson.Name = suspendReson?.Name;
                    }
                }

                if (!string.IsNullOrEmpty(f906_2_SuspendProceedingsSecIns.Title))
                {
                    writer.Write(f906_2_SuspendProceedingsSecIns.Title);
                    writer.Write(" ");
                }
                   
                writer.Write(f906_2_SuspendProceedingsSecIns.SuspendReson.Name);

                if (!string.IsNullOrEmpty(f906_2_SuspendProceedingsSecIns.Title) || !string.IsNullOrEmpty(f906_2_SuspendProceedingsSecIns.SuspendReson.Name))
                {
                    writer.Write("<br/>");
                }

                ObjectHtmlDisplay(writer, f906_2_SuspendProceedingsSecIns.ActData);
            }
            else if (field is F906_3_SuspendProceedingsThirdIns f906_3_SuspendProceedingsThirdIns)
            {
                if (string.IsNullOrEmpty(f906_3_SuspendProceedingsThirdIns.SuspendReson.Name))
                {
                    if (f906_3_SuspendProceedingsThirdIns.SuspendReson.ID.HasValue)
                    {
                        var suspendReson = BankruptcySuspendReasons.GetAll().SingleOrDefault(st => st.ID == f906_3_SuspendProceedingsThirdIns.SuspendReson.ID);
                        f906_3_SuspendProceedingsThirdIns.SuspendReson.Name = suspendReson?.Name;
                    }
                }

                if (!string.IsNullOrEmpty(f906_3_SuspendProceedingsThirdIns.Title))
                {
                    writer.Write(f906_3_SuspendProceedingsThirdIns.Title);
                    writer.Write(" ");
                }

                writer.Write(f906_3_SuspendProceedingsThirdIns.SuspendReson.Name);

                if (!string.IsNullOrEmpty(f906_3_SuspendProceedingsThirdIns.Title) || !string.IsNullOrEmpty(f906_3_SuspendProceedingsThirdIns.SuspendReson.Name))
                {
                    writer.Write("<br/>");
                }

                ObjectHtmlDisplay(writer, f906_3_SuspendProceedingsThirdIns.ActData);
            }
        }
    }
}

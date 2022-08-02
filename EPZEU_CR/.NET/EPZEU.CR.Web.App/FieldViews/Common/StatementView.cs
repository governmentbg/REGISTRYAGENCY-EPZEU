using EPZEU.CR.Domain.Fields;
using System.IO;
using EPZEU.CR.Web.Models;

namespace EPZEU.CR.Web.App.FieldViews.Common
{
    public class StatementView : ObjectViewBase<Statement>
    {
        protected override void ToHtmlDisplayInternal(TextWriter writer, Statement model)
        {
            writer.Write(model.ActModeText);

            //TRIR-3665
            //if (!string.IsNullOrEmpty(model.Description) && !model.ActModeText.Trim().Equals(model.Description.Trim()))
            //    sb.AppendFormat("<br/>{0}", model.Description);

            if (!string.IsNullOrEmpty(model.ActDate))
            {
                writer.Write("<br/>");
                writer.Write(LocalizeLabel("GL_DATE_L"));
                writer.Write(": ");
                writer.Write(model.ActDate);
                writer.Write(LocalizeLabel("GL_YEAR_ABBREVIATION_L"));
            }

            if (!string.IsNullOrEmpty(model.ActYear))
            {
                writer.Write("<br/>");
                writer.Write(LocalizeLabel("GL_YEAR_L"));
                writer.Write(": ");
                writer.Write(model.ActYear);
                writer.Write(LocalizeLabel("GL_YEAR_ABBREVIATION_L"));
            }

            if (!string.IsNullOrEmpty(model.ActID))
            {
                writer.Write("<br /><a href='");
                writer.Write(LinkRoutes.DOCUMENT_ACCESS_UI_URL);
                writer.Write("/");
                writer.Write(model.ActID);
                writer.Write("' target='_blank'><i class='ui-icon ui-icon-download-color mr-1'></i>");

                if (!string.IsNullOrEmpty(model.Description) && !model.ActModeText.Trim().Equals(model.Description.Trim()))
                    writer.Write(model.Description);
                else
                    writer.Write(model.ActModeText);

                writer.Write("</a>");
            }

            if (model.IsActWithErasedPersonalData.HasValue && model.IsActWithErasedPersonalData.Value)
            {
                writer.Write("<br/>");
                writer.Write(LocalizeLabel("CR_APP_00007_L"));
            }

            if(model.RecordMinActionDateAttributeSpecified)
            {
                string dateFormat = string.Format("dd.MM.yyyy {0} HH:mm:ss", Localizer["GL_YEAR_ABBREVIATION_L"]);

                writer.Write("<br/>");
                writer.Write(LocalizeLabel("GL_DATE_ANNOUNCEMENT_L"));
                writer.Write(": ");
                writer.Write(model.RecordMinActionDate.Value.ToString(dateFormat));
            }
        }
    }
}
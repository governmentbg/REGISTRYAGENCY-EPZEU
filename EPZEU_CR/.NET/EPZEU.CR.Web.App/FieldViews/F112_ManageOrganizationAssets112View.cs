using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F112_ManageOrganizationAssets112View : FieldViewBase<F112_ManageOrganizationAssets112>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F112_ManageOrganizationAssets112 field)
        {
            writer.Write(LocalizeLabel("CR_APP_00101_L"));  /*взето решение за временно спиране  обратното изкупуване на акции на инвестиционно дружество от отворен тип*/
            writer.Write(": ");

            if(field.CessationOfByingSecurities)
            {
                writer.Write(LocalizeLabel("GL_OK_L"));
            }
            else
            {
                writer.Write(LocalizeLabel("GL_NO_L"));
            }
            writer.Write("<br/>");

            writer.Write(LocalizeLabel("CR_APP_00102_L")); /*взето решение за временно спиране  обратното изкупуване на дялове на договорни фондове*/
            writer.Write(": ");

            if (field.CessationOfByingStakes)
            {
                writer.Write(LocalizeLabel("GL_OK_L"));
            }
            else
            {
                writer.Write(LocalizeLabel("GL_NO_L"));
            }
        }
    }
}

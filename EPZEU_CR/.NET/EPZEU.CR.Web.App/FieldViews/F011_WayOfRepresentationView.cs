using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F011_WayOfRepresentationView : FieldViewBase<F011_WayOfRepresentation>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F011_WayOfRepresentation field)
        {
            var hasOtherOptionSelected = false;

            if (field.Jointly)
            {
                hasOtherOptionSelected = true;
                writer.Write(LocalizeLabel("GL_TOGETHER_L"));
            }

            if (field.Severally)
            {

                if (hasOtherOptionSelected)
                    writer.Write(", "); //Ако имаме записано от предишните данни добавяме запетая + новите данни

                writer.Write(LocalizeLabel("GL_SEPARATELY_L"));

                hasOtherOptionSelected = true;
            }

            if (field.OtherWay)
            {
                if (hasOtherOptionSelected)
                {
                    writer.Write(", "); //Ако имаме записано от предишните данни добавяме запетая + новите данни
                }

                writer.Write(LocalizeLabel("GL_OTHER_WAY_L"));
                writer.Write(":<br />");
                writer.Write(field.Text);
            }
        }
    }
}
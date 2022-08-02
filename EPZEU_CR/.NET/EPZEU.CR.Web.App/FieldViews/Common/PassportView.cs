using EPZEU.CR.Domain.Fields.Common;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews.Common
{
    public class PassportView : ObjectViewBase<Passport>
    {
        protected override void ToHtmlDisplayInternal(TextWriter writer, Passport model)
        {
            if(string.IsNullOrEmpty(model.Number) && string.IsNullOrEmpty(model.IssueDate) && string.IsNullOrEmpty(model.IssuedFrom))
            {
                writer.Write("");
            }

            if (!string.IsNullOrEmpty(model.Number))
            {
                writer.Write("<strong>");
                writer.Write(LocalizeLabel("CR_GL_ID_L")); //Документ за самоличност
                writer.Write(":</strong><br />");
                writer.Write("No. ");
                writer.Write(model.Number);
            }

            if (!string.IsNullOrEmpty(model.IssueDate))
            {
                if (!string.IsNullOrEmpty(model.Number))
                {
                    writer.Write("<br/>");
                }

                writer.Write(LocalizeLabel("CR_GL_ISSUED_ON_L"));  //Издаден на
                writer.Write(": ");
                writer.Write(model.IssueDate);
            }

            if(!string.IsNullOrEmpty(model.IssuedFrom))
            {
                if (!string.IsNullOrEmpty(model.IssueDate) || !string.IsNullOrEmpty(model.Number))
                {
                    writer.Write("<br/>");
                }

                writer.Write(LocalizeLabel("CR_GL_ISSUED_BY_L")); //Издаден от
                writer.Write(": ");
                writer.Write(model.IssuedFrom);
            }
        }
    }
}

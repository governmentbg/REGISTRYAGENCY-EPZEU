using EPZEU.CR.Domain.Fields.Common;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews.Common
{
    public class ContactsView : ObjectViewBase<Contacts>
    {
        protected override void ToHtmlDisplayInternal(TextWriter writer, Contacts model)
        {
            var hasPhoneOrFax = false;
            var hasEmail = false;

            if (!string.IsNullOrEmpty(model.Phone))
            {
                writer.Write(LocalizeLabel("GL_PHONE_L"));
                writer.Write(": ");
                writer.Write(model.Phone);
                hasPhoneOrFax = true;
            }

            if (!string.IsNullOrEmpty(model.Fax))
            {
                if (!string.IsNullOrEmpty(model.Phone))
                    writer.Write(", ");

                writer.Write(LocalizeLabel("GL_FAX_L"));
                writer.Write(": ");
                writer.Write(model.Fax);
                hasPhoneOrFax = true;
            }

            if (!string.IsNullOrEmpty(model.EMail))
            {
                if (hasPhoneOrFax)
                    writer.Write("<br/>");

                writer.Write(LocalizeLabel("GL_APP_EMAIL_ADDRESS_L"));
                writer.Write(": <a style=\"text-decoration:underline;color:black\" href=\"mailto:");
                writer.Write(model.EMail);
                writer.Write("\">");
                writer.Write(model.EMail);
                writer.Write("</a>");
                hasEmail = true;
            }

            if (!string.IsNullOrEmpty(model.URL))
            {
                if (!hasEmail && !hasPhoneOrFax) //0
                    writer.Write("<br/>");
                else
                    writer.Write(", ");

                string urlString = model.URL.StartsWith("http") ? model.URL : string.Format("http://{0}", model.URL);

                writer.Write(LocalizeLabel("GL_WEB_PAGE_L")); //1
                writer.Write(": <a style=\"text-decoration:underline;color:black\" href=\"");
                writer.Write(urlString); //2
                writer.Write("\" target=\"_blank\">");
                writer.Write(model.URL);
                writer.Write("</a>");
            }
        }
    }
}
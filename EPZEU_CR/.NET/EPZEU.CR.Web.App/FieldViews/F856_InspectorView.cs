using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F8560_StabilizationInspectorsView : FieldViewBase<F8560_StabilizationInspectors>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F8560_StabilizationInspectors field)
        {
            WrapRecordFieldListForDisplay(writer, field.StabilizationInspectorList, (w, r) =>
            {
                if (r.FirstInstanceText != "0")
                {
                    w.Write("<b>");
                    w.Write(LocalizeLabel("CR_GL_FIRST_INSTANCE_L").ToUpper());
                    w.Write("</b>");
                }
                else if (r.SeconfInstanceText != "0")
                {
                    w.Write("<b>");
                    w.Write(LocalizeLabel("CR_GL_SECOND_INSTANCE_L").ToUpper());
                    w.Write("</b>");
                }
                else if (r.ThirdInstanceText != "0")
                {
                    w.Write("<b>");
                    w.Write(LocalizeLabel("CR_GL_THIRD_INSTANCE_L").ToUpper());
                    w.Write("</b>");
                }

                bool hasPerson = !r.Person.IsEmpty();
                bool hasAddress = !r.Address.IsEmpty();
                bool hasContacts = !r.Contacts.IsEmpty();

                w.Write("<br />");
                ObjectHtmlDisplay(w, r.Person);
                if (hasPerson)
                {
                    w.Write("<br />");
                }
                ObjectHtmlDisplay(w, r.Address);
                if (hasAddress)
                {
                    w.Write("<br />");
                }
                ObjectHtmlDisplay(w, r.Contacts);
                if (hasContacts)
                {
                    w.Write("<br />");
                }
                ObjectHtmlDisplay(w, r.ActData);
            });
        }
    }


}



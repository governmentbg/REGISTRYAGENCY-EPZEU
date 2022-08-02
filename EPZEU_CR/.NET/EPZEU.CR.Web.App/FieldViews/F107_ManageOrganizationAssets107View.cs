using EPZEU.CR.Domain.Fields;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews
{
    public class F107_ManageOrganizationAssets107View : FieldViewBase<F107_ManageOrganizationAssets107>
    {
        protected override void HtmlDisplayInternal(TextWriter writer, F107_ManageOrganizationAssets107 field)
        {
            if (field.Limited)
                writer.Write(LocalizeLabel("CR_APP_LIMITED_DISPOSITION_L"));

            if (field.Forbidden)
                writer.Write(LocalizeLabel("CR_APP_PROHIBITION_DISPOSITION_L"));
        }
    }
}

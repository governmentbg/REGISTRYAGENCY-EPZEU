using System.IO;
using EPZEU.CR.Domain.Fields.Common;

namespace EPZEU.CR.Web.App.FieldViews.Common
{
    public class ForeignCompanyBaseDataView : ObjectViewBase<ForeignCompanyBaseData>
    {
        private readonly IObjectViewFactory _objectViewFactory;

        public ForeignCompanyBaseDataView(IObjectViewFactory objectViewFactory)
        {
            _objectViewFactory = objectViewFactory;
        }

        protected override void ToHtmlDisplayInternal(TextWriter writer, ForeignCompanyBaseData model)
        {
            var foreignAuthorityView = _objectViewFactory.CreateObjectView<ForeignAuthority>();

            writer.Write(LocalizeLabel("CR_APP_NAME_EOII_L"));
            writer.Write(": ");
            writer.Write(model.CompanyName);
            writer.Write("<br/>");
            foreignAuthorityView.HtmlDisplay(writer, model);
        }
    }
}
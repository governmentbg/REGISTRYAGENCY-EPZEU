using EPZEU.Nomenclatures;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.Extensions.Localization;
using System;
using System.IO;

namespace EPZEU.CR.Web.App.FieldViews.Common
{
    public interface IObjectView
    {
        void HtmlDisplay(TextWriter writer, Object model);       
    }

    public abstract class ObjectViewBase<T> : IObjectView
    {
        #region Injected members

        public IStringLocalizer Localizer { get; set; }

        public ICountries Coutries { get; set; }

        public IAuthorities Authorities { get; set; }

        public Integration.EPZEU.Nomenclatures.IBankruptcyMerits BankruptcyMerits { get; set; }
        //public Integration.EPZEU.Nomenclatures

        public Integration.EPZEU.Nomenclatures.IBankruptcyActTypes BankruptcyActTypes { get; set; }

        public Integration.EPZEU.Nomenclatures.IForeignComRegisters ForeignComRegisters { get; set; }

        public Integration.EPZEU.Nomenclatures.IForeignLegalForms ForeignLegalForms { get; set; }

        public IActionContextAccessor ActionContextAccessor { get; set; }

        #endregion

        protected abstract void ToHtmlDisplayInternal(TextWriter writer, T model);

        #region IObjectView

        public void HtmlDisplay(TextWriter writer, object model)
        {
            ToHtmlDisplayInternal(writer, (T)model);
        }

        #endregion

        #region Helpers

        protected string LocalizeLabel(string labelKey)
        {
            var label = Localizer[labelKey];

            return label ?? "TODO_KEY_" + labelKey;
        }

        protected IUrlHelper UrlHelper
        {
            get { return new UrlHelper(ActionContextAccessor.ActionContext); }
        }

        #endregion
    }
}

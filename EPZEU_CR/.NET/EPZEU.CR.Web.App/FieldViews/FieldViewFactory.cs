using EPZEU.CR.Domain.Fields.Common;
using EPZEU.Nomenclatures;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.Extensions.Localization;
using StructureMap;

namespace EPZEU.CR.Web.App.FieldViews
{
    public interface IFieldViewFactory
    {
        IFieldView CreateFieldView(IField field);
    }

    public class FieldViewFactory : IFieldViewFactory
    {
        private IContainer _container = null;

        public FieldViewFactory(
            IStringLocalizer localizer, 
            ICountries coutries, 
            IAuthorities authorities,
            Integration.EPZEU.Nomenclatures.IBankruptcyActTypes bankruptcyActTypes,
            Integration.EPZEU.Nomenclatures.IBankruptcyMerits bankruptcyMerits,
            Integration.EPZEU.Nomenclatures.IBankruptcySenderTypes bankruptcySenderTypes,
            Integration.EPZEU.Nomenclatures.ITrusteeStatuses trusteeStatuses,
            Integration.EPZEU.Nomenclatures.IForeignComRegisters foreignComRegisters,
            Integration.EPZEU.Nomenclatures.IForeignLegalForms foreignLegalForms,
            Integration.EPZEU.Nomenclatures.IBankruptcySuspendReasons bankruptcySuspendReasons,
            IActionContextAccessor actionContextAccessor
            )
        {
            _container = new Container();

            _container.Configure((config) =>
            {
                config.For<IStringLocalizer>().Use(localizer);
                config.For<ICountries>().Use(coutries);
                config.For<IAuthorities>().Use(authorities);
                config.For<Integration.EPZEU.Nomenclatures.IBankruptcyActTypes>().Use(bankruptcyActTypes);
                config.For<Integration.EPZEU.Nomenclatures.IBankruptcySuspendReasons>().Use(bankruptcySuspendReasons);
                config.For<Integration.EPZEU.Nomenclatures.IBankruptcyMerits>().Use(bankruptcyMerits);
                config.For<Integration.EPZEU.Nomenclatures.IBankruptcySenderTypes>().Use(bankruptcySenderTypes);
                config.For<Integration.EPZEU.Nomenclatures.ITrusteeStatuses>().Use(trusteeStatuses);
                config.For<Integration.EPZEU.Nomenclatures.IForeignComRegisters>().Use(foreignComRegisters);
                config.For<Integration.EPZEU.Nomenclatures.IForeignLegalForms>().Use(foreignLegalForms);
                config.For<IActionContextAccessor>().Use(actionContextAccessor);

                config.IncludeRegistry<FieldViewRegistry>();
            });
        }

        public IFieldView CreateFieldView(IField field)
        {
            return _container.GetInstance<IFieldView>(field.FieldIdent);
        }
    }
}

using EPZEU.CR.Domain.Fields;
using EPZEU.CR.Domain.Fields.Common;
using EPZEU.Nomenclatures;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.Extensions.Localization;
using StructureMap;

namespace EPZEU.CR.Web.App.FieldViews.Common
{
    public class ObjectViewRegistry : Registry
    {
        public ObjectViewRegistry()
        {
            RegisterObjectView<AddressView>(typeof(Address).FullName);
            RegisterObjectView<BankruptcyActView>(typeof(BankruptcyAct).FullName);
            RegisterObjectView<ContactsView>(typeof(Contacts).FullName);
            RegisterObjectView<ForeignAuthorityView>(typeof(ForeignAuthority).FullName);
            RegisterObjectView<ForeignCompanyBaseDataView>(typeof(ForeignCompanyBaseData).FullName);
            RegisterObjectView<MandateView>(typeof(Mandate).FullName);
            RegisterObjectView<PassportView>(typeof(Passport).FullName);
            RegisterObjectView<PersonView>(typeof(Person).FullName);
            RegisterObjectView<PriceView>(typeof(Price).FullName);
            RegisterObjectView<StatementView>(typeof(Statement).FullName);
            RegisterObjectView<MannerRecordView>(typeof(MannerRecordHolder).FullName);

            For<IObjectViewFactory>().Use<ObjectViewFactory>().Singleton();
        }

        private void RegisterObjectView<TObjectView>(string type) where TObjectView : IObjectView
        {
            For<IObjectView>().Use<TObjectView>().Named(type).Singleton()
                .Setter<IStringLocalizer>("Localizer").IsTheDefault()
                .Setter<ICountries>("Coutries").IsTheDefault()
                .Setter<IAuthorities>("Authorities").IsTheDefault()
                .Setter<Integration.EPZEU.Nomenclatures.IBankruptcyMerits>("BankruptcyMerits").IsTheDefault()
                .Setter<Integration.EPZEU.Nomenclatures.IBankruptcyActTypes>("BankruptcyActTypes").IsTheDefault()
                .Setter<Integration.EPZEU.Nomenclatures.IForeignComRegisters>("ForeignComRegisters").IsTheDefault()
                .Setter<Integration.EPZEU.Nomenclatures.IForeignLegalForms>("ForeignLegalForms").IsTheDefault()
                .Setter<IActionContextAccessor>("ActionContextAccessor").IsTheDefault();
        }
    }
}

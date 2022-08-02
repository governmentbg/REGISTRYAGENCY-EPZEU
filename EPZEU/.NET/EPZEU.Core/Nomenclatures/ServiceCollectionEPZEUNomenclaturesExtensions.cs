using EPZEU.Nomenclatures;
using EPZEU.Nomenclatures.Cache;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServiceCollectionEPZEUNomenclaturesExtensions
    {
        /// <summary>
        /// Добавя базовите услуги за работа  номенклатури в EPZEU с имплементация за достъп през услуга.
        /// </summary>
        /// <param name="services"></param>
        /// <returns></returns>
        public static IServiceCollection AddEPZEUNomenclaturesRemoteCachingServices(this IServiceCollection services)
        {
            services.AddEPZEUNomenclatureAuthoritiesRemote();

            services.AddEPZEUNomenclatureLabelsRemote();

            services.AddEPZEUNomenclatureLanguagesRemote();

            services.AddEPZEUNomenclatureCountriesRemote();

            services.AddEPZEUNomenclatureApplicationTypesRemote();

            services.AddEPZEUNomenclatureServicesRemote();

            services.AddEPZEUNomenclatureEKATTERemote();

            services.AddEPZEUNomenclatureForeignComRegistersRemote();
            services.AddEPZEUNomenclatureActsRemote();
            services.AddEPZEUNomenclatureForeignLegalFormsRemote();
            services.AddEPZEUNomenclatureLegalFormsRemote();
            services.AddEPZEUNomenclatureNKIDsRemote();
            services.AddEPZEUNomenclatureReleaseReasonsRemote();
            services.AddEPZEUNomenclatureApplicationDocumentTypesRemote();

            return services;
        }

        public static IServiceCollection AddEPZEUNomenclatureLabelsRemote(this IServiceCollection services)
        {
            services.TryAddSingleton<ILabelsDataCache, LabelPollingCache>();
            services.AddSingleton<ILabels, Labels>();

            return services;
        }

        public static IServiceCollection AddEPZEUNomenclatureCountriesRemote(this IServiceCollection services)
        {
            services.TryAddSingleton<ICountriesCache, CountriesPollingCache>();
            services.AddSingleton<ICountries, Countries>();

            return services;
        }

        public static IServiceCollection AddEPZEUNomenclatureLanguagesRemote(this IServiceCollection services)
        {
            services.TryAddSingleton<ILanguagesCache, LanguagesPollingCache>();
            services.AddSingleton<ILanguages, Languages>();

            return services;
        }

        public static IServiceCollection AddEPZEUNomenclatureAuthoritiesRemote(this IServiceCollection services)
        {
            services.TryAddSingleton<IAuthoritiesDataCache, AuthoritiesPollingCache>();
            services.AddSingleton<IAuthorities, Authorities>();

            return services;
        }

        public static IServiceCollection AddEPZEUNomenclatureApplicationTypesRemote(this IServiceCollection services)
        {
            services.TryAddSingleton<IApplicationTypesDataCache, ApplicationTypesPollingCache>();
            services.AddSingleton<IApplicationTypes, ApplicationTypes>();

            return services;
        }

        public static IServiceCollection AddEPZEUNomenclatureActsRemote(this IServiceCollection services)
        {
            services.TryAddSingleton<IActsCache, ActsPollingCache>();
            services.AddSingleton<IActs, Acts>();

            return services;
        }

        public static IServiceCollection AddEPZEUNomenclatureForeignComRegistersRemote(this IServiceCollection services)
        {
            services.TryAddSingleton<IForeignComRegistersDataCache, ForeignComRegistersPollingCache>();
            services.AddSingleton<IForeignComRegisters, ForeignComRegisters>();

            return services;
        }

        public static IServiceCollection AddEPZEUNomenclatureForeignLegalFormsRemote(this IServiceCollection services)
        {
            services.TryAddSingleton<IForeignLegalFormsDataCache, ForeignLegalFormsPollingCache>();
            services.AddSingleton<IForeignLegalForms, ForeignLegalForms>();

            return services;
        }

        public static IServiceCollection AddEPZEUNomenclatureLegalFormsRemote(this IServiceCollection services)
        {
            services.TryAddSingleton<ILegalFormDataCache, LegalFormPollingCache>();
            services.AddSingleton<ILegalForms, LegalForms>();

            return services;
        }

        public static IServiceCollection AddEPZEUNomenclatureNKIDsRemote(this IServiceCollection services)
        {
            services.TryAddSingleton<INKIDDataCache, NKIDPollingCache>();
            services.AddSingleton<INKID, NKIDs>();

            return services;
        }

        public static IServiceCollection AddEPZEUNomenclatureReleaseReasonsRemote(this IServiceCollection services)
        {
            services.TryAddSingleton<IReleaseReasonsCache, ReleaseReasonsPollingCache>();
            services.AddSingleton<IReleaseReasons, ReleaseReasons>();

            return services;
        }

        public static IServiceCollection AddEPZEUNomenclatureApplicationDocumentTypesRemote(this IServiceCollection services)
        {
            services.TryAddSingleton<IDocumentTypesApplicationDocumentTypesDataCacheCR, DocumentTypesApplicationDocumentTypesPollingCacheCR>();
            services.AddSingleton<IApplicationDocumentTypes, ApplicationDocumentTypesCR>();

            return services;
        }

        public static IServiceCollection AddEPZEUNomenclatureEKATTERemote(this IServiceCollection services)
        {
            services.TryAddSingleton<IDistrictsDataCache, DistrictsPollingCache>();
            services.TryAddSingleton<IMunicipalitiesDataCache, MunicipalitiesPollingCache>();
            services.TryAddSingleton<ISettlementsDataCache, SettlementsPollingCache>();
            services.TryAddSingleton<IAreasDataCache, AreasPollingCache>();
            services.AddSingleton<IEkatte, EKATTE>();

            return services;
        }

        public static IServiceCollection AddEPZEUNomenclatureServicesRemote(this IServiceCollection services)
        {
            services.TryAddSingleton<IServicesDataCache, ServicesPollingCache>();
            services.AddSingleton<IServices, Services>();

            return services;
        }
    }
}

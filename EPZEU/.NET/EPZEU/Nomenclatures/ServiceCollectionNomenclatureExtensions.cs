using EPZEU.Nomenclatures;
using EPZEU.Nomenclatures.Cache;
using EPZEU.Nomenclatures.Repositories;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServiceCollectionNomenclatureExtensions
    {
        /// <summary>
        /// Регистрира услуги за достъп до номенклатурите към базата данни.
        /// </summary>
        /// <param name="services"></param>
        /// <returns></returns>
        public static IServiceCollection AddEPZEUNomenclatures(this IServiceCollection services)
        {
            services.TryAddSingleton(typeof(ILabelRepository), typeof(LabelRepository));
            services.TryAddSingleton(typeof(ILabelTranslationRepository), typeof(LabelTranslationRepository));
            services.TryAddSingleton(typeof(ILabelService), typeof(LabelService));

            services.AddEPZEULanguageRepository();

            services.TryAddSingleton(typeof(IApplicationTypeRepository), typeof(ApplicationTypeRepository));

            services.TryAddSingleton(typeof(IIISDAServicesRepository), typeof(IISDAServicesRepository));

            services.TryAddSingleton(typeof(IServiceRepository), typeof(ServiceRepository));

            services.TryAddSingleton(typeof(IDocumentTemplateRepository), typeof(DocumentTemplateRepository));
            services.TryAddSingleton(typeof(IDocumentTemplateFieldRepository), typeof(DocumentTemplateFieldRepository));

            services.TryAddSingleton(typeof(ISpecialAccessUserTypeRepository), typeof(SpecialAccessUserTypeRepository));

            return services;
        }

        public static IServiceCollection AddEPZEULanguageRepository(this IServiceCollection services)
        {
            services.TryAddSingleton(typeof(ILanguageRepository), typeof(LanguageRepository));
            return services;
        }

        /// <summary>
        /// Добавя базовите интерфейси с кеширане за работа с номенклатури в EPZEU с имплементация за достъп през базата данни.
        /// </summary>
        /// <param name="services"></param>
        /// <returns></returns>
        public static IServiceCollection AddEPZEUNomenclaturesDBCaching(this IServiceCollection services)
        {
            services.AddEPZEUNomenclatureLanguagesDb();
            services.AddEPZEUNomenclatureLabelsDb();
            services.AddEPZEUNomenclatureApplicationTypesDb();
            services.AddEPZEUNomenclatureDocumentTemplatesDb();
            services.AddEPZEUNomenclatureServicesDb();
            services.AddEPZEUNomenclatureIISDAServicesDb();
            services.AddEPZEUNomenclatureSpecialAccessUserTypesDb();

            return services;
        }

        public static IServiceCollection AddEPZEUNomenclatureLabelsDb(this IServiceCollection services)
        {
            services.TryAddSingleton<ILabelsDataCache, LabelsDbCache>();
            services.TryAddSingleton<ILabels, Labels>();
            return services;
        }

        public static IServiceCollection AddEPZEUNomenclatureLanguagesDb(this IServiceCollection services)
        {
            services.TryAddSingleton<ILanguagesCache, LanguagesDbCache>();
            services.TryAddSingleton<ILanguages, Languages>();
            return services;
        }

        public static IServiceCollection AddEPZEUNomenclatureIISDAServicesDb(this IServiceCollection services)
        {
            services.TryAddSingleton<IIISDAServicesCache, IISDAServicesDbCache>();
            services.TryAddSingleton<IIISDAServices, IISDAServices>();
            return services;
        }

        public static IServiceCollection AddEPZEUNomenclatureSpecialAccessUserTypesDb(this IServiceCollection services)
        {
            services.TryAddSingleton<ISpecialAccessUserTypesDataCache, SpecialAccessUserTypesDbCache>();
            services.TryAddSingleton<ISpecialAccessUserTypes, SpecialAccessUserTypes>();
            return services;
        }

        public static IServiceCollection AddEPZEUNomenclatureApplicationTypesDb(this IServiceCollection services)
        {
            services.TryAddSingleton<IApplicationTypesDataCache, ApplicationTypesDbCache>();
            services.TryAddSingleton<IApplicationTypes, ApplicationTypes>();
            return services;
        }

        public static IServiceCollection AddEPZEUNomenclatureServicesDb(this IServiceCollection services)
        {
            services.TryAddSingleton<IServicesDataCache, ServicesDbCache>();
            services.TryAddSingleton<IServices, Services>();
            return services;
        }

        public static IServiceCollection AddEPZEUNomenclatureDocumentTemplatesDb(this IServiceCollection services)
        {
            services.TryAddSingleton<IDocumentTemplatesDataCache, DocumentTemplatesDbCache>();
            services.TryAddSingleton<IDocumentTemplatesContentDbCache, DocumentTemplatesContentDbCache>();
            services.TryAddSingleton<IDocumentTemplates, DocumentTemplates>();

            return services;
        }
    }
}

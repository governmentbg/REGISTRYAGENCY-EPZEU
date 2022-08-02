using EPZEU.CR.Web.App.Models.Applications;
using EPZEU.CR.Web.App.Models.Deeds;
using EPZEU.CR.Web.App.Models.Validators;
using FluentValidation;
using Integration.EPZEU.Models.SearchCriteria;


namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServiceCollectionValidatorsServiceClientsExtensions
    {
        public static IServiceCollection AddValidators(this IServiceCollection serviceCollection)
        {
            serviceCollection.AddSingleton<IValidator<InstructionSearchCriteria>, InstructionSearchCriteriaValidator>();
            serviceCollection.AddSingleton<IValidator<BasePagedSearchCriteria>, CRBasePagedSearchCriteriaValidator<BasePagedSearchCriteria>>();
            serviceCollection.AddSingleton<IValidator<EPZEU.Common.Models.BasePagedSearchCriteria>, BasePagedSearchCriteriaValidator<EPZEU.Common.Models.BasePagedSearchCriteria>>();
            serviceCollection.AddSingleton<IValidator<NotificationSearchCriteria>, NotificationSearchCriteriaValidator>();
            serviceCollection.AddSingleton<IValidator<MasterAssignmentSearchCriteria>, MasterAssignmentSearchCriteriaValidator>();
            serviceCollection.AddSingleton<IValidator<BankruptcyEntrySearchCriteria>, BankruptcySearchCriteriaValidator>();
            serviceCollection.AddSingleton<IValidator<BulstatDeedsSearchCriteria>, BulstatDeedsSearchCriteriaValidator>();
            serviceCollection.AddSingleton<IValidator<UnassignedAssignmentSearchCriteria>, UnassignedAssignmentSearchCriteriaValidator>();
            serviceCollection.AddSingleton<IValidator<DocumentsWithoutDeedSearchCriteria>, DocumentsWithoutDeedSearchCriteriaValidator>();
            serviceCollection.AddSingleton<IValidator<EntrySearchCriteria>, EntrySearchCriteriaValidator>();
            serviceCollection.AddSingleton<IValidator<LiquidationEntrySearchCriteria>, LiquidationEntrySearchCriteriaValidator>();
            serviceCollection.AddSingleton<IValidator<CompanyInfoSearchCriteria>, CompanyInfoSearchCriteriaValidator>();
            serviceCollection.AddSingleton<IValidator<CompanyProtrectionRightsSearchCriteria>, CompanyProtrectionRightsSearchCriteriaValidator>();
            serviceCollection.AddSingleton<IValidator<StatementSearchCriteria>, StatementSearchCriteriaValidator>();
            serviceCollection.AddSingleton<IValidator<VerificationActsSubSearchCriteria>, VerificationActsSubSearchCriteriaValidator>();
            serviceCollection.AddSingleton<IValidator<VerificationPersonOrgSearchCriteria>, VerificationPersonOrgSearchCriteriaValidator>();
            

            return serviceCollection;
        }
    }
}

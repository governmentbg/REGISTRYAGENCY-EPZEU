using Integration.EPZEU.Models;
using StructureMap;
using System;

namespace EPZEU.CR.ApplicationFormProviders
{
    public class ApplicationFormProvidersRegistry : Registry
    {
        public ApplicationFormProvidersRegistry()
        {
            RegisterProvider<A1Provider>(ApplicationFormTypes.A1);
            RegisterProvider<A2Provider>(ApplicationFormTypes.A2);
            RegisterProvider<A3Provider>(ApplicationFormTypes.A3);
            RegisterProvider<A4Provider>(ApplicationFormTypes.A4);
            RegisterProvider<A5Provider>(ApplicationFormTypes.A5);
            RegisterProvider<A6Provider>(ApplicationFormTypes.A6);
            RegisterProvider<A7Provider>(ApplicationFormTypes.A7);
            RegisterProvider<A8Provider>(ApplicationFormTypes.A8);
            RegisterProvider<A9Provider>(ApplicationFormTypes.A9);
            RegisterProvider<A10Provider>(ApplicationFormTypes.A10);
            RegisterProvider<A11Provider>(ApplicationFormTypes.A11);
            RegisterProvider<A12Provider>(ApplicationFormTypes.A12);
            RegisterProvider<A13Provider>(ApplicationFormTypes.A13);
            RegisterProvider<A14Provider>(ApplicationFormTypes.A14);
            RegisterProvider<A15Provider>(ApplicationFormTypes.A15);
            RegisterProvider<A16Provider>(ApplicationFormTypes.A16);
            RegisterProvider<A17Provider>(ApplicationFormTypes.A17);
            RegisterProvider<A18Provider>(ApplicationFormTypes.A18);
            RegisterProvider<A6Provider>(ApplicationFormTypes.A6);
            RegisterProvider<B1Provider>(ApplicationFormTypes.B1);
            RegisterProvider<B2Provider>(ApplicationFormTypes.B2);
            RegisterProvider<B3Provider>(ApplicationFormTypes.B3);
            RegisterProvider<B4Provider>(ApplicationFormTypes.B4);
            RegisterProvider<B5Provider>(ApplicationFormTypes.B5);
            RegisterProvider<B6Provider>(ApplicationFormTypes.B6);
            RegisterProvider<B7Provider>(ApplicationFormTypes.B7);
            RegisterProvider<D1Provider>(ApplicationFormTypes.D1);
            RegisterProvider<E1Provider>(ApplicationFormTypes.E1);
            RegisterProvider<J1Provider>(ApplicationFormTypes.J1);
            RegisterProvider<G1Provider>(ApplicationFormTypes.G1);
            RegisterProvider<G2Provider>(ApplicationFormTypes.G2);
            RegisterProvider<G3Provider>(ApplicationFormTypes.G3);
            RegisterProvider<V1Provider>(ApplicationFormTypes.V1);
            RegisterProvider<V21Provider>(ApplicationFormTypes.V21);
            RegisterProvider<V22Provider>(ApplicationFormTypes.V22);
            RegisterProvider<V23Provider>(ApplicationFormTypes.V23);
            RegisterProvider<V24Provider>(ApplicationFormTypes.V24);
            RegisterProvider<V25Provider>(ApplicationFormTypes.V25);
            RegisterProvider<V26Provider>(ApplicationFormTypes.V26);
            RegisterProvider<V31Provider>(ApplicationFormTypes.V31);
            RegisterProvider<V32Provider>(ApplicationFormTypes.V32);
            RegisterProvider<V33Provider>(ApplicationFormTypes.V33);
            RegisterProvider<AppealRefusalProvider>(ApplicationFormTypes.Complaint);
            RegisterProvider<ActOfContestationProvider>(ApplicationFormTypes.ActOfContestation);
            RegisterProvider<AppointingDemandProvider>(ApplicationFormTypes.AppointingExpert);
            RegisterProvider<AppointingDeclarationProvider>(ApplicationFormTypes.AppointingDeclaration);
            RegisterProvider<AppointingReportAndExaminationProvider>(ApplicationFormTypes.AppointingReportAndExamination);
            RegisterProvider<AppointingRequestForCorrectionProvider>(ApplicationFormTypes.AppointingRequestForCorrection);
            RegisterProvider<AppointingControllerRewardProvider>(ApplicationFormTypes.AppointingControllerReward);
            RegisterProvider<AppointingReleaseDepositProvider>(ApplicationFormTypes.AppointingReleaseDeposit);
            RegisterProvider<AppointingChangeRequestProvider>(ApplicationFormTypes.AppointingChangeRequest);
            RegisterProvider<AppointingReleaseProvider>(ApplicationFormTypes.ReleaseAppointingExpert);
            RegisterProvider<AppointingPaidDepositProvider>(ApplicationFormTypes.AppointingPaidDeposit);
            RegisterProvider<AttitudeOfChangeRequestProvider>(ApplicationFormTypes.AttitudeOfChangeRequest);
            RegisterProvider<NotificationOfLackOfMeansProvider>(ApplicationFormTypes.NotificationOfLackOfMeans);
            RegisterProvider<AppointingContactAddressChangeProvider>(ApplicationFormTypes.AppointingContactAddressChange);
            RegisterProvider<NotificationOfExaminationImpossibilityProvider>(ApplicationFormTypes.NotificationOfExaminationImpossibility);
            RegisterProvider<IncomingRequestForCorrectionProvider>(ApplicationFormTypes.RequestForCorrection);
            RegisterProvider<RequestForCertificateForReservedCompanyProvider>(ApplicationFormTypes.CertificateForReserveFirm);
            RegisterProvider<RequestForActualStateCertificateProvider>(ApplicationFormTypes.ActualStateCertificate);
            RegisterProvider<RequestForEntryByPeriodCertificateProvider>(ApplicationFormTypes.EntryByPeriodCertificate);
            RegisterProvider<RequestForPublicationByPeriodCertificateProvider>(ApplicationFormTypes.PublicationByPeriodCertificate);
            RegisterProvider<RequestForEnteredCircumstancesCertificateProvider>(ApplicationFormTypes.EnteredCircumstancesCertificate);
            RegisterProvider<RequestForActOrCopyOfActCertificateProvider>(ApplicationFormTypes.ActOrCopyOfActCertificate);
            RegisterProvider<RequestForMissingActsCertificateProvider>(ApplicationFormTypes.MissingActsCertificate);

            RegisterProvider<BRISBranchDisclosureReceptionMessageProvider>(ApplicationFormTypes.BRISBranchDisclosureReceptionMessage);
            RegisterProvider<BRISCrossborderMergeReceptionMessageProvider>(ApplicationFormTypes.BRISCrossborderMergeReceptionMessage);
            RegisterProvider<BRISChangeCompanyEUIDReceptionMessageProvider>(ApplicationFormTypes.BRISChangeCompanyEUIDReceptionMessage);
        }

        private void RegisterProvider<TProvider>(ApplicationFormTypes applicationType) where TProvider : IApplicationProvider
        {
            For<IApplicationProvider>().Use<TProvider>().Named(applicationType.ToString()).Setter<IServiceProvider>("ServiceProvider").IsTheDefault();
        }
    }

    /// <summary>
    /// Интерфейс за генериране на обекти за работа със съдържанието на заявление.
    /// </summary>
    public interface IApplicationFormProviderFactory
    {
        /// <summary>
        /// Създава обект за работа със съдържанието на заявление.
        /// </summary>
        /// <param name="applicationType">Тип на заявлението.</param>
        /// <returns>Обект за работа със съдържанието на заявление.</returns>
        IApplicationProvider CreateApplicationProvider(ApplicationFormTypes applicationType);
    }

    /// <summary>
    /// Реализация на интерфейс IApplicationFormProviderFactory за генериране на обекти за работа със съдържанието на заявление.
    /// </summary>
    public class ApplicationFormProviderFactory : IApplicationFormProviderFactory
    {
        private IContainer _container = null;

        public ApplicationFormProviderFactory(IServiceProvider serviceProvider)
        {
            _container = new Container();

            _container.Configure((config) =>
            {
                config.IncludeRegistry<ApplicationFormProvidersRegistry>();
                config.For<IServiceProvider>().Use(serviceProvider);
            });
        }

        public IApplicationProvider CreateApplicationProvider(ApplicationFormTypes applicationType)
        {
            var ret = _container.GetInstance<IApplicationProvider>(applicationType.ToString());

            if (ret == null)
                throw new NotSupportedException(String.Format("Application provider was not found for {0}.", applicationType));

            return ret;
        }
    }
}

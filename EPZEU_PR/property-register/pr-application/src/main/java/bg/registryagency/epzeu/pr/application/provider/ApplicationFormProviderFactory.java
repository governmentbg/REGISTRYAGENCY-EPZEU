package bg.registryagency.epzeu.pr.application.provider;

import bg.registryagency.epzeu.pr.application.ApplicationType;
import bg.registryagency.epzeu.pr.application.exception.UnsupportedApplicationException;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

/**
 * Factory за осигуряване на Provider според типа на заявлението.
 *
 * {@link ApplicationFormProvider, ApplicationForReportInPropertyRegistryProvider, ReportForAccountPropertyProvider, UvtlApplicationFormProvider}
 */
@Component
public final class ApplicationFormProviderFactory {
    /**Map за осигуряване на връзката между типа на заявление и съответния Provider на заявлението*/
    private final Map<ApplicationType, ApplicationFormProvider> providers = new HashMap<>();

    /**
     * Конструктор за създаване на Factory за осугуряване на Provider-и на заявления според техния тип.
     * @param applicationForCertificateForPersonProvider Provider за осигуряване на Заявление за издаване на удостоверение за лице от Иотен регистър.
     * @param applicationForCertificateForPropertyProvider Provider за осигуряване на Заявление за издаване на удостоверение за имот от Иотен регистър.
     * @param applicationForCertificateForPeriodForPersonProvider Provider за осигуряване на Заявление за издаване на удостоверение за период за лице от Иотен регистър.
     * @param applicationForCertificateForPeriodForPropertyProvider Provider за осигуряване на Заявление за издаване на удостоверение за период за имот от Иотен регистър.
     * @param applicationForCertifiedCopyProvider Provider за осигуряване на Заявление за издаване на заверен препис от Иотен регистър.
     * @param applicationForNotCertifiedCopyProvider Provider за осигуряване на Заявление за издаване на незаверен препис от Иотен регистър.
     * @param applicationForUpcomingDealForPropertyProvider Provider за осигуряване на Заявление за деклариране на предстояща сделка от Иотен регистър.
     * @param requestForReportOfDocumentProvider Provider за осигуряване на Заявление на справка чрез отдалечен достъп за документ от Имотен регистър.
     * @param requestForReportOfAccountPropertyProvider Provider за осигуряване на Заявление на справка чрез отдалечен достъп за електронна партида на имот от Имотен регистър.
     * @param requestForReportOfPersonProvider Provider за осигуряване на Заявление на справка чрез отдалечен достъп за лице от Имотен регистър за избрана служба по вписвания.
     * @param requestForReportOfPropertyProvider Provider за осигуряване на Заявление на справка чрез отдалечен достъп за имот от Имотен регистър за избрана служба по вписвания.
     * @param requestForReportOfPersonInAllRegistryOfficesProvider Provider за осигуряване на Заявление на справка чрез отдалечен достъп за лице във всички служби по вписвания от Имотен регистър.
     */
    public ApplicationFormProviderFactory(@Qualifier(value = "applicationForCertificateForPersonProvider") ApplicationFormProvider applicationForCertificateForPersonProvider,
                                          @Qualifier(value = "applicationForCertificateForPropertyProvider") ApplicationFormProvider applicationForCertificateForPropertyProvider,
                                          @Qualifier(value = "applicationForCertificateForPeriodForPersonProvider") ApplicationFormProvider applicationForCertificateForPeriodForPersonProvider,
                                          @Qualifier(value = "applicationForCertificateForPeriodForPropertyProvider") ApplicationFormProvider applicationForCertificateForPeriodForPropertyProvider,
                                          @Qualifier(value = "applicationForCertifiedCopyProvider") ApplicationFormProvider applicationForCertifiedCopyProvider,
                                          @Qualifier(value = "applicationForNotCertifiedCopyProvider") ApplicationFormProvider applicationForNotCertifiedCopyProvider,
                                          @Qualifier(value = "applicationForUpcomingDealForPropertyProvider")ApplicationFormProvider applicationForUpcomingDealForPropertyProvider,
                                          @Qualifier(value = "requestForReportOfDocumentProvider") ApplicationFormProvider requestForReportOfDocumentProvider,
                                          @Qualifier(value = "requestForReportOfAccountPropertyProvider") ApplicationFormProvider requestForReportOfAccountPropertyProvider,
                                          @Qualifier(value = "requestForReportOfPersonProvider") ApplicationFormProvider requestForReportOfPersonProvider,
                                          @Qualifier(value = "requestForReportOfPropertyProvider")ApplicationFormProvider requestForReportOfPropertyProvider,
                                          @Qualifier(value = "requestForReportOfPersonInAllRegistryOfficesProvider")ApplicationFormProvider requestForReportOfPersonInAllRegistryOfficesProvider) {
        providers.put(ApplicationType.APPLICATION_CERTIFICATE_PERSON, applicationForCertificateForPersonProvider);
        providers.put(ApplicationType.APPLICATION_CERTIFICATE_PROPERTY, applicationForCertificateForPropertyProvider);
        providers.put(ApplicationType.APPLICATION_CERTIFICATE_PERIOD_FOR_PERSON, applicationForCertificateForPeriodForPersonProvider);
        providers.put(ApplicationType.APPLICATION_CERTIFICATE_PERIOD_FOR_PROPERTY, applicationForCertificateForPeriodForPropertyProvider);

        providers.put(ApplicationType.APPLICATION_CERTIFIED_COPY,applicationForCertifiedCopyProvider);
        providers.put(ApplicationType.APPLICATION_NOT_CERTIFIED_COPY,applicationForNotCertifiedCopyProvider);

        providers.put(ApplicationType.APPLICATION_FOR_DECLARATION_OF_UPCOMING_DEAL_WITH_PROPERTY, applicationForUpcomingDealForPropertyProvider);

        providers.put(ApplicationType.REQUEST_FOR_REPORT_FOR_DOCUMENT, requestForReportOfDocumentProvider);
        providers.put(ApplicationType.REQUEST_FOR_REPORT_FOR_ACCOUNT_PROPERTY, requestForReportOfAccountPropertyProvider);
        providers.put(ApplicationType.REQUEST_FOR_REPORT_FOR_PERSON,requestForReportOfPersonProvider);
        providers.put(ApplicationType.REQUEST_FOR_REPORT_FOR_PROPERTY,requestForReportOfPropertyProvider);
        providers.put(ApplicationType.REQUEST_FOR_REPORT_FOR_PERSON_IN_ALL_REGISTRY_OFFICES, requestForReportOfPersonInAllRegistryOfficesProvider);
    }

    /**
     * Връща Provider отговарящ за заявление от съответния тип.
     * @param applicationType тип на заявлението, за което се изисква Provider.
     * @return Provider за съответното заявление.
     */
    public ApplicationFormProvider getApplicationFormProvider(ApplicationType applicationType) {
        ApplicationFormProvider applicationFormProvider = providers.get(applicationType);
        if (applicationFormProvider == null) {
            throw new UnsupportedApplicationException(applicationType);
        }
        return applicationFormProvider;
    }
}

package bg.registryagency.epzeu.pr.application.conf;

import bg.registryagency.epzeu.pr.application.*;
import lombok.extern.slf4j.Slf4j;

import javax.xml.bind.JAXBException;

@Slf4j
public final class JAXBContext {
    private JAXBContext(){}

    private static javax.xml.bind.JAXBContext jaxbContext;

    static {
        try {
            //Initialize jaxbContext one time, it is very expensive to initialize it for every jaxb operation, jaxbcontext is thread save and is recommended to be singleton
            jaxbContext = javax.xml.bind.JAXBContext.newInstance(ApplicationForCertificateForPeriod.class,
                ApplicationForCertificateForPerson.class,
                ApplicationForCertificateForProperty.class,
                ApplicationForCertifiedCopy.class,
                ApplicationForNotCertifiedCopy.class,
                ApplicationForUpcomingDealForProperty.class,
                RequestForReportOfAccountProperty.class,
                RequestForReportOfDocument.class,
                RequestForReportOfPerson.class,
                RequestForReportOfPersonInAllRegistryOffices.class,
                RequestForReportOfProperty.class);
        } catch (JAXBException e) {
            log.error(e.getMessage(), e);
        }
    }

    public static javax.xml.bind.JAXBContext getInstance() {
        return jaxbContext;
    }
}

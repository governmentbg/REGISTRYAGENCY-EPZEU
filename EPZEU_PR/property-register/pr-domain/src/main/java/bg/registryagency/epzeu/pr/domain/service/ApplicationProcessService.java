package bg.registryagency.epzeu.pr.domain.service;

import bg.registryagency.epzeu.pr.application.ApplicationType;
import bg.registryagency.epzeu.pr.application.exception.ApplicationDataException;
import bg.registryagency.epzeu.pr.application.segment.ApplicantDataOfReport;
import bg.registryagency.epzeu.pr.domain.model.ApplicationProcess;
import bg.registryagency.epzeu.pr.domain.model.Result;
import bg.registryagency.epzeu.pr.domain.vo.SearchCriteria;
import bg.registryagency.epzeu.pr.integration.payment.dto.ObligationDto;
import bg.registryagency.epzeu.pr.integration.reau.dto.ApplicationInfo;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.xml.sax.SAXException;
import reactor.core.publisher.Flux;

import javax.validation.constraints.Positive;
import javax.xml.bind.JAXBException;
import javax.xml.stream.XMLStreamException;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

/**
 * �?нтерфейс на услуга за работа с процес на заявяване на справка или услуга.
 *
 * {@link ApplicationProcess}
 */
public interface ApplicationProcessService {
    /**
     * Осигурява процес по заяваване на услуга.
     * @param applicationType тип на заявлението, за което ще се върне процес по заявяване.
     * @return процес по заявяване на услуга.
     */
    ApplicationProcess getApplicationProcessByApplicationType(ApplicationType applicationType, boolean loadAllData);

    /**
     * Търси процес по заявяване на услуга.
     * @param searchCriteria критерии, по които се търси процеса по заявяване.
     * @return намерените процеси по завяване отговарящи на критериите за търсене.
     */
    Result<ApplicationProcess> search(SearchCriteria.ApplicationProcessSearchCriteria searchCriteria);

    /**
     * �?зтрива процес по заявяване на услуга.
     * @param processId идентификатор на процес по заявяване на услуга.
     */
    void delete(long processId);

    /**
     * Създава процес по заявяване на услуга.
     * @param applicationType тип на заявлението, за който да се създаде процес по заявяване на услуга.
     * @return процес по заявяване на услуга.
     */
    ApplicationProcess create(ApplicationType applicationType, ObjectNode additionalData) throws JAXBException, IOException, ApplicationDataException;

    void startSending(Long applicationProcessId) throws ApplicationDataException, SAXException, JAXBException, XMLStreamException, IOException;

    UUID startSigning(Long applicationProcessId) throws SAXException, JAXBException, XMLStreamException, IOException, ApplicationDataException;

    void rejectSigning(UUID signingUuid);

    void completeSigning(UUID signingUuid, int userCIN, String ipAddress,
                         String userSessionID, String loginSessionID, byte[] signDocumentContent);

    void completeApplicationRegistration(List<ApplicationInfo> registeredAppInfos);

    void returnToBeginningStatus(long processId);

    Flux<ObligationDto> searchApplicationProcessObligations(@Positive long appProcessId);

    boolean hasChangesInApplicationsNomenclature(ApplicationProcess applicationProcess);

    void validateAuthenticationType(ApplicationType applicationType) throws ApplicationDataException;

    boolean isApplicationActive(ApplicationType applicationType);
}

package bg.registryagency.epzeu.pr.domain.service;

import bg.registryagency.epzeu.pr.application.ApplicationType;
import bg.registryagency.epzeu.pr.application.exception.ApplicationDataException;
import bg.registryagency.epzeu.pr.domain.model.Application;
import bg.registryagency.epzeu.pr.domain.model.ApplicationProcess;
import bg.registryagency.epzeu.pr.domain.model.Result;
import bg.registryagency.epzeu.pr.domain.vo.SearchCriteria;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.NonNull;

import javax.xml.bind.JAXBException;
import java.io.IOException;

/**
 * Интерфейс на услуга за работа със заявления.
 *
 * {@link Application}
 */
public interface ApplicationService {
    /**
     * Създава заявление.
     * @param applicationProcess процес по заявяване на услуга, в който участва даденото заявление.
     * @param type тип на заявлението.
     * @param order номер на заявлението.
     * @return създаденото заявление с идентификационен номер.
     */
    Application create(ApplicationProcess applicationProcess, ApplicationType type, int order, ObjectNode additionalData) throws JAXBException, IOException, ApplicationDataException;

    /**
     * Създава заявление.
     * @param applicationProcessId идентификационен номер на процес по заявяване на услуга, в който участва даденото заявление.
     * @param type тип на заявлението.
     * @param order номер на заявлението.
     * @return създаденото заявление с идентификационен номер.
     */
    Application create(long applicationProcessId, ApplicationType type, int order, ObjectNode additionalData) throws ApplicationDataException;

    /**
     * Изтрива заявление.
     * @param applicationId идентификационен номер на заявление за изтриване.
     * @param deleteExternalDataRelatedWithApplication флаг указващ дали да се изтрива и данни свързани със заявлението, които се съхраняват в други външни модули.
     *                                                 Например съдържанието на прикачени документи се съхраняват във външен модуле.
     */

    void delete(long applicationId, boolean deleteExternalDataRelatedWithApplication);

    /**
     * Изтрива заявление.
     * @param application заявление за изтриване.
     * @param deleteExternalDataRelatedWithApplication флаг указващ дали да се изтрива и данни свързани със заявлението, които се съхраняват в други външни модули.
     *                                                 Например съдържанието на прикачени документи се съхраняват във външен модуле.
     */
    void delete(@NonNull Application application, boolean deleteExternalDataRelatedWithApplication);

    void deleteOnlyApplication(@NonNull Application application);

    /**
     * Търси заявление по подадени критерии.
     * @param applicationSearchCriteria критерии за търсене.
     * @return намерените заявления по подадените критерии.
     */
    Result<Application> search(SearchCriteria.ApplicationSearchCriteria applicationSearchCriteria);

    /**
     * Обновява подаденото заявление.
     * @param application заявление за обновяване.
     */
    void update(Application application);
}

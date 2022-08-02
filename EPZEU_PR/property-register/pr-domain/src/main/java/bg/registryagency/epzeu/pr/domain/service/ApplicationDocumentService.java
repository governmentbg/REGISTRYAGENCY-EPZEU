package bg.registryagency.epzeu.pr.domain.service;

import bg.registryagency.epzeu.pr.domain.model.ApplicationDocument;
import bg.registryagency.epzeu.pr.domain.model.Result;
import bg.registryagency.epzeu.pr.domain.vo.SearchCriteria;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.ClientResponse;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

/**
 * Интерфейс на услуга за работа с прикачени документи към заявление.
 *
 * {@link ApplicationDocument}
 */
public interface ApplicationDocumentService {
    /**
     * Търси документи прикачени към заявление.
     * @param applicationDocumentSearchCriteria критерии за търсене.
     * @return прикачени документи.
     */
    Result<ApplicationDocument> search(SearchCriteria.ApplicationDocumentSearchCriteria applicationDocumentSearchCriteria);

    /**
     * Създава прикачен документ.
     * @param applicationDocument представлява метаданните на прикачения документ към заявление.
     * @param file файл, който е ще бъде създаден.
     * @return ApplicationDocument който съдържа подадената информация както и идентификатора на създаденото съдържание.
     */
    ApplicationDocument create(ApplicationDocument applicationDocument, MultipartFile file) throws IOException;

    ApplicationDocument create(ApplicationDocument applicationDocument);

    void update(ApplicationDocument applicationDocument);

    void validateFile(MultipartFile file) throws IOException;

    /**
     * Изтрива прикачен документ.
     * @param uuid идентификатор от външна система на прикачения документ за изтриване
     * @param deleteExternalContent флаг указващ дали да се изтрива и съдържанието на документа.
     */
    void delete(UUID uuid, boolean deleteExternalContent);

    @Transactional(rollbackFor = Exception.class)
    void delete(UUID uuid);

    /**
     * Изтрива прикачени документи.
     * @param applicationDocuments списък от прикачени документи за изтриване.
     * @param deleteExternalContent флаг указващ дали да се изтриват и съдържанията на документите.
     */
    void deleteAll(List<ApplicationDocument> applicationDocuments, boolean deleteExternalContent);

    Mono<ClientResponse> download(String uuid);
}

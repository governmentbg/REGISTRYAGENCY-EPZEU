package bg.registryagency.epzeu.pr.domain.repository;

import bg.registryagency.epzeu.pr.domain.model.ApplicationDocument;
import bg.registryagency.epzeu.pr.domain.model.Result;
import bg.registryagency.epzeu.pr.domain.vo.SearchCriteria;

import java.util.UUID;

/**
 * Интерфейс за поддържане и съхранение на обекти от тип ApplicationDocument.
 */
public interface ApplicationDocumentRepository {
    /**
     * Записва обект от тип ApplicationDocument в базата данни.
     * @param applicationDocument който ще бъде записан в базата данни.
     * @return записания обект със създаден за него идентификационен номер на обект.
     */
    ApplicationDocument create(ApplicationDocument applicationDocument);

    /**
     * Изтрива обект от тип ApplicationDocument от базата данни.
     * @param applicationDocumentId идентификационен номер на обекта, който да бъде изтрит.
     */
    void delete(Long applicationDocumentId);

    /**
     * Изтрива обект от тип ApplicationDocument от базата данни.
     * @param uuid идентификационният номер генериран от външна система за съответния обект, който ще бъде изтрит
     */
    void deleteByUUID(UUID uuid);

    /**
     * Актуализира обект от тип ApplicationDocument в базата данни.
     * @param applicationDocument актуалният обект, който да бъде подменен от стария в базата данни.
     */
    void update(ApplicationDocument applicationDocument);

    /**
     * Търсене на обект или обекти от тип ApplicationDocument в базата данни.
     * @param applicationDocumentSearchCriteria критериите, по които ще се търси.
     * @return списък с намерените обекти или един обект когато критериите на търсене отговарят на точно един обект.
     */
    Result<ApplicationDocument> search(SearchCriteria.ApplicationDocumentSearchCriteria applicationDocumentSearchCriteria);
}

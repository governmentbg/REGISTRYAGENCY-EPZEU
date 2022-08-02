package bg.registryagency.epzeu.pr.domain.repository;

import bg.registryagency.epzeu.pr.domain.model.ApplicationProcessContent;
import bg.registryagency.epzeu.pr.domain.model.Result;
import bg.registryagency.epzeu.pr.domain.vo.SearchCriteria;

import java.io.IOException;
import java.io.InputStream;
import java.sql.SQLException;

/**
 * Интерфейс за поддържане и съхранение на обекти от тип ApplicationProcessContent.
 */
public interface ApplicationProcessContentRepository {
    /**
     * Записва обект от тип ApplicationProcessContent в базата данни.
     * @param applicationProcessContent който ще бъде записан в базата данни.
     * @return записания обект със създаден за него идентификационен номер на обект.
     */
    ApplicationProcessContent create(ApplicationProcessContent applicationProcessContent);

    /**
     * Записва обект от тип ApplicationProcessContent в базата данни.
     * @param applicationProcessId идентификационен номер на процеса по заявяване на услуга.
     * @param type тип на съдържанието:
     *
     *             <li>{@link ApplicationProcessContent.Type#JSON} - съдържанието е в JSON формат, докато заявлението е чернова.</li>
     *             <li>{@link ApplicationProcessContent.Type#XML} - съдържанието е в XML формат, когато заявлението е готово и може да бъде изпратено към бек офис системата.</li>
     * @return записания обект със създаден за него идентификационен номер на обект.
     */
    ApplicationProcessContent create(Long applicationProcessId, ApplicationProcessContent.Type type);

    /**
     * Изтрива обект от тип ApplicationProcessContent от базата данни.
     * @param applicationProcessContentId идентификационен номер на обекта, който да бъде изтрит.
     */
    void delete(Long applicationProcessContentId);

    /**
     * Четене на битовото съдържание на заявлението.
     * @param applicationProcessContentId идентификационен номер на съдържанието, за което битовото съдържание ще бъде прочетене.
     * @return битово съдържание на заявление.
     */
    byte[] readContent(Long applicationProcessContentId);

    /**
     * Актуализира обект от тип ApplicationProcessContent в базата данни.
     * @param applicationProcessContent актуалният обект, който да бъде подменен от стария в базата данни.
     */
    void update(ApplicationProcessContent applicationProcessContent);

    /**
     * Търсене на обект или обекти от тип ApplicationProcessContent в базата данни.
     * @param searchCriteria критериите, по които ще се търси.
     * @return списък с намерените обекти или един обект когато критериите на търсене отговарят на точно един обект.
     */
    Result<ApplicationProcessContent> search(SearchCriteria.ApplicationProcessContentSearchCriteria searchCriteria);

    /**
     * Актуализира битовото съдържание на заявление.
     * Актуализирането се извършва на порции.
     * Този метод е подходящ за големи файлове, които е по оптимално да бъдат записвани на порции.
     * @param applicationProcessContentId идентификационен номер на съдържанието.
     * @param content новото актуално битово съдържание.
     * @param offset битово отместване на съдържанието, използва се за да се знае от къде да се продължи със записването на подадените битове.
     * @param length дължина на битовата порция, която ще бъде записана.
     */
    void uploadChunk(Long applicationProcessContentId, byte[] content, int offset, int length);

    /**
     * Актуализира битовото съдържание на заявление.
     * @param applicationProcessContentId идентификационен номер на съдържанието.
     * @param content новото актуално битово съдържание.
     */
    void uploadFull(Long applicationProcessContentId, byte[] content);

    void uploadFull(Long applicationProcessContentId, Long applicationProcessId, InputStream contentStream) throws IOException, SQLException;
}

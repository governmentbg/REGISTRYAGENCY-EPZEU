package bg.registryagency.epzeu.pr.domain.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * <div class="bg">Модел на съдържание на заявление.</div>
 */
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
public class ApplicationProcessContent {
    /** <div class="bg">Идентификатор на съдържание на заявление.</div> */
    private Long applicationProcessContentId;
    /** <div class="bg">Съдържанието на заявлението в битове.</div> */
    private byte[] content;
    /** <div class="bg">
     * Тип на съдържанието:
     *  <li>{@link ApplicationProcessContent.Type#JSON} - съдържанието е в JSON формат, докато заявлението е чернова.</li>
     *  <li>{@link ApplicationProcessContent.Type#XML} - съдържанието е в XML формат, когато заявлението е готово и може да бъде изпратено към бек офис системата.</li>
     * </div>
     */
    private ApplicationProcessContent.Type type;
    /** <div class="bg">Процес на заявяване на услуга, в който участва Съдържанието на заявление.</div> */
    private ApplicationProcess applicationProcess;

    /**
     * <div class="bg">Конструктор за създаване на Съдържание на заявление.</div>
     * @param applicationProcessContentId <div class="bg">Идентификатор на Съдържание на заявление.</div>
     */
    public ApplicationProcessContent(Long applicationProcessContentId) {
        this.applicationProcessContentId = applicationProcessContentId;
    }

    /**
     * <div class="bg">Конструктор за създаване на Съдържание на заявление.</div>
     * @param applicationProcessContentId <div class="bg">Идентификатор на Съдържание на заявление.</div>
     * @param type <div class="bg">Тип на Съдържание на заявлението.</div>
     * @param applicationProcessId <div class="bg">Процес на заявяване на услуга, в който участва Съдържанието на заявлението.</div>
     */
    public ApplicationProcessContent(Long applicationProcessContentId, Type type, Long applicationProcessId) {
        this.applicationProcessContentId = applicationProcessContentId;
        this.type = type;
        this.applicationProcess = new ApplicationProcess(applicationProcessId);
    }

    /**
     * <div class="bg">
     *     Тип на формата на съдържанието на заявление.
     *      <li>{@link #JSON} - съдържанието е в JSON формат, докато е заявлението чернова.</li>
     *      <li>{@link #XML} - съдържанието е в XML формат, когато заявлението е готово и може да бъде изпратено към бек офис системата.</li>
     * </div>
     */
    @Getter
    public enum Type {
        JSON, XML
    }
}

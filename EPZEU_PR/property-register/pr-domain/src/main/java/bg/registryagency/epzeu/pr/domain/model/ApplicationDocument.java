package bg.registryagency.epzeu.pr.domain.model;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

/**
 * <div class="bg">Модел на прикачен документ към заявление.</div>
 */
@Getter
@Setter
public class ApplicationDocument {
    /** <div class="bg">Уникален идентификатор на прикачен документ.</div> */
    private Long applicationDocumentId;
    /** <div class="bg">Име на документа.</div> */
    private String name;
    /** <div class="bg">Идентификатор на документа в Имотен Регистър.</div> */
    private UUID backofficeGuid;
    /** <div class="bg">Големина на документа.</div> */
    private Integer fileSize;
    /** <div class="bg">Тип на приложения документ.</div> */
    private String documentTypeId;
    /** <div class="bg">HTML съдържание на документа.</div> */
    private String htmlTemplateContent;
    /** <div class="bg">Входящ номер на заявленеито, с който е вписан документа.</div> */
    private String incomingNumber;
    /** <div class="bg">Идентификатор на заявката за подписване в модула за подписване.</div> */
    private UUID signingGuid;

    /** <div class="bg">Заявление на прикачения документ</div> */
    private Application application;
}

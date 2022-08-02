package bg.registryagency.epzeu.pr.integration.api.application;

import bg.registryagency.epzeu.pr.integration.api.application.segment.*;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

/**
 * Контейнер на данни за заявление за издаване на удостоверение за лице от Имотен регистър.
 */
@Getter
@Setter
@Schema(name = "ApplicationForCertificateForPersonDto", description = "заявление за издаване на удостоверение за лице от Имотен регистър.")
public class ApplicationForCertificateForPersonDto implements ApplicationFormDto, DocumentAttachableDto {

    /** Вид на заявление. */
    @Schema(name = "appFormType", description = "Вид на заявление.")
    private Integer appFormType;

    /** Данни на иницииращо заявление. */
    @Schema(name = "initialApplicationData", description = "Данни на иницииращо заявление.")
    private InitialApplicationDataDto initialApplicationData;

    /** Данни за заявител. */
    @Schema(name = "applicantData", description = "Данни за заявител.")
    private IndividualDto applicantData;

    /** Лице обект на справка. */
    @Schema(name = "requestedPerson", description = "Лице обект на справка.")
    private PersonDto requestedPerson;

    /** Начин на предоставяне на услугата. */
    @Schema(name = "wayOfProvision", description = "Начин на предоставяне на услугата.")
    private WayOfProvisionDto wayOfProvision;

    /** Данни за контакт. */
    @Schema(name = "contactData", description = "Данни за контакт.")
    private ContactDataDto contactData;

    /** Прикачени документи. */
    @Schema(name = "documents", description = "Прикачени документи.")
    private DocumentsDto documents;

    /** Информация за GDPR спроразумение. */
    @Schema(name = "gdprAgreement", description = "Информация за GDPR спроразумение.")
    private GdprAgreementDto gdprAgreement;

    public ApplicationForCertificateForPersonDto() {
        this(true);
    }

    public ApplicationForCertificateForPersonDto(boolean createAll) {
        if(createAll) {
            this.initialApplicationData = new InitialApplicationDataDto(createAll);
            this.applicantData = new IndividualDto(createAll);
            this.requestedPerson = new PersonDto(createAll);
            this.wayOfProvision = new WayOfProvisionDto(createAll);
            this.contactData = new ContactDataDto(createAll);
            this.documents = new DocumentsDto(createAll);
            this.gdprAgreement = new GdprAgreementDto();
        }
    }
}

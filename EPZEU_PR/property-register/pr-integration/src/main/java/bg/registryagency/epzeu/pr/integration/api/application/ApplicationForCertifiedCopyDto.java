package bg.registryagency.epzeu.pr.integration.api.application;

import bg.registryagency.epzeu.pr.integration.api.application.segment.*;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;


/**
 * Контейнер на данни за заявление за издаване на заверен препис от акт, вписан в имотен регистър.
 */
@Getter
@Setter
@Schema(name = "ApplicationForCertifiedCopyDto", description = "Контейнер на данни за заявление за издаване на заверен препис от акт, вписан в имотен регистър.")
public class ApplicationForCertifiedCopyDto implements ApplicationFormDto, DocumentAttachableDto {

    /** Вид на заявление. */
    @Schema(name = "appFormType", description = "Вид на заявление.")
    private Integer appFormType;

    /** Данни за заявител. */
    @Schema(name = "applicantData", description = "Данни за заявител.")
    private ApplicantDataDto applicantData;

    /** Лице, което иска препис. */
    @Schema(name = "serviceRecipient", description = "Лице, което иска препис.")
    private ServiceRecipientDto serviceRecipient;

    /** Препис от акт */
    @Schema(name = "actRequestingACopy", description = "Препис от акт")
    private ActRequestingACopyDto actRequestingACopy;

    /** Начин на предоставяне на услугата. */
    @Schema(name = "wayOfProvision", description = "Начин на предоставяне на услугата.")
    private WayOfProvisionBaseDataDto wayOfProvision;

    /** Данни за контакт. */
    @Schema(name = "contactData", description = "Данни за контакт.")
    private ContactDataDto contactData;

    /** Прикачени документи. */
    @Schema(name = "documents", description = "Прикачени документи.")
    private DocumentsDto documents;

    /** Информация за GDPR спроразумение. */
    @Schema(name = "gdprAgreement", description = "Информация за GDPR спроразумение.")
    private GdprAgreementDto gdprAgreement;

    public ApplicationForCertifiedCopyDto() {
        this(true);
    }

    public ApplicationForCertifiedCopyDto(boolean createAll) {
        if(createAll) {
            this.applicantData = new ApplicantDataDto(createAll);
            this.serviceRecipient = new ServiceRecipientDto(createAll);
            this.actRequestingACopy = new ActRequestingACopyDto(createAll);
            this.wayOfProvision = new WayOfProvisionBaseDataDto(createAll);
            this.contactData = new ContactDataDto(createAll);
            this.documents = new DocumentsDto(createAll);
            this.gdprAgreement = new GdprAgreementDto();
        }
    }
}

package bg.registryagency.epzeu.pr.integration.api.application;

import bg.registryagency.epzeu.pr.integration.api.application.segment.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

/**
 * Контейнер на данни за заявление за издаване на незаверен препис от акт, вписан в имотен регистър.
 */
@Getter
@Setter
@JsonIgnoreProperties({ "documents" })
@Schema(name = "ApplicationForNotCertifiedCopyDto", description = "Контейнер на данни за заявление за издаване на незаверен препис от акт, вписан в имотен регистър.")
public class ApplicationForNotCertifiedCopyDto implements ApplicationFormDto {

    /** Вид на заявление. */
    @Schema(name = "appFormType", description = "Вид на заявление.")
    private Integer appFormType;

    /** Данни за заявител. */
    @Schema(name = "applicantData", description = "Данни за заявител.")
    private IndividualDto applicantData;

    /** Препис от акт. */
    @Schema(name = "actRequestingACopy", description = "Препис от акт.")
    private ActRequestingACopyDto actRequestingACopy;

    /** Начин на предоставяне на услугата. */
    @Schema(name = "wayOfProvision", description = "Начин на предоставяне на услугата.")
    private WayOfProvisionBaseDataDto wayOfProvision;

    /** Данни за контакт. */
    @Schema(name = "contactData", description = "Данни за контакт.")
    private ContactDataDto contactData;

    /** Информация за GDPR спроразумение. */
    @Schema(name = "gdprAgreement", description = "Информация за GDPR спроразумение.")
    private GdprAgreementDto gdprAgreement;


    public ApplicationForNotCertifiedCopyDto() {
        this(true);
    }

    public ApplicationForNotCertifiedCopyDto(boolean createAll) {
        if(createAll) {
            this.applicantData = new IndividualDto(createAll);
            this.actRequestingACopy = new ActRequestingACopyDto(createAll);
            this.wayOfProvision = new WayOfProvisionBaseDataDto(createAll);
            this.contactData = new ContactDataDto(createAll);
            this.gdprAgreement = new GdprAgreementDto();
        }
    }
}

package bg.registryagency.epzeu.pr.integration.api.application;

import bg.registryagency.epzeu.pr.integration.api.application.segment.*;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.util.LinkedList;
import java.util.List;


/**
 * Контейнер на данни за заявление за издаване на удостоверение за имот от Имотен регистър.
 */
@Getter
@Setter
@Schema(name = "ApplicationForCertificateForPropertyDto", description = "Контейнер на данни за заявление за издаване на удостоверение за имот от Имотен регистър.")
public class ApplicationForCertificateForPropertyDto implements ApplicationFormDto, DocumentAttachableDto {

    /** Вид на заявление. */
    @Schema(name = "appFormType", description = "Вид на заявление.")
    private Integer appFormType;

    /** Данни на иницииращо заявление. */
    @Schema(name = "initialApplicationData", description = "Данни на иницииращо заявление.")
    private InitialApplicationDataDto initialApplicationData;

    /** Данни за заявител. */
    @Schema(name = "applicantData", description = "Данни за заявител.")
    private IndividualDto applicantData;

    /** Имот обект на справка. */
    @Schema(name = "requestedProperty", description = "Имот обект на справка.")
    private PropertyDto requestedProperty;

    /** Настоящи собственици на имот. */
    @Schema(name = "currentOwners", description = "Настоящи собственици на имот.")
    private OwnersDto currentOwners;

    /** Предишни собственици на имот. */
    @Schema(name = "previousOwners", description = "Предишни собственици на имот.")
    private OwnersDto previousOwners;

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


    public ApplicationForCertificateForPropertyDto() {
        this(true);
    }

    public ApplicationForCertificateForPropertyDto(boolean createAll){
        if(createAll) {
            this.initialApplicationData = new InitialApplicationDataDto(createAll);
            this.applicantData = new IndividualDto(createAll);
            this.requestedProperty = new PropertyDto(createAll);
            this.currentOwners = new OwnersDto(createAll);
            this.previousOwners = new OwnersDto(createAll);
            this.wayOfProvision = new WayOfProvisionDto(createAll);
            this.contactData = new ContactDataDto(createAll);
            this.documents = new DocumentsDto(createAll);
            this.gdprAgreement = new GdprAgreementDto();
        }
    }
}

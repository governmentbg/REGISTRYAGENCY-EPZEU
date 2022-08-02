package bg.registryagency.epzeu.pr.integration.api.application;

import bg.registryagency.epzeu.pr.integration.api.application.segment.*;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

/**
 * Контейнер на данни за заявление за издаване на удостоверение за имот / лице от Имотен регистър за определен период.
 */
@Getter
@Setter
@Schema(name = "ApplicationForCertificateForPeriodDto", description = "Контейнер на данни за заявление за издаване на удостоверение за имот / лице от Имотен регистър за определен период.")
public class ApplicationForCertificateForPeriodDto implements ApplicationFormDto, DocumentAttachableDto {

    /** Вид на заявление. */
    @Schema(name = "appFormType", description = "Вид на заявление.")
    private Integer appFormType;

    /** Данни на иницииращо заявление. */
    @Schema(name = "initialApplicationData", description = "Данни на иницииращо заявление.")
    private InitialApplicationDataDto initialApplicationData;

    /** Данни за заявител. */
    @Schema(name = "applicantData", description = "Данни за заявител.")
    private IndividualDto applicantData;

    /** Период на справката. */
    @Schema(name = "periodForCertificate", description = "Период на справката.")
    private PeriodForCertificateDto periodForCertificate;

    /** Лице обект на справка. */
    @Schema(name = "requestedPerson", description = "Лице обект на справка.")
    private PersonDto requestedPerson;

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

    public ApplicationForCertificateForPeriodDto() {
        this(true);
    }

    public ApplicationForCertificateForPeriodDto(boolean createAll) {

        if(createAll) {
            this.initialApplicationData = new InitialApplicationDataDto(createAll);
            this.applicantData = new IndividualDto(createAll);
            this.periodForCertificate = new PeriodForCertificateDto(createAll);
            this.requestedPerson = new PersonDto(createAll);
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

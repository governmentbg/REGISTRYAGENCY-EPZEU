package bg.registryagency.epzeu.pr.integration.api.application;

import bg.registryagency.epzeu.pr.integration.api.application.segment.ApplicantDataOfReportDto;
import bg.registryagency.epzeu.pr.integration.api.application.segment.GdprAgreementDto;
import bg.registryagency.epzeu.pr.integration.api.application.segment.PersonSubjectOfReportInAllRegistryOfficesSectionDto;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Контейнер на данни за справка за лице във всички служби по вписванията.
 */
@Getter
@Setter
@Schema(name = "ReportForPersonInAllRegistryOfficesDto", description = "Контейнер на данни за справка за лице във всички служби по вписванията.")
@JsonIgnoreProperties({ "documents" })
public class ReportForPersonInAllRegistryOfficesDto implements ApplicationFormDto {

    /** Данни за заявителя. */
    @Schema(name = "applicantDataOfReport", description = "Данни за заявителя.")
    private ApplicantDataOfReportDto applicantDataOfReport;

    /** Контейнер на данни за лице, обект на справка във всички служби по вписванията */
    @Schema(name = "personSubjectOfReportInAllRegistryOfficesSection", description = "Контейнер на данни за лице, обект на справка във всички служби по вписванията")
    private PersonSubjectOfReportInAllRegistryOfficesSectionDto personSubjectOfReportInAllRegistryOfficesSection;

    /** Информация за GDPR спроразумение. */
    @Schema(name = "gdprAgreement", description = "Информация за GDPR спроразумение.")
    private GdprAgreementDto gdprAgreement;

    /** Вид на заявление. */
    @Schema(name = "appFormType", description = "Вид на заявление.")
    private Integer appFormType;

    public ReportForPersonInAllRegistryOfficesDto(){
        this(true);
    }

    public ReportForPersonInAllRegistryOfficesDto(boolean createAll){
        if(createAll) {
            this.gdprAgreement = new GdprAgreementDto();
        }
    }
}

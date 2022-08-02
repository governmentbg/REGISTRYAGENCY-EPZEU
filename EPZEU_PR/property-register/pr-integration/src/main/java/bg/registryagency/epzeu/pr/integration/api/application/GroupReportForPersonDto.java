package bg.registryagency.epzeu.pr.integration.api.application;

import bg.registryagency.epzeu.pr.integration.api.application.segment.ApplicantDataOfReportDto;
import bg.registryagency.epzeu.pr.integration.api.application.segment.GdprAgreementDto;
import bg.registryagency.epzeu.pr.integration.api.application.segment.PersonSubjectOfReportSectionDto;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;


/**
 * Контейнер на данни за подаване на групова справка чрез отдалечен достъп за лице от Имотен регистър за избрана служба по вписванията.
 */
@Getter
@Setter
@JsonIgnoreProperties({ "documents" })
@Schema(name = "GroupReportForPersonDto", description = "Контейнер на данни за подаване на групова справка чрез отдалечен достъп за лице от Имотен регистър за избрана служба по вписванията.")
public class GroupReportForPersonDto implements ApplicationFormDto {

    /** Данни за заявителя. */
    @Schema(name = "applicantDataOfReport", description = "Данни за заявителя.")
    private ApplicantDataOfReportDto applicantDataOfReport;

    /** Контейнер на данни за лице. */
    @Schema(name = "personSubjectOfReportSection", description = "Контейнер на данни за лице.")
    private PersonSubjectOfReportSectionDto personSubjectOfReportSection;

    /** Вид на заявление. */
    @Schema(name = "appFormType", description = "Вид на заявление.")
    private Integer appFormType;

    /** Информация за GDPR спроразумение. */
    @Schema(name = "gdprAgreement", description = "Информация за GDPR спроразумение.")
    private GdprAgreementDto gdprAgreement;


    public GroupReportForPersonDto() {
        this(true);
    }

    public GroupReportForPersonDto(boolean createAll) {
        if(createAll) {
            this.applicantDataOfReport = new ApplicantDataOfReportDto();
            this.gdprAgreement = new GdprAgreementDto();
        }
    }
}

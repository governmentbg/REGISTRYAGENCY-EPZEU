package bg.registryagency.epzeu.pr.integration.api.application;

import bg.registryagency.epzeu.pr.integration.api.application.segment.ApplicantDataOfReportDto;
import bg.registryagency.epzeu.pr.integration.api.application.segment.DocumentSubjectOfReportSectionDto;
import bg.registryagency.epzeu.pr.integration.api.application.segment.GdprAgreementDto;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;


/**
 * Контейнер на данни за групово подаване на справка чрез отдалечен достъп за документ от Имотен регистър.
 */
@Getter
@Setter
@JsonIgnoreProperties({ "documents" })
@Schema(name = "GroupReportForDocumentDto", description = "Контейнер на данни за групово подаване на справка чрез отдалечен достъп за документ от Имотен регистър.")
public class GroupReportForDocumentDto implements ApplicationFormDto {

    /** Данни за заявителя. */
    @Schema(name = "applicantDataOfReport", description = "Данни за заявителя.")
    private ApplicantDataOfReportDto applicantDataOfReport;

    /** Контейнер на данни за документ. */
    @Schema(name = "documentSubjectOfReportSection", description = "Контейнер на данни за документ.")
    private DocumentSubjectOfReportSectionDto documentSubjectOfReportSection;

    /** Вид на заявление. */
    @Schema(name = "appFormType", description = "Вид на заявление.")
    private Integer appFormType;

    /** Информация за GDPR спроразумение. */
    @Schema(name = "gdprAgreement", description = "Информация за GDPR спроразумение.")
    private GdprAgreementDto gdprAgreement;


    public GroupReportForDocumentDto() {
        this(true);
    }

    public GroupReportForDocumentDto(boolean createAll) {
        if(createAll) {
            this.applicantDataOfReport = new ApplicantDataOfReportDto();
            this.gdprAgreement = new GdprAgreementDto();
        }
    }
}

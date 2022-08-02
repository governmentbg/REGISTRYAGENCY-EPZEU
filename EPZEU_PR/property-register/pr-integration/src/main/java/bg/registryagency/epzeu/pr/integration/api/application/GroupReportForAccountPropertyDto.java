package bg.registryagency.epzeu.pr.integration.api.application;

import bg.registryagency.epzeu.pr.integration.api.application.segment.AccountPropertySubjectOfReportSectionDto;
import bg.registryagency.epzeu.pr.integration.api.application.segment.ApplicantDataOfReportDto;
import bg.registryagency.epzeu.pr.integration.api.application.segment.GdprAgreementDto;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

/**
 * Контейнер на данни за подаване на групова справка чрез отдалечен достъп от електронна партида за имот.
 */
@Getter
@Setter
@JsonIgnoreProperties({ "documents" })
@Schema(name = "GroupReportForAccountPropertyDto", description = "Контейнер на данни за подаване на групова справка чрез отдалечен достъп от електронна партида за имот.")
public class GroupReportForAccountPropertyDto implements ApplicationFormDto {

    /** Данни за заявителя. */
    @Schema(name = "applicantDataOfReport", description = "Данни за заявителя.")
    private ApplicantDataOfReportDto applicantDataOfReport;

    /** Контейнер на данни за елекронна партида. */
    @Schema(name = "accountPropertySubjectOfReportSection", description = "Контейнер на данни за елекронна партида.")
    private AccountPropertySubjectOfReportSectionDto accountPropertySubjectOfReportSection;

    /** Вид на заявление. */
    @Schema(name = "appFormType", description = "Вид на заявление.")
    private Integer appFormType;

    /** Информация за GDPR спроразумение. */
    @Schema(name = "gdprAgreement", description = "Информация за GDPR спроразумение.")
    private GdprAgreementDto gdprAgreement;


    public GroupReportForAccountPropertyDto() {
        this(true);
    }

    public GroupReportForAccountPropertyDto(boolean createAll) {
        if(createAll) {
            this.applicantDataOfReport = new ApplicantDataOfReportDto();
            this.gdprAgreement = new GdprAgreementDto();
        }
    }
}

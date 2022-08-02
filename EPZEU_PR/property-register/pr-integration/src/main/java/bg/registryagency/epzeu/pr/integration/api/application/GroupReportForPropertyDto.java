package bg.registryagency.epzeu.pr.integration.api.application;

import bg.registryagency.epzeu.pr.integration.api.application.segment.ApplicantDataOfReportDto;
import bg.registryagency.epzeu.pr.integration.api.application.segment.GdprAgreementDto;
import bg.registryagency.epzeu.pr.integration.api.application.segment.PropertySubjectOfReportSectionDto;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;


/**
 * Контейнер на данни за подаване на групова справка чрез отдалечен достъп за имот от Имотен регистър.
 */
@Getter
@Setter
@JsonIgnoreProperties({ "documents" })
@Schema(name = "GroupReportForPropertyDto", description = "Контейнер на данни за подаване на групова справка чрез отдалечен достъп за имот от Имотен регистър.")
public class GroupReportForPropertyDto implements ApplicationFormDto {

    /** Данни за заявителя. */
    @Schema(name = "applicantDataOfReport", description = "Данни за заявителя.")
    private ApplicantDataOfReportDto applicantDataOfReport;

    /** Контейнер на данни за имот. */
    @Schema(name = "propertySubjectOfReportSection", description = "Контейнер на данни за имот.")
    private PropertySubjectOfReportSectionDto propertySubjectOfReportSection;

    /** Вид на заявление. */
    @Schema(name = "appFormType", description = "Вид на заявление.")
    private Integer appFormType;

    /** Информация за GDPR спроразумение. */
    @Schema(name = "gdprAgreement", description = "Информация за GDPR спроразумение.")
    private GdprAgreementDto gdprAgreement;


    public GroupReportForPropertyDto() {
        this(true);
    }

    public GroupReportForPropertyDto(boolean createAll) {
        if(createAll) {
            this.applicantDataOfReport = new ApplicantDataOfReportDto();
            this.gdprAgreement = new GdprAgreementDto();
        }
    }
}

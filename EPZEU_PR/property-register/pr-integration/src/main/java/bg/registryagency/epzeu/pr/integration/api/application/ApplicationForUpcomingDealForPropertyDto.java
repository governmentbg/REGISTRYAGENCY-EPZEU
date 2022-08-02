package bg.registryagency.epzeu.pr.integration.api.application;

import bg.registryagency.epzeu.pr.integration.api.application.segment.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.util.LinkedList;
import java.util.List;

/**
 * Контейнер на данни за заявление за деклариране на предстояща сделка с недвижим имот в Имотен регистър.
 */
@Getter
@Setter
@JsonIgnoreProperties({ "documents" })
@Schema(name = "ApplicationForUpcomingDealForPropertyDto", description = "Контейнер на данни за заявление за деклариране на предстояща сделка с недвижим имот в Имотен регистър.")
public class ApplicationForUpcomingDealForPropertyDto implements ApplicationFormDto {

    /** Вид на заявление. */
    @Schema(name = "appFormType", description = "Вид на заявление.")
    private Integer appFormType;

    /** Данни за заявител. */
    @Schema(name = "applicantData", description = "Данни за заявител.")
    private ApplicantDataDto applicantData;

    /** Предстояща сделка. */
    @Schema(name = "upcomingDealForProperty", description = "Предстояща сделка.")
    private UpcomingDealForPropertyDto upcomingDealForProperty;

    /** Информация за GDPR спроразумение. */
    @Schema(name = "gdprAgreement", description = "Информация за GDPR спроразумение.")
    private GdprAgreementDto gdprAgreement;

    public ApplicationForUpcomingDealForPropertyDto() {
        this(true);
    }

    public ApplicationForUpcomingDealForPropertyDto(boolean createAll) {
        if(createAll) {
            this.applicantData = new ApplicantDataDto(createAll);
            this.upcomingDealForProperty = new UpcomingDealForPropertyDto();
            this.gdprAgreement = new GdprAgreementDto();
        }
    }
}

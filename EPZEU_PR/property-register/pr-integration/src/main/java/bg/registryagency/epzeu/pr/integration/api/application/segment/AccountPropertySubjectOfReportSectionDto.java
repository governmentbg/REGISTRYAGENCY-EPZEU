package bg.registryagency.epzeu.pr.integration.api.application.segment;

import bg.registryagency.epzeu.pr.integration.api.application.RequestForReportOfAccountPropertyDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

/**
 * Контейнер на данни за заявление на справка чрез отдалечен достъп за електронна партида на имот от Имотен регистър.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "AccountPropertySubjectOfReportSectionDto", description = "Контейнер на данни за заявление на справка чрез отдалечен достъп за електронна партида на имот от Имотен регистър.")
public class AccountPropertySubjectOfReportSectionDto {

    /** Списък със заявления на справка чрез отдалечен достъп за електронна партида на имот. */
    @Schema(name = "requestsForReportOfAccountProperty", description = "Списък със заявления на справка чрез отдалечен достъп за електронна партида на имот.")
    private List<RequestForReportOfAccountPropertyDto> requestsForReportOfAccountProperty;

    public List<RequestForReportOfAccountPropertyDto> getRequestsForReportOfAccountProperty() {
        if (requestsForReportOfAccountProperty == null) {
            requestsForReportOfAccountProperty = new ArrayList<>();
        }
        return this.requestsForReportOfAccountProperty;
    }
}

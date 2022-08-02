package bg.registryagency.epzeu.pr.integration.api.application.segment;

import bg.registryagency.epzeu.pr.integration.api.application.RequestForReportOfPropertyDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;


/**
 * Контейнер на списък с имоти, които са обект на справка.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "PropertySubjectOfReportSectionDto", description = "Контейнер на списък с имоти, които са обект на справка.")
public class PropertySubjectOfReportSectionDto {

    /** Списък с имоти. */
    @Schema(name = "requestsForReportOfProperty", description = "Списък с имоти.")
    private List<RequestForReportOfPropertyDto> requestsForReportOfProperty;

    public List<RequestForReportOfPropertyDto> getRequestsForReportOfProperty() {
        if (requestsForReportOfProperty == null) {
            requestsForReportOfProperty = new ArrayList<>();
        }
        return this.requestsForReportOfProperty;
    }
}

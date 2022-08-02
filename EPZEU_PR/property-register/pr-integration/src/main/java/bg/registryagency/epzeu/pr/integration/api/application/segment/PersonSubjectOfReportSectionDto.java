package bg.registryagency.epzeu.pr.integration.api.application.segment;

import bg.registryagency.epzeu.pr.integration.api.application.RequestForReportOfPersonDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

/**
 * Контейнер на списък с лицата, които са обект на справка.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "PersonSubjectOfReportSectionDto", description = "Контейнер на списък с лицата, които са обект на справка.")
public class PersonSubjectOfReportSectionDto {

    /** Списък с лица, обект на справка. */
    @Schema(name = "requestsForReportOfPerson", description = "Списък с лица, обект на справка.")
    private List<RequestForReportOfPersonDto> requestsForReportOfPerson;

    public List<RequestForReportOfPersonDto> getRequestsForReportOfPerson() {
        if (requestsForReportOfPerson == null) {
            requestsForReportOfPerson = new ArrayList<>();
        }
        return this.requestsForReportOfPerson;
    }
}

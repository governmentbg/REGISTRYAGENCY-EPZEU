package bg.registryagency.epzeu.pr.integration.api.application.segment;

import bg.registryagency.epzeu.pr.integration.api.application.RequestForReportOfDocumentDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

/**
 * Контейнер на данни за заявления за справка чрез отдалечен достъп за документ от Имотен регистър.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "DocumentSubjectOfReportSectionDto", description = "Контейнер на данни за заявления за справка чрез отдалечен достъп за документ от Имотен регистър.")
public class DocumentSubjectOfReportSectionDto {

    /** заявления за справка чрез отдалечен достъп за документ. */
    @Schema(name = "requestsForReportOfDocument", description = "заявления за справка чрез отдалечен достъп за документ.")
    private List<RequestForReportOfDocumentDto> requestsForReportOfDocument;

    public List<RequestForReportOfDocumentDto> getRequestsForReportOfDocument() {
        if (requestsForReportOfDocument == null) {
            requestsForReportOfDocument = new ArrayList<>();
        }
        return this.requestsForReportOfDocument;
    }
}

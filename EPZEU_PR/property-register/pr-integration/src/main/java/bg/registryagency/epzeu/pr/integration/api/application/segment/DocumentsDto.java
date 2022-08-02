package bg.registryagency.epzeu.pr.integration.api.application.segment;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.util.LinkedList;
import java.util.List;


/**
 * Контейнер на данни за документи.
 */
@Getter
@Setter
@Schema(name = "DocumentsDto", description = "Контейнер на данни за документи")
public class DocumentsDto {

    /** Текущо добавен документ. */
    @Schema(name = "currentDocument", description = "Текущо добавен документ.")
    private AttachedDocumentDto currentDocument;

    /** Списък с прикачени документи. */
    @Schema(name = "attachedDocuments", description = "Списък с прикачени документи.")
    private List<AttachedDocumentDto> attachedDocuments;

    public DocumentsDto() {
        this(true);
    }

    public DocumentsDto(boolean createAll){
        if(createAll) {
            this.attachedDocuments = new LinkedList<>();
            this.currentDocument = new AttachedDocumentDto();
        }
    }
}

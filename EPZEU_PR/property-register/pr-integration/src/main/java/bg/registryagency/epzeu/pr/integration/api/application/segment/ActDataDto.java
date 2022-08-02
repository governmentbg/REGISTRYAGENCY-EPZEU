package bg.registryagency.epzeu.pr.integration.api.application.segment;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Контейнер на данни за акт.
 */
@Getter
@Setter
@Schema(name = "ActDataDto", description = "Контейнер на данни за акт.")
public class ActDataDto {

    /** Дата на регистрация на документ в книга. */
    @Schema(name = "dataForRegistrationOfDocumentInBook", description = "Дата на регистрация на документ в книга.")
    private DataForRegistrationOfDocumentInBookDto dataForRegistrationOfDocumentInBook;

    /** Дата на регистрация на документ в двойно входящ регистър. */
    @Schema(name = "dataForRegistrationOfDocumentInDoubleIncomingRegister", description = "Дата на регистрация на документ в двойно входящ регистър.")
    private DataForRegistrationOfDocumentInDoubleIncomingRegisterDto dataForRegistrationOfDocumentInDoubleIncomingRegister;

    /** Дата на регистрация на документ във входящ регистър.  */
    @Schema(name = "dataForRegistrationOfDocumentInIncomingRegister", description = "Дата на регистрация на документ във входящ регистър.")
    private DataForRegistrationOfDocumentInIncomingRegisterDto dataForRegistrationOfDocumentInIncomingRegister;

    public ActDataDto() {
        this(true);
    }

    public ActDataDto(boolean createAll){
        if(createAll) {
            this.dataForRegistrationOfDocumentInBook = new DataForRegistrationOfDocumentInBookDto(createAll);
            this.dataForRegistrationOfDocumentInDoubleIncomingRegister = new DataForRegistrationOfDocumentInDoubleIncomingRegisterDto();
            this.dataForRegistrationOfDocumentInIncomingRegister = new DataForRegistrationOfDocumentInIncomingRegisterDto();
        }
    }
}

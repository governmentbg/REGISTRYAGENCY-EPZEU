package bg.registryagency.epzeu.pr.integration.api.application.segment;

import bg.registryagency.epzeu.pr.integration.pr.dto.BookDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Контейнер на данни за регистрация на документ в книга.
 */
@Getter
@Setter
@Schema(name = "DataForRegistrationOfDocumentInBookDto", description = "Контейнер на данни за регистрация на документ в книга.")
public class DataForRegistrationOfDocumentInBookDto {

    /** Номер на акт. */
    @Schema(name = "actNumber", description = "Номер на акт.")
    private Integer actNumber;

    /** Том */
    @Schema(name = "volume", description = "Том")
    private Integer volume;

    /** Година */
    @Schema(name = "year", description = "Година")
    private Short year;

    /** Книга */
    @Schema(name = "book", description = "Книга")
    private BookDto book;

    public DataForRegistrationOfDocumentInBookDto() {
        this(true);
    }

    public  DataForRegistrationOfDocumentInBookDto(boolean createAll){
        if(createAll) {
            this.book = new BookDto();
        }
    }
}

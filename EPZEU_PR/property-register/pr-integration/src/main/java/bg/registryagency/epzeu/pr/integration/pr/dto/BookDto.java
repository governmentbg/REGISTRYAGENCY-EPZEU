package bg.registryagency.epzeu.pr.integration.pr.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.util.Objects;

/**
 * Контейнер на данни за книга.
 */
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Schema(name = "BookDto", description = "Контейнер на данни за книга.")
public class BookDto {

    /** Идентификатор на книга.*/
    @Schema(name = "id", description = "Идентификатор на книга.")
    private String id;

    /** Наименование на книга. */
    @Schema(name = "name", description = "Наименование на книга. ")
    private String name;

    /** Идентификатор на типа. */
    @Schema(name = "typeId", description = "Идентификатор на типа.")
    private String typeId;

    public BookDto(String id) {
        this.id = id;
    }
}

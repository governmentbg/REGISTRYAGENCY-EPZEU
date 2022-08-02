package bg.registryagency.epzeu.pr.integration.pr.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

/**
 * Контейнер на данни за акт.
 */
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Schema(name = "ActDto", description = "Контейнер на данни за акт.")
public class ActDto {

    /** Идентификатор на акт.*/
    @Schema(name = "id", description = "Идентификатор на акт.")
    private String id;

    /** Наименование на акт. */
    @Schema(name = "name", description = "Наименование на акт.")
    private String name;
}

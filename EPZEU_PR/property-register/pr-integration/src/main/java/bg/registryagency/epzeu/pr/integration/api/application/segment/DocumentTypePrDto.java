package bg.registryagency.epzeu.pr.integration.api.application.segment;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

/**
 * Контейнер за вид на документ в имотен регистър.
 */
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Schema(name = "DocumentTypePrDto", description = "Контейнер за вид на документ в имотен регистър.")
public class DocumentTypePrDto {

    /** Идентификатор на вид на документ. */
    @Schema(name = "id", description = "Идентификатор на вид на документ.")
    private String id;

    /** Наименование на вид на документ. */
    @Schema(name = "name", description = "Наименование на вид на документ.")
    private String name;
}

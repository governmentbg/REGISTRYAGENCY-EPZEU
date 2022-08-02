package bg.registryagency.epzeu.pr.integration.api.application.segment;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


/**
 * Контейнер за вид на услугата.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "ServiceTypeDto", description = "Контейнер за вид на услугата.")
public class ServiceTypeDto {

    /** Идентификатор на вид на услугата. */
    @Schema(name = "id", description = "Идентификатор на вид на услугата.")
    private String id;

    /** Наименование на вид на услугата. */
    @Schema(name = "name", description = "Наименование на вид на услугата.")
    private String name;
}

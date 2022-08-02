package bg.registryagency.epzeu.pr.integration.epzeu.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


/**
 * Контейнер на данни за номенклатура на вид на документ в ЕПЗЕУ.
 */
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
@Schema(name = "DocumentTypeEpzeuDto", description = "Контейнер на данни за номенклатура на вид на документ в ЕПЗЕУ.")
public class DocumentTypeEpzeuDto {

    /** Идентификатор на тип на документ. */
    @Schema(name = "documentTypeID", description = "Идентификатор на тип на документ.")
   private String documentTypeID;

    /** Наименование */
    @Schema(name = "name", description = "Наименование")
   private String name;
}

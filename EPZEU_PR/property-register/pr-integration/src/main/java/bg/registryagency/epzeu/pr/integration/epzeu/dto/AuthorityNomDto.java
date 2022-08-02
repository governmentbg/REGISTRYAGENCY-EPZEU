package bg.registryagency.epzeu.pr.integration.epzeu.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


/**
 * Контейнер на данни за номенклатура на съдилища.
 */
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
@Schema(name = "AuthorityNomDto", description = "Контейнер на данни за номенклатура на съдилища.")
public class AuthorityNomDto {

    /** Идентификатор */
    @Schema(name = "authorityID", description = "Идентификатор")
    private Integer authorityID;

    /** Наименование */
    @Schema(name = "authorityName", description = "Наименование")
    private String authorityName;
}

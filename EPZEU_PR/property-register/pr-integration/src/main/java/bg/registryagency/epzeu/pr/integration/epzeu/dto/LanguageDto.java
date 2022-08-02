package bg.registryagency.epzeu.pr.integration.epzeu.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


/**
 * Контейнер на данни за език.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "LanguageDto", description = "Контейнер на данни за език.")
public class LanguageDto {

    /** Идентификатор */
    @Schema(name = "languageID", description = "Идентификатор")
    private Integer languageID;

    /** Код */
    @Schema(name = "code", description = "Код")
    private String code;

    /** Наименование */
    @Schema(name = "name", description = "Наименование")
    private String name;

    /** Флаг, указващ дали езика е активен. */
    @Schema(name = "isActive", description = "Флаг, указващ дали езика е активен.")
    private Boolean isActive;

    /** Флаг, указващ дали езика е по подразбиране. */
    @Schema(name = "isDefault", description = "Флаг, указващ дали езика е по подразбиране.")
    private Boolean isDefault;
}

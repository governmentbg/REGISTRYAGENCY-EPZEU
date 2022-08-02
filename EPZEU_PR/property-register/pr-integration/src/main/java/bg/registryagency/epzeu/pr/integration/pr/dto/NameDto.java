package bg.registryagency.epzeu.pr.integration.pr.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Контейнер на данни за име на лице.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "NameDto", description = "Контейнер на данни за име на лице.")
public class NameDto {

    /** Собствено име.*/
    @Schema(name = "firstName", description = "Собствено име.")
    protected String firstName;

    /** Бащино име. */
    @Schema(name = "surName", description = "Бащино име.")
    protected String surName;

    /** Фамилно име. */
    @Schema(name = "familyName", description = "Фамилно име.")
    protected String familyName;

    public NameDto(String firstName, String surName, String familyName) {
        this.firstName = firstName;
        this.surName = surName;
        this.familyName = familyName;
    }
}

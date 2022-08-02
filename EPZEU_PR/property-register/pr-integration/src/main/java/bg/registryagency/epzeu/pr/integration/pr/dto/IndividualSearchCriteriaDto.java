package bg.registryagency.epzeu.pr.integration.pr.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Контейнер на данни за търсене на физическо лице.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "IndividualSearchCriteriaDto", description = "Контейнер на данни за търсене на физическо лице.")
public class IndividualSearchCriteriaDto {

    /** Идентификатор на Служба по вписванията.*/
    @Schema(name = "registryOfficeId", description = "Идентификатор на Служба по вписванията.")
    protected String registryOfficeId;

    /** Име на Служба по вписванията.*/
    @Schema(name = "registryOfficeName", description = "Име на Служба по вписванията.")
    protected String registryOfficeName;

    /** Идентификатор на физическо лице.*/
    @Schema(name = "identity", description = "Идентификатор на физическо лице.")
    protected String identity;

    /** Търсене по част от името. */
    @Schema(name = "byPartOfName", description = "Търсене по част от името.")
    protected Boolean byPartOfName;

    /** Собствено име.*/
    @Schema(name = "firstName", description = "Собствено име.")
    protected String firstName;

    /** Бащино име. */
    @Schema(name = "surName", description = "Бащино име.")
    protected String surName;

    /** Фамилно име. */
    @Schema(name = "familyName", description = "Фамилно име.")
    protected String familyName;

}

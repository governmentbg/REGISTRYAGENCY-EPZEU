package bg.registryagency.epzeu.pr.integration.pr.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Контейнер на критерии за търсене на документ.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "DocumentSearchCriteria", description = "Контейнер на критерии за търсене на документ.")
public class DocumentSearchCriteria {

    /** Идентификатор на Служба по вписванията. */
    @Schema(name = "registryOffice", description = "Идентификатор на Служба по вписванията.")
    protected String registryOfficeId;

    /** Име на Служба по вписванията. */
    @Schema(name = "registryOffice", description = "Име на Служба по вписванията.")
    protected String registryOfficeName;

    /** Номер на входящ регистър. */
    @Schema(name = "numberIncomingRegistry", description = "Номер на входящ регистър.")
    protected String numberIncomingRegistry;

    /** Дата на входящ регистър. */
    @Schema(name = "dateIncomingRegistry", description = "Дата на входящ регистър.")
    protected String dateIncomingRegistry;

    /** Номер на двойно входящ регистър. */
    @Schema(name = "numberDoubleIncomingRegistry", description = "Номер на двойно входящ регистър.")
    protected String numberDoubleIncomingRegistry;

    /** Година на двойно входящ регистър. */
    @Schema(name = "yearDoubleIncomingRegistry", description = "Година на двойно входящ регистър.")
    protected String yearDoubleIncomingRegistry;

    /** Книга */
    @Schema(name = "book", description = "Книга")
    protected String book;

    /** Година */
    @Schema(name = "year", description = "Година")
    protected String year;

    /** Том */
    @Schema(name = "volume", description = "Том")
    protected String volume;

    /** Номер на акт. */
    @Schema(name = "actNumber", description = "Номер на акт.")
    protected String actNumber;
}

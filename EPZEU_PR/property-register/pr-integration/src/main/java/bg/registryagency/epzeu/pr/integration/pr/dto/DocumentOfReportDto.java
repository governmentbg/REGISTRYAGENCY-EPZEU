package bg.registryagency.epzeu.pr.integration.pr.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

/**
 * Контейнер на данни за документ от справка чрез отдалечен достъп за документ.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "DocumentOfReportDto", description = "Контейнер на данни за документ от справка чрез отдалечен достъп за документ.")
public class DocumentOfReportDto {

    /** Идентификатор */
    @Schema(name = "id", description = "Идентификатор")
    private String id;

    /** Дата на входящ регистър. */
    @Schema(name = "dateIncomingRegistry", description = "Дата на входящ регистър.")
    private LocalDate dateIncomingRegistry;

    /** Номер на входящ регистър. */
    @Schema(name = "numberIncomingRegistry", description = "Номер на входящ регистър.")
    private Integer numberIncomingRegistry;

    /** Номер на двойно входящ регистър. */
    @Schema(name = "numberDoubleIncomingRegistry", description = "Номер на двойно входящ регистър.")
    private String numberDoubleIncomingRegistry;

    /** Година */
    @Schema(name = "year", description = "Година")
    private Short year;

    /** Книга */
    @Schema(name = "book", description = "Книга")
    private BookDto book;

    /** Том */
    @Schema(name = "volume", description = "Том")
    private String volume;

    /** Номер на акт. */
    @Schema(name = "actNumber", description = "Номер на акт.")
    private String actNumber;

    /** Служба по вписванията. */
    @Schema(name = "registryOffice", description = "Служба по вписванията.")
    private RegistryOfficeDto registryOffice;
}

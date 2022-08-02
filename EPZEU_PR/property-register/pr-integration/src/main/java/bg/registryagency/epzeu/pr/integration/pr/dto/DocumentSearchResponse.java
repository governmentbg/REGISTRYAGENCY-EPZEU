package bg.registryagency.epzeu.pr.integration.pr.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;


/**
 * Контейнер на данни за резултат от търсене на документ.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "DocumentSearchResponse", description = "Контейнер на данни за резултат от търсене на документ.")
public class DocumentSearchResponse {

    /** Идентификатор на акт */
    @Schema(name = "actId", description = "Идентификатор на акт")
    protected String actId;

    /** Идентификатор на служба */
    @Schema(name = "siteId", description = "Идентификатор на служба")
    protected String siteId;

    /** Номер от двойно входящ регистър. */
    @Schema(name = "doubleRegisterNumber", description = "Номер от двойно входящ регистър.")
    protected String doubleRegisterNumber;

    /** Номер от входящ номер. */
    @Schema(name = "incomingRegisterNumber", description = "Номер от входящ номер.")
    protected Integer incomingRegisterNumber;

    /** Дата от входящ регистър. */
    @Schema(name = "incomingRegisterDate", description = "Дата от входящ регистър.")
    protected LocalDate incomingRegisterDate;

    /** Идентификатор на книга. */
    @Schema(name = "bookTypeId", description = "Идентификатор на книга.")
    protected String bookTypeId;

    /** Том */
    @Schema(name = "volume", description = "Том")
    protected String volume;

    /** Номер в тома (страница). */
    @Schema(name = "page", description = "Номер в тома (страница).")
    protected String page;

    /** Година на акта. */
    @Schema(name = "year", description = "Година на акта.")
    protected Short year;


    public DocumentOfReportDto asDocumentOfReportDto(){
        DocumentOfReportDto document = new DocumentOfReportDto();
        document.setRegistryOffice(new RegistryOfficeDto(this.siteId));
        document.setId(this.actId);
        document.setNumberDoubleIncomingRegistry(this.doubleRegisterNumber);
        document.setNumberIncomingRegistry(this.incomingRegisterNumber);
        document.setDateIncomingRegistry(this.incomingRegisterDate);
        document.setBook(new BookDto(this.bookTypeId));
        document.setVolume(this.volume);
        document.setActNumber(page);
        document.setYear(this.year);
        return document;
    }
}

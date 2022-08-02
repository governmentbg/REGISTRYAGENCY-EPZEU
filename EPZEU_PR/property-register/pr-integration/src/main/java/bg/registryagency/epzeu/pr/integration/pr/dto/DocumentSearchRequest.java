package bg.registryagency.epzeu.pr.integration.pr.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Контейнер на данни за заявка за търсене на документ.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "DocumentSearchRequest", description = "Контейнер на данни за заявка за търсене на документ.")
public class DocumentSearchRequest {

    /** Идентификатор на акт. */
    @Schema(name = "actId", description = "Идентификатор на акт.")
    protected String actId;

    /** Идентификатор на служба. */
    @Schema(name = "siteId", description = "Идентификатор на служба.")
    protected String siteId;

    /** Номер от двойно входящ регистър. */
    @Schema(name = "doubleRegisterNumber", description = "Номер от двойно входящ регистър.")
    protected String doubleRegisterNumber;

    /** Номер от входящ номер. */
    @Schema(name = "incomingRegisterNumber", description = "Номер от входящ номер.")
    protected String incomingRegisterNumber;

    /** Дата от входящ регистър. */
    @Schema(name = "incomingRegisterDate", description = "Дата от входящ регистър.")
    protected String incomingRegisterDate;

    /** Идентификатор на книга. */
    @Schema(name = "bookTypeId", description = "Идентификатор на книга.")
    protected String bookTypeId;

    /** Том */
    @Schema(name = "volume", description = "Том")
    protected String volume;

    /** Номер в тома (страница) */
    @Schema(name = "page", description = "Номер в тома (страница)")
    protected String page;

    /** Година на акта */
    @Schema(name = "year", description = "Година на акта")
    protected String year;

    public DocumentSearchRequest(DocumentSearchCriteria documentSearchCriteria) {

        this.siteId = documentSearchCriteria.getRegistryOfficeId();
        this.doubleRegisterNumber = documentSearchCriteria.getNumberDoubleIncomingRegistry();
        this.incomingRegisterNumber = documentSearchCriteria.getNumberIncomingRegistry();
        this.incomingRegisterDate = documentSearchCriteria.getDateIncomingRegistry();
        this.bookTypeId = documentSearchCriteria.getBook();
        this.volume = documentSearchCriteria.getVolume();
        this.page = documentSearchCriteria.getActNumber();
        this.year = (documentSearchCriteria.getYear() != null && !documentSearchCriteria.getYear().equals(""))
            ? documentSearchCriteria.getYear()
            : documentSearchCriteria.getYearDoubleIncomingRegistry();
    }
}

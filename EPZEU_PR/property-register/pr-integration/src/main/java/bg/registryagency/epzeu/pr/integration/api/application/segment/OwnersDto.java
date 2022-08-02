package bg.registryagency.epzeu.pr.integration.api.application.segment;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.LinkedList;
import java.util.List;


/**
 * Контейнер на данни за собственици на имоти.
 */
@Getter
@Setter
@Schema(name = "OwnersDto", description = "Контейнер на данни за собственици на имоти.")
public class OwnersDto {

    /** Списък със собственици. */
    @Schema(name = "persons", description = "Списък със собственици.")
    private List<PersonDto> persons;

    /** Списък  документи за собственост. */
    @Schema(name = "propertyDocuments", description = "Списък  документи за собственост.")
    private List<PropertyDocumentDto> propertyDocuments;

    public OwnersDto() {
        this(true);
    }

    public OwnersDto(boolean createAll){
        if(createAll) {
            this.persons = new LinkedList<>();
            this.propertyDocuments = new LinkedList<>();
        }
    }
}

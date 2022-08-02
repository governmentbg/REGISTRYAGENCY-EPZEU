package bg.registryagency.epzeu.pr.integration.api.application.segment;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


/**
 * Контейнер на данни за контакт със заявителя.
 */
@Getter
@Setter
@Schema(name = "ContactDataDto", description = "Контейнер на данни за контакт със заявителя.")
public class ContactDataDto {

    /** Имейл адрес. */
    @Schema(name = "appEmailAddress", description = "Имейл адрес.")
    private String appEmailAddress;

    /** Телефон */
    @Schema(name = "phone", description = "Телефон")
    private String phone;

    /** Адрес */
    @Schema(name = "address", description = "Адрес")
    private AddressDto address;

    /** Адресат */
    @Schema(name = "appAddressee", description = "Адресат")
    private String appAddressee;


    public ContactDataDto() {
        this(true);
    }

    public ContactDataDto(boolean createAll){
        if(createAll) {
            this.address = new AddressDto();
        }
    }
}

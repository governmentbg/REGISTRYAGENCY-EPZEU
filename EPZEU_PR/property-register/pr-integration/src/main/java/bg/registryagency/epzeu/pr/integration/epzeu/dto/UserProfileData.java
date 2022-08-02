package bg.registryagency.epzeu.pr.integration.epzeu.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


/**
 * Контейнер на данни за потребителски профил.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "UserProfileData", description = "Контейнер на данни за потребителски профил.")
public class UserProfileData {

    /** КИН */
    @Schema(name = "cin", description = "КИН")
    private Integer cin;

    /** Електронна поща. */
    @Schema(name = "email", description = "Електронна поща.")
    private String email;

    /** Собствено име. */
    @Schema(name = "firstName", description = "Собствено име.")
    private String firstName;

    /** Бащино име. */
    @Schema(name = "middleName", description = "Бащино име.")
    private String middleName;

    /** Фамилно име. */
    @Schema(name = "familyName", description = "Фамилно име.")
    private String familyName;

    private String updatedOn;
}

package bg.registryagency.epzeu.pr.integration.epzeu.dto;

import bg.registryagency.epzeu.pr.integration.epzeu.enums.AuthenticationTypeEnum;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


/**
 * Контейнер на данни за логин сесия.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "LoginSessionDto", description = "Контейнер на данни за логин сесия.")
public class LoginSessionDto {

    /** Идентификатор на логин сесия. */
    @Schema(name = "loginSessionID", description = "Идентификатор на логин сесия.")
    private String loginSessionID;

    /** Идентификатор на потребителска сесия. */
    @Schema(name = "userSessionID", description = "Идентификатор на потребителска сесия.")
    private String userSessionID;

    /** IP адрес. */
    @Schema(name = "ipAddress", description = "IP адрес.")
    private String ipAddress;

    /** Вид автентикация. */
    @Schema(name = "authenticationType", description = "Вид автентикация.")
    private AuthenticationTypeEnum authenticationType;

    /** Идентификатор на потребител. */
    @Schema(name = "userIdentifier", description = "Идентификатор на потребител.")
    private String userIdentifier;

    /** Информация за сертификат. */
    @Schema(name = "certificateInfo", description = "Информация за сертификат.")
    private CertificateInfoDto certificateInfo;

    /** Данни за потребителски профил. */
    @Schema(name = "userProfileData", description = "Данни за потребителски профил.")
    private UserProfileData userProfileData;

    public void setAuthenticationType(int id) {
        this.authenticationType = AuthenticationTypeEnum.fromInteger(id);
    }
}

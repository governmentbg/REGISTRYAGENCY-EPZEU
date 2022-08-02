package bg.registryagency.epzeu.pr.integration.api.domain;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Контейнер на данни за потребител.
 */
@Getter
@Setter
@NoArgsConstructor
@Schema(name = "UserDto", description = "Контейнер на данни за потребител.")
public class UserDto {
    /** >Идентификатор на потребител. */
    @Schema(name = "userId", description = ">Идентификатор на потребител.")
    private Integer userId;
}

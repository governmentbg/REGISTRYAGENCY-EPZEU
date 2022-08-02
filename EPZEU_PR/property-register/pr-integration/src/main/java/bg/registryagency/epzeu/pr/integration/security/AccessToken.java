package bg.registryagency.epzeu.pr.integration.security;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AccessToken {
    @JsonAlias(value = "access_token")
    private String token;
    @JsonAlias(value = "expires_in")
    private long expiresIn;
    @JsonAlias(value = "token_type")
    private String tokenType;
}

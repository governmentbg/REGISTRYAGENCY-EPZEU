package bg.registryagency.epzeu.pr.integration.api.security;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class UserDetails {
    private final String ipAddress;
    private final String sessionId;
}

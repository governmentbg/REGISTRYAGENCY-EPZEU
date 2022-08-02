package bg.registryagency.epzeu.pr.integration.security;

import lombok.Getter;

@Getter
public enum TokenGrantType {
    CLIENT_CREDENTIALS("client_credentials"), DELEGATION("delegation");

    private String value;

    TokenGrantType(String value) {
        this.value = value;
    }
}

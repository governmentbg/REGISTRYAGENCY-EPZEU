package bg.registryagency.epzeu.pr.integration.security;

import lombok.Getter;

@Getter
public enum TokenScope {
    EPZEU_API("epzeu.api"), REAU_API("api.pr.reau.applications"), PAYMENT_API("api.payments.obligations.ro"), INTEGRATION_EPZEU_API("integration.epzeu.api");

    private String value;

    TokenScope(String value) {
        this.value = value;
    }
}

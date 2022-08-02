package bg.registryagency.epzeu.pr.integration.util;

import bg.registryagency.epzeu.pr.integration.security.Client;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public final class ClientContextUtil {
    private ClientContextUtil(){}

    public static Client getAuthenticatedClient() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        //Check whether type of principal is Client, when there is no authenticated UserSecurityContext returns anonymous client who is not of type Client
        if (authentication != null && authentication.getPrincipal() instanceof Client) {
            return (Client) authentication.getPrincipal();
        }

        return null;
    }

    public static Integer getAuthenticatedClientCin() {
        Client client = ClientContextUtil.getAuthenticatedClient();

        if(client != null) {
            return client.getCin();
        }

        return null;
    }
}

import * as oidc from 'oidc-client';

declare var oidcUserManagerConfig: oidc.UserManagerSettings;

function removeUser() {
    new oidc.UserManager(oidcUserManagerConfig).removeUser();
}

removeUser();
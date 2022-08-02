import * as oidc from 'oidc-client';

function renewTokenCallBack() {
    new oidc.UserManager({}).signinSilentCallback();
}

renewTokenCallBack();
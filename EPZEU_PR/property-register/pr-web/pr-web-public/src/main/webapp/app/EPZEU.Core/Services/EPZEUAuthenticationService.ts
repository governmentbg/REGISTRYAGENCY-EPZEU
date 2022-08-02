import { AjaxHelper, UrlHelper, userContext, ClientError, AuthenticationService, ObjectHelper } from 'Cnsys.Core';

class EPZEUAuthenticationService extends AuthenticationService {

    private _signinCallbackKey: string = 'epzeu:signinCallback';
    private _userIsIdleStorageKey: string = 'epzeu:userIsIdle';
    private _beforeIdleUrlStorageKey: string = 'epzeu:urlBeforeIdle';

    public SigninRedirect(redirectBackToCurrentUrl?: boolean): Promise<void> {
        let that = this;

        if (!this._mgr) { 
            throw 'Oidc.UserManager not initialized!';
        }

        var enablePersist: boolean = true;
        if (redirectBackToCurrentUrl != undefined) {
            enablePersist = redirectBackToCurrentUrl;
        }

        this.persistUserIdleState(null);

        return this.persistUserLocationBeforeSignin(enablePersist).then(() => {
            //Това е защото вътре се прави wildows.location, а той по подразбиране не се изпълнява веднага а чак след като всички промисе се оценят. 
            return that._mgr.signinRedirect().delay(10000);
        });
    }

    public querySessionStatusHandler(session: any): Promise<void> {

        if (session.sid && session.sub && this.isUserIdle == false) {

            return this.SigninRedirect();
        }

        return Promise.resolve();
    }

    public userSignedOutHandler(otherUserSignedIn: boolean): Promise<any> {

        if (otherUserSignedIn)
            return this.SigninRedirect();

        return this.SignoutRedirect();
    }

    public SignoutRedirectForIdleUser(sessTimeoutUrl: string): Promise<any> {

        return this.persistUserIdleState(true)
            .then(() => {
                return this.SignoutRedirect({
                    post_logout_redirect_uri: sessTimeoutUrl,
                    extraQueryParams: {
                        postlogoutregirect: true
                    }
                });
            });
    }

    /**
     * add signin state to the logout request, before performing it
     * */
    public SignoutUserForNewLogin(): Promise<void> {

        let that = this;

        if (!this._mgr) {
            throw 'Oidc.UserManager not initialized!';
        }

        return userContext.clearUser().then(res => {
            if (res) {

                return that._mgr.createSigninRequest().then(r => {

                    let args = {
                        extraQueryParams: {
                            signinstate_client_id: r.state.client_id,
                            signinstate_redirect_uri: r.state.redirect_uri,
                            signinstate_state: r.state.id,
                            signinstate_nonce: r.state.nonce,
                            signinstate_response_type: that._mgr.settings.response_type,
                            signinstate_scope: that._mgr.settings.scope
                        }
                    };

                    that._mgr.signoutRedirect(args).catch((e) => { console.log(e); });
                });
            }
            else {
                throw 'Error in logging-out';
            }
        }, (e) => {
            console.log('error in SignoutRedirect');
            console.log(e);
        });
    }

    get isUserIdle(): boolean {
        let isIdle = sessionStorage.getItem(this._userIsIdleStorageKey);
        return isIdle != undefined && isIdle === '1';
    }

    persistUserIdleState(isIdle: boolean | null): Promise<void> {

        if (isIdle === true) {
            let urlBeforeIdle = window.location.href;
            sessionStorage.setItem(this._beforeIdleUrlStorageKey, urlBeforeIdle);
            sessionStorage.setItem(this._userIsIdleStorageKey, '1');
        }
        else {
            sessionStorage.removeItem(this._userIsIdleStorageKey);
        }

        return Promise.resolve();
    }

    persistUserLocationBeforeSignin(enablePersist: boolean): Promise<void> {

        if (enablePersist) {
            let urlBeforeIdleCheck = sessionStorage.getItem(this._beforeIdleUrlStorageKey);
            let returnUrl = urlBeforeIdleCheck != undefined ? urlBeforeIdleCheck : window.location.href;

            sessionStorage.setItem(this._signinCallbackKey, returnUrl);
            sessionStorage.removeItem(this._beforeIdleUrlStorageKey);
        }
        else {
            sessionStorage.removeItem(this._signinCallbackKey);
        }
        return Promise.resolve();
    }
}

export const epzeuAuthenticationService = new EPZEUAuthenticationService();
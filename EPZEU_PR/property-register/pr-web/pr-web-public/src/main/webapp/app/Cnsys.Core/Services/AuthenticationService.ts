import * as oidc from 'oidc-client';
import { userContext } from '../Contexts';

declare var oidcUserManagerConfig: oidc.UserManagerSettings;
var oidcManager: oidc.UserManager = null;

export class AuthenticationService {

    protected _mgr: oidc.UserManager;

    public init(): Promise<Boolean> {
        let that = this;
        let result = this.resolveAuthConfigAndOidcManager().then(mgr => {

            mgr.events.addAccessTokenExpired(that.handleTokenExpired);

            mgr.events.addUserSignedOut(function () {
                // before signout redirect, check if there is new user logged in idsrv from other portal
                mgr.getUser()
                    .then(usr => {
                        return Promise.resolve(usr.profile);
                    })
                    .then((usr_profile) => {

                        let otherUserSignedIn: boolean = false;

                        return mgr.querySessionStatus().then((sess: any) => {

                            if (sess && sess.sub != usr_profile.sub) {
                                otherUserSignedIn = true;
                            }
                            return Promise.resolve(otherUserSignedIn);
                        }, (error: any) => {
                            console.log('error in querySessionStatus');
                            return Promise.resolve(otherUserSignedIn);
                        });
                    })
                    .then((otherUserSignedIn: boolean) => {
                        return that.userSignedOutHandler(otherUserSignedIn);
                    });
            });

            return mgr.getUser().then(user => {

                if (user && !user.expired) {
                    userContext.ensureUser(user.profile);
                    return true;
                }
                else {

                    var promise = mgr.querySessionStatus();
                    var __querySessionStatusHandler = that.querySessionStatusHandler.bind(that);

                    return promise
                        .then((sess: any) => {

                            if (sess.sid && sess.sub) {
                                return __querySessionStatusHandler(sess);
                            }
                            return Promise.resolve();
                        }, (error: any) => {
                            return this.RemoveUser();
                        })
                        .then(() => { return true });
                }
            });
        });

        return result;
    }

    public SignoutRedirect(args: any = {}): Promise<any> {
        let that = this;

        if (!this._mgr) {
            throw 'Oidc.UserManager not initialized!';
        }

        return userContext.clearUser().then(res => {
            if (res) {
                return that._mgr.signoutRedirect(args).catch((e) => { console.log(e); });
            }
            else {
                throw 'Error in logging-out';
            }
        }, (e) => {
            console.log('error in SignoutRedirect');
            console.log(e);
        });
    }

    public GetUserAccessToken(): Promise<string> {
        let that = this;
        return this.resolveOidcManager()
            .then(userManager => { return that.resolveUser(userManager); })
            .then(user => {
                return (user && !user.expired) ? user.access_token : null;
            });
    }

    public RemoveUser(): Promise<void> {
        let that = this;

        return userContext.clearUser().then(res => {
            if (res) {
                return that.resolveOidcManager().then(mgr => {
                    return mgr.removeUser();
                });
            }
            else {
                throw 'Error in RemoveUser()';
            }
        });
    }

    public getUser(): Promise<oidc.User> {
        if (this._mgr) {
            return this._mgr.getUser();
        }
        else {
            return Promise.resolve(null);
        }
    }

    public querySessionStatusHandler(session: any): Promise<void> {
        return Promise.resolve();
    }

    public userSignedOutHandler(otherUserSignedIn: boolean): Promise<any> {
        return Promise.resolve({});
    }

    protected getConfiguration(): oidc.UserManagerSettings {
        return oidcUserManagerConfig;
    }

    resolveOidcManager(): Promise<oidc.UserManager> {
        if (this._mgr) {
            return Promise.resolve(this._mgr);
        }
        else {
            return this.resolveAuthConfigAndOidcManager();
        }
    }

    resolveAuthConfigAndOidcManager(): Promise<oidc.UserManager> {

        if (!oidcManager) {
            oidcManager = new oidc.UserManager(this.getConfiguration());
        }
        if (!this._mgr) {
            this._mgr = oidcManager;
        }
        return Promise.resolve(this._mgr);
    }

    resolveUserAndProfile(userManager: oidc.UserManager): Promise<any> {

        return userManager.getUser().then(user => {

            return user ? user.profile : <any>null;
        }, (e) => {
            console.log('error in getUser');
            console.log(e);
            return Promise.reject(e);
        });
    }

    resolveUser(userManager: oidc.UserManager): Promise<oidc.User> {
        return userManager.getUser();
    }

    handleTokenExpired() {
        console.log('token expired!');
    }
}

export const authenticationService = new AuthenticationService();

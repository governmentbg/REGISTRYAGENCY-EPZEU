import { observable, computed } from "mobx";
import { ArrayHelper } from '../Common/ArrayHelper';

class UserContext {
    @observable private _isAuthenticated: boolean = false;
    @observable private _userInfo?: UserInfo;

    constructor() {
    }

    @computed public get isAuthenticated(): boolean {
        return this._isAuthenticated;
    }

    @computed public get user(): UserInfo | undefined {
        return this._userInfo;
    }

    public ensureUser(userProfile: any) {

        if (userProfile) {
            this._userInfo = new UserInfo(userProfile.name);
            this._userInfo.email = userProfile.email;
            this._userInfo.firstName = userProfile.given_name;
            this._userInfo.familyName = userProfile.family_name;
            this._userInfo.roles = $.isArray(userProfile.role) ? userProfile.role : [userProfile.role];
            this._isAuthenticated = true;
            this._userInfo.userIdentifiable = userProfile.user_identifiable != undefined && userProfile.user_identifiable == 'True';
            this._userInfo.organization = userProfile.organization;
            this._userInfo.accessType = userProfile.access_type;

            if (userProfile && userProfile.amr && userProfile.amr.indexOf("external") >= 0) {
                if (userProfile.idp.indexOf("nra") >= 0) {
                    this._userInfo.authenticationMode = AuthenticationModes.Nra; 
                }
                else {
                    this._userInfo.authenticationMode = AuthenticationModes.Windows; 
                }
                
            }
            else if (userProfile && userProfile.amr && userProfile.amr.indexOf("pwd") >= 0) {
                this._userInfo.authenticationMode = AuthenticationModes.UsernameAndPassword;
            }
            else if (userProfile && userProfile.amr && userProfile.amr.indexOf("cert") >= 0) {
                this._userInfo.authenticationMode = AuthenticationModes.Certificate;
            }
            else {
                this._userInfo.authenticationMode = AuthenticationModes.Unknown;
            }
        }
        else {
            this._isAuthenticated = false;
        }
    }

    /**
     * logout user
     */
    public clearUser(): Promise<boolean> {
        this._userInfo = undefined;
        this._isAuthenticated = false;

        return Promise.resolve(true);
    }

    // this is test
    public changeStatus(value: boolean) {
        this._isAuthenticated = value;
    }

    public isInRole(role: string): boolean {
        if (this.isAuthenticated
            && this.user
            && this.user.roles
            && this.user.roles.length > 0) {
            let user = this.user;

            if (ArrayHelper.queryable.from(user.roles).count(function (el: string) { return el === role }) == 1) {
                return true;
            }
        }

        return false;
    }
}

export enum AuthenticationModes {
    Unknown = 0,
    UsernameAndPassword = 1,
    Windows = 2,
    Certificate = 3,
    Nra = 4,
}

export class UserInfo {
    private _name: string;
    private _email: string;
    private _roles: string[] = [];
    private _firstName: string;
    private _familyName: string;
    private _authenticationMode: AuthenticationModes;
    private _userIdentifiable: boolean;
    private _organization: string;
    private _accessType: string;

    constructor(name: string) {
        this._name = name;
    }

    public get name(): string {
        return this._name;
    }

    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }

    public get roles(): string[] {
        return this._roles;
    }
    public set roles(value: string[]) {
        this._roles = value;
    }

    public get firstName(): string {
        return this._firstName;
    }
    public set firstName(value: string) {
        this._firstName = value;
    }

    public get familyName(): string {
        return this._familyName;
    }
    public set familyName(value: string) {
        this._familyName = value;
    }

    public get authenticationMode(): AuthenticationModes {
        return this._authenticationMode;
    }
    public set authenticationMode(value: AuthenticationModes) {
        this._authenticationMode = value;
    }

    public get userIdentifiable(): boolean {
        return this._userIdentifiable;
    }
    public set userIdentifiable(value: boolean) {
        this._userIdentifiable = value;
    }

    public get organization(): string {
        return this._organization;
    }
    public set organization(value: string) {
        this._organization = value;
    }

    public get accessType(): string {
        return this._accessType;
    }
    public set accessType(value: string) {
        this._accessType = value;
    }
}

export const userContext = new UserContext();
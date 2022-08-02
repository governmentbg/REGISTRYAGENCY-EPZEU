import * as React from "react";
import { userContext } from 'Cnsys.Core';
import { epzeuAuthenticationService } from "EPZEU.Core";

export function ProfileBoxUI() {
    let content: any = null;

    if (userContext.isAuthenticated && userContext.user) {
        content = (
            <div>
                <span>
                    {userContext.user.firstName} {userContext.user.familyName} / <a style={{ cursor: 'pointer' }} href="javascript://" onClick={(e) => { epzeuAuthenticationService.SignoutRedirect(); }}>Изход</a>
                </span>                
            </div>
        );
    } else {
        content = (<button type="button" className="btn btn-primary" onClick={(e) => { epzeuAuthenticationService.SigninRedirect(); }}>Вход</button>);
    }

    return content;
}
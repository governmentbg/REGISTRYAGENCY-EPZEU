import * as oidc from 'oidc-client';
import 'babel-polyfill';

function signInCallBack() {    
    
    new oidc.UserManager({}).signinRedirectCallback().then(function (user) {

        ReturnUser();

    }).catch(function (e) {
        if ((e.error && e.error == 'access_denied') || e.message === "No state in response" || e.message === "No matching state found in storage") {
            ReturnUser();
        }
        if (e && e.message) {
            document.getElementById('errortext').style.display = "block";
        }        
        console.log(e);
    });
}

function ReturnUser() {
    var returnUrl = sessionStorage.getItem('epzeu:signinCallback');

    if (!returnUrl) {
        returnUrl = "/";
    }

    window.history.replaceState(
        window.history.state,
        window.document.title,
        window.location.origin + window.location.pathname);
    
    window.location.href = returnUrl;
}

signInCallBack();
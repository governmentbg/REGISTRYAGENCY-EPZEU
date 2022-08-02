import { userContext, UrlHelper } from 'Cnsys.Core';
import { AsyncUIProps, BaseRouteProps, BaseRoutePropsExt, withAsyncFrame, withRouter } from "Cnsys.UI.React";
import { Button, epzeuAuthenticationService, EPZEUBaseComponent, IDataServiceProviderProps, moduleContext, withDataServiceProvider } from "EPZEU.Core";
import { documentsDataService } from "../Services/DocumentsDataService";
import { observable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";

interface CompanyCaseDocumentAccessUIProps extends BaseRouteProps<any>, AsyncUIProps, BaseRoutePropsExt, IDataServiceProviderProps {
    uic: string;
    guid: string;
}

@observer class CompanyCaseDocumentAccessUIImpl extends EPZEUBaseComponent<CompanyCaseDocumentAccessUIProps, any> {

    @observable private errorMsg: JSX.Element = null;
    @observable private changeUser: JSX.Element = null;
    @observable private closeTabeInfo: JSX.Element = null;

    constructor(props: CompanyCaseDocumentAccessUIProps) {
        super(props);

        if (UrlHelper.getUrlParameter('accessDenied') == "true") {
            this.props.routerExt.changeParams(null)

            this.errorMsg = (<div className="alert alert-danger">
                {moduleContext.resourceManager.getResourceByKey('CR_GL_NOT_HAVE_ACCESS_DOCUMENT_E')}
            </div>);

            this.closeTabeInfo = null;
        }
        else {
            this.closeTabeInfo = <a href="javascript://" onClick={() => { window.close(); }}>{moduleContext.resourceManager.getResourceByKey('GL_PAGE_NOT_CLOSE_L')}</a>
            this.downloadCcDocument(this.props.match.params.uic, this.props.match.params.guid);
        }
    }

    render(): JSX.Element {

        return (
            <div className="general-message-wrapper">
                <div className="section-wrapper section-wrapper--margins">
                    <div className="fixed-content-width">
                        {this.errorMsg}
                        {this.changeUser}
                        {this.closeTabeInfo}
                    </div>
                </div>
            </div>);
    }

    public downloadCcDocument(uic: string, guid: string): Promise<boolean> {
        return documentsDataService.getDownloadCcUrl(uic, guid).then(downloadUrl => {

            window.location.assign(downloadUrl);

            var ua = window.navigator.userAgent;
            var isIE = /MSIE|Trident/.test(ua);

            if (!isIE) {
                setTimeout(function () { window.close(); }, 3000);
            }

            return true;
        })
    }
}

export const CompanyCaseDocumentAccessUI = withRouter(withDataServiceProvider(withAsyncFrame(CompanyCaseDocumentAccessUIImpl)));
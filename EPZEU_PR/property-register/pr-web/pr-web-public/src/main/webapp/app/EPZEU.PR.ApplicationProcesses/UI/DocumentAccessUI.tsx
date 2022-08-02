import { UrlHelper } from 'Cnsys.Core';
import { AsyncUIProps, BaseRouteProps, BaseRoutePropsExt, withAsyncFrame, withRouter } from "Cnsys.UI.React";
import { EPZEUBaseComponent, IDataServiceProviderProps, moduleContext, withDataServiceProvider } from "EPZEU.Core";
import { observable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { documentsDataService } from "../Services/DocumentDataService";

interface DocumentAccessUIProps extends BaseRouteProps<any>, AsyncUIProps, BaseRoutePropsExt, IDataServiceProviderProps {
    guid: string;
}

@observer class DocumentAccessUIImpl extends EPZEUBaseComponent<DocumentAccessUIProps, any> {

    @observable private errorMsg: JSX.Element = null;
    @observable private changeUser: JSX.Element = null;
    @observable private closeTabeInfo: JSX.Element = null;

    constructor(props: DocumentAccessUIProps) {
        super(props);

      if (UrlHelper.getUrlParameter('accessDenied') == "true") {
        this.props.routerExt.changeParams(null)

        this.errorMsg = (<div className="alert alert-danger">
          {moduleContext.resourceManager.getResourceByKey('PR_GL_NOT_HAVE_ACCESS_DOCUMENT_E')}
        </div>);

        this.closeTabeInfo = null;
      } else {
        this.closeTabeInfo = <a href="javascript://" onClick={() => { window.close(); }}>{this.getResource("GL_PAGE_NOT_CLOSE_L")}</a>
        this.downloadDocument(this.props.match.params.guid);
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

    public downloadDocument(guid: string): Promise<boolean> {
        return documentsDataService.getDownloadUrl(guid).then(downloadUrl => {

          //Download url have accessDenied argument user is not authenticated or token is expired
          if(~downloadUrl.indexOf('accessDenied=true')) {
            // this.props.routerExt.changeParams(null)
            this.closeTabeInfo = null;

            this.errorMsg = (<div className="alert alert-danger">
              {moduleContext.resourceManager.getResourceByKey('PR_GL_NOT_HAVE_ACCESS_DOCUMENT_E')}
            </div>);

          } else {
            window.location.assign(downloadUrl);

            var ua = window.navigator.userAgent;
            var isIE = /MSIE|Trident/.test(ua);

            if (!isIE) {
              setTimeout(function () { window.close(); }, 3000);
            }
          }

          return true;
        })
    }
}

export const DocumentAccessUI = withRouter(withDataServiceProvider(withAsyncFrame(DocumentAccessUIImpl)));

export function downloadDocumentEvent(event: any, guid: string) {
    event.preventDefault();

    documentsDataService.getDownloadUrl(guid).then(downloadUrl => {

        var pom = document.createElement('a');
        pom.setAttribute('href', downloadUrl);
        pom.setAttribute('target', '_blank');

        document.body.appendChild(pom);

        pom.click();

        document.body.removeChild(pom);
    });
}

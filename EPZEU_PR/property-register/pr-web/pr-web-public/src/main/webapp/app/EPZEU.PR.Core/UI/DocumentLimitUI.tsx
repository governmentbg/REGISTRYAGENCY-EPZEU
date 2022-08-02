import { AsyncUIProps, BaseRouteProps, BaseRoutePropsExt, withAsyncFrame, withRouter } from "Cnsys.UI.React";
import { EPZEUBaseComponent, IDataServiceProviderProps, resourceManager, withDataServiceProvider } from "EPZEU.Core";
import { observer } from "mobx-react";
import * as React from "react";

interface DocumentLimitUIProps extends BaseRouteProps<any>, AsyncUIProps, BaseRoutePropsExt, IDataServiceProviderProps {
}

@observer class DocumentLimitUIImpl extends EPZEUBaseComponent<DocumentLimitUIProps, any> {

  constructor(props: DocumentLimitUIProps) {
    super(props);
  }

  render(): JSX.Element {

    return (
      <div className="main-wrapper">
        <div className="page-wrapper">
          <div className="section-wrapper section-wrapper--margins">
            <div className="fixed-content-width">
              <div className="alert alert-warning">
                {resourceManager.getResourceByKey("GL_DOC_DOWNLOAD_DOC_E")}
              </div>
            </div>
          </div>
        </div>
      </div>);
  }
}

export const DocumentLimitUI = withRouter(withDataServiceProvider(withAsyncFrame(DocumentLimitUIImpl)));

import * as React from "react";
import { resourceManager } from "EPZEU.Core";

export function UnauthorizedPageUI() {
  $("[nav_key='pr_applications']").unbind("click");
  $("[nav_key='pr_services']").unbind("click");
  $("[nav_key='pr_reports']").unbind("click");

  return (
    <div className="main-wrapper">
      <div className="page-wrapper">
        <div className="section-wrapper section-wrapper--margins">
          <div className="fixed-content-width">
            <div className="alert alert-danger">
              {resourceManager.getResourceByKey("GL_EP_USR_NOT_PERMISSION_E")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

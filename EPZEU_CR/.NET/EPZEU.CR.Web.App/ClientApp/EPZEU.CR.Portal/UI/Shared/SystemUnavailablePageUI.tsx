import { resourceManager } from "EPZEU.Core";
import * as React from "react";

export function SystemUnavailablePageUI() {

    return (
        <div className="main-wrapper">
            <div className="page-wrapper">
                <div className="section-wrapper section-wrapper--margins">
                    <div className="fixed-content-width">
                        <div className="alert alert-danger" role="alert">
                            {resourceManager.getSystemUnavailableResource
                                ? resourceManager.getSystemUnavailableResource()
                                : resourceManager.getResourceByKey("GL_SYSTEM_UNAVAILABLE_E")}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
import * as React from "react";
import { resourceManager } from "../Common/ResourceManager";

export function SessionTimeoutUI() {
    return (
        <div className="main-wrapper">
            <div className="page-wrapper">
                <div className="section-wrapper section-wrapper--margins">
                    <div className="fixed-content-width">
                        <div className="alert alert-warning">
                            {resourceManager.getResourceByKey("GL_EP_USR_SESSION_TIMEOUT_E")}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
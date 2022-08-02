import { UrlHelper } from "Cnsys.Core";
import { AsyncUIProps, BaseProps, RawHTML, withAsyncFrame } from "Cnsys.UI.React";
import { observable } from 'mobx';
import { observer } from "mobx-react";
import * as React from "react";
import { Link } from "react-router-dom";
import { CMS } from "../Cache/CMS";
import { Nomenclatures } from "../Cache/Nomenclatures";
import { appConfig } from "../Common/ApplicationConfig";
import { resourceManager } from "../Common/ResourceManager";
import { ApplicationType } from "../Models";
import { Service } from "../Models/Service";
import { EPZEUBaseComponent } from "./EPZEUBaseComponent";

interface ServiceUIProps extends BaseProps, AsyncUIProps {
    serviceID?: number;
    servicesPath: string;
    getApplicationPath: (appType: ApplicationType, serviceId: number) => string;
}

@observer class ServiceUIImpl extends EPZEUBaseComponent<ServiceUIProps, any> {

    @observable private _service: Service;
    @observable private _testSigningUrl: string;

    constructor(props: ServiceUIProps) {
        super(props)

        let propsInternal: any = this.props;

        this.props.registerAsyncOperation(Nomenclatures.getServices(srv => srv.serviceID == +propsInternal.match.params.serviceID).bind(this).then(services => {

            if (services && services.length == 1)
                this._service = services[0];

            return CMS.getStaticPages(pg => pg.pageKey == 'EP_TEST_SIGNATURE').bind(this).then(staticPages => {
                if (staticPages && staticPages.length == 1)
                    this._testSigningUrl = staticPages[0].url;
            });
        }))
    }

    render() {

        return (
            <div id="main-wrapper" className="main-wrapper">
                <div className="page-wrapper">
                    <div className="section-wrapper section-wrapper--margins">
                        <div className="fixed-content-width">
                            {this._service ?
                                <RawHTML divClassname="card-page-collection" rawHtmlText={this._service.description} />
                                : null}
                            <div className="card card-page">
                                <div className="card-body card-page__body">
                                    <div className="alert alert-warning" role="alert">
                                        <p>{resourceManager.getResourceByKey("EP_GL_PUBLIC_SERVICE_DESCRIPTION_I")} <a className="alert-link"
                                            href={UrlHelper.urlJoin(appConfig.epzeuPublicUIUrl, this._testSigningUrl)}>
                                            <b>{resourceManager.getResourceByKey("EP_GL_PUBLIC_SERVICE_DESCRIPTION_LINK_I")}</b></a>.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="button-bar button-bar--page">
                                <div className="left-side">
                                    <Link to={this.props.servicesPath} className='btn btn-secondary'>
                                        {resourceManager.getResourceByKey("EP_GL_PUBLIC_ALL_SERVICES_L")}
                                    </Link>
                                </div>
                              {/*TODO Make this code below the same for CR and PR, for CR is mandatory to have
                              appConfig.paths.applications in condition below for PR it is mandatory to not have */}
                                {this._service && this._service.applicationType && this._service.applicationType.applicationTypeID ?
                                    <div className="right-side">
                                        <Link to={this.props.getApplicationPath(this._service.applicationType, this._service.serviceID)}
                                            className='btn btn-primary'>
                                            {resourceManager.getResourceByKey("EP_GL_REQUEST_SERVICE_L")}
                                        </Link>
                                    </div>
                                    : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export const ServiceUI = withAsyncFrame(ServiceUIImpl);

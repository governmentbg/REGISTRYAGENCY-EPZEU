import { ObjectHelper, UrlHelper } from "Cnsys.Core";
import { AsyncComponentLoader, AsyncUIProps, BaseRouteProps, BaseRoutePropsExt, withAsyncFrame, withRouter } from "Cnsys.UI.React";
import { ApplicationType, EPZEUBaseComponent, IDataServiceProviderProps, ModuleManager, Nomenclatures, withDataServiceProvider, ValidationSummaryErrors } from "EPZEU.Core";
import { ApplicationDocumentInfo, ApplicationInfo, ApplicationsService, Constants, downloadDocumentEvent, PassedFrom, ApplicationFormTypes } from "EPZEU.CR.Core";
import { observable, runInAction } from 'mobx';
import { observer } from "mobx-react";
import * as React from "react";
const ApplicationPreviewCmpUI = (props: any) => <AsyncComponentLoader load={import(/* webpackChunkName: "ApplicationProcesses" */ 'EPZEU.CR.ApplicationProcesses').then(m => { return ModuleManager.registerModule(m).then(() => m.ApplicationPreviewCmpUI); })} {...props} />

interface IncomingDocumentsUIProps extends BaseRouteProps<any>, AsyncUIProps, BaseRoutePropsExt, IDataServiceProviderProps {
}

@observer class IncomingDocumentsUIImpl extends EPZEUBaseComponent<IncomingDocumentsUIProps, any> {
    private incomingNumber: string;
    @observable private showApp: boolean;
    @observable private dataNotFound: boolean;
    @observable private data: ApplicationDocumentInfo[];
    @observable private appInfo: ApplicationInfo;
    @observable private appType: ApplicationType;

    constructor(props: IncomingDocumentsUIProps) {
        super(props);

        //Initialize
        this.incomingNumber = undefined;
        this.showApp = false;
        this.dataNotFound = false;
        this.data = undefined;
        this.appInfo = undefined;
        this.incomingNumber = ObjectHelper.isStringNullOrEmpty(this.props.location.search) ? undefined : UrlHelper.getUrlParameter('incomingNumber');

        //Bind
        this.loadData = this.loadData.bind(this);
        this.BuildDocSize = this.BuildDocSize.bind(this);

        if (ObjectHelper.isStringNullOrEmpty(this.incomingNumber))
            this.dataNotFound = true;
        else
            this.props.registerAsyncOperation(this.loadData());
    }

    render(): JSX.Element {

        if (this.props.asyncErrorMessages && this.props.asyncErrorMessages.length > 0) {
            return <div className="section-wrapper">
                <div className="fixed-content-width">
                    <ValidationSummaryErrors errors={this.props.asyncErrorMessages} />
                </div>
            </div>
        }

        if (!this.data && !this.appInfo) {

            if (this.dataNotFound)
                return (<div className="section-wrapper">
                    <div className="fixed-content-width">
                        <div className="alert alert-info">{this.getResource('GL_NOT_FOUND_RESULTS_E')}</div>
                    </div>
                </div>);

            return null;
        }

        return (<>
            <div className="section-wrapper">
                <div className="fixed-content-width">
                    <div className="page-heading">
                        <h1 className="application-title">
                            {
                                this.appType && this.appType.appCode
                                    ? <span className="application-title__number">{this.appType.appCode}</span>
                                    : null
                            }
                            {
                                !ObjectHelper.isStringNullOrEmpty(this.appInfo.incomingNumber)
                                    ? <><span className="text-primary">№&nbsp;{this.appInfo.incomingNumber}</span><br /></>
                                    : null
                            }
                            {this.appType && this.appType.name ? this.appType.name : null}
                        </h1>
                    </div>
                </div>
            </div>
            <div className="main-wrapper section-wrapper section-wrapper--margins fixed-content-width">
                <div className="page-wrapper">
                    <div className="section-wrapper">
                        {this.showApp &&
                            <div className="interactive-container interactive-container--preview">
                                <div className="interactive-container__content">
                                    <ApplicationPreviewCmpUI incomingNumber={this.incomingNumber} />
                                </div>
                            </div>}
                        {this.data ?
                            <div className="interactive-container interactive-container--preview">
                                <div className="interactive-container__content">
                                    <h2 className="section-title section-title--preview">{this.getResource('CR_APP_ATTACHED_DOCUMENTS_L')}</h2>
                                    <div className="table-responsive-block">
                                        <table className="table table-borderless table-striped table-hover table-collapsible">
                                            <thead className="thead-invisible">
                                                <tr>
                                                    <th className="single-icon-td"></th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.data.map((item: ApplicationDocumentInfo, idx: number) => {
                                                    return (<React.Fragment key={item.guid}>
                                                        <tr className={(idx % 2 === 0) ? "even-color" : "odd-color"}>
                                                            <td className="toggle-collapse">
                                                                <button className="system-button collapsed" id={`collapsable-trigger-${item.guid}`} onClick={() => this.onCollapseCriteria(`collapsable-content-${item.guid}`, item.guid)}>
                                                                    <i className="ui-icon ui-icon-chevron-right" aria-hidden="true"></i>
                                                                </button>
                                                            </td>

                                                            <td>
                                                                <p className="field-text">
                                                                    <i className="ui-icon ui-icon-download-color mr-1"></i>
                                                                    <a href={UrlHelper.generateLinkUrl(`~${Constants.PATHS.DOCUMENT_ACCESS.replace(":guid", item.guidWithCtx)}`)}
                                                                        onClick={(event) => downloadDocumentEvent(event, item.guidWithCtx)}>
                                                                        {item.description}
                                                                    </a>
                                                                </p>
                                                            </td>
                                                        </tr>
                                                        <tr className="collapsible-row">
                                                            <td colSpan={2}>
                                                                <div id={`collapsable-content-${item.guid}`} className="collapse">
                                                                    <div className="collapsible-row-content">
                                                                        <p className="field-text">
                                                                            {item.originalIncomingNumber ? <><span className="text-muted">{this.getResource('GL_APPLICATION_L')}: {item.originalIncomingNumber}</span><br /></> : null}
                                                                            {item.isOriginal ? <><span className="text-muted">{this.getResource('GL_DOCUMENT_ORIGINAL_L')}</span><br /></> : null}
                                                                            {item.fileMetadata.size ? <><span className="text-muted">{this.getResource('GL_DOCUMENT_SIZE_L')}: {(item.fileMetadata.size / (1024 * 1024)).toFixed(2)} MB</span></> : null}
                                                                            {item.fileMetadata.numberOfPages ? <><br /><span className="text-muted">{this.getResource('GL_COUNT_PAGES_L')}: {item.fileMetadata.numberOfPages}</span></> : null}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </ React.Fragment>);
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            : null}

                    </div>
                </div>
            </div>
        </>);
    }

    onCollapseCriteria(targetId: string, itemId: string): void {
        let triger = $(`#collapsable-trigger-${itemId}`);
        triger.toggleClass('collapsed');

        $('#' + targetId).slideToggle();
    }

    private loadData(): Promise<void> {
        let that = this;
        let dataSrv: ApplicationsService = this.props.dataSrvProvider.getDataService<ApplicationsService>(ApplicationsService);

        return dataSrv.getApplicationInfoByIncommingNumber(this.incomingNumber).then(appInfo => {
            return dataSrv.getApplicationDocumentsInfo(that.incomingNumber).then(res => {
                runInAction(() => {
                    that.showApp = appInfo && appInfo.passedFrom == PassedFrom.Internet;

                    if ((res && res.length > 0) || (appInfo)) {
                        if (that.showApp && res && (appInfo.applicationType == ApplicationFormTypes.G1 || appInfo.applicationType == ApplicationFormTypes.G2 || appInfo.applicationType == ApplicationFormTypes.G3)) {
                            res = res.filter(d => d.documentTypeID.indexOf("5.") != 0);
                        }

                        that.data = res;
                        that.appInfo = appInfo;
                        that.dataNotFound = false;
                    } else {
                        that.data = undefined;
                        that.appInfo = undefined;
                        that.dataNotFound = true;
                    }
                });
            }).then(() => {
                if (that.appInfo && that.appInfo.applicationType) {
                    return Nomenclatures.getApplicationTypes(x => x.appType == (+that.appInfo.applicationType).toString()).then(res => {
                        if (res && res.length == 1 && res[0].name)
                            that.appType = res[0];
                    })
                }
            });
        });
    }

    private BuildDocSize(item: ApplicationDocumentInfo): string {
        let sizeInKb = item.fileMetadata.size / 1024;

        return sizeInKb >= 1024 ? `${Math.round((sizeInKb / 1024))} MB` : `${Math.round(sizeInKb)} KB`;
    }
}

export const IncomingDocumentsUI = withRouter(withDataServiceProvider(withAsyncFrame(IncomingDocumentsUIImpl, false)));
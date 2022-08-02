import { ArrayHelper, ObjectHelper, UrlHelper } from "Cnsys.Core";
import { AsyncUIProps, BaseRouteProps, BaseRoutePropsExt, withAsyncFrame, withRouter } from "Cnsys.UI.React";
import { DocumentType, EPZEUBaseComponent, IDataServiceProviderProps, Nomenclatures, Registers, withDataServiceProvider } from "EPZEU.Core";
import { ApplicationsService, OutgoingDocument, Constants, downloadDocumentEvent } from "EPZEU.CR.Core";
import { observable, runInAction } from 'mobx';
import { observer } from "mobx-react";
import * as React from "react";

interface OutgoingDocumentsUIProps extends BaseRouteProps<any>, AsyncUIProps, BaseRoutePropsExt, IDataServiceProviderProps {
}

@observer class OutgoingDocumentsUIImpl extends EPZEUBaseComponent<OutgoingDocumentsUIProps, any> {
    private incomingNumber: string;
    private outgoingDocGUID: string;
    private docTypesNom: DocumentType[];
    @observable private dataNotFound: boolean;
    @observable private Data: OutgoingDocument[];

    constructor(props: OutgoingDocumentsUIProps) {
        super(props);

        //Initialize
        this.dataNotFound = false;
        this.Data = undefined;
        this.docTypesNom = undefined;
        this.incomingNumber = ObjectHelper.isStringNullOrEmpty(this.props.location.search) ? undefined : UrlHelper.getUrlParameter('incomingNumber');
        this.outgoingDocGUID = ObjectHelper.isStringNullOrEmpty(this.props.location.search) ? undefined : UrlHelper.getUrlParameter('outgoingDocGUID');

        //Bind
        this.loadData = this.loadData.bind(this);
        this.BuildDocSize = this.BuildDocSize.bind(this);
        this.collapseRow = this.collapseRow.bind(this);

        if (ObjectHelper.isStringNullOrEmpty(this.incomingNumber)) {
            this.dataNotFound = true;
        } else {
            this.props.registerAsyncOperation(this.loadData());
        }
    }

    render(): JSX.Element {
        let that = this;

        if (!this.Data) {
            if (this.dataNotFound) {
                return (<div className="alert alert-info">{this.getResource('GL_NOT_FOUND_RESULTS_E')}</div>);
            }

            return null;
        }

        return (
            <div className="main-wrapper section-wrapper section-wrapper--margins fixed-content-width">
                <div className="page-wrapper">
                    <div className="section-wrapper">
                        <div className="table-responsive-block">
                            <table className="table table-borderless table-striped table-hover table-collapsible">
                                <thead>
                                    <tr>
                                        <th className="single-icon-td"></th>
                                        <th></th>
                                        <th>{this.getResource('GL_OUTGOING_NO_L')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.Data.map((item: OutgoingDocument, idx: number) => {
                                        let docType = ArrayHelper.queryable.from(that.docTypesNom).singleOrDefault(n => n.documentTypeID == item.documentTypeID);

                                        return (
                                            <React.Fragment key={idx}>
                                                <tr className={`${idx % 2 == 0 ? "odd-color" : "even-color"}`}>
                                                    <td className="toggle-collapse">
                                                        <button className="system-button collapsed" data-collapsable-content={idx} onClick={this.collapseRow}>
                                                            <i className="ui-icon ui-icon-chevron-right"></i>
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <p className="field-text">
                                                            <i className="ui-icon ui-icon-download-color mr-1"></i>
                                                            <a href={UrlHelper.generateLinkUrl(`~${Constants.PATHS.DOCUMENT_ACCESS.replace(":guid", item.guidWithCtx)}`)}
                                                                onClick={(event) => downloadDocumentEvent(event, item.guidWithCtx)}>
                                                                {docType.name}
                                                            </a>
                                                        </p>
                                                    </td>
                                                    <td>
                                                        <span className="field-title field-title--preview d-sm-none">{this.getResource('GL_OUTGOING_NO_L')}</span>
                                                        <p className="field-text">{item.outgoingNumber}</p>
                                                    </td>
                                                </tr>
                                                <tr className="collapsible-row">
                                                    <td colSpan={3}>
                                                        <div id={`collapsable-content-${idx}`} className="collapse">
                                                            <div className="collapsible-row-content">
                                                                <p className="field-text">
                                                                    <span className="text-muted">{`${this.getResource('GL_DOCUMENT_SIZE_L')}: ${this.BuildDocSize(item)}`}</span><br />
                                                                    <span className="text-muted">{(item.fileMetadata && item.fileMetadata.numberOfPages > 0) ? `${this.getResource('GL_COUNT_PAGES_L')}: ${item.fileMetadata.numberOfPages.toString()}` : null}</span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </React.Fragment>);
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>);
    }


    private loadData(): Promise<void> {
        let that = this;
        let dataSrv = this.props.dataSrvProvider.getDataService<ApplicationsService>(ApplicationsService);

        return Nomenclatures.getDocumentTypes(Registers.CR).then(nom => {
            that.docTypesNom = nom;

            return dataSrv.getOutgoingDocuments(this.incomingNumber, this.outgoingDocGUID).then(outgoingDocs => {
                runInAction(() => {
                    if (outgoingDocs && outgoingDocs.length > 0) {
                        that.Data = outgoingDocs;
                        that.dataNotFound = false;
                    } else {
                        that.Data = undefined;
                        that.dataNotFound = true;
                    }
                });
            });
        });
    }

    private BuildDocSize(item: OutgoingDocument): string {
        let sizeInKb = item.fileMetadata.size / 1024;

        return sizeInKb >= 1024 ? `${Math.round((sizeInKb / 1024))} MB` : `${Math.round(sizeInKb)} KB`;
    }

    collapseRow(e: any): void {
        let collapsableContentIdx = e.currentTarget.getAttribute('data-collapsable-content');
        let triger = $(e.currentTarget);

        if (triger.data('clicked')) {
            // Previously clicked, stop actions
            e.preventDefault();
            e.stopPropagation();
        } else {
            // Mark to ignore next click
            triger.data('clicked', true);

            //code
            triger.toggleClass('collapsed');
            $(`#collapsable-content-${collapsableContentIdx}`).slideToggle();

            // Unmark after 1 second
            window.setTimeout(function () {
                triger.removeData('clicked');
            }, 1000);
        }
    }
}

export const OutgoingDocumentsUI = withRouter(withDataServiceProvider(withAsyncFrame(OutgoingDocumentsUIImpl, true, true)));
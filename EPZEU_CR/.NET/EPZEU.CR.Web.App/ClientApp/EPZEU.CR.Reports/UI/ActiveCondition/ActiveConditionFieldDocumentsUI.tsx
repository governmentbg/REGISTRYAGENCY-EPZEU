import * as React from "react";
import { AsyncUIProps, BaseProps, withAsyncFrame, RawHTML } from "Cnsys.UI.React";
import { action, observable, runInAction } from 'mobx';
import { observer } from "mobx-react";
import { SubUICTypes, Constants, ApplicationDocumentInfo, downloadDocumentEvent } from "EPZEU.CR.Core";
import { EPZEUBaseComponent, IDataServiceProviderProps, withDataServiceProvider, moduleContext } from "EPZEU.Core";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { DeedsDataService } from "../../Services/DeedsDataService";
import { Moment } from "moment";
import { UrlHelper, ObjectHelper } from "Cnsys.Core";

interface ActiveConditionFieldDocumentsUIProps extends BaseProps {
    uic: string;
    subUICType: SubUICTypes;
    subUIC: string;
    fieldIdent: string;
    entryDate?: Moment;
}

@observer export class ActiveConditionFieldDocumentsUI extends EPZEUBaseComponent<ActiveConditionFieldDocumentsUIProps, any> {
    @observable private showModal: boolean;
    @observable private data: ApplicationDocumentInfo[];

    constructor(props: ActiveConditionFieldDocumentsUIProps, context: any) {
        super(props, context);

        //Bind
        this.showDocumentsModal = this.showDocumentsModal.bind(this);
        this.dataLoaded = this.dataLoaded.bind(this);
        this.closeModal = this.closeModal.bind(this);

        //Init
        this.showModal = false;
        this.data = undefined;
    }

    render(): JSX.Element {
        return (
            <>
                <button className="btn btn-secondary" title={this.getResource('GL_DOCUMENTS_L')} onClick={this.showDocumentsModal}>
                    <i className="ui-icon ui-icon-document" aria-hidden="true"></i>
                </button>

                <Modal centered={true} backdrop={true} autoFocus={true} isOpen={this.showModal} onExit={this.closeModal} zIndex={2000} toggle={this.closeModal}>
                    <ModalHeader toggle={this.closeModal}>
                        {this.getResource('GL_DOCUMENTS_L')}
                    </ModalHeader>
                    <ModalBody>
                        <DocumentResultUI data={this.data} {...this.props} onDataLoaded={this.dataLoaded} />
                    </ModalBody>
                    <ModalFooter>
                        <div className="button-bar">
                            <div className="left-side">&nbsp;</div>
                            <div className="right-side">
                                <button type="button" className="btn btn-secondary" onClick={this.closeModal} data-dismiss="modal">{this.getResource('GL_CLOSE_L')}</button>
                            </div>
                        </div>
                    </ModalFooter>
                </Modal>
            </>
        );
    }

    @action closeModal() {
        this.showModal = false;
    }

    @action showDocumentsModal(e: any): void {
        this.showModal = true;
    }

    @action dataLoaded(data: ApplicationDocumentInfo[]): void {
        this.data = data;
    }
}

interface DocumentResultUIProps extends ActiveConditionFieldDocumentsUIProps, AsyncUIProps, IDataServiceProviderProps {
    data: ApplicationDocumentInfo[],
    onDataLoaded: (data: ApplicationDocumentInfo[]) => void;
}

class DocumentResultUIImpl extends EPZEUBaseComponent<DocumentResultUIProps, any> {
    constructor(props: DocumentResultUIProps, context: any) {
        super(props, context);

        //Bind
        this.loadData = this.loadData.bind(this);

        this.loadData();
    }

    render(): JSX.Element {
        if (!this.props.data || this.props.data.length == 0) return null;

        return (
            <div className="table-responsive-block">
                <table className="table table-borderless table-striped table-hover table-collapsible">
                    <thead className="thead-invisible">
                        <tr>
                            <th className="single-icon-td"></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.data.map((document: any, idx: number) => {
                            return (<DocumentRowUI key={idx} data={document} isOdd={idx % 2 == 0 ? false : true} />);
                        })}
                    </tbody>
                </table>
            </div>);
    }

    loadData(): void {
        if (this.props.data && this.props.data.length > 0)
            return;

        let that = this;
        let reportsDataService: DeedsDataService = (this.props.dataSrvProvider.getDataService(DeedsDataService) as DeedsDataService);

        this.props.registerAsyncOperation(reportsDataService.getDocuments(this.props.uic, this.props.subUICType, this.props.subUIC, this.props.fieldIdent, this.props.entryDate).then(docs => {
                if (that.props.onDataLoaded)
                    that.props.onDataLoaded(docs);
            })
        );
    }
}

const DocumentResultUI = withDataServiceProvider(withAsyncFrame(DocumentResultUIImpl, true, true));

const DocumentRowUI = (props: any) => {
    let onSlide = function (e: any): void {
        let triger = $(e.currentTarget).find('button');
        let collapsibleCnt = $(`#collapsable-content-${props.data.guid}`);

        collapsibleCnt.slideToggle('fast');
        triger.toggleClass("collapsed");
    }

    let docSizeText: string = props.data.fileMetadata.size ? `${(props.data.fileMetadata.size / (1024 * 1024)).toFixed(2)} MB` : "";

    return (
        <>
            <tr className={props.isOdd ? "odd-color" : "even-color"}>
                <td className="toggle-collapse" onClick={onSlide}>
                    <button className="system-button collapsed" data-toggle="collapse" data-target="#collapsable-content-1" aria-expanded="false">
                        <i className="ui-icon ui-icon-chevron-right" aria-hidden="true"></i>
                    </button>
                </td>
                <td>
                    <p className="field-text">
                        <i className="ui-icon ui-icon-download-color mr-1"></i>
                        <a href={UrlHelper.generateLinkUrl(`~${Constants.PATHS.DOCUMENT_ACCESS.replace(":guid", props.data.guidWithCtx)}`)}
                            onClick={(event) => downloadDocumentEvent(event, props.data.guidWithCtx)}>
                            {ObjectHelper.isStringNullOrEmpty(props.data.description) ? props.data.fileMetadata.fileName : props.data.description}
                        </a>
                    </p>
                </td>
            </tr>
            <tr className="collapsible-row">
                <td colSpan={2}>
                    <div id={`collapsable-content-${props.data.guid}`} className="collapse">
                        <div className="collapsible-row-content">
                            <p className="field-text">
                                {props.data.isOriginal === true ?
                                    <>
                                        <span className="text-muted">{moduleContext.resourceManager.getResourceByKey('GL_DOCUMENT_ORIGINAL_L')}</span>
                                        <br />
                                    </>
                                    :
                                    null}
                                <span className="text-muted">{`${moduleContext.resourceManager.getResourceByKey('GL_DOCUMENT_SIZE_L')}: ${docSizeText}`}</span>
                                {props.data.fileMetadata && props.data.fileMetadata.numberOfPages && props.data.fileMetadata.numberOfPages > 0 ? 
                                    <><br /><span className="text-muted">{`${moduleContext.resourceManager.getResourceByKey('GL_COUNT_PAGES_L')}: ${props.data.fileMetadata.numberOfPages}`}</span></>
                                    : null}
                                {ObjectHelper.isStringNullOrEmpty(props.data.description) || props.data.description == props.data.fileMetadata.fileName ? null : <><br />{props.data.description}</>}
                            </p>
                        </div>
                    </div>
                </td>
            </tr>
        </>);
}
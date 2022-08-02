import * as React from "react";
import { observer } from "mobx-react";
import { observable, runInAction, action } from 'mobx';
import { EPZEUBaseComponent, IDataServiceProviderProps, withDataServiceProvider } from "EPZEU.Core";
import { withAsyncFrame, AsyncUIProps, BaseRouteProps, BaseRoutePropsExt, withRouter, RawHTML } from "Cnsys.UI.React";
import { InstructionDataService } from "../Services/InstructionDataService";
import { InstructionSearchCriteria } from "../Models/InstructionSearchCriteria";
import { InstructionSearchMode } from "../Models/Enums";
import { InstructionDownloadItem } from "../Models/InstructionDownloadItem";
import { InstructionDownloadResult } from "../Models/InstructionDownloadResult";
import { ObjectHelper, UrlHelper } from "Cnsys.Core";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

interface InstructionsUIProps extends BaseRouteProps<any>, AsyncUIProps, BaseRoutePropsExt, IDataServiceProviderProps {
}

@observer class InstructionsUIImpl extends EPZEUBaseComponent<InstructionsUIProps, InstructionDownloadResult> {
    private incomingNumber: string;
    @observable private dataNotFound: boolean;
    @observable private showModal: boolean;
    @observable private modalBody: any;

    constructor(props: InstructionsUIProps) {
        super(props);

        //Initialize
        this.incomingNumber = undefined;
        this.dataNotFound = false;
        this.showModal = false;
        this.modalBody = undefined;
        this.incomingNumber = ObjectHelper.isStringNullOrEmpty(this.props.location.search) ? undefined : UrlHelper.getUrlParameter('incomingNumber');

        //Bind
        this.loadData = this.loadData.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.showInstructionReson = this.showInstructionReson.bind(this);

        if (ObjectHelper.isStringNullOrEmpty(this.incomingNumber)) {
            this.dataNotFound = true;
        } else {
            this.props.registerAsyncOperation(this.loadData());
        }
    }

    render(): JSX.Element {
        if (!this.model || !this.model.items || this.model.items.length == 0) {
            if (this.dataNotFound) {
                return (<div className="alert alert-info">{this.getResource('GL_NOT_FOUND_RESULTS_E')}</div>);
            }

            return null;
        }

        return (
            <div className="main-wrapper section-wrapper section-wrapper--margins fixed-content-width">
                <div className="page-wrapper">
                    <div className="section-wrapper">
                        <div className="row">
                            <div className="form-group col-12">
                                <label className="field-title field-title--form">{this.getResource('CR_APP_APPLICATION_NUMBER_WITH_INSTRUCTIONS_L')}</label>
                                <p className="field-text">{this.incomingNumber}</p>
                            </div>
                        </div>
                        <div className="table-responsive-block">
                            <table className="table table-borderless table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th className="text-right">{this.getResource('GL_MOTIVES_L')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.model.items.map((item: InstructionDownloadItem, idx: number) => {
                                        return (
                                            <tr key={idx}>
                                                <td>
                                                    <p className="field-text" dangerouslySetInnerHTML={{ __html: item.downloadLink }}></p>
                                                </td>
                                                <td className="buttons-td">
                                                    <button className="btn btn-secondary" title={this.getResource('GL_MOTIVES_L')} onClick={this.showInstructionReson} data-item-idx={idx}>
                                                        <i className="ui-icon ui-icon-info" aria-hidden="true"></i>
                                                    </button>
                                                </td>
                                            </tr>);
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <Modal centered={true} backdrop={true} autoFocus={true} isOpen={this.showModal} onExit={this.closeModal} zIndex={2000} toggle={this.closeModal}>
                            <ModalHeader toggle={this.closeModal}>
                                {this.getResource('GL_MOTIVES_L')}
                            </ModalHeader>
                            <ModalBody>
                                {this.modalBody}
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
                    </div>
                </div>
            </div>);
    }

    private loadData(): Promise<void> {
        let that = this;
        let dataSrv = this.props.dataSrvProvider.getDataService<InstructionDataService>(InstructionDataService);
        let criteria = new InstructionSearchCriteria();
        criteria.incomingNumber = this.incomingNumber;
        criteria.mode = InstructionSearchMode.ByIncomingNumber;
        criteria.page = 1;
        criteria.pageSize = 2147483647;

        return dataSrv.getApplicationInstructions(criteria).then(res => {
            runInAction(() => {
                if (res && res.length > 0) {
                    that.model = new InstructionDownloadResult();
                    that.model.items = res;
                    that.dataNotFound = false;
                } else {
                    that.model = undefined;
                    that.dataNotFound = true;
                }
            });
        });
    }

    @action private closeModal() {
        this.showModal = false;
        this.modalBody = undefined;
    }

    @action private showInstructionReson(e: any): void {
        let itemIdx = Number(e.currentTarget.getAttribute('data-item-idx'));
        let htmlInstructionReson = this.model.items[itemIdx].instructionReason;

        this.showModal = true;
        this.modalBody = <RawHTML rawHtmlText={htmlInstructionReson} />;
    }
}

export const InstructionsUI = withRouter(withDataServiceProvider(withAsyncFrame(InstructionsUIImpl, true, true)));
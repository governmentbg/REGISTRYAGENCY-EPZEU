import { BindableReference, ObjectHelper, SelectListItem, TypeSystem } from "Cnsys.Core";
import { BaseProps } from "Cnsys.UI.React";
import { EPZEUBaseComponent, attributesClassFormControl, Period, attributesClassFormControlMaxL14, ValidationSummary, ValidationSummaryStrategy } from "EPZEU.Core";
import { ApplicationStatuses, DocumentsWithoutDeedSearchCriteria } from "EPZEU.CR.Core";
import { action } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";

interface DocumentsWithoutDeedSearchUIProps extends BaseProps {
    onSearchCallback: () => void;
}

const valSummaryPropNames = ["", "DocumentsWithoutDeedSearchCriteria."];

@observer export class DocumentsWithoutDeedSearchUI extends EPZEUBaseComponent<DocumentsWithoutDeedSearchUIProps, DocumentsWithoutDeedSearchCriteria> {
    private searchButton: HTMLButtonElement = null;
    private cmpUniqueId: string;


    constructor(props: DocumentsWithoutDeedSearchUIProps) {
        super(props)

        this.searchButton = null;
        this.cmpUniqueId = ObjectHelper.newGuid();

        this.onSearch = this.onSearch.bind(this);
        this.onClear = this.onClear.bind(this);
        this.documentKeyPress = this.documentKeyPress.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.onCollapseCriteria = this.onCollapseCriteria.bind(this);
        this.filterEnumValues = this.filterEnumValues.bind(this);
        this.getLabel = this.getLabel.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keypress', this.documentKeyPress, true);
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.documentKeyPress, true);
    }

    render(): JSX.Element {
        return (
            <>
                <div className="search-box search-box--report">
                    <div className="card card--search card--collapsible">
                        <div id={`colapsable-triger-${this.cmpUniqueId}`} className="card-header">
                            <h3>{this.getResource('GL_SEARCHING_L')}</h3>
                            <button className="system-button toggle-collapse" onClick={() => { this.onCollapseCriteria(`collapsable-content-${this.cmpUniqueId}`) }}>
                                <i className="ui-icon ui-icon-chevron-up" aria-hidden="true"></i>
                            </button>
                        </div>
                        <div id={`collapsable-content-${this.cmpUniqueId}`} className="collapse" style={{ display: 'block' }}>
                            <div className="card-body">
                                <ValidationSummary {...this.props} propNames={valSummaryPropNames} strategy={ValidationSummaryStrategy.excludeAllExcept} includeErrorsRecursive={true} />
                                <div className="row">
                                    <div className="form-group col-lg-8">
                                        {this.labelFor(m => m.status, "GL_RESULT_L")}
                                        {this.dropDownListFor(m => m.status,
                                            this.filterEnumValues(ApplicationStatuses, +ApplicationStatuses.SentToCourt.toString(), +ApplicationStatuses.Instruction.toString(), +ApplicationStatuses.DeleteReservationCompany.toString()),
                                            attributesClassFormControl, null)}
                                    </div>
                                    <div className="form-group col-sm-6 col-lg-4">
                                        {this.labelFor(m => m.incomingNumber, "GL_INCOMING_NO_L")}
                                        {this.textBoxFor(m => m.incomingNumber, attributesClassFormControlMaxL14)}
                                    </div>
                                    <div className="form-group col-12">
                                        {this.labelFor(m => m.companyName, "CR_GL_COMPANY_NAME_L")}
                                        {this.textBoxFor(m => m.companyName)}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <label>{this.getResource('GL_PERIOD_L')}</label>
                                    </div>
                                </div>
                                <Period
                                    modelReferenceOfFirstDate={new BindableReference(this.model, 'dateFrom', this.props.modelReference.getValidators())}
                                    modelReferenceOfSecondDate={new BindableReference(this.model, 'dateTo', this.props.modelReference.getValidators())}
                                />
                            </div>
                            <div className="card-footer">
                                <div className="button-bar">
                                    <div className="left-side">
                                        <button type="button" onClick={this.onClear} className="btn btn-secondary">{this.getResource("GL_CLEAR_L")}</button>
                                    </div>
                                    <div className="right-side">
                                        <button type="button" ref={(btn: HTMLButtonElement) => { this.searchButton = btn; }} onClick={this.onSearch} className="btn btn-primary"><i className="ui-icon ui-icon-search ci-btn mr-1"></i>{this.getResource("GL_SEARCH_L")}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>);
    }

    @action onClear(): void {
        this.model.dateFrom = undefined;
        this.model.dateTo = undefined;
        this.model.companyName = undefined;
        this.model.incomingNumber = undefined;
        this.model.status = undefined;
        this.model.clearErrors();
    }

    private onSearch(): void {
        if (this.props.onSearchCallback) {
            this.props.onSearchCallback();
        }
    }

    private onCollapseCriteria(targetId: string): void {
        let triger = $(`#colapsable-triger-${this.cmpUniqueId}`);
        triger.toggleClass('collapsed');

        $('#' + targetId).slideToggle();
    }

    private documentKeyPress(e: any): void {
        if (e.keyCode === 13) {
            this.searchButton.click();
        }
    }

    private filterEnumValues(object: any, from: number, to: number, addition: number): SelectListItem[] {
        var enumValues = TypeSystem.getEnumValues(object);
        let selectListItems = new Array<SelectListItem>();
        for (let enumValue of enumValues) {
            if ((+enumValue >= from
                && +enumValue <= to)
                || +enumValue == addition) {
                let item = new SelectListItem();
                item.text = this.getResource(this.getLabel(enumValue))
                item.selected = this.model.status && this.model.status == Number(enumValue);
                item.value = enumValue;
                selectListItems.push(item)
            }
        }
        selectListItems = selectListItems.sort(function (a, b) {
            if (a.text < b.text) { return -1; }
            if (a.text > b.text) { return 1; }
            return 0;
        });

        //Добавя на първо място празен елемент "Избери".
        let emptyItem = new SelectListItem();
        emptyItem.text = this.getResource('GL_CHOICE_L');
        emptyItem.selected = ObjectHelper.isNullOrUndefined(this.model.status) ? true : false;
        emptyItem.value = '';

        selectListItems.splice(0, 0, emptyItem);

        return selectListItems;
    }

    private getLabel(applicationStatusParam: string): string {

        let status: ApplicationStatuses = ObjectHelper.toEnum(ApplicationStatuses, ApplicationStatuses[+applicationStatusParam]);

        switch (status) {
            /**Изпратена до съда*/
            case ApplicationStatuses.SentToCourt:
                return "GL_SEND_COURT_L";

            /**Изчаква акт на съда*/
            case ApplicationStatuses.WaitingCourtAct:
                return "GL_AWAITING_ACT_COURT_L";

            /**Изчаква 14 дневен срок*/
            case ApplicationStatuses.Waiting14Days:
                return "GL_AWAITING_14_DAY_DEADLINE_L";

            /**Не вписва*/
            case ApplicationStatuses.NotEntered:
                return "GL_NOT_RECORD_L";

            /**Обработва се*/
            case ApplicationStatuses.Processing:
                return "GL_PROCESSED_L";

            /**Отказ*/
            case ApplicationStatuses.Refusal:
                return "GL_REJECTION_L";

            /**Прекратяване на рег. производство*/
            case ApplicationStatuses.TerminationOfRegProcedure:
                return "GL_CANCEL_REG_PROCESS_L";

            /**Поискано УАС от съда*/
            case ApplicationStatuses.RequestedCSCFromTheCourt:
                return "GL_REQUEST_UAC_COURT_L";

            /**Спиране на рег. производство*/
            case ApplicationStatuses.StopProceeding:
                return "GL_STOP_REG_PROCESS_L";

            /**Възобновяване на рег. производство*/
            case ApplicationStatuses.ResumeProceeding:
                return "GL_RESUMPTION_REG_PROCESS_L";

            /**Не запазва*/
            case ApplicationStatuses.NotReserved:
                return "GL_NOT_SAVE_L";

            /**Изчакване на 3-дневен срок*/
            case ApplicationStatuses.WaitingFor3DaysTerm:
                return "GL_AWAITING_3_DAY_DEADLINE_L";

            /**Изчаква обработка на предходно заявление*/
            case ApplicationStatuses.WaitingForProcessingPreviousApplication:
                return "GL_AWAITING_PROCESSING_PREVIOUS_APPLICATION_L";

            /**Указания*/
            case ApplicationStatuses.Instruction:
                return "GL_INSTRUCTIONS_L";

            /**Заличаване на запазването*/
            case ApplicationStatuses.DeleteReservationCompany:
                return "GL_DELETE_RESERVATION_L";
        }
    }
}
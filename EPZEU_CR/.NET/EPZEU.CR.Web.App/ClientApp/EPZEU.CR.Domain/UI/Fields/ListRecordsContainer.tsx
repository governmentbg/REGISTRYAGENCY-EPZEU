import { ErrorHelper, ObjectHelper, TypeSystem } from 'Cnsys.Core';
import { ViewMode } from "Cnsys.UI.React";
import { Button, DisabledContentContext, EPZEUBaseComponent, ValidationSummary, ValidationSummaryErrorsPreviewUI, ValidationSummaryStrategy } from 'EPZEU.Core';
import { action, computed, runInAction } from "mobx";
import { observer } from "mobx-react";
import * as PropTypes from 'prop-types';
import * as React from "react";
import { Fragment } from "react";
import { DomainModelHepler, FieldContainerProps, IApplicationWithFieldsFormManager, isApplicationWithFieldsFormManager, Record, RecordOperations } from '../../';

export interface ListRecordsContainerProps extends FieldContainerProps {
    addButtonLabelKey?: string;
    hasAtLeastOneRecord?: boolean;
    hasOnlyOneRecord?: boolean;
    valSummaryStrategy?: ValidationSummaryStrategy;
    valSummaryRecursive?: boolean;
    valSummaryPropNames?: string[];
    sectionSubTitleTextKey?: string;
    newRecordCtor?: () => Promise<Record>;
}

export function withListRecordsContainer<TComponent extends React.ComponentClass<ListRecordsContainerProps>>(Component: TComponent, modelType: any, props?: ListRecordsContainerProps): TComponent {

    @observer class Wrapper extends EPZEUBaseComponent<ListRecordsContainerProps, any> {

        @computed get listItems(): Record[] {
            return this.model;
        };

        get applicationManager(): IApplicationWithFieldsFormManager {
            if (this.context && this.context.applicationManager && isApplicationWithFieldsFormManager(this.context.applicationManager))
                return this.context.applicationManager;
            else
                return null;
        }

        constructor(props?: ListRecordsContainerProps) {
            super(props);

            this.addRecord = this.addRecord.bind(this);
            this.deleteRecord = this.deleteRecord.bind(this);
            this.componentDidMount = this.componentDidMount.bind(this);
            this.componentDidUpdate = this.componentDidUpdate.bind(this);
            this.disabledAllFields = this.disabledAllFields.bind(this);
        }

        componentDidMount(): void {
            this.disabledAllFields();
        }

        componentDidUpdate(prevProps: ListRecordsContainerProps): void {
            this.disabledAllFields();
        }

        //#region Renders

        renderEdit(): JSX.Element[] {
            var renderItems: any[] = [];
            var listProps = { ...props, ...this.props };

            if (this.listItems && this.listItems.length > 0) {
                for (var i = 0; i < this.listItems.length; i++) {
                    this.renderRecordEdit(renderItems, this.listItems[i], i);
                }
            }

            if (listProps.hasOnlyOneRecord != true) {
                renderItems.push(
                    <div className="row" key={"addButton"}>
                        <div className="form-group col">
                            <hr />
                            <Button className="btn btn-outline-light text-dark" onClick={this.addRecord} lableTextKey={listProps.addButtonLabelKey}><i className="ui-icon ui-icon-plus mr-1" aria-hidden="true"></i></Button>
                        </div>
                    </div>);
            }

            return renderItems;
        }

        renderDisplay() {
            var renderItems: any[] = [];

            if (this.listItems && this.listItems.length > 0) {
                for (var i = 0; i < this.listItems.length; i++) {
                    this.renderRecordDisplay(renderItems, this.listItems[i], i);
                }
            }

            return renderItems;
        }

        renderRecordEdit(uiElements: JSX.Element[], record: Record, index: number) {
            /** тук има особеност, че при изтриване на елемент, който е по средата на списъка, трябва да се преизчертаят всичките компоненти преди него заради достъпа през BindableReference */
            var recordProps = this.bindArrayElement(m => m[index], [index]);
            var allProps = { ...props, ...this.props, ...recordProps }

            var isRecordNew = DomainModelHepler.isRecordNew(record);

            uiElements.push(
                <Fragment key={record.recordID}>
                    {index > 0 ? <hr className="hr--doted-line" /> : null}
                    <ValidationSummary key={record.recordID + "_vs"} {...recordProps} propNames={allProps.valSummaryPropNames} strategy={allProps.valSummaryStrategy || ValidationSummaryStrategy.includeOnlyModelErrors} includeErrorsRecursive={allProps.valSummaryRecursive} />
                    <div id={record.recordID} className={`interactive-container interactive-container--form ${record.recordOperation == RecordOperations.Erase ? "interactive-container--selected" : null}`}>                 
                        {record.recordOperation == RecordOperations.Erase ? <div className="interactive-container__erasure ui-icon"> </div> : null}
                        <div className="interactive-container__content record-container" id={"record_data_" + record.recordID}>
                            {record.recordOperation == RecordOperations.Erase ? <> <div className="erasure-text">{this.getResource("CR_APP_DELETED_FIELD_I")}</div> </> : null}
                            {isRecordNew ?
                                <Component {...allProps} addButtonLabelKey={this.props.addButtonLabelKey} /> :
                                <DisabledContentContext.Provider value={!isRecordNew}>
                                    <Component {...allProps} addButtonLabelKey={this.props.addButtonLabelKey} />
                                </DisabledContentContext.Provider>
                            }

                        </div>
                        {isRecordNew ?
                            <div className="interactive-container__controls">
                                <Button titlekey="GL_RETURN_ORIGINAL_L" className="btn btn-outline-light btn-sm" onMouseOver={() => this.onHover(record)} onMouseLeave={() => this.onHoverLeave(record)} onClick={() => this.undoRecord(record)}><i className="ui-icon ui-icon-redo" aria-hidden="true"></i></Button>

                                {
                                    /*възможно е някое поле да се държи като списъчно или не в зависимост от друго (702 в V21). Ако е избрана опцията, когато е списъчно и са въведени няколко,
                                     а после е избрана другата опция, когато не е списъчно, то трябва да излиза валидация, да се скрива "добави", и всеки запис да има "Изтрий". Затова
                                     тук правим тази проверка (this.props.hasOnlyOneRecord && this.listItems.length == 1)*/
                                    (((this.props.hasAtLeastOneRecord || props.hasAtLeastOneRecord) && this.listItems.length == 1) || (this.props.hasOnlyOneRecord && this.listItems.length == 1)) ?
                                        null :
                                        <Button titlekey="GL_DELETE_L" className="btn btn-outline-light btn-sm" onClick={() => this.deleteRecord(record)} onMouseOver={() => this.onHover(record)} onMouseLeave={() => this.onHoverLeave(record)}><i className="ui-icon ui-icon-times" aria-hidden="true"></i></Button>
                                }
                            </div> :
                            <div className="interactive-container__controls">
                                {record.recordOperation == RecordOperations.Erase ?
                                    <Button titlekey="GL_REJECT_DELETE_L" className="btn btn-outline-light btn-sm" onClick={() => this.unMarkRecordForErase(record)} onMouseOver={() => this.onHover(record)} onMouseLeave={() => this.onHoverLeave(record)} ><i className="ui-icon ui-icon-erasure-uncheck" aria-hidden="true"></i></Button> :
                                    <Button titlekey="GL_EFFACEMENT_L" className="btn btn-outline-light btn-sm" onClick={() => this.markRecordForErase(record)} onMouseOver={() => this.onHover(record)} onMouseLeave={() => this.onHoverLeave(record)}><i className="ui-icon ui-icon-erasure-check" aria-hidden="true" ></i></Button>}
                            </div>}
                    </div>

                </Fragment>
            );
        }

        renderRecordDisplay(uiElements: JSX.Element[], record: Record, index: number) {
            var errors = ErrorHelper.getErrorsRecursive(record);

            //Проверката за грешки се прави, за да се обработят случаите, в които имаме свързана валидация межу полета.
            if ((!errors || errors.length == 0) && record.recordOperation == RecordOperations.Current) {
                return;
            }

            var recordProps = this.bindArrayElement(m => m[index], [index]);
            var allProps = { ...props, ...this.props, ...recordProps }

            uiElements.push(
                <Fragment key={record.recordID}>
                    {record.recordOperation == RecordOperations.Erase ?
                        (<>
                            {uiElements.length > 0 ? <hr key={index} className="hr--preview" /> : null}
                            <div className="record-container record-container--preview">
                                <div className="field-text erased field-text--erased">
                                    <Component {...allProps}></Component>
                                </div>
                                <ValidationSummaryErrorsPreviewUI errors={errors && errors.map(e => e.error)} />
                                <div className="erasure-text-inline">
                                    <i className="ui-icon ui-icon-erased"></i> {this.getResource("CR_GL_DELETED_CIRCUMSTANCE_E")}
                                </div>
                            </div></>) : record.recordOperation == RecordOperations.Add || (errors && errors.length > 0) ?
                            (
                                <>
                                    {record.recordOperation == RecordOperations.Current && DomainModelHepler.isRecordNew(record) ?
                                        null :
                                        <>
                                            {uiElements.length > 0 ? <hr key={index} className="hr--preview" /> : null}
                                            <div className="record-container record-container--preview">
                                                <div className="field-text">
                                                    <Component {...allProps}></Component>
                                                </div></div>
                                        </>
                                    }
                                    <ValidationSummaryErrorsPreviewUI errors={errors && errors.map(e => e.error)} />
                                </>)
                            : null
                    }
                </Fragment>);
        }

        //#endregion

        //#region Events

        @action private addRecord() {
            var newRecordPromise: Promise<Record>;

            var newRecordCtor = props && props.newRecordCtor ? props.newRecordCtor : this.props.newRecordCtor

            if (newRecordCtor) {
                //TODO: Motovski Да се прегледа дали е ОК (TRIR-2676)
                newRecordPromise = newRecordCtor().then(rec => {
                    rec.initialState = JSON.parse(JSON.stringify(rec));
                    return rec;
                });
            }
            else {
                var typeInfo = TypeSystem.getTypeInfo(modelType);

                newRecordPromise = Promise.resolve(new typeInfo.ctor());
            }

            newRecordPromise.bind(this).then(newRecord => {
                runInAction(() => {
                    newRecord.recordOperation = RecordOperations.Add;
                    newRecord.recordID = ObjectHelper.newGuid();

                    this.listItems.push(newRecord);
                });
            });
        }

        @action private undoRecord(rec: Record) {
            if (rec.initialState) {
                this.applicationManager.returnRecordToInititialState(rec);
            }
            else {
                var newRecordPromise: Promise<Record>;

                if (this.props.newRecordCtor) {
                    //TODO: Motovski Да се прегледа дали е ОК (TRIR-2676)
                    newRecordPromise = this.props.newRecordCtor().then(rec => {
                        rec.initialState = JSON.parse(JSON.stringify(rec));
                        return rec;
                    });
                } else {
                    var typeInfo = TypeSystem.getTypeInfo(modelType);

                    newRecordPromise = Promise.resolve(new typeInfo.ctor());
                }

                newRecordPromise.bind(this).then(newRecord => {
                    runInAction(() => {
                        var recordID = rec.recordID;

                        rec.copyFrom(JSON.parse(JSON.stringify(newRecord)));
                        rec.recordOperation = RecordOperations.Add;
                        rec.recordID = recordID;
                        rec.clearErrors(true);
                    });
                });
            }
        }

        @action private deleteRecord(rec: Record) {
            var index = this.listItems.indexOf(rec);
            if (index > -1) {
                this.listItems.splice(index, 1);
            }
        }

        @action private markRecordForErase(rec: Record) {
            rec.recordOperation = RecordOperations.Erase;
        }

        @action private unMarkRecordForErase(rec: Record) {
            rec.recordOperation = RecordOperations.Current;
        }

        @action private onHover(record: Record) {
                $("#" + record.recordID).addClass("interactive-container--focus");
        }

        @action private onHoverLeave(record: Record) {
            $("#" + record.recordID).removeClass("interactive-container--focus");
        }

        //#endregion

        private disabledAllFields(): void {
            if (this.props.viewMode == ViewMode.Edit) {
                this.listItems.forEach((record, idx) => {
                    if (!DomainModelHepler.isRecordNew(record)) {
                        $('div#record_data_' + record.recordID).find('input, textarea, select, button').attr('disabled', 'disabled');
                    }
                });
            }
        }
    };

    (Wrapper as any).displayName = `withListRecordsContainer(${Component.displayName || (Component as any).name || "Component"})`;
    (Wrapper as any).contextTypes = { applicationManager: PropTypes.object };

    return Wrapper as any;
}

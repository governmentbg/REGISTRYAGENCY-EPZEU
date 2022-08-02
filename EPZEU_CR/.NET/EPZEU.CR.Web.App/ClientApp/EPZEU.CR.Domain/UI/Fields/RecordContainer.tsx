﻿import { ErrorHelper } from 'Cnsys.Core';
import { EPZEUBaseComponent, ValidationSummary, ValidationSummaryErrorsPreviewUI, ValidationSummaryStrategy } from "EPZEU.Core";
import { computed } from 'mobx';
import { observer } from "mobx-react";
import * as PropTypes from 'prop-types';
import * as React from "react";
import { DomainModelHepler, IApplicationWithFieldsFormManager, isApplicationWithFieldsFormManager, ProcessStates, Record } from '../../';
import { RecordOperations } from '../../Models/ModelsAutoGenerated';
import { FieldContainerProps } from './';

export interface RecordContainerProps extends FieldContainerProps {
    valSummaryStrategy?: ValidationSummaryStrategy;
    valSummaryRecursive?: boolean;
    valSummaryPropNames?: string[];
    textRecordContainerCss?: string;
    wayOfRepresentationHasTitle?: string;
    cantBeMarkedForErase?: boolean;
}

export function withRecordContainer<TModel extends Record, TComponent extends React.ComponentClass<RecordContainerProps>>(Component: TComponent): TComponent {

    @observer class Wrapper extends EPZEUBaseComponent<RecordContainerProps, TModel> {

        get applicationManager(): IApplicationWithFieldsFormManager {
            if (this.context && this.context.applicationManager && isApplicationWithFieldsFormManager(this.context.applicationManager))
                return this.context.applicationManager;
            else
                return null;
        }

        @computed get listItems(): Record {
            return this.model;
        };

        constructor(props?: RecordContainerProps) {
            super(props);

            this.markRecordForErase = this.markRecordForErase.bind(this);
            this.unMarkRecordForErase = this.unMarkRecordForErase.bind(this);
            this.onHover = this.onHover.bind(this);
            this.onHoverLeave = this.onHoverLeave.bind(this);
            this.undoRecord = this.undoRecord.bind(this);
        }

        renderEdit(): JSX.Element {
            return (
                <>
                    <ValidationSummary {...this.props} propNames={this.props.valSummaryPropNames} strategy={this.props.valSummaryStrategy || ValidationSummaryStrategy.includeOnlyModelErrors} includeErrorsRecursive={this.props.valSummaryRecursive} />
                    <div id={this.model.recordID} className={`interactive-container interactive-container--form ${this.model.recordOperation == RecordOperations.Erase ? "interactive-container--selected" : null}`}>
                        {this.model.recordOperation == RecordOperations.Erase ? <> <div className="interactive-container__erasure ui-icon"></div> </> : null}
                        <div className="interactive-container__content record-container">
                            {this.model.recordOperation == RecordOperations.Erase ? <> <div className="erasure-text">{this.getResource("CR_APP_DELETED_FIELD_I")}</div> </> : null}
                            <Component {...this.props}></Component>
                        </div>


                        <div className="interactive-container__controls">
                            <button title={this.getResource('GL_RETURN_ORIGINAL_L')} className="btn btn-outline-light btn-sm" onClick={this.undoRecord} onMouseOver={this.onHover} onMouseLeave={this.onHoverLeave}><i className="ui-icon ui-icon-redo" aria-hidden="true"></i></button>
                            {
                                this.applicationManager.processState == ProcessStates.ForChange && this.props.cantBeMarkedForErase !== true
                                    ? (this.model.recordOperation == RecordOperations.Erase
                                        ? <button title={this.getResource('GL_REJECT_DELETE_L')} className="btn btn-outline-light btn-sm" onClick={this.unMarkRecordForErase} onMouseOver={this.onHover} onMouseLeave={this.onHoverLeave}><i className="ui-icon ui-icon-erasure-uncheck" aria-hidden="true"></i></button>
                                        : DomainModelHepler.isRecordNew(this.model)
                                            ? null
                                            : <button title={this.getResource('GL_EFFACEMENT_L')} className="btn btn-outline-light btn-sm" onClick={this.markRecordForErase} onMouseOver={this.onHover} onMouseLeave={this.onHoverLeave}><i className="ui-icon ui-icon-erasure-check" aria-hidden="true"></i></button>)
                                    : null
                            }
                        </div>
                    </div>
                </>);
        }

        renderDisplay(): JSX.Element {
            var errors = ErrorHelper.getErrorsRecursive(this.model);
            //Ако полето е в операция Current, по него няма данни и за това не се показва компонентата. Може да има грешки и се показват само те.
            if (this.model.recordOperation == RecordOperations.Erase) {
                return (
                    <div id={this.model.recordID} className="record-container record-container--preview">
                        <div className="field-text erased field-text--erased">
                            <Component {...this.props}></Component>
                        </div>
                        <ValidationSummaryErrorsPreviewUI errors={errors && errors.map(e => e.error)} />
                        <div className="erasure-text-inline">
                            <i className="ui-icon ui-icon-erased"></i> {this.getResource("CR_GL_DELETED_CIRCUMSTANCE_E")}
                        </div>
                    </div>);

            } else if (this.model.recordOperation == RecordOperations.Add) {
                return (
                    <div id={this.model.recordID} className="record-container record-container--preview">
                        <div className="field-text">
                            <Component {...this.props}></Component>
                        </div>
                        <ValidationSummaryErrorsPreviewUI errors={errors && errors.map(e => e.error)} />
                    </div>);

            } else if (this.model.recordOperation == RecordOperations.Current) {
                //Ако полето е в операция Current, по него няма данни и за това не се показва компонентата. Може да има грешки и се показват само те.
                return <ValidationSummaryErrorsPreviewUI errors={errors && errors.map(e => e.error)} />;
            }

            return null;
        }

        //#region Events 

        private markRecordForErase(e: any) {
            this.model.recordOperation = RecordOperations.Erase;
        }

        private unMarkRecordForErase(e: any) {
            this.model.recordOperation = RecordOperations.Current;
        }

        private undoRecord(e: any) {
            this.applicationManager.returnRecordToInititialState(this.model);
        }

        private onHover() {
            $("#" + this.model.recordID).addClass("interactive-container--focus");
        }

        private onHoverLeave() {
            $("#" + this.model.recordID).removeClass("interactive-container--focus");
        }

        //#endregion

    };

    (Wrapper as any).displayName = `withRecordContainer(${Component.displayName || (Component as any).name || "Component"})`;
    (Wrapper as any).contextTypes = { applicationManager: PropTypes.object };

    return Wrapper as any;
}
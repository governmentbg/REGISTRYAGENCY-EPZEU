﻿import { ArrayHelper, ObjectHelper } from 'Cnsys.Core';
import { AsyncUIProps, BaseProps, RawHTML, withAsyncFrame } from "Cnsys.UI.React";
import { EPZEUBaseComponent, IDataServiceProviderProps, withDataServiceProvider } from "EPZEU.Core";
import { SubUICTypes } from "EPZEU.CR.Core";
import * as $ from 'jquery';
import { observer } from "mobx-react";
import { Moment } from "moment";
import * as React from "react";
import { Fragment } from "react";
import { RGroup, RSection, RField } from "../../Models/ModelsAutoGenerated";
import { ActiveConditionFieldHistoryUI } from "./ActiveConditionFieldHistoryUI";
import { ActiveConditionFieldDocumentsUI } from "./ActiveConditionFieldDocumentsUI";

interface ActiveConditionSectionResultUIProps extends BaseProps {
    deedUic: string;
    entryDate: Moment;
}

@observer export class ActiveConditionSectionResultUI extends EPZEUBaseComponent<ActiveConditionSectionResultUIProps, RSection> {
    private collapsableSectionTypes: SubUICTypes[] = [SubUICTypes.B2_Branch, SubUICTypes.B3_Pledge_DD, SubUICTypes.B4_Pledge_TP, SubUICTypes.B5_Distraint_DD, SubUICTypes.B6_Liquidation, SubUICTypes.B7_ActualOwner, SubUICTypes.V1_Transfer, SubUICTypes.V2_Conversion, SubUICTypes.V3_Reorganization_K]

    constructor(props: ActiveConditionSectionResultUIProps) {
        super(props);
    }

    render() {
        let result: any = null;
        let that = this;
        let isCollapsableSection: boolean = ArrayHelper.queryable.from(this.collapsableSectionTypes).count(el => el == this.model.subUICType) > 0;
        //let currSubDeedType: SubUICTypes = SubUICTypes.Undefined;

        if (this.model
            && this.model.subDeeds
            && this.model.subDeeds.length > 0) {

            if (isCollapsableSection || that.model.subUICType == SubUICTypes.Undefined) {
                result = (
                    <>
                        <h2 className="section-title section-title--preview">{this.getResource(this.model.nameCode)}</h2>
                        <ul className="tree-list">
                            {this.model.subDeeds.map((sd, idx) => {
                                let targetId = ObjectHelper.newGuid();
                                let fieldsFromGroups: RField[] = [];

                                if (isCollapsableSection) {
                                    sd.groups.forEach((g: RGroup, i: number) => {
                                        g.fields.forEach((f: RField, j: number) => {
                                            fieldsFromGroups.push(f);
                                        });
                                    });

                                    fieldsFromGroups = fieldsFromGroups.sort((field1: RField, field2: RField) => {
                                        if (field1.order < field2.order)
                                            return -1;
                                        else if (field1.order > field2.order)
                                            return 1;
                                        else
                                            return 0;
                                    });
                                }

                                return (
                                    <li key={`${targetId}`}>
                                        <div id={`colapsable-triger-${targetId}`} className={`tree-list-toggle cursor-pointer ${this.model.subDeeds.length == 1 ? '' : 'collapsed'}`} onClick={(e) => { this.onCollapseCriteria(targetId); }}>
                                            <a href="javascript://" className={`toggle-collapse ${this.model.subDeeds.length == 1 ? '' : 'collapsed'}`} aria-expanded={this.model.subDeeds.length == 1}>
                                                <i className="ui-icon ui-icon-chevron-right" aria-hidden="true"></i>
                                            </a>
                                            <p className="field-text">
                                                <b>{sd.colapsableLinkName}</b>
                                            </p>
                                        </div>
                                        <div id={`collapsable-content-${targetId}`} className={`tree-list-collapsible collapse ${this.model.subDeeds.length == 1 ? 'show' : ''}`}>
                                            {that.model.subUICType === SubUICTypes.Undefined ? /** Праводатели и правоприемници */
                                                <div className="row">
                                                    <div className="col form-group mt-2">
                                                        <div className="field-container">
                                                            {sd.groups.map((gr: RGroup, grIdx: number) => {
                                                                return (
                                                                    <Fragment key={grIdx}>
                                                                        <h4 className="field-subtitle field-subtitle--preview">{that.getResource(gr.nameCode)}</h4>
                                                                        {gr.fields.map((field, fIdx) => {
                                                                            return (
                                                                                <Fragment key={field.fieldIdent}>
                                                                                    <RawHTML rawHtmlText={field.htmlData} />
                                                                                </Fragment>);
                                                                        })}
                                                                    </Fragment>);
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                                :
                                                /** Всички свиващи и разпъващи секции */
                                                <div className="table-responsive-block">
                                                    <table className="table table-borderless table-striped table-hover">
                                                        <thead className="thead-invisible">
                                                            <tr>
                                                                <th className="w-100"></th>
                                                                <th></th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {fieldsFromGroups.map((item: RField, k: number) => {
                                                                return (
                                                                    <tr key={item.fieldIdent}>
                                                                        <td>
                                                                            <div className="field-container">
                                                                                <h3 className="field-title field-title--preview">{that.getResource(item.nameCode)}</h3>
                                                                                <RawHTML rawHtmlText={item.htmlData} />
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <span className="field-title field-title--preview d-sm-none">{that.getResource('GL_APPLICATION_NO_L')}:</span>
                                                                            <div className="field-text">{item.fieldEntryNumber}</div>
                                                                        </td>
                                                                        <td className="buttons-td">
                                                                            <ActiveConditionFieldHistoryUI uic={that.props.deedUic} subUICType={sd.subUICType} subUIC={sd.subUIC} fieldIdent={item.fieldIdent} />
                                                                            <ActiveConditionFieldDocumentsUI uic={that.props.deedUic} subUICType={sd.subUICType} subUIC={sd.subUIC} fieldIdent={item.fieldIdent} entryDate={item.fieldEntryDate} />
                                                                        </td>
                                                                    </tr>);
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            }
                                        </div>
                                    </li>);
                            })}
                        </ul>
                    </>);
            }
            else {
                result = this.model.subDeeds.map((sd, idx) => {
                    return (
                        <Fragment key={idx}>
                            {sd.groups.map((gr: RGroup, grIdx: number) => {
                                return (
                                    <Fragment key={gr.groupID}>
                                        <h2 className="section-title section-title--preview">{that.getResource(gr.nameCode)}</h2>
                                        <div className="table-responsive-block">
                                            <table className="table table-borderless table-striped table-hover">
                                                <thead className="thead-invisible">
                                                    <tr>
                                                        <th className="w-100"></th>
                                                        <th></th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {gr.fields.map((field) => {
                                                        return (<tr key={field.fieldIdent}>
                                                            <td>
                                                                <div className="field-container">
                                                                    <h3 className="field-title field-title--preview">{that.getResource(field.nameCode)}</h3>
                                                                    <RawHTML rawHtmlText={field.htmlData} />
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <span className="field-title field-title--preview d-sm-none">{that.getResource('GL_APPLICATION_NO_L')}:</span>
                                                                <div className="field-text">{field.fieldEntryNumber}</div>
                                                            </td>
                                                            <td className="buttons-td">
                                                                <ActiveConditionFieldHistoryUI uic={that.props.deedUic} subUICType={sd.subUICType} subUIC={sd.subUIC} fieldIdent={field.fieldIdent} />
                                                                <ActiveConditionFieldDocumentsUI uic={that.props.deedUic} subUICType={sd.subUICType} subUIC={sd.subUIC} fieldIdent={field.fieldIdent} entryDate={field.fieldEntryDate} />
                                                            </td>
                                                        </tr>);
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </Fragment>);
                            })}
                        </Fragment>);
                });
            }
        }
        else {
            result = (<div className="alert alert-info">{this.getResource('GL_NO_DATA_FOUND_L')}</div>)
        }

        return (
            <div className="section-wrapper">
                {result}
            </div>);
    }

    private onCollapseCriteria(targetId: string): void {
        let triger = $(`#colapsable-triger-${targetId}`);
        triger.toggleClass('collapsed');

        let trigerLink = triger.find('a');

        if (trigerLink) {
            trigerLink.toggleClass('collapsed');
            trigerLink.attr('aria-expanded', triger.hasClass('collapsed') ? 'false' : 'true')
        }

        let collapsableContent = $(`#collapsable-content-${targetId}`);
        collapsableContent.slideToggle();
        collapsableContent.toggleClass('show');
    }
}
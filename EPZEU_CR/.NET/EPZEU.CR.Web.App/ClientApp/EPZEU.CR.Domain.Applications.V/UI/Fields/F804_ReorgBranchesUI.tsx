﻿import { ArrayHelper, ObjectHelper } from "Cnsys.Core";
import { DropDownList, SelectListItem } from "Cnsys.UI.React";
import { attributesClassFormControlMaxL4, attributesClassFormControlMaxL9, Button, EPZEUBaseComponent, TextBox, ValidationSummary, ValidationSummaryStrategy } from 'EPZEU.Core';
import { Branch, ListRecordsContainerProps, SectionSubTitle, withApplicationFormContext, withFieldSingleListRecordsContainer, Person } from 'EPZEU.CR.Domain';
import { action } from "mobx";
import { observer } from 'mobx-react';
import * as React from "react";
import { IV32FormManager } from '../../Common/V32FormManager';
import { F8040_ReorgBranch } from '../../Models/Fields/ModelsAutoGenerated';

interface F804_ReorgBranchesProps extends ListRecordsContainerProps {
    applicationManager?: IV32FormManager;
}

var attributesClassFormControl = { className: 'form-control' };

@observer class F804_ReorgBranchesUI extends EPZEUBaseComponent<F804_ReorgBranchesProps, F8040_ReorgBranch> {

    constructor(props: F804_ReorgBranchesProps) {
        super(props);
        this.OnSuccessorSelected = this.OnSuccessorSelected.bind(this);
        this.OnBranchSelected = this.OnBranchSelected.bind(this);
        this.OnAddBranch = this.OnAddBranch.bind(this);
        this.OnRemoveBranch = this.OnRemoveBranch.bind(this);
        this.onHover = this.onHover.bind(this);
        this.onHoverLeave = this.onHoverLeave.bind(this);

        if (!this.model.branches)
            this.model.branches = [new Branch()];
    }

    renderEdit(): JSX.Element {
        return (
            <>
                <SectionSubTitle subTitleTextKey={"GL_CR_RECEIVING_COMPANY_L"} />
                <div className="row mt-2">
                    <div className="form-group col-12">
                        {
                            this.dropDownListFor
                                (m => m.branchSubject.name,
                                    this.props.applicationManager.successors.map<SelectListItem>((successor) => { return { text: successor.subject.name, value: successor.subject.name, selected: false } }),
                                    attributesClassFormControl,
                                    this.OnSuccessorSelected,
                                    true,
                                    this.getResource('CR_APP_00036_L'))
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-12">
                        {this.labelFor(m => m.branchSubject, 'GL_COMPANY_L')}
                        {this.textBoxFor(m => m.branchSubject.name)}
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col-sm-6">
                        {this.labelFor(m => m, 'GL_COMPANY_ID_L')}
                        {this.textBoxFor(m => m.branchSubject.indent, attributesClassFormControlMaxL9)}
                    </div>
                </div>
                <SectionSubTitle subTitleTextKey={"CR_GL_BRANCHES_L"} />
                <div className="interactive-container-group">
                    {this.model.branches.map((branch: Branch, index: number) => {
                        let guid: any;
                        guid = ObjectHelper.newGuid()
                        return (
                            <React.Fragment key={index}>
                                <ValidationSummary {...this.bindArrayElement(m => m.branches[index], [index])} strategy={ValidationSummaryStrategy.includeOnlyModelErrors} />
                                <div id={guid} className='interactive-container interactive-container--form' key={index}>

                                        <div className='interactive-container__content record-container'>
                                            <div className="row">
                                                <div className="form-group col-12">
                                                    <DropDownList
                                                        items={this.props.applicationManager.reorganizeCoOperativeBranches ? this.props.applicationManager.reorganizeCoOperativeBranches.map<SelectListItem>((branch) => { return { text: branch.firmName, value: branch.branchCode, selected: false } }) : []}
                                                        {...this.bindArrayElement(m => m.branches[index].branchCode, [index])}
                                                        attributes={attributesClassFormControl}
                                                        onChange={(e) => this.OnBranchSelected(index, e)}
                                                        hasEmptyElement={true}
                                                        emptyElementValue={this.getResource('CR_APP_00029_L')} />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="form-group col-12">
                                                    {this.labelFor(m => m, 'GL_COMPANY_NAME_BRANCH_L')}
                                                    <TextBox {...this.bindArrayElement(m => m.branches[index].firmName, [index])} attributes={attributesClassFormControl} />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="form-group col-sm-6">
                                                    {this.labelFor(m => m, 'GL_BRANCH_ID_L')}
                                                    <TextBox {...this.bindArrayElement(m => m.branches[index].branchCode, [index])} attributes={attributesClassFormControlMaxL4} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="interactive-container__controls">
                                            {
                                                this.model.branches.length > 1 &&
                                                <Button titlekey="GL_DELETE_L" className="btn btn-outline-light btn-sm" onClick={() => this.OnRemoveBranch(index, guid)} onMouseOver={() => this.onHover(guid)} onMouseLeave={() => this.onHoverLeave(guid)}>
                                                    <i className="ui-icon ui-icon-times" aria-hidden="true"></i>
                                                </Button>
                                            }
                                        </div>

                                </div>
                                {(index < (this.model.branches.length - 1)) && <hr className='hr--doted-line' />}
                            </ React.Fragment>
                        );
                    })}
                    <div className="row">
                        <div className="form-group col">
                            <hr />
                            <Button id="add-f3" className="btn btn-outline-light text-dark" onClick={this.OnAddBranch} lableTextKey={'CR_APP_ADD_BRANCH_L'}>
                                <i className="ui-icon ui-icon-plus" aria-hidden="true"></i>
                            </Button>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    renderDisplay(): JSX.Element {
        return (
            <>
                {this.model.branchSubject && this.model.branchSubject.name && <>{this.model.branchSubject.name}</>}
                {/*дали да покаже запетайка*/(this.model.branchSubject && this.model.branchSubject.name && this.model.branchSubject.indent) && <>, </>}
                {this.model.branchSubject && this.model.branchSubject.indent && <>{this.getResource('GL_COMPANY_ID_L')}: {this.model.branchSubject.indent}</>}
                {this.model.branches && this.model.branches.length > 0 && <br />}
                {this.model.branches && this.model.branches.map((branch: Branch, index: number) => {
                    return branch && !ObjectHelper.isStringNullOrEmpty(branch.firmName) && <React.Fragment key={index}>{this.getResource('GL_COMPANY_NAME_BRANCH_L')}: {branch.firmName}, {this.getResource('GL_BRANCH_ID_L')}: {branch.branchCode}<br /></React.Fragment>
                })}
            </>
        );
    }

    private OnSuccessorSelected(e: any): void {
        this.model.branchSubject.indent = ArrayHelper.queryable.from(this.props.applicationManager.successors)
            .single(successor => successor.subject.name == e.target.value)
            .subject.indent;
    }

    private OnBranchSelected(index: number, e: any): void {
        this.model.branches[index].firmName = ArrayHelper.queryable.from(this.props.applicationManager.reorganizeCoOperativeBranches)
            .single(branch => branch.branchCode == e.target.value)
            .firmName;
    }

    @action private OnAddBranch() {
        this.model.branches.push(new Branch());
    }

    @action private OnRemoveBranch(branchIndex: number, index: any) {
        this.model.branches.splice(branchIndex, 1);
        $("#" + index).removeClass("interactive-container--focus");
    }


    @action private onHover(index: any) {
        $("#" + index).addClass("interactive-container--focus");
    }

    @action private onHoverLeave(index: any) {
        $("#" + index).removeClass("interactive-container--focus");
    }
}

export const F804_ReorgBranchesFieldListUI = withFieldSingleListRecordsContainer(withApplicationFormContext(F804_ReorgBranchesUI), F8040_ReorgBranch, {
    listSelector: m => m.branchList,
    addButtonLabelKey: 'CR_APP_ADD_BRANCHES_ANOTHER_SUCCESSOR_L',
    fieldLabelTextKey: "CR_F_804_L",
    hasAtLeastOneRecord: true,
    newRecordCtor: () => {
        let t = new F8040_ReorgBranch();
        t.branches = [new Branch()];
        t.branchSubject = new Person();

        return Promise.resolve(t);
    }
}); 
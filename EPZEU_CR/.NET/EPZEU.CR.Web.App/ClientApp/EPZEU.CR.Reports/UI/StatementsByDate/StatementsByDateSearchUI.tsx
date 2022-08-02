import { ArrayHelper, BindableReference, ObjectHelper } from "Cnsys.Core";
import { AsyncUIProps, BaseProps, TreeNode, TreeNodeCollection, TreeViewerUI, TreeViewModes, withAsyncFrame } from "Cnsys.UI.React";
import { attributesClassFormControlMaxL4, CheckboxTreeNodeUI, EPZEUBaseComponent, Period, ValidationSummary, ValidationSummaryStrategy } from "EPZEU.Core";
import { FieldsGroupsSections, Nomenclatures } from 'EPZEU.CR.Core';
import { action, observable, runInAction } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { StatementsByDateResultFilter } from "../../Models/Enums";
import { StatementsByDateSearch } from "../../Models/StatementsByDateSearch";

interface StatementsByDateSearchProps extends BaseProps, AsyncUIProps {
    onSearchCallback: () => void;
    onClearResult: () => void;
}

const valSummaryPropNamesFieldIdents = ["fieldIdents"];
const valSummaryPropNamesDate = ["date"];

@observer class StatementsByDateSearchImpl extends EPZEUBaseComponent<StatementsByDateSearchProps, StatementsByDateSearch> {
    @observable private treeNodeCollectionForCurrentUpcomingDate: TreeNodeCollection = null;
    @observable private treeNodeCollection: TreeNodeCollection = null;
    @observable private fieldsGroupsSections: FieldsGroupsSections = null;
    @observable showYearTextbox: boolean = false;

    private searchButton: HTMLButtonElement = null;
    private cmpUniqueId: string;

    constructor(props: StatementsByDateSearchProps) {
        super(props)

        this.cmpUniqueId = ObjectHelper.newGuid();
        this.searchButton = null;

        this.onSearch = this.onSearch.bind(this);
        this.onClear = this.onClear.bind(this);
        this.onSearchFilterChange = this.onSearchFilterChange.bind(this);
        this.onCollapseCriteria = this.onCollapseCriteria.bind(this);
        this.documentKeyPress = this.documentKeyPress.bind(this);
        this.handleTreeNodeChange = this.handleTreeNodeChange.bind(this);
        this.initFieldsGroupsSections = this.initFieldsGroupsSections.bind(this);

        this.props.registerAsyncOperation(this.initFieldsGroupsSections().then(() => {
            this.handleTreeNodeChange();
        }));
    }

    componentDidMount() {
        document.addEventListener('keypress', this.documentKeyPress, true);
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.documentKeyPress, true);
    }

    render(): JSX.Element {
        return <div className="search-box search-box--report">
            <div className="card card--search card--collapsible">
                <div id={`colapsable-triger-${this.cmpUniqueId}`} className="card-header">
                    <h3>{this.getResource('GL_SEARCHING_L')}</h3>
                    <button className="system-button toggle-collapse" onClick={() => { this.onCollapseCriteria(`collapsable-content-${this.cmpUniqueId}`) }}>
                        <i className="ui-icon ui-icon-chevron-up" aria-hidden="true"></i>
                    </button>
                </div>
                <div id={`collapsable-content-${this.cmpUniqueId}`} className="collapse" style={{ display: 'block' }}>
                    <div className="card-body">
                        <ValidationSummary {...this.props} propNames={valSummaryPropNamesFieldIdents} strategy={ValidationSummaryStrategy.excludeAllExcept} includeErrorsRecursive={true} />
                        <div className="row">
                            <div className="col-12 form-group">
                                <div className="form-inline">
                                    <div className="custom-control-inline custom-control custom-radio">
                                        <input id="CurrentUpcomingDate" type="radio" value="CurrentUpcomingDate" className="custom-control-input" checked={this.model.mode == StatementsByDateResultFilter.CurrentUpcomingDate} name="grSearchType" onChange={this.onSearchFilterChange} />
                                        <label htmlFor="CurrentUpcomingDate" className="custom-control-label">{this.getResource('CR_GL_FOR_CURRENT_UPCOMING_DATE_L')}</label>
                                    </div>
                                    <div className="custom-control-inline custom-control custom-radio">
                                        <input id="ByDateAnnouncement" type="radio" value="ByDateAnnouncement" className="custom-control-input" name="grSearchType" checked={this.model.mode == StatementsByDateResultFilter.ByDateAnnouncement} onChange={this.onSearchFilterChange} />
                                        <label htmlFor="ByDateAnnouncement" className="custom-control-label">{this.getResource('GL_BY_DATE_ANNOUNCEMENT_L')}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group col-12">
                                <TreeViewerUI cssClass="tree-list tree-list--selectable" nodeUIComponentType={CheckboxTreeNodeUI}
                                    {
                                    ...this.bind(this.model.mode == StatementsByDateResultFilter.ByDateAnnouncement
                                        ? this.treeNodeCollection
                                        : this.treeNodeCollectionForCurrentUpcomingDate, this.props.viewMode)
                                    }
                                    onTreeModelChange={this.handleTreeNodeChange}
                                    treeMode={TreeViewModes.MultiSelectTree} nodeChildContainerCss="tree-list-collapsible" />
                            </div>
                        </div>
                        {
                            this.model.mode == StatementsByDateResultFilter.ByDateAnnouncement
                                ? <>
                                    <ValidationSummary {...this.props} propNames={valSummaryPropNamesDate} strategy={ValidationSummaryStrategy.excludeAllExcept} includeErrorsRecursive={true} />
                                    <div className="row">
                                        <div className="col-12">
                                            <label>{this.getResource('GL_PERIOD_L')}</label>
                                        </div>
                                    </div>
                                    <Period modelReferenceOfFirstDate={new BindableReference(this.model, 'fromActionDate', this.props.modelReference.getValidators())}
                                        modelReferenceOfSecondDate={new BindableReference(this.model, 'toActionDate', this.props.modelReference.getValidators())} />

                                    {
                                        this.showYearTextbox
                                            ? <div className="row">
                                                <div className="form-group col-6 col-sm-4 col-lg-2">
                                                    {this.labelFor(m => m.year, 'GL_YEAR_L')}
                                                    {this.textBoxFor(m => m.year, attributesClassFormControlMaxL4)}

                                                </div>
                                            </div>
                                            : null
                                    }
                                </>
                                : null
                        }
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
    }

    //#region Private funcitons

    initFieldsGroupsSections(): Promise<void> {
        var that = this;

        return Nomenclatures.getFieldsGroupsSections(null, null, true).then(fieldsGroupsSections => {
            runInAction.bind(this)(() => {
                that.treeNodeCollection = new TreeNodeCollection();
                that.treeNodeCollectionForCurrentUpcomingDate = new TreeNodeCollection();
                that.fieldsGroupsSections = fieldsGroupsSections;
                that.treeNodeCollection.items = [];
                that.treeNodeCollectionForCurrentUpcomingDate.items = [];

                for (let section of fieldsGroupsSections.sections) {
                    let sectionTreeNode: TreeNode = new TreeNode();
                    sectionTreeNode.text = section.name;
                    sectionTreeNode.value = section.id;
                    sectionTreeNode.children = [];

                    let sectionTreeNodeForCurrentUpcomingDate: TreeNode = new TreeNode();
                    sectionTreeNodeForCurrentUpcomingDate.text = section.name;
                    sectionTreeNodeForCurrentUpcomingDate.value = section.id;
                    sectionTreeNodeForCurrentUpcomingDate.children = [];

                    let filteredGroups = fieldsGroupsSections.groups.filter((group) => { return group.parentId == section.id })

                    for (let i = 0; i < filteredGroups.length; i++) {
                        let currentGroup = filteredGroups[i];

                        let groupTreeNode: TreeNode = new TreeNode();
                        groupTreeNode.text = currentGroup.name;
                        groupTreeNode.parentID = currentGroup.parentId;
                        groupTreeNode.value = currentGroup.id;
                        groupTreeNode.children = [];

                        let groupTreeNodeForCurrentUpcomingDate: TreeNode = new TreeNode();
                        groupTreeNodeForCurrentUpcomingDate.text = currentGroup.name;
                        groupTreeNodeForCurrentUpcomingDate.parentID = currentGroup.parentId;
                        groupTreeNodeForCurrentUpcomingDate.value = currentGroup.id;
                        groupTreeNodeForCurrentUpcomingDate.children = [];

                        let filteredFields = fieldsGroupsSections.fields.filter((field) => { return field.parentId == filteredGroups[i].id })
                        for (let j = 0; j < filteredFields.length; j++) {
                            let currentField = filteredFields[j];
                            let fieldTreeNode: TreeNode = new TreeNode();

                            fieldTreeNode.text = currentField.name;
                            fieldTreeNode.parentID = currentField.parentId;

                            if (!ObjectHelper.isNullOrUndefined(that.model.fieldIdentsCollection))
                                fieldTreeNode.selected = that.model && that.model.fieldIdentsCollection.filter((value: any) => value == currentField.fieldIdent).length > 0;

                            fieldTreeNode.value = currentField.fieldIdent;
                            fieldTreeNode.children = null;

                            if (currentField.isDateNotifActAnnouncement)
                                groupTreeNodeForCurrentUpcomingDate.children.push(fieldTreeNode)

                            groupTreeNode.children.push(fieldTreeNode);
                        }

                        that.setSelectedParent(groupTreeNode);
                        that.setSelectedParent(groupTreeNodeForCurrentUpcomingDate);

                        sectionTreeNode.children.push(groupTreeNode);

                        if (groupTreeNodeForCurrentUpcomingDate.children.length > 0)
                            sectionTreeNodeForCurrentUpcomingDate.children.push(groupTreeNodeForCurrentUpcomingDate);
                    }

                    that.setSelectedParent(sectionTreeNode);
                    that.treeNodeCollection.items.push(sectionTreeNode)

                    that.setSelectedParent(sectionTreeNodeForCurrentUpcomingDate);
                    that.treeNodeCollectionForCurrentUpcomingDate.items.push(sectionTreeNodeForCurrentUpcomingDate)
                }
            });
        })
    }

    setSelectedParent(parent: TreeNode) {
        let selectedChildren = ArrayHelper.queryable.from(parent.children).count(el => el.selected == true);
        let intermediateChildren = ArrayHelper.queryable.from(parent.children).count(el => el.intermediateState == true);

        if (selectedChildren > 0) {

            if (parent.children && parent.children.length == selectedChildren)
                parent.selected = true;
            else
                parent.intermediateState = true;

        } else if (intermediateChildren > 0)
            parent.intermediateState = true;
    }

    //#endregion

    //#region Handlers

    @action private onClear() {
        //this.model.mode = StatementsByDateResultFilter.CurrentUpcomingDate;
        this.model.fieldIdentsCollection = [];
        this.model.fromActionDate = undefined;
        this.model.toActionDate = undefined;
        this.model.year = undefined;
        this.props.registerAsyncOperation(this.initFieldsGroupsSections());
        this.props.onClearResult();
        this.model.clearErrors();
    }

    @action private onSearchFilterChange(event: any): void {
        let selectedValue = event.target.value;

        if (selectedValue == 'CurrentUpcomingDate')
            this.model.mode = StatementsByDateResultFilter.CurrentUpcomingDate;
        else
            this.model.mode = StatementsByDateResultFilter.ByDateAnnouncement;

        this.model.fieldIdentsCollection = [];
        this.model.fromActionDate = undefined;
        this.model.toActionDate = undefined;
        this.model.year = undefined;
        this.props.registerAsyncOperation(this.initFieldsGroupsSections());

        this.props.onClearResult();
    }

    @action private handleTreeNodeChange() {
        this.model.fieldIdentsCollection = [];
        let selectedFields: TreeNode[];

        if (this.model.mode == StatementsByDateResultFilter.ByDateAnnouncement) {

            let selectedTreeNodes = this.treeNodeCollection.getSelectedTreeNodes();
            selectedFields = selectedTreeNodes.filter(node => this.fieldsGroupsSections.fields.filter(f => f.fieldIdent === node.value).length > 0)

            this.showYearTextbox = false;
            for (var j = 0; j < selectedTreeNodes.length; j++) {

                for (var f = 0; f < this.fieldsGroupsSections.fields.length; f++) {
                    if (this.fieldsGroupsSections.fields[f].isAnnualActAnnouncement && selectedTreeNodes[j].value == this.fieldsGroupsSections.fields[f].fieldIdent) {
                        this.showYearTextbox = true;
                        break;
                    }
                }
            }

        } else if (this.model.mode == StatementsByDateResultFilter.CurrentUpcomingDate) {

            let selectedTreeNodes = this.treeNodeCollectionForCurrentUpcomingDate.getSelectedTreeNodes();
            selectedFields = selectedTreeNodes.filter(node => this.fieldsGroupsSections.fields.filter(f => f.fieldIdent === node.value).length > 0)
        }

        for (var i = 0; i < selectedFields.length; i++) {
            this.model.fieldIdentsCollection.push(selectedFields[i].value);
        }
    }

    private onSearch() {
        if (!this.showYearTextbox)
            this.model.year = null;

        if (this.props.onSearchCallback)
            this.props.onSearchCallback();
    }

    private onCollapseCriteria(targetId: string): void {
        let triger = $(`#colapsable-triger-${this.cmpUniqueId}`);
        triger.toggleClass('collapsed');

        $('#' + targetId).slideToggle();
    }

    private documentKeyPress(e: any) {
        if (e.keyCode === 13)
            this.searchButton.click();
    }

    //#endregion
}

export const StatementsByDateSearchUI = withAsyncFrame(StatementsByDateSearchImpl);
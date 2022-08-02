import { ArrayHelper, ObjectHelper } from 'Cnsys.Core';
import { AsyncUIProps, BaseProps, TreeNode, TreeNodeCollection, TreeViewerUI, TreeViewModes, withAsyncFrame } from 'Cnsys.UI.React';
import { CheckboxTreeNodeDisplayUI, CheckboxTreeNodeUI, EPZEUBaseComponent } from 'EPZEU.Core';
import { FieldsGroupsSections, Nomenclatures } from 'EPZEU.CR.Core';
import { action, observable, runInAction } from 'mobx';
import { observer } from 'mobx-react';
import * as React from "react";
import { DeedsDataService } from '../Services/DeedsDataService';

interface FieldsSelectTreeProps extends BaseProps, AsyncUIProps {
    uic: string,
    excludeActs?: boolean
    onChangeCallback?: (selectedValues: string[]) => void;
    onlyActs?: boolean;
}

@observer class FieldsSelectTreeImpl extends EPZEUBaseComponent<FieldsSelectTreeProps, any> {

    @observable private treeNodeCollection: TreeNodeCollection = null;
    @observable private fieldsGroupsSections: FieldsGroupsSections = null;

    constructor(props: FieldsSelectTreeProps) {
        super(props)

        this.initFieldsGroupsSections();
        this.handleTreeNodeChange = this.handleTreeNodeChange.bind(this);
    }

    renderEdit(): JSX.Element {

        if (this.treeNodeCollection != null && this.treeNodeCollection != undefined)
            return <TreeViewerUI cssClass="tree-list tree-list--selectable" nodeUIComponentType={CheckboxTreeNodeUI}
                {...this.bind(this.treeNodeCollection, this.props.viewMode)}
                onTreeModelChange={this.handleTreeNodeChange} treeMode={TreeViewModes.MultiSelectTree} nodeChildContainerCss="tree-list-collapsible" />

        return <div></div>
    }

    renderDisplay(): JSX.Element {
        if (this.treeNodeCollection != null && this.treeNodeCollection != undefined) {
            return <TreeViewerUI cssClass="tree-list tree-list--selectable" nodeUIComponentType={CheckboxTreeNodeDisplayUI} skipEmptyNodesOnDisplayMode={true}
                {...this.bind(this.treeNodeCollection, this.props.viewMode)} treeMode={TreeViewModes.MultiSelectTree} nodeChildContainerCss="tree-list-collapsible" />
        }

        return <div></div>
    }

    @action private handleTreeNodeChange() {
        let selectedTreeNodes = this.treeNodeCollection.getSelectedTreeNodes();
        let fieldIdents: string[] = [];
        selectedTreeNodes = selectedTreeNodes.filter(node => this.fieldsGroupsSections.fields.filter(f => f.fieldIdent === node.value).length > 0)

        for (var i = 0; i < selectedTreeNodes.length; i++) {
            fieldIdents.push(selectedTreeNodes[i].value);
        }

        this.props.onChangeCallback(fieldIdents);
    }

    initFieldsGroupsSections() {
        var that = this;

        if (ObjectHelper.isStringNullOrEmpty(this.props.uic))
            return

        this.props.registerAsyncOperation(new DeedsDataService().getDeedSummary(this.props.uic).then(deed => {
            return Nomenclatures.getFieldsGroupsSections(deed.legalForm, this.props.excludeActs, this.props.onlyActs).then(fieldsGroupsSections => {
                runInAction.bind(this)(() => {
                    this.treeNodeCollection = new TreeNodeCollection();
                    this.fieldsGroupsSections = fieldsGroupsSections;
                    this.treeNodeCollection.items = [];

                    //sections
                    for (let section of fieldsGroupsSections.sections) {
                        let sectionTreeNode: TreeNode = new TreeNode();
                        sectionTreeNode.text = section.name;
                        sectionTreeNode.selected = false;
                        sectionTreeNode.value = section.id;
                        sectionTreeNode.children = [];

                        //groups
                        let filteredGroups = fieldsGroupsSections.groups.filter((group) => { return group.parentId == section.id })
                        for (let i = 0; i < filteredGroups.length; i++) {
                            let groupTreeNode: TreeNode = new TreeNode();
                            let currentGroup = filteredGroups[i];

                            groupTreeNode.text = currentGroup.name;
                            groupTreeNode.parentID = currentGroup.parentId;
                            groupTreeNode.selected = false;
                            groupTreeNode.value = currentGroup.id;
                            groupTreeNode.children = [];

                            //fields
                            let filteredFields = fieldsGroupsSections.fields.filter((field) => { return field.parentId == currentGroup.id })
                            for (let j = 0; j < filteredFields.length; j++) {
                                let fieldTreeNode: TreeNode = new TreeNode();
                                let currentField = filteredFields[j];

                                fieldTreeNode.text = currentField.name;
                                fieldTreeNode.parentID = currentField.parentId;
                                fieldTreeNode.selected = that.model && that.model.filter((value: any) => value == currentField.fieldIdent).length > 0;
                                fieldTreeNode.value = currentField.fieldIdent;
                                fieldTreeNode.children = null;

                                groupTreeNode.children.push(fieldTreeNode);
                            }

                            this.setSelectedParent(groupTreeNode);
                            sectionTreeNode.children.push(groupTreeNode);
                        }

                        this.setSelectedParent(sectionTreeNode);
                        this.treeNodeCollection.items.push(sectionTreeNode)
                    }
                })
            })
        }))
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
}

export const FieldsSelectTreeUI = withAsyncFrame(FieldsSelectTreeImpl);
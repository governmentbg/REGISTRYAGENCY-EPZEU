import { TreeNode, TreeNodeComponentUIProps } from 'Cnsys.UI.React';
import { observer } from 'mobx-react';
import * as React from "react";
import { EPZEUBaseComponent } from './EPZEUBaseComponent';
import { ObjectHelper } from 'Cnsys.Core';

@observer export class CheckboxTreeNodeUI extends EPZEUBaseComponent<TreeNodeComponentUIProps, TreeNode> {
    constructor(props: TreeNodeComponentUIProps) {
        super(props);

        //Bind
        this.onCollapse = this.onCollapse.bind(this);
        this.onCheckChange = this.onCheckChange.bind(this);
    }

    render(): JSX.Element {
        return <div className="tree-list-toggle">
            {this.model.children && this.model.children.length > 0 ?
                <a id={`collapsible-triger-${this.model.value}`} href="javascript://" className={this.model.isExtended == true ? "toggle-collapse" : "toggle-collapse collapsed"} onClick={this.onCollapse}>
                    <i className="ui-icon ui-icon-chevron-right" aria-hidden="true"></i>
                </a>
                : null}
            <div className="custom-control-inline custom-control custom-checkbox">
                <input className="custom-control-input" id={`node-${this.model.value}`} type="checkbox" value={this.model.value} onChange={this.onCheckChange} checked={this.model.selected} data-state-indeterminate={this.model.intermediateState} />
                <label className="custom-control-label" htmlFor={`node-${this.model.value}`}>{this.model.children && this.model.children.length > 0 ? <b>{this.model.text}</b> : this.model.text}</label>
            </div>
        </div>
    }

    private onCheckChange(e: any): void {
        let checked = e.target.checked ? true : false;

        if (this.props.onNodeSelected)
            this.props.onNodeSelected(this.model.value, checked);
    }

    private onCollapse(e: any): void {
        let that = this;

        let triger = $(`#collapsible-triger-${this.model.value}`);

        if (triger.data('clicked')) {
            // Previously clicked, stop actions
            e.preventDefault();
            e.stopPropagation();
        } else {
            // Mark to ignore next click
            triger.data('clicked', true);

            //code
            $(`#collapsible-content-${this.model.value}`).slideToggle('slow', () => {
                //Това се вика когато анимацията приключи.
                let isExtended = triger.hasClass('collapsed') ? false : true;
                that.props.onExtendCallback(isExtended);
            });
            triger.toggleClass('collapsed');

            // Unmark after 1 second
            window.setTimeout(function () {
                triger.removeData('clicked');
            }, 1000);
        }
    }
}

@observer export class CheckboxTreeNodeDisplayUI extends EPZEUBaseComponent<TreeNodeComponentUIProps, TreeNode> {
    constructor(props: TreeNodeComponentUIProps) {
        super(props);

        //Bind
        this.onCollapse = this.onCollapse.bind(this);
    }

    render(): JSX.Element {

        let hasSelectedChildren = this.hasSelectedChildren(this.model);

        return <div className="tree-list-toggle">
            {
                this.model.children && this.model.children.length > 0 && hasSelectedChildren == true ?
                <a id={`collapsible-triger-${this.model.value}`} href="javascript://" className={this.model.isExtended == true ? "toggle-collapse" : "toggle-collapse collapsed"} onClick={this.onCollapse}>
                    <i className="ui-icon ui-icon-chevron-right" aria-hidden="true"></i>
                </a>
                    : null
            }
            {
                this.model.selected || hasSelectedChildren === true
                    ? <p className="field-text">{this.model.children && this.model.children.length > 0 ? <b>{this.model.text}</b> : this.model.text}</p>
                    : null
            }
        </div>
    }

    //#region Private Helpers

    private hasSelectedChildren(node: TreeNode): boolean {
        let hasSelected = false;

        if (ObjectHelper.isNullOrUndefined(node) || ObjectHelper.isNullOrUndefined(node.children) || node.children.length == 0)
            return hasSelected;

        for (var i = 0; i < node.children.length; i++) {

            if (node.children[i].children && node.children[i].children.length > 0)
                hasSelected = this.hasSelectedChildren(node.children[i]);

            if (hasSelected)
                break;

            if (node.children[i].selected) {
                hasSelected = true;
                break;
            }
        }

        return hasSelected;
    }

    private onCollapse(e: any): void {
        let that = this;

        let triger = $(`#collapsible-triger-${this.model.value}`);

        if (triger.data('clicked')) {
            // Previously clicked, stop actions
            e.preventDefault();
            e.stopPropagation();
        } else {
            // Mark to ignore next click
            triger.data('clicked', true);

            //code
            $(`#collapsible-content-${this.model.value}`).slideToggle('slow', () => {
                //Това се вика когато анимацията приключи.
                let isExtended = triger.hasClass('collapsed') ? false : true;
                that.props.onExtendCallback(isExtended);
            });
            triger.toggleClass('collapsed');

            // Unmark after 1 second
            window.setTimeout(function () {
                triger.removeData('clicked');
            }, 1000);
        }
    }

    //#endregion
}
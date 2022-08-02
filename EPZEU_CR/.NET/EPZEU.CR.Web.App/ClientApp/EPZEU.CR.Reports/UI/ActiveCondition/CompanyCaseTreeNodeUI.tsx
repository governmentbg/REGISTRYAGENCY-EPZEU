import * as React from "react";
import { observer } from "mobx-react";
import { EPZEUBaseComponent } from "EPZEU.Core";
import { TreeNode, TreeNodeComponentUIProps, RawHTML } from "Cnsys.UI.React";

@observer export class CompanyCaseTreeNodeUI extends EPZEUBaseComponent<TreeNodeComponentUIProps, TreeNode> {
    constructor(props: TreeNodeComponentUIProps) {
        super(props);

        //Bind
        this.onCollapse = this.onCollapse.bind(this);
    }

    render(): JSX.Element {
        return (
            <>
                {this.model.children && this.model.children.length > 0 ?
                    <div className="tree-list-toggle cursor-pointer" onClick={this.onCollapse}>
                        <a id={`collapsible-triger-${this.model.value}`} href="javascript://" className={this.model.isExtended == true ? "toggle-collapse" : "toggle-collapse collapsed"}>
                            <i className="ui-icon ui-icon-chevron-right" aria-hidden="true"></i>
                        </a>
                        <p className="field-text">
                            <b>{this.model.text}</b>
                        </p>
                    </div>
                    :
                    <p className="field-text" dangerouslySetInnerHTML={{ __html: this.model.text }}></p>}
            </>);
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
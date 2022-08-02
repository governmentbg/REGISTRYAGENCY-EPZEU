import { ObjectHelper, TypeSystem, ErrorHelper } from 'Cnsys.Core';
import { BaseProps, ViewMode } from "Cnsys.UI.React";
import { Button, EPZEUBaseComponent, ValidationSummary, ValidationSummaryStrategy, ValidationSummaryErrorsPreviewUI } from 'EPZEU.Core';
import { action, computed } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { Fragment } from "react";

export interface ListItemsContainerProps extends BaseProps {
    addButtonLabelKey?: string;
    hasAtLeastOneItem?: boolean;
    valSummaryStrategy?: ValidationSummaryStrategy;
    valSummaryRecursive?: boolean;
    valSummaryPropNames?: string[];
    hasClearDataOption?: boolean;
}

export function withListItemsContainer<TComponent extends React.ComponentClass<ListItemsContainerProps>>(Component: TComponent, modelType: any, props?: any): TComponent {

    @observer class Wrapper extends EPZEUBaseComponent<any, any> {

        @computed get listItems(): any[] {
            return this.model;
        };

        constructor(props?: ListItemsContainerProps) {
            super(props);

            this.onAddItem = this.onAddItem.bind(this);
            this.onRemoveItem = this.onRemoveItem.bind(this);
            this.onClearData = this.onClearData.bind(this);
        }

        renderEdit(): JSX.Element {

            return (
                <>
                    {this.listItems.map((item: any, index: number) => {
                        var itemProps = this.bindArrayElement(m => m[index], [index]);
                        var allProps = { ...props, ...this.props, ...itemProps }

                        return (
                            <Fragment key={index}>
                                {
                                    index > 0 ? <hr className="hr--doted-line" /> : null
                                }
                                <ValidationSummary key={index + "_vs"} {...itemProps} propNames={allProps.valSummaryPropNames} strategy={allProps.valSummaryStrategy || ValidationSummaryStrategy.includeOnlyModelErrors} includeErrorsRecursive={allProps.valSummaryRecursive} />
                                <div id={"list-item-"+index} key={ObjectHelper.newGuid()} className="interactive-container interactive-container--form" >
                                    <div className="interactive-container__content record-container">
                                        <Component {...itemProps}> {this.props.children}</Component>
                                    </div>
                                    <div className="interactive-container__controls">
                                        {
                                            props.hasClearDataOption
                                                ? <Button titlekey='GL_RETURN_ORIGINAL_L' className="btn btn-outline-light btn-sm" onClick={() => this.onClearData(index)} onMouseOver={() => this.onHover(index)} onMouseLeave={() => this.onHoverLeave(index)}><i className="ui-icon ui-icon-redo" aria-hidden="true"></i></Button>
                                                : null
                                        }
                                        {
                                            (this.props.hasAtLeastOneItem || props.hasAtLeastOneItem) && this.listItems.length == 1 ?
                                                null :
                                                <Button titlekey='GL_DELETE_L' className="btn btn-outline-light btn-sm" onClick={() => this.onRemoveItem(item)} onMouseOver={() => this.onHover(index)} onMouseLeave={() => this.onHoverLeave(index)}><i className="ui-icon ui-icon-times" aria-hidden="true"></i></Button>
                                        }
                                    </div>
                                </div>
                            </Fragment>
                        )
                    })}
                    <div className="row">
                        <div className="form-group col">
                            <hr />
                            <Button id="add-f1" className="btn btn-outline-light text-dark" onClick={this.onAddItem} lableTextKey={this.props.addButtonLabelKey}>
                                <i className="ui-icon ui-icon-plus mr-1" aria-hidden="true"></i>
                            </Button>
                        </div>
                    </div>
                </>
            );
        }

        renderDisplay(): JSX.Element {

            return (
                <>
                    {
                        this.listItems.map((item: any, index: number) => {
                            var errors = ErrorHelper.getErrorsRecursive(item);

                            return (
                                <Fragment key={ObjectHelper.newGuid()}>
                                    {
                                        index > 0 ? <hr className="hr--preview" /> : null
                                    }
                                    <Component {...this.bind(item, ViewMode.Display, "")} />
                                    <ValidationSummaryErrorsPreviewUI errors={errors && errors.map(e => e.error)} />
                                    {(index < this.listItems.length - 1) && <div className='doted-line'></div>}
                                </Fragment>
                            )
                        })
                    }
                </>);
        }

        @action onAddItem(): void {
            var typeInfo = TypeSystem.getTypeInfo(modelType);
            var newItem: any = new typeInfo.ctor();

            this.listItems.push(newItem)
        }

        @action onRemoveItem(item: any): void {
            var index = this.listItems.indexOf(item);
            if (index > -1)
                this.listItems.splice(index, 1);
        }

        @action onClearData(index: number): void {
            var typeInfo = TypeSystem.getTypeInfo(modelType);
            var newItem: any = new typeInfo.ctor();
            this.listItems.splice(index, 1, newItem);
        }

        @action private onHover(index: number) {
            $("#" + "list-item-" + index).addClass("interactive-container--focus");
        }

        @action private onHoverLeave(index: number) {
            $("#" + "list-item-" + index).removeClass("interactive-container--focus");
        }
    };

    (Wrapper as any).displayName = `withListItemContainer(${Component.displayName || (Component as any).name || "Component"})`;

    return Wrapper as any;
}
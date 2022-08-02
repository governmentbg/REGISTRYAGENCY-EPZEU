import { EPZEUBaseComponent, ValidationSummary, ValidationSummaryStrategy } from 'EPZEU.Core';
import * as React from "react";
import { ListItemsContainerProps, withListItemsContainer } from "./ListItemsContainer";

interface SimpleListItemsContainerProps extends ListItemsContainerProps {
    listSelector: (m: any) => any[];
    itemLabelTextKey?: string;
    helpTextKey?: string;
    isMandatoryItem?: boolean;    
    isHalfWidthItem?: boolean;
}

function withSingleListContainer<C extends React.ComponentClass<ListItemsContainerProps>>(Component: C, modelType: any, props?: SimpleListItemsContainerProps): C {
    var ListItemsComponent = withListItemsContainer(Component, modelType, props);

    var mandatoryItemAttributes = { className: `field-title field-title--form required-field` };
    var nonMandatoryItemAttributes = { className: `field-title field-title--form` };

    class Wrapper extends EPZEUBaseComponent<SimpleListItemsContainerProps, any> {

        constructor(props?: SimpleListItemsContainerProps) {
            super(props);
        }

        renderEdit(): JSX.Element {
            
            var listProps = { ...props, ...this.props, ...this.bind(props.listSelector) };
            let itemLabel: any = null;
            let itemHelpText: any = null;

            if (this.props.itemLabelTextKey || props.itemLabelTextKey) {
                itemLabel = (
                    <div className="row">
                        <div className="col">
                            {this.labelFor(m=>m,
                                this.props.itemLabelTextKey || props.itemLabelTextKey,
                                this.props.isMandatoryItem || props.isMandatoryItem ? mandatoryItemAttributes : nonMandatoryItemAttributes)}
                        </div>
                    </div>);
            }

            if (this.props.helpTextKey || props.helpTextKey) {
                itemHelpText = (
                    <div className="help-text">
                        <p>{this.getResource(this.props.helpTextKey || props.helpTextKey)}</p>
                    </div>);
            }

            return (
                <div className="field-container">
                    {itemLabel}
                    {itemHelpText}
                    <ValidationSummary model={this.model} key="vs" {...this.props} propNames={this.props.valSummaryPropNames} strategy={this.props.valSummaryStrategy || ValidationSummaryStrategy.includeOnlyModelErrors} includeErrorsRecursive={this.props.valSummaryRecursive} />
                    <ListItemsComponent {...listProps}>{this.props.children}</ListItemsComponent>
                </div>);
        }

        renderDisplay(): JSX.Element {
            let listProps = { ...props, ...this.props, ...this.bind(props.listSelector) };

            return (
                <div className="field-container">
                    <ListItemsComponent {...listProps}>{this.props.children}</ListItemsComponent>
                    <ValidationSummary model={this.model} includeErrorsRecursive={true} />
                </div>);
        }
    };

    (Wrapper as any).displayName = `withSingleListContainer(${Component.displayName || (Component as any).name || "Component"})`;

    return Wrapper as any;
}

export function withSingleItemListContainer<C extends React.ComponentClass<ListItemsContainerProps>>(Component: C, modelType: any, props?: SimpleListItemsContainerProps) {
    return withSingleListContainer(Component, modelType, props);
}
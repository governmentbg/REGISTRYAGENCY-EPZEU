import { ErrorHelper, ObjectHelper } from 'Cnsys.Core';
import { EPZEUBaseComponent, ValidationSummary, ValidationSummaryStrategy, ValidationSummaryErrorsPreviewUI } from 'EPZEU.Core';
import * as React from "react";
import { Record } from '../../';
import { SectionSubTitle } from "../CommonInfoComponents";
import { ListRecordsContainerProps, withFieldContainer, withListRecordsContainer } from './';

interface SimpleListRecordsContainerProps extends ListRecordsContainerProps {
    listSelector: (m: any) => Record[];
}

function withSingleListRecordsContainer<C extends React.ComponentClass<ListRecordsContainerProps>>(Component: C, modelType: any, props?: SimpleListRecordsContainerProps): C {
    var ListRecordsComponent = withListRecordsContainer(Component, modelType, props);

    class Wrapper extends EPZEUBaseComponent<ListRecordsContainerProps, any> {

        constructor(props?: ListRecordsContainerProps) {
            super(props);
        }

        renderEdit(): JSX.Element {

            return (
                <>
                    <ValidationSummary
                        key="vs"
                        {...this.props}
                        propNames={this.props.valSummaryPropNames}
                        strategy={this.props.valSummaryStrategy || ValidationSummaryStrategy.includeOnlyModelErrors}
                        includeErrorsRecursive={this.props.valSummaryRecursive}
                    />
                    {!ObjectHelper.isStringNullOrEmpty(this.props.sectionSubTitleTextKey) ? <SectionSubTitle subTitleTextKey={this.props.sectionSubTitleTextKey} /> : null}
                        <ListRecordsComponent {...this.getListProps()}></ListRecordsComponent>
                </>);
        }

        renderDisplay(): JSX.Element {
            var errors = ErrorHelper.getErrors(this.model);

            return (
                <>
                    <ListRecordsComponent {...this.getListProps()}></ListRecordsComponent>
                    <ValidationSummaryErrorsPreviewUI errors={errors && errors.map(e => e.error)} />
                </>);
        }

        private getListProps() {
            var allProps = { ...props, ...this.props, ...this.bind(props.listSelector) };
            allProps.listSelector = undefined;

            return allProps;
        }
    };

    (Wrapper as any).displayName = `withSingleListRecordsContainer(${Component.displayName || (Component as any).name || "Component"})`;

    return Wrapper as any;
}

export function withFieldSingleListRecordsContainer<C extends React.ComponentClass<ListRecordsContainerProps>>(Component: C, modelType: any, props?: SimpleListRecordsContainerProps) {
    return withFieldContainer(withSingleListRecordsContainer(Component, modelType, props), props);
}
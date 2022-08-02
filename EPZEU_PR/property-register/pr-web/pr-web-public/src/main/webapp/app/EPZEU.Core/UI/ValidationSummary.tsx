import { ErrorHelper, ErrorInfo, ErrorLevels, IModelErrors, ApiError, ClientError, ArrayHelper, ObjectHelper } from "Cnsys.Core";
import { ViewMode, BaseProps, BaseComponent } from "Cnsys.UI.React";
import { observer } from "mobx-react";
import * as React from "react";

export enum ValidationSummaryStrategy {
    /**Изключва грешките от всички пропартита за модела с изключение на тези в propNames */
    excludeAllExcept = 1,

    /**Включва грешките от всички пропартита за модела с изключение на тези в propNames */
    includeAllExcept = 2,

    /**Включва само грешките на модела */
    includeOnlyModelErrors = 3,

    /**Изключва само грешките на модела */
    excludeOnlyModelErrors = 4
}

export interface ValidationSummaryProps extends BaseProps {
    errorPrefix?: string;
    strategy?: ValidationSummaryStrategy;
    propNames?: string[];
    includeErrorsRecursive?: boolean;
    model?: IModelErrors;
}

interface ValidationSummaryErrorsProps extends BaseProps {
    errors?: ({ message: string, level: ErrorLevels } | string)[];
    asyncErrors?: (ApiError | ClientError | Error)[];
}

var emptyErrors: string[] = [];
var emptyPropNames: string[] = [""];

@observer export class ValidationSummary extends BaseComponent<ValidationSummaryProps, IModelErrors> {

    render(): JSX.Element {
        let errors = this.getErrors();

        if (this.props.viewMode == ViewMode.Display)
            return <ValidationSummaryErrorsPreviewUI errors={errors} />;
        else
            return <ValidationSummaryErrors errors={errors} />;
    }

    private getErrors(): string[] {

        let errors: ErrorInfo[];

        if (this.props.includeErrorsRecursive)
            errors = ErrorHelper.getErrorsRecursive(this.model);
        else
            errors = ErrorHelper.getErrors(this.model);

        if (this.props.strategy == ValidationSummaryStrategy.excludeAllExcept) {
            errors = ErrorHelper.getErrorsForConcreteProps(errors, this.props.propNames);

        } else if (this.props.strategy == ValidationSummaryStrategy.includeAllExcept) {
            errors = ErrorHelper.excludeErrorsForProps(errors, this.props.propNames);

        } else if (this.props.strategy == ValidationSummaryStrategy.includeOnlyModelErrors) {
            errors = ErrorHelper.getErrorsForConcreteProps(errors, emptyPropNames);

        } else if (this.props.strategy == ValidationSummaryStrategy.excludeOnlyModelErrors) {
            errors = ErrorHelper.excludeErrorsForProps(errors, emptyPropNames);
        }

        if (errors.length == 0)
            return emptyErrors;
        else
            return errors.map(e => e.error);
    }
}

export function ValidationSummaryErrors(props: ValidationSummaryErrorsProps) {


    if (props.errors && props.errors.length) {
        return (<div className="alert alert-danger" role="alert">
            {props.errors.map((e, index) => {
                return (
                    <p key={index}>
                        {typeof (e) == "string" ? e : e.message}
                    </p>
                )
            })}
        </div>);

    } else if (props.asyncErrors && props.asyncErrors.length > 0) {

        var result = [];
        var errors = ArrayHelper.queryable.from(props.asyncErrors).where(err => (err as any).treatAsWarning !== true).toArray();
        var warnings = ArrayHelper.queryable.from(props.asyncErrors).where(err => (err as any).treatAsWarning === true).toArray();

        if (warnings && warnings.length > 0) {
            result.push(
                <div className="alert alert-warning" role="alert">
                    {warnings.map((w, index) => {
                        return (
                            <p key={index}>
                                {typeof (w) == "string" ? w : w.message}
                            </p>
                        )
                    })}
                </div>)
        }

        if (errors && errors.length) {
            result.push(
                <div className="alert alert-danger" role="alert">
                    {errors.map((e, index) => {
                        return (
                            <p key={index}>
                                {typeof (e) == "string" ? e : e.message}
                            </p>
                        )
                    })}
                </div>
            );
        }

        return <>{result}</>;
    }

    return null;
}

export function ValidationSummaryErrorsPreviewUI(props: ValidationSummaryErrorsProps) {
    if (props.errors && props.errors.length) {
        return (
            <ul className="invalid-feedback">
                {props.errors.map((err, index) => (
                    <li key={index}>
                        <i className="ui-icon ui-icon-error"></i> {typeof (err) == "string" ? err : err.message}
                    </li>))}
            </ul>
        );
    }

    return null;
}
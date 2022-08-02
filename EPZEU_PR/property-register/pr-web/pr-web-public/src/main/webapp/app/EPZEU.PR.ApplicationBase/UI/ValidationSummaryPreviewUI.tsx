import * as React from "react";
import { BaseProps } from "Cnsys.UI.React";
import { IModelErrors, ErrorInfo, ErrorHelper, ErrorLevels } from "Cnsys.Core";
import { ValidationSummaryStrategy } from "EPZEU.Core";

export interface ValidationSummaryPreviewProps extends BaseProps {
  errorPrefix?: string;
  strategy?: ValidationSummaryStrategy;
  propNames?: string[];
  includeErrorsRecursive?: boolean;
  model?: IModelErrors;
}

export function ValidationSummaryPreviewUI(props: ValidationSummaryPreviewProps): JSX.Element {
  var errors: ErrorInfo[];

  if (props.includeErrorsRecursive) {
    errors = ErrorHelper.getErrorsRecursive(props.model);
  }
  else {
    errors = ErrorHelper.getErrors(props.model);
  }

  if (props.strategy == ValidationSummaryStrategy.excludeAllExcept) {
    errors = ErrorHelper.getErrorsForConcreteProps(errors, props.propNames);
  }
  else {
    errors = ErrorHelper.excludeErrorsForProps(errors, props.propNames);
  }

  return <ValidationSummaryErrorsPreviewUI errors={errors ? errors.map(e => e.error) : null} />
}

export function ValidationSummaryErrorsPreviewUI(props: { errors: ({ message: string, level: ErrorLevels } | string)[] }): JSX.Element {
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
  else {
    return null;
  }
}

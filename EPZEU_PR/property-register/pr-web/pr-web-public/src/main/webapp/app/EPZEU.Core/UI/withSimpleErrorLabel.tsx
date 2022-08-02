import * as React from "react";
import { BaseFieldProps } from 'Cnsys.UI.React'
import { observer } from "mobx-react";

const SimpleErrorLabelUI = observer((props: BaseFieldProps) =>
    (<>
    {
        props.modelReference && props.modelReference.hasErrors() ?
            <ul className="invalid-feedback">
                {props.modelReference.getErrors().map((err, idx) => { return (<li key={idx}>{err}</li>); })}
            </ul>
            : null
    }
    </>)
);

export function withSimpleErrorLabel<C extends React.ComponentClass<BaseFieldProps>>(Component: C): C {

    var ret = function (props: any) {
        return (
            <>
                <Component {...props} >{props.children}</Component>
                <SimpleErrorLabelUI {...props}> </SimpleErrorLabelUI>
            </>);
    };

    return ret as any;
}

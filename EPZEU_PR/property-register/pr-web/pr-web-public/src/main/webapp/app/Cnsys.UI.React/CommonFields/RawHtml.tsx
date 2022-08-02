import * as React from "react";
import { observer } from "mobx-react";

import { BaseFieldComponent, BaseFieldProps } from '../BaseFieldComponent'

interface RawHTMLProps extends BaseFieldProps {
    rawHtmlText: string;
    divClassname?: string;
}

@observer export class RawHTML extends BaseFieldComponent<RawHTMLProps> {

    render() {
        return (
            <div className={this.props.divClassname}
                dangerouslySetInnerHTML={this.createMarkup(this.props.rawHtmlText)} ></div>
        )
    }

    createMarkup(param: any): any {
        return { __html: param };
    }

    renderInternal(): JSX.Element {
        throw "Not Implemented";
    }
}
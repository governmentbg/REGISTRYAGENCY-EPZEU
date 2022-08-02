import { EPZEUBaseComponent } from "EPZEU.Core";
import * as React from "react";
import { InputInfoUI, RecordContainerProps, TextRecordField, SectionInfoUI } from "../..";

interface TextRecordProps extends RecordContainerProps {
    inputInfoKey?: string,
    suffixTextKey?: string,
}


export function withTextRecordContainer<TModel extends TextRecordField>(): React.ComponentClass<TextRecordProps> {


    class Wrapper extends EPZEUBaseComponent<TextRecordProps, TModel> {

        constructor(props: any) {
            super(props);
        }

        renderEdit() {
            return <>
                {
                    <div className="row">
                        {this.props.textRecordContainerCss ?
                            <div className={this.props.textRecordContainerCss}>
                                {this.textBoxFor(m => m.text, null, null, this.props.suffixTextKey)}
                            </div>
                            : (<div className="col-12 form-group">
                            {this.textBoxFor(m => m.text, null, null, this.props.suffixTextKey)}
                            </div>)}
                     </div>
                }
                {this.props.inputInfoKey ? <InputInfoUI infoTextKey={[this.props.inputInfoKey]} /> : null}</>
        }

        renderDisplay() {
            return <>{this.model.text}{this.props.suffixTextKey != null && this.props.suffixTextKey != undefined ? this.getResource(this.props.suffixTextKey) : null}</>
        }
    };

    (Wrapper as any).displayName = `withTextRecordContainer`;

    return Wrapper as any;
}
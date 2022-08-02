import { ObjectHelper } from 'Cnsys.Core';
import { AsyncUIProps, BaseProps, withAsyncFrame } from 'Cnsys.UI.React';
import * as $ from 'jquery';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { DocumentTemplateField, Nomenclatures } from '../';
import { EPZEUBaseComponent } from './EPZEUBaseComponent';

interface DocTemplateFormUIProps extends BaseProps, AsyncUIProps {
    getTemplateFieldData: (fieldKey: string) => string;
    templateForm: DocTemplateForm;
    isNewTemplateForm: boolean;
}

export interface DocTemplateForm {
    formContentHtml: string;
}

@observer class DocTemplateFormImpl extends EPZEUBaseComponent<DocTemplateFormUIProps, any> {
    hasOnFieldChangeBind: boolean;
    @observable formInnerHtml: any;
    templateFileds: DocumentTemplateField[];
    formFields: string[];
    formContainerRef: React.Ref<HTMLDivElement>;

    constructor(props?: DocTemplateFormUIProps) {
        super(props);
        this.formFields = [];
        this.onFieldDataChange = this.onFieldDataChange.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);

        if (this.props.isNewTemplateForm) {
            this.props.registerAsyncOperation(Nomenclatures.getDocumentTemplateFields().bind(this).then(fields => {
                this.templateFileds = fields;
                this.prepareCompnentHtml();
            }));
        } else
            this.formInnerHtml = { __html: this.props.templateForm.formContentHtml };
    }

    render() {
        if (this.formInnerHtml)
            return <div id="formContainer" className='document-template' ref={this.formContainerRef} dangerouslySetInnerHTML={this.formInnerHtml}></div>

        return null;
    }

    componentDidUpdate(prevProps: DocTemplateFormUIProps, prevState: any, snapshot?: any): void {

        if (this.formInnerHtml && !this.hasOnFieldChangeBind) {
            $("#formContainer :input").change(this.onFieldDataChange);

            this.hasOnFieldChangeBind = true;
        }
    }

    componentDidMount(): void {

        if (this.formInnerHtml && !this.hasOnFieldChangeBind) {
            $("#formContainer :input").change(this.onFieldDataChange);

            this.hasOnFieldChangeBind = true;
        }
    }

    //#region Helpers

    @action private prepareCompnentHtml() {
        this.readFields();

        for (var formField of this.formFields) {
            var value = this.props.getTemplateFieldData(formField);

            while (this.props.templateForm.formContentHtml.indexOf(`{${formField}}`) >= 0) {
                this.props.templateForm.formContentHtml = this.props.templateForm.formContentHtml.replace(`{${formField}}`, `<input size=40 type="text" id="${ObjectHelper.newGuid()}" class="form-control form-control--template" value="${value ? value : ''}" />`)
            }
        }

        this.formInnerHtml = { __html: this.props.templateForm.formContentHtml }
    }

    private readFields() {
        for (var tField of this.templateFileds) {
            if (this.props.templateForm.formContentHtml.indexOf(`{${tField.key}}`) > -1) {
                this.formFields.push(tField.key);
            }
        }
    }

    private onFieldDataChange(arg: any) {
        var inputValue: string = arg.target.value;
        var inputID: string = arg.target.id;
        var inputRegex = new RegExp(`<input size=40 type="text" id="${inputID}" class="form-control form-control--template" value=".*?" />`);

        this.props.templateForm.formContentHtml = this.props.templateForm.formContentHtml.replace(inputRegex, `<input size=40 type="text" id="${inputID}" class="form-control form-control--template" value="${inputValue}" />`);
    }

    //#endregion
}

export const DocTemplateFormUI = withAsyncFrame(DocTemplateFormImpl);
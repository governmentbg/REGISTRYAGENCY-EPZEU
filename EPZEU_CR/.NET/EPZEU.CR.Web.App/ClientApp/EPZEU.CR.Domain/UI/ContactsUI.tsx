import * as React from "react";
import { observable, action, runInAction } from 'mobx';
import { observer } from 'mobx-react'
import { BaseProps } from 'Cnsys.UI.React';
import { EPZEUBaseComponent } from 'EPZEU.Core'
import { Contacts } from "../Models";
import { InputInfoUI } from ".";

var infoTextKeys1 = ["CR_APP_00259_I"];

@observer export class ContactsUI extends EPZEUBaseComponent<BaseProps, Contacts> {

    renderEdit(): JSX.Element {

        return <>
            <div className="row">
                <div className="form-group col-sm-6">
                    {this.labelFor(m => m.phone, 'GL_PHONE_L')}
                    {this.textBoxFor(m => m.phone)}
                </div>
                <div className="form-group col-sm-6">
                    {this.labelFor(m => m.fax, 'GL_FAX_L')}
                    {this.textBoxFor(m => m.fax)}
                </div>
            </div>
            <div className="row">
                <div className="form-group col-12">
                    {this.labelFor(m => m.eMail, 'CR_APP_EMAIL_ADDRESSES_L')}
                    {this.textBoxFor(m => m.eMail)} 
                    <InputInfoUI infoTextKey={infoTextKeys1} />
                </div>

                <div className="form-group col-12">
                    {this.labelFor(m => m.url, 'GL_WEB_PAGE_L')}
                    {this.textBoxFor(m => m.url)}
                </div>
            </div>
            </>
    }

    renderDisplay(): JSX.Element {
        return (
            <div>
                {this.model.phone && (this.getResource('GL_PHONE_L') + ': ' + this.model.phone)}
                {
                    // слагаме <br/> само ако преди това сме render-нали нещо и след това ще render-нем нещо
                    (this.model.phone && (this.model.fax || this.model.eMail || this.model.url)) && <br />
                }

                {this.model.fax && (this.getResource('GL_FAX_L') + ': ' + this.model.fax)}
                {
                    // слагаме <br/> само ако след последния <br/> сме render-нали нещо и след това ще render-нем нещо
                    (this.model.fax && (this.model.eMail || this.model.url)) && <br />
                }

                {this.model.eMail && (this.getResource('GL_APP_EMAIL_ADDRESS_L') + ': ' + this.model.eMail)}
                {
                    // слагаме <br/> само ако след последния <br/> сме render-нали нещо и след това ще render-нем нещо
                    (this.model.eMail && this.model.url) && <br />
                }

                {this.model.url && (this.getResource('GL_WEB_PAGE_L') + ': ' + this.model.url)}
            </div>
        );
    }
}
import { UrlHelper, ObjectHelper } from 'Cnsys.Core';
import { BaseProps } from 'Cnsys.UI.React';
import { Button, EPZEUBaseComponent } from 'EPZEU.Core';
import { Constants, SubUICTypes } from 'EPZEU.CR.Core';
import { observable } from "mobx";
import { observer } from 'mobx-react';
import * as React from 'react';
import { SubDeedSummary } from '../../Models/SubDeedSummary';

export interface SubDeedChoiceUIProps extends BaseProps {
    uic: string;
    subDeeds: SubDeedSummary[];
    onSubDeedSelected: (subDeed: SubDeedSummary) => void;
    onSubDeedSelectionRejected: () => void;
    subDeedTitleLabel: string;
    subDeedDescriptionLabel: string;
    subUICType: SubUICTypes;
}

@observer export class SubDeedChoiceUI extends EPZEUBaseComponent<SubDeedChoiceUIProps, any> {

    @observable private _selectedSubDeed: SubDeedSummary;

    constructor(props?: SubDeedChoiceUIProps) {
        super(props);

        this.onContinue = this.onContinue.bind(this);
        this._selectedSubDeed = new SubDeedSummary();
    }

    render(): JSX.Element {
        return (
            <>
                <div className="help-text">{this.props.subDeedTitleLabel}</div>
  
                {this.renderSubDeeds()}
                    <div className="button-bar button-bar--form" key="button_bar">
                        <div className="left-side" key="rejecy_button">
                            <Button type="button" className="btn btn-secondary" lableTextKey={"GL_REFUSE_L"} onClick={this.props.onSubDeedSelectionRejected}></Button>
                        </div>
                        <div className="right-side" key="accept_key">
                            <Button type="btn btn-primary" className="btn btn-primary" lableTextKey={"GL_CONTINUE_L"} onClick={this.onContinue}></Button>
                        </div>
                </div>
            </>
        );
    }

    private renderSubDeeds(): JSX.Element {
        return (
            <div className="table-responsive-block">
                <table className="table table-borderless table-striped table-hover">
                    <thead key="thead">
                        <tr key="headrow">
                            <th key="radio_th"></th>
                            <th key="branch_th">{this.props.subDeedDescriptionLabel}</th>
                            <th key="buttons_th"></th>
                        </tr>
                    </thead>
                    <tbody key="tbody_key">
                        {this.props.subDeeds.sort((a: SubDeedSummary, b: SubDeedSummary) => {
                            if (a.subUIC < b.subUIC)
                                return -1;
                            else if (a.subUIC > b.subUIC)
                                return 1;
                            else
                                return 0;
                        }).map((item, idx) => {
                            return (<tr key={idx + "_tr"}>
                                <td>
                                    <div className="custom-control custom-radio">
                                        <input className="custom-control-input" type="radio" id={item.subUIC} name="branches" value={item.subUIC} onChange={this.selectSubDeed.bind(this, item)} checked={this._selectedSubDeed.subUIC === item.subUIC} key={idx + "_radio"} />
                                        <label className="custom-control-label" htmlFor={item.subUIC}>
                                            <span className="d-sm-none">{this.getResource('GL_CHOICE_L')}</span>
                                        </label>
                                    </div>
                                </td>
                                <td className="w-100" onClick={this.selectSubDeed.bind(this, item)}>{item.name}</td>
                                <td className="buttons-td">
                                    <Button type="button" className="btn btn-secondary" onClick={this.openSubDeedInNewTab.bind(this, item)} title={this.getResource('GL_VIEW_L')}>
                                        <i className="ui-icon ui-icon-eye" aria-hidden="true"></i>
                                    </Button>
                                </td>
                            </tr>);
                        })}
                    </tbody>
                </table>
            </div>
        );
    }

    private openSubDeedInNewTab(subDeed: SubDeedSummary): void {
        let urlParams: any = {};
        urlParams['uic'] = this.props.uic;
        urlParams['subUIC'] = subDeed.subUIC;
        urlParams['subUICType'] = Number(subDeed.subUICType);
        let url = UrlHelper.generateLinkUrl(`~${Constants.PATHS.SUBDEEDPREVIEW}`) + '?' + $.param(urlParams);

        UrlHelper.openInNewTab(url);
    }

    private selectSubDeed(subDeed: SubDeedSummary): void {
        this._selectedSubDeed = subDeed;
    }

    private onContinue(): void {
        if (!ObjectHelper.isStringNullOrEmpty(this._selectedSubDeed.subUIC))
            this.props.onSubDeedSelected(this._selectedSubDeed);
    }
}
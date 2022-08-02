import * as React from "react";
import { observer } from "mobx-react";
import { action } from "mobx";
import { BaseProps } from "Cnsys.UI.React";
import { EPZEUBaseComponent, toggleMobileMenu } from "EPZEU.Core";
import { ActiveConditionMenu } from "../../Models/ActiveConditionMenu";
import { ActiveConditionMenuItem } from "../../Models/ActiveConditionMenuItem";


export interface ActiveConditionMenuUIProps extends BaseProps {
    onClickMenuOptionCallback: (idx: number) => void;
}

@observer export class ActiveConditionMenuUI extends EPZEUBaseComponent<ActiveConditionMenuUIProps, ActiveConditionMenu> {
    constructor(props?: ActiveConditionMenuUIProps) {
        super(props);

        this.menuOptionClick = this.menuOptionClick.bind(this);
    }

    render(): JSX.Element {
        let that = this;
        let result: any = null;

        if (this.model && this.model.items && this.model.items.length > 0) {
            result = (
                <div className="nav-wrapper">
                    <nav className="page-nav page-nav--without-state">
                        <ul className="nav-section" onClick={toggleMobileMenu.bind(this, true)}>
                            {this.model.items.map(function (item: ActiveConditionMenuItem, idx: number) {
                                return (
                                    <li key={idx} value={item.value}>
                                        <a href="javascript:;" className={"nav-item nav-link" + (item.isActive ? ' active' : '')} onClick={(e: any) => { that.menuOptionClick(item.value); }}>
                                            <div className="nav-item-title">{item.text}</div>
                                        </a>
                                    </li>);
                            })}
                        </ul>
                    </nav>
                </div>);
        }

        return result;
    }

    @action private menuOptionClick(menuOptValue: number): void {
        for (let i: number = 0; i < this.model.items.length; i++) {
            this.model.items[i].isActive = menuOptValue == i ? true : false;
        }

        this.props.onClickMenuOptionCallback(menuOptValue);
    }
}
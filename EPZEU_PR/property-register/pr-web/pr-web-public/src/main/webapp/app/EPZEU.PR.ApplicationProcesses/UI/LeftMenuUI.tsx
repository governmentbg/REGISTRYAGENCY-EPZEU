import * as React from 'react';
import { EPZEUBaseComponent } from 'EPZEU.Core';
import { BaseProps } from 'Cnsys.UI.React';
import { ApplicationSection, SectionState } from '.';

interface LeftMenuUIProps extends BaseProps {
  sections: ApplicationSection[];
  reRender: boolean;
  onChangeSection: (sectionName: string, anchor?: string) => void;
}

export class LeftMenuUI extends EPZEUBaseComponent<LeftMenuUIProps, any> {

  constructor(props?: LeftMenuUIProps) {
    super(props);
  }

  render(): JSX.Element {
    //Използва се за да се презареди менюто след минаване на async Валидацията.
    let reRenderMenu = this.props.reRender;
    return (
      <div className="nav-wrapper collapse">
        <nav className="page-nav page-nav--sticky">
          <ul className="nav-section">
            {this.renderMenuItems()}
          </ul>
        </nav>
      </div>
    );
  }

  renderMenuItems(): JSX.Element[] {
    var menuItemsUI = [];
    for (var section of this.props.sections) {
      if (!section.applicationMenuNavItems[0].readonly) {
        menuItemsUI.push(this.renderMenuItem(section));
      }
    }

    return menuItemsUI;
  }

  renderMenuItem(section: ApplicationSection) {
    //Ако има нужда от котви за в бъдеще ще се рисуват всички applicationMenuNavItems
    if (section.isCurrent) {
      return (
        <li key={"main_menu_item_" + section.name}>
          <a href="javascript:;" onClick={() => { this.props.onChangeSection(section.name) }} className="nav-item nav-link active">
            <div className="nav-item-state">
              {section.state == SectionState.Completed && <i className="ui-icon ui-icon-processed" />}
              {section.state == SectionState.WithError && <i className="ui-icon ui-icon-error" />}</div>
            <div className="nav-item-title">{section.applicationMenuNavItems[0].label}</div>
            <div className="nav-item-action"></div>
          </a>
        </li>)
    } else {
      return (
        <li key={"main_menu_item_" + section.name}>
          <a href="javascript:;" onClick={() => { this.props.onChangeSection(section.name) }} className="nav-item nav-link">
            <div className="nav-item-state">
              {section.state == SectionState.Completed && <i className="ui-icon ui-icon-processed" />}
              {section.state == SectionState.WithError && <i className="ui-icon ui-icon-error" />}
            </div>
            <div className="nav-item-title">{section.applicationMenuNavItems[0].label}</div>
            <div className="nav-item-action"></div>
          </a>
        </li>)
    }
  }
}

import { BaseProps } from 'Cnsys.UI.React';
import { observer } from 'mobx-react';
import * as React from 'react';
import { EPZEUBaseComponent } from './EPZEUBaseComponent';

interface MobileMenuToggleProps extends BaseProps {
    scrollTopOnClick?: boolean;
}

@observer export class MobileMenuToggle extends EPZEUBaseComponent<MobileMenuToggleProps, any> {

    private scrollTopOnClick: boolean;

    constructor(props?: MobileMenuToggleProps) {
        super(props);

        this.scrollTopOnClick = this.props.scrollTopOnClick === true ? true : false;
    }

    render(): JSX.Element {

        return <button id="show_menu" className="button-menu d-md-none" onClick={toggleMobileMenu.bind(this, this.scrollTopOnClick)}>
            <i className="ui-icon ui-icon-sub-menu" aria-hidden="true"></i>
        </button>
    }
}

export function toggleMobileMenu(scrollTop?: boolean) {
    if (scrollTop)
        scrollTo(0, 0);

    let mobileMenubtn = $('#show_menu');

    if (mobileMenubtn.css('display') != 'none') {
        mobileMenubtn.toggleClass('collapsed');

        let navWrapper = $('.nav-wrapper');

        if (navWrapper.length > 0) {
            let navWrapperEl = $(navWrapper[0]);

            navWrapperEl.slideToggle('fast', function () {
                navWrapperEl.toggleClass('show');
            });
        }
    }
}
import * as React from 'react';
import { Button } from 'EPZEU.Core';

export interface LayoutUIProps {
    children?: React.ReactNode;
}

export class LayoutUI extends React.Component<LayoutUIProps, any> {
    render() {
        return (
            <div id="content-wrapper" className="layout-wrapper">
              <div className="header-wrapper">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col">
                      <h1 className="page-header__title">Page title goes here</h1>
                    </div>
                    <div className="col-auto d-md-none">
                      <Button id="show_menu" className="button-menu">
                        <i className="ui-icon ui-icon-menu" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-wrapper">
                {this.props.children}
              </div>
            </div>
        );
    }
}

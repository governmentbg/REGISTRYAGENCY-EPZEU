import { BaseProps, withAsyncFrame, AsyncUIProps } from "Cnsys.UI.React";
import { breadcrumb, BreadcrumbUI, EPZEUBaseComponent } from "EPZEU.Core";
import { observable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";

export interface PageHeaderUIProps extends BaseProps, AsyncUIProps {
  currentPath: string;
}

@observer class PageHeaderImpl extends EPZEUBaseComponent<PageHeaderUIProps, any> {

  @observable breadcrumbItems: { path: string; text: string; showMainNodeOnly: boolean; isInternal: boolean }[] = [];
  breadcrumbNodesCount = 0;

  constructor(props: PageHeaderUIProps) {
    super(props);

    this.componentDidUpdate = this.componentDidUpdate.bind(this);

    this.props.registerAsyncOperation(breadcrumb.getBreadcrumbItems(this.props.currentPath).bind(this).then(bn => {
      this.breadcrumbNodesCount = breadcrumb.breadcrumbNodesCount;
      this.breadcrumbItems = bn;
    }));
  }

  componentDidUpdate(prevProps: PageHeaderUIProps, prevState: PageHeaderUIProps): void {
    if (prevProps.currentPath != this.props.currentPath ||
      this.breadcrumbNodesCount != breadcrumb.breadcrumbNodesCount) {

      this.props.registerAsyncOperation(breadcrumb.getBreadcrumbItems(this.props.currentPath).bind(this).then(bn => {
        this.breadcrumbNodesCount = breadcrumb.breadcrumbNodesCount;
        this.breadcrumbItems = bn;
      }));
    }
  }

  render() {
    //Use for rerender
    var count = breadcrumb.breadcrumbNodesCount;

    if (this.breadcrumbItems.length == 0)
      return null;

    return (
      <div className="page-header-wrapper">
        <BreadcrumbUI breadcrumbItems={this.breadcrumbItems} />
        <div className="section-wrapper">
          <div className="fixed-content-width">
            <div className="page-header">
              <div className="row">
                <div className="col">
                  <h1 className="page-title">
                    {this.breadcrumbItems[0].text}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>);
  }
}
export const PageHeaderUI = withAsyncFrame(PageHeaderImpl);

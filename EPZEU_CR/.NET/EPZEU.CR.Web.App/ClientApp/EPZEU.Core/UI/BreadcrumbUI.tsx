import * as React from "react";
import { EPZEUBaseComponent } from "./EPZEUBaseComponent";
import { BaseProps } from "Cnsys.UI.React";
import { Link } from "react-router-dom";

export interface BreadcrumbUIProps extends BaseProps {
    breadcrumbItems: { path: string; text: string; showMainNodeOnly: boolean; isInternal: boolean }[];
}

export class BreadcrumbUI extends EPZEUBaseComponent<BreadcrumbUIProps, any> {

    render() {
        if (this.props.breadcrumbItems[0].showMainNodeOnly) {
            return null;
        }

        var navItems = [];

        for (var i = this.props.breadcrumbItems.length - 1; i > 0; i--) {
            navItems.push(
                <li className="breadcrumb-item" key={this.props.breadcrumbItems[i].path}>
                    {this.props.breadcrumbItems[i].isInternal ?
                        <Link to={this.props.breadcrumbItems[i].path}>{this.props.breadcrumbItems[i].text}</Link> :
                        <a href={this.props.breadcrumbItems[i].path}>{this.props.breadcrumbItems[i].text}</a>
                    }
                </li>);
        }

        navItems.push(
            <li className="breadcrumb-item active" aria-current="page" key={this.props.breadcrumbItems[i].path}>
                {this.props.breadcrumbItems[0].text}
            </li>);

        return (
            <div className="breadcrumbs">
                <div className="fixed-content-width">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            {navItems}
                        </ol>
                    </nav>
                </div>
            </div>);
    }
}
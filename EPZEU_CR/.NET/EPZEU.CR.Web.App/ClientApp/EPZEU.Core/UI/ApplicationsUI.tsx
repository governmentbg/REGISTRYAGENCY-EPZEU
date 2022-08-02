import { ObjectHelper } from 'Cnsys.Core';
import { AsyncUIProps, BaseProps, RawHTML, withAsyncFrame } from 'Cnsys.UI.React';
import { observable } from 'mobx';
import { observer } from "mobx-react";
import * as React from "react";
import { Link } from 'react-router-dom';
import { CMS } from "../Cache/CMS";
import { ApplicationType, Page, PageTypes, Registers } from "../Models";
import { EPZEUBaseComponent } from "./EPZEUBaseComponent";

interface ApplicationsUIProps extends BaseProps, AsyncUIProps {
    register: Registers;
    getApplicationPath: (appType: ApplicationType) => string;
}

@observer class ApplicationsUIImpl extends EPZEUBaseComponent<ApplicationsUIProps, any> {

    @observable private _pagesInternal: Page[];
    private cmpUniqueId: string;

    constructor(props: ApplicationsUIProps) {
        super(props)

        this.cmpUniqueId = ObjectHelper.newGuid();

        this.renderApplications = this.renderApplications.bind(this);
        this.renderGroups = this.renderGroups.bind(this);

        this.onCollapse = this.onCollapse.bind(this);

        this.props.registerAsyncOperation(CMS.getPages(pg => pg.type == PageTypes.Application && pg.registerID == this.props.register).bind(this).then(pages => {
            this._pagesInternal = pages;
        }))
    }

    render() {
        let result: JSX.Element[] = null;

        if (this._pagesInternal != null && this._pagesInternal != undefined && this._pagesInternal.length > 0) {
            let sortedRoots = this._pagesInternal.filter(pageInt => pageInt.parentID == null).sort((pageA: Page, pageB: Page) => pageA.orderNum > pageB.orderNum ? 1 : -1);

            if (sortedRoots != null && sortedRoots != undefined && sortedRoots.length > 0) {

                result = sortedRoots.map((page, index) => {
                    return (
                        <div key={index} id="main-wrapper" className="main-wrapper">
                            <div className="page-wrapper">

                                <div className="section-wrapper section-wrapper--margins">
                                    <div className="fixed-content-width">
                                        {!ObjectHelper.isStringNullOrEmpty(page.content) &&
                                            <div className="card card-page">
                                                <RawHTML divClassname="card-body card-page__body" rawHtmlText={page.content} />
                                            </div>}


                                        {this.renderGroups(page.pageID, index)}
                                        <div className="pb-4"></div>
                                        {this.renderApplications(page.pageID, index)}
                                    </div>
                                </div>
                            </div>
                        </div>)
                });
            }
        }

        return result;
    }

    renderGroups(parentPageID: number, parentIndex: any) {
        let sortedApplications = this._pagesInternal.filter(pageInt => pageInt.parentID == parentPageID && pageInt.isGroup == true)
            .sort((pageA: Page, pageB: Page) => pageA.orderNum > pageB.orderNum ? 1 : -1);

        return (sortedApplications != null && sortedApplications != undefined && sortedApplications.length > 0 ?
            sortedApplications.map((page, index) => {
                let currentIndex = parentIndex + "_" + index;
                return (
                    <section key={currentIndex} className="card card-page card--collapsible">

                        <div className="card-header card-page__header collapsed" id={"triger" + currentIndex + this.cmpUniqueId} style={{ cursor: 'pointer' }}
                            onClick={() => { this.onCollapse("collapsable-content-1" + "_" + currentIndex + this.cmpUniqueId, "triger" + currentIndex + this.cmpUniqueId) }}>
                            <h2 className="section-title section-title--page">
                                {page.title}
                            </h2>
                            <button className="system-button toggle-collapse">
                                <i className="ui-icon ui-icon-chevron-up" aria-hidden="true"></i>
                            </button>
                        </div>

                        <div id={"collapsable-content-1" + "_" + currentIndex + this.cmpUniqueId} className="collapse">

                            <div className="card-body card-page__body">

                                <RawHTML rawHtmlText={page.content} />
                                {this.renderApplications(page.pageID, currentIndex)}
                            </div>
                        </div>

                    </section>)

            }) : null
        );
    }

    renderApplications(parentPageID: number, parentIndex: any) {
        let sortedApplications = this._pagesInternal.filter(pageInt => pageInt.parentID == parentPageID && pageInt.isGroup != true)
            .sort((pageA: Page, pageB: Page) => pageA.orderNum > pageB.orderNum ? 1 : -1);


        return (sortedApplications != null && sortedApplications != undefined && sortedApplications.length > 0 ?
            <div className="card card-box">

                <div className="card-body card-box__body">
                    <nav className="box-nav">
                        <ul className="box-nav-container">
                            {sortedApplications.map((page, index) => {

                                return (

                                    <li key={parentIndex + "_" + index}>
                                        {page.applicationType &&
                                            <Link
                                            to={(this.props.getApplicationPath(page.applicationType))}
                                                className='box-nav-item'>
                                                {page.applicationType.appCode &&
                                                    <><span className="box-nav-code">{page.applicationType.appCode}</span> &nbsp;</>
                                                }
                                                {page.applicationType.name}
                                            </Link>
                                        }
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>
                </div>
            </div> : null
        );
    }

    private onCollapse(targetId: string, trigerId: string): void {
        $('#' + trigerId).toggleClass('collapsed');
        $('#' + targetId).slideToggle();
    }
}

export const ApplicationsUI = withAsyncFrame(ApplicationsUIImpl);
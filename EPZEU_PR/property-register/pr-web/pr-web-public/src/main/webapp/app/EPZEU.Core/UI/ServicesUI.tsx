import { ObjectHelper } from "Cnsys.Core";
import { AsyncUIProps, BaseProps, RawHTML, withAsyncFrame } from "Cnsys.UI.React";
import { observable } from 'mobx';
import { observer } from "mobx-react";
import * as React from "react";
import { Link } from "react-router-dom";
import { CMS } from "../Cache/CMS";
import { Page, PageTypes, Registers } from "../Models";
import { EPZEUBaseComponent } from "./EPZEUBaseComponent";

interface ServicesUIProps extends BaseProps, AsyncUIProps {
    register: Registers;
    servicePath: string;
}

@observer class ServicesUIImpl extends EPZEUBaseComponent<ServicesUIProps, any> {

    @observable private _pagesInternal: Page[];
    private cmpUniqueId: string;

    constructor(props: ServicesUIProps) {
        super(props)
        this.cmpUniqueId = ObjectHelper.newGuid();

        this.renderServices = this.renderServices.bind(this);
        this.renderTwoPagedServices = this.renderTwoPagedServices.bind(this);
        this.renderGroups = this.renderGroups.bind(this);
        this.renderServiceLink = this.renderServiceLink.bind(this);
        this.onCollapse = this.onCollapse.bind(this);

        this.props.registerAsyncOperation(CMS.getPages(pg => pg.type == PageTypes.Service && pg.registerID == this.props.register).bind(this).then(pages => {
            this._pagesInternal = pages;
        }));
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
                                            </div>
                                        }

                                        {this.renderGroups(page.pageID, index)}
                                        <div className="pb-4"></div>
                                        {this.renderServices(page.pageID, index)}
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
        let sortedServices = this._pagesInternal.filter(pageInt => pageInt.parentID == parentPageID && pageInt.isGroup == true)
            .sort((pageA: Page, pageB: Page) => pageA.orderNum > pageB.orderNum ? 1 : -1);

        return (sortedServices != null && sortedServices != undefined && sortedServices.length > 0 ?
            sortedServices.map((page, index) => {
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
                                {this.renderTwoPagedServices(page.pageID, currentIndex)}
                            </div>
                        </div>

                    </section>)

            }) : null
        );
    }

    renderTwoPagedServices(parentPageID: number, parentIndex: any) {
        let sortedServices = this._pagesInternal.filter(pageInt => pageInt.parentID == parentPageID && pageInt.isGroup != true)
            .sort((pageA: Page, pageB: Page) => pageA.orderNum > pageB.orderNum ? 1 : -1);

        return (sortedServices != null && sortedServices != undefined && sortedServices.length > 0 ?
            <div className="card-deck">

                <div className="card card-box">

                    <div className="card-body card-box__body">
                        <nav className="box-nav">
                            <ul className="box-nav-container box-nav-container--large-text">
                                {sortedServices.filter((item, idx) => idx < (sortedServices.length / 2)).map((page, index) => {

                                    return (
                                        <li key={parentIndex + "_a_" + index}>
                                            {this.renderServiceLink(page)}
                                        </li>
                                    )
                                })}
                            </ul>
                        </nav>
                    </div>
                </div>
                {(sortedServices.length != 1 ?
                    <>
                        <div className="w-100 d-none d-sm-block d-lg-none mt-2"></div>
                        <div className="card card-box">
                            <div className="card-body card-box__body">
                                <nav className="box-nav">
                                    <ul className="box-nav-container box-nav-container--large-text">
                                        {sortedServices.filter((item, idx) => idx >= (sortedServices.length / 2)).map((page, index) => {

                                            return (

                                                <li key={parentIndex + "_b_" + index}>
                                                    {this.renderServiceLink(page)}
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </nav>
                            </div>
                        </div></> : null)}

            </div> : null
        );
    }

    renderServices(parentPageID: number, parentIndex: any) {
        let sortedServices = this._pagesInternal.filter(pageInt => pageInt.parentID == parentPageID && pageInt.isGroup != true)
            .sort((pageA: Page, pageB: Page) => pageA.orderNum > pageB.orderNum ? 1 : -1);

        return (sortedServices != null && sortedServices != undefined && sortedServices.length > 0 ?
            <div className="card card-box">
                <div className="card-body card-box__body">
                    <nav className="box-nav">
                        <ul className="box-nav-container box-nav-container--large-text">
                            {sortedServices.map((page, index) => {
                                return (
                                    <li key={parentIndex + "_" + index}>
                                        {this.renderServiceLink(page)}
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>
                </div>
            </div> : null
        );
    }

    renderServiceLink(page: Page) {
        return (
            <Link to={page.serviceID ? this.props.servicePath.replace(':serviceID', page.serviceID.toString()) : ""} className='box-nav-item'>
                {page.service && page.service.serviceNumber ?
                    <><span className="box-nav-number">{page.service.serviceNumber}</span>&nbsp;</>
                    : null}
                {page.service && page.service.name}
                {page.service && page.service.shortDescription ?
                    <p className="box-nav-text">
                        {page.service.shortDescription}
                    </p>
                    : null}
            </Link>
        );
    }

    private onCollapse(targetId: string, trigerId: string): void {
        $('#' + trigerId).toggleClass('collapsed');
        $('#' + targetId).slideToggle();
    }
}

export const ServicesUI = withAsyncFrame(ServicesUIImpl); 

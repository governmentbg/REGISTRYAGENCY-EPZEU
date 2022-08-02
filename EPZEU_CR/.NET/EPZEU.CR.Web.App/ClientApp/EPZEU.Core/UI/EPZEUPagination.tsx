import { ObjectHelper } from 'Cnsys.Core';
import { BaseProps } from 'Cnsys.UI.React';
import { observer } from 'mobx-react';
import * as React from 'react';
import { EPZEUBaseComponent } from './EPZEUBaseComponent';

interface EPZEUPaginationProps extends BaseProps {
    activePage: number;
    pagesCount: number;
    count: number;
    maxVisiblePage: number;
    onSelect: (page: number) => void;
    size?: string;
    aditionalCssClass?: string;
}

@observer export class EPZEUPagination extends EPZEUBaseComponent<EPZEUPaginationProps, any> {
    private firstVisiblePage: number;
    private lastVisiblePage: number;
    private activeElement: HTMLAnchorElement;
    private navElementId: string;

    constructor(props?: EPZEUPaginationProps) {
        super(props);

        this.activeElement = undefined;
        this.navElementId = ObjectHelper.newGuid();

        this.calcPageWindowLimits = this.calcPageWindowLimits.bind(this);
        this.onClickPaginationLink = this.onClickPaginationLink.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.drawPages = this.drawPages.bind(this);
    }

    render(): JSX.Element {
        if (this.props.pagesCount == 0) return null;

        return (
            <nav id={this.navElementId} className={ObjectHelper.isNullOrUndefined(this.props.aditionalCssClass) ? "pagination-container pagination-container--page-bottom" : "pagination-container " + this.props.aditionalCssClass} aria-label="Page navigation" >
                <div className="result-count">
                    {this.getResource('GL_TOTAL_L')}:&nbsp;{this.props.count}
                </div>
                {this.props.pagesCount > 1 ?
                    <ul className="pagination pagination--page">
                        {this.drawPages()}
                    </ul>
                    : null}
            </nav>
        );
    }

    componentDidUpdate(prevProps: any) {   
        if (this.activeElement) {
            let mustFocuseActiveElement: boolean = !($('#' + this.navElementId).hasClass("pagination-container--page-bottom"));

            if (mustFocuseActiveElement) {
                this.activeElement.focus();
            }
        }
    }

    private onClickPaginationLink(e: any): void {
        let toPage = Number(e.currentTarget.getAttribute('data-go-to-page'));
        this.props.onSelect(toPage);
    }

    private drawPages(): any[] {
        let pageItems: any[] = [];
        let key: number = 0;

        this.calcPageWindowLimits();

        if (this.props.activePage > 1) {
            pageItems.push(
                <li className="page-item first" key={++key}>
                    <a className="page-link" href="javascript://" aria-label="First" data-go-to-page="1" onClick={this.onClickPaginationLink}>
                        <span aria-hidden="true">«</span>
                        <span className="sr-only">First</span>
                    </a>
                </li>);

            pageItems.push(
                <li className="page-item prev" key={++key}>
                    <a className="page-link" href="javascript://" aria-label="Previous" data-go-to-page={(this.props.activePage - 1)} onClick={this.onClickPaginationLink}>
                        <span aria-hidden="true">‹</span>
                        <span className="sr-only">Previous</span>
                    </a>
                </li>);
        } else {
            pageItems.push(
                <li className="page-item disabled" key={++key}>
                    <a className="page-link first" href="javascript://" aria-label="First">
                        <span aria-hidden="true">«</span>
                        <span className="sr-only">First</span>
                    </a>
                </li>);

            pageItems.push(
                <li className="page-item prev disabled" key={++key}>
                    <a className="page-link" href="javascript://" aria-label="Previous">
                        <span aria-hidden="true">‹</span>
                        <span className="sr-only">Previous</span>
                    </a>
                </li>);
        }

        for (let i: number = this.firstVisiblePage; i <= this.lastVisiblePage; i++) {
            if (i == this.props.activePage) {
                pageItems.push(
                    <li className="page-item active" key={++key}>
                        <a className="page-link" href="javascript://" ref={el => { this.activeElement = el; }}>{i}</a>
                    </li>
                );
            } else {
                pageItems.push(
                    <li className="page-item" key={++key}>
                        <a className="page-link" href="javascript://" data-go-to-page={i} onClick={this.onClickPaginationLink}>{i}</a>
                    </li>);
            }

        }

        if (this.props.activePage < this.props.pagesCount) {
            pageItems.push(
                <li className="page-item next" key={++key}>
                    <a className="page-link" href="javascript://" aria-label="Next" data-go-to-page={(this.props.activePage + 1)} onClick={this.onClickPaginationLink}>
                        <span aria-hidden="true">›</span>
                        <span className="sr-only">Next</span>
                    </a>
                </li>);

            pageItems.push(
                <li className="page-item last" key={++key}>
                    <a className="page-link" href="javascript://" aria-label="Last" data-go-to-page={(this.props.pagesCount)} onClick={this.onClickPaginationLink}>
                        <span aria-hidden="true">»</span>
                        <span className="sr-only">Last</span>
                    </a>
                </li>);
        } else {
            pageItems.push(
                <li className="page-item next disabled" key={++key}>
                    <a className="page-link" href="javascript://" aria-label="Next">
                        <span aria-hidden="true">›</span>
                        <span className="sr-only">Next</span>
                    </a>
                </li>);

            pageItems.push(
                <li className="page-item last disabled" key={++key}>
                    <a className="page-link" href="javascript://" aria-label="Last">
                        <span aria-hidden="true">»</span>
                        <span className="sr-only">Last</span>
                    </a>
                </li>);
        }

        return pageItems;
    }

    private calcPageWindowLimits(): void {
        let centerPageWindow: number = (this.props.maxVisiblePage % 2) == 0 ? (this.props.maxVisiblePage / 2) : Math.ceil(this.props.maxVisiblePage / 2);

        if (this.props.activePage <= centerPageWindow) {
            this.firstVisiblePage = 1;
            this.lastVisiblePage = this.props.pagesCount < this.props.maxVisiblePage ? this.props.pagesCount : this.props.maxVisiblePage;
        } else {
            if (this.props.activePage >= this.props.pagesCount - centerPageWindow) {
                this.firstVisiblePage = 1 + (this.props.activePage - centerPageWindow);
                this.lastVisiblePage = this.props.pagesCount;
            } else {
                this.firstVisiblePage = 1 + (this.props.activePage - centerPageWindow);
                this.lastVisiblePage = this.props.pagesCount < this.props.maxVisiblePage ? this.props.pagesCount : this.props.maxVisiblePage + (this.props.activePage - centerPageWindow);
            }
        }
    }
}
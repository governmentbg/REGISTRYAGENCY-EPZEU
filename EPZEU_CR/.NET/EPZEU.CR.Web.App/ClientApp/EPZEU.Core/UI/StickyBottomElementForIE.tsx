import * as React from 'react';
import { UIHelper, ObjectHelper } from 'Cnsys.Core';

export interface StickyBottomElementProps {
    stickyElementId: string;

    /**Външен елемент, от който да се изчислява долния отстъп на задействане на стики елемента. */
    outerElementId: string;
}

export class StickyBottomElementForIE extends React.Component<StickyBottomElementProps, any>{

    private isBrowserCompatibleWithSticky: boolean;
    private isActive: boolean;
    private currentElement: HTMLElement;
    private parentElement: HTMLElement;
    private offsetBottom: number;
    private clone: any;
    private clonedId: string;
    private parentWidth: number;
    private parentHeight: number;
    private checkResizedParentTimeout: number;

    constructor(props: StickyBottomElementProps) {
        super(props);

        this.calculateFixedItemPossition = this.calculateFixedItemPossition.bind(this);
        this.onResize = this.onResize.bind(this);

        this.init();
    }

    //#region Reacts Lifecycle events

    componentDidMount() {

        if (!this.isBrowserCompatibleWithSticky) {
            this.currentElement = document.getElementById(this.props.stickyElementId);
            this.parentElement = this.currentElement.parentElement;

            this.clone = this.currentElement.cloneNode(true);
            $(this.clone).removeAttr("id");
            $(this.clone).attr("id", this.clonedId);
            $(this.clone).css("position", "static");
            $(this.clone).addClass("invisible");
            this.offsetBottom = this.calcBottomOffset();
            this.calculateFixedItemPossition();

            window.addEventListener('scroll', this.calculateFixedItemPossition);
            window.addEventListener('resize', this.onResize);
            this.checkForResizedParentPeriodically();
        }
    }

    componentWillUnmount() {
        if (!this.isBrowserCompatibleWithSticky) {
            window.removeEventListener('scroll', this.calculateFixedItemPossition);
            window.removeEventListener('resize', this.onResize);
            clearTimeout(this.checkResizedParentTimeout);
        }
    }

    //#endregion

    //#region Renders

    render() {
        return <>{this.props.children}</>
    }

    //#endregion

    //#region Helpers

    private init() {
        this.isBrowserCompatibleWithSticky = UIHelper.isBrowserCompatibleWithPositionSticky();
        this.isActive = false;
        this.clonedId = ObjectHelper.newGuid();
    }

    private calculateFixedItemPossition() {

        const scrollBottom = $(document).height() - $(window).height() - $(window).scrollTop();

        if ((this.offsetBottom < scrollBottom) && !this.isActive && this.isOutOfViewport())
            this.activateSticky();
        else if ((this.offsetBottom >= scrollBottom) && this.isActive)
            this.deactivateSticky();
    }

    private activateSticky() {
        this.isActive = true;
        $(this.clone).appendTo(this.parentElement);
        $(this.currentElement).css("width", this.currentElement.offsetWidth);
        $(this.currentElement).css("position", "fixed");
    }

    private deactivateSticky() {
        this.isActive = false;
        $(`#${this.clonedId}`).remove();
        $(this.currentElement).css("position", "relative");
        $(this.currentElement).css("width", "");
    }

    private calcBottomOffset() {

        return $(document).height() - (this.parentElement.getBoundingClientRect().bottom + window.pageYOffset);
    }

    private onResize() {

        this.offsetBottom = this.calcBottomOffset();

        this.calculateFixedItemPossition();

        if (this.isActive)
            $(this.currentElement).css("width", this.parentElement.offsetWidth);
    }

    private isOutOfViewport() {
        let bounding = this.currentElement.getBoundingClientRect(); //Get element's bounding
        let out: any = {}; //Check if it's out of the viewport on each side

        out.top = bounding.top < 0;
        out.left = bounding.left < 0;
        out.bottom = bounding.bottom > (window.innerHeight || document.documentElement.clientHeight);
        out.right = bounding.right > (window.innerWidth || document.documentElement.clientWidth);

        return out.top || out.left || out.bottom || out.right;
    };

    private checkForResizedParentPeriodically() {
        let that = this;

        that.checkResizedParentTimeout = setTimeout(() => {
        
            that.checkForResizedParentPeriodically();

            if (that.parentWidth != that.parentElement.clientWidth || that.parentHeight != that.parentElement.clientHeight) {
                that.parentWidth = that.parentElement.clientWidth;
                that.parentHeight = that.parentElement.clientHeight;

                that.onResize();
            }

        }, 1000)
    }

    //#endregion
}
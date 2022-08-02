import * as React from "react";
import { observer } from "mobx-react";
import { action } from "mobx";
import * as moment from 'moment';
import { ObjectHelper, UrlHelper } from "Cnsys.Core";
import { EPZEUBaseComponent } from "EPZEU.Core";
import { Constants } from "../../Constants";
import { withAsyncFrame, AsyncUIProps, BaseRouteProps, BaseRoutePropsExt, withRouter } from "Cnsys.UI.React";
import { ActiveConditionSearchUI } from "./ActiveConditionSearchUI";
import { ActiveConditionSearch } from "../../Models/ActiveConditionSearch";
import { ActiveConditionSearchValidator } from "../../Models/Validation/ActiveConditionSearchValidator";

interface ActiveConditionProps extends BaseRouteProps<any>, AsyncUIProps, BaseRoutePropsExt {
}

@observer class ActiveConditionUIImpl extends EPZEUBaseComponent<ActiveConditionProps, null> {
    private searchCriteria: ActiveConditionSearch;
    private searchCriteriaValidator: ActiveConditionSearchValidator;

    constructor(props: ActiveConditionProps) {
        super(props);

        this.searchCriteriaValidator = new ActiveConditionSearchValidator();
        this.searchCriteria = !ObjectHelper.isStringNullOrEmpty(this.props.location.search) ? this.getSearchCriteriaFromUrl() : new ActiveConditionSearch();

        this.searchInternal = this.searchInternal.bind(this);
        this.onSearchResult = this.onSearchResult.bind(this);
        this.convertSearchCriteriaToUrlParams = this.convertSearchCriteriaToUrlParams.bind(this);

        if (!ObjectHelper.isStringNullOrEmpty(this.props.location.search)) {
            this.searchCriteria = this.getSearchCriteriaFromUrl();
            //this.searchInternal();
        }
    }

    render(): JSX.Element {
        return (
            <>
                <ActiveConditionSearchUI onSearchCallback={this.onSearchResult} {...this.bind(this.searchCriteria, 'searchCriteria', [this.searchCriteriaValidator])} />
            </>);
    }

    private onSearchResult() {
        this.searchInternal();
    }

    @action private searchInternal(): void {
        let that = this;
        this.searchCriteria.entryDate = moment.isMoment(this.searchCriteria.entryDate) ? this.searchCriteria.entryDate.endOf('day') : moment().endOf('day');

        if (this.searchCriteriaValidator.validate(this.searchCriteria)) {
            let urlParams = this.convertSearchCriteriaToUrlParams();
            that.props.routerExt.changeParams(urlParams);
            let url = UrlHelper.generateLinkUrl(`~${Constants.PATHS.ACTIVE_CONDITION_RESULT}`) + '?' + $.param(urlParams);

            UrlHelper.openInNewTab(url);
        }
    }

    private getSearchCriteriaFromUrl(): ActiveConditionSearch {
        let searchCriteria = new ActiveConditionSearch();

        let uic = UrlHelper.getUrlParameter('uic');
        searchCriteria.uic = !ObjectHelper.isStringNullOrEmpty(uic) ? uic : undefined;

        let entryDate = UrlHelper.getUrlParameter('entryDate');
        searchCriteria.entryDate = !ObjectHelper.isStringNullOrEmpty(entryDate) ? moment(new Date(entryDate)) : moment().endOf('day');

        return searchCriteria;
    }

    private convertSearchCriteriaToUrlParams(): any {
        let urlParams: any = {};

        urlParams['uic'] = this.searchCriteria.uic;

        if (this.searchCriteria.entryDate && moment.isMoment(this.searchCriteria.entryDate)) {
            urlParams['entryDate'] = JSON.parse(JSON.stringify(this.searchCriteria.entryDate));
        }

        return urlParams;
    }
}

export const ActiveConditionUI = withRouter(withAsyncFrame(ActiveConditionUIImpl));
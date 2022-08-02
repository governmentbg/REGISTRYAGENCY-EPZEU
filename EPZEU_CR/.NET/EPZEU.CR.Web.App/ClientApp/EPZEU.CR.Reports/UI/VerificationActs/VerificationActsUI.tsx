import * as React from "react";
import { observer } from "mobx-react";
import { EPZEUBaseComponent } from "EPZEU.Core";
import { Constants } from "../../Constants";
import { withAsyncFrame, AsyncUIProps, BaseRouteProps, BaseRoutePropsExt, withRouter } from "Cnsys.UI.React";
import { VerificationActsSubSearchCriteria } from "../../Models/VerificationActsSubSearchCriteria";
import { VerificationActsSearchCriteria } from '../../Models/VerificationActsSearchCriteria';
import { VerificationActsSearchUI } from "./VerificationActsSearchUI";
import { ObjectHelper, UrlHelper } from "Cnsys.Core";
import { VerificationActsSearchCriteriaValidator } from "../../Models/Validation/VerificationActsSearchCriteriaValidator";
import { compressToEncodedURIComponent } from 'lz-string';

interface VerificationActsUIProps extends BaseRouteProps<any>, AsyncUIProps, BaseRoutePropsExt {
}

@observer class VerificationActsUIImpl extends EPZEUBaseComponent<VerificationActsUIProps, null> {
    private searchCriteria: VerificationActsSearchCriteria;

    constructor(props: VerificationActsUIProps) {
        super(props);

        this.searchCriteria = new VerificationActsSearchCriteria();
        this.searchCriteria.includeHistory = false;

        this.onSearchResult = this.onSearchResult.bind(this);
        this.convertSearchCriteriaToUrlParams = this.convertSearchCriteriaToUrlParams.bind(this);
    }

    render(): JSX.Element {
        return (
            <>
                <VerificationActsSearchUI onSearchCallback={this.onSearchResult} {...this.bind(this.searchCriteria, 'searchCriteria', [new VerificationActsSearchCriteriaValidator()])} />
            </>);
    }

    private onSearchResult(criteria: VerificationActsSubSearchCriteria): void {
        let urlParams = this.convertSearchCriteriaToUrlParams(criteria);
        let urlEncodedParams = $.param(urlParams);
        let baseUrl = UrlHelper.generateLinkUrl(`~${Constants.PATHS.VERIFICATION_ACTS_RESULT.replace(':uic', criteria.uic)}`)

        let url = baseUrl + '?' + urlEncodedParams;

        //TODO: да се вземе от конфигурация.
        if (url.length > 1200) {
            url = `${baseUrl}?criteria=${compressToEncodedURIComponent(urlEncodedParams)}`;
        }

        UrlHelper.openInNewTab(url);
    }

    private convertSearchCriteriaToUrlParams(criteria: VerificationActsSubSearchCriteria): any {
        let urlParams: any = {};

        if (criteria) {
            urlParams['selectedFields'] = criteria.selectedFields;
            urlParams['includeHistory'] = ObjectHelper.isNullOrUndefined(this.searchCriteria.includeHistory) ? false : this.searchCriteria.includeHistory;
        }

        return urlParams;
    }
}

export const VerificationActsUI = withRouter(withAsyncFrame(VerificationActsUIImpl));
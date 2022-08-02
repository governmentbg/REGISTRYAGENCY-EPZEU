import * as React from "react";
import * as ReactRouter from 'react-router-dom';
import { appConfig, BaseDataModel, ObjectHelper } from 'Cnsys.Core';
import { BaseComponent, BaseProps } from './'
import { stringify, parse } from 'query-string';

export interface BaseRouteProps<TParams> extends BaseProps, ReactRouter.RouteComponentProps<TParams> {
}

export interface BaseRouteParams {
}

export interface BaseRoutePropsExt {
    routerExt?: IRouterExt;
}

export interface IRouterExt {
    goTo(path: string, params: any): void;
    changeParams(params: any): void;
    mergeParamsTo(obj: any): void;
    hasParams(): any;
    getParams(): any;
    hasParamsChanged(obj: any): boolean;
    haveDifferences(obj: any, query: any): boolean;
    getOnBackEventName(): string;
}

export function withRouter<C extends React.ComponentClass<any>>(Component: C): C {

    var wrapper = class extends React.Component<BaseRouteProps<BaseRouteParams>, any> {
        constructor(props: BaseRouteProps<BaseRouteParams>) {
            super(props);
        }

        render() {
            return <Component {...this.props} routerExt={this} />
        }

        goTo(path: string, params: any): void {
            //Защото искаме да вземем само публичните пропъртита и е описано в ToJSON
            var paramsNew = JSON.parse(JSON.stringify(params))
            var hash = null;

            if (path.indexOf("#") >= 0) {
                hash = path.substring(path.indexOf("#") + 1);
                path = path.substring(0, path.indexOf("#"));
            }

            for (var key in paramsNew) {
                if (paramsNew[key] == null)
                    paramsNew[key] = undefined;
            }

            this.props.history.push({
                pathname: path,
                search: stringify(paramsNew, null),
                hash: hash
            });
        }

        changeParams(params: any): void {
            let path: string = this.props.location.pathname.replace(appConfig.baseUrlName, "");
            this.goTo(path, params);
        }

        mergeParamsTo(obj: any) {
            obj.copyFrom(parse(this.props.location.search))
        }

        hasParams(): any {
            return Object.keys(this.getParams()).length > 0;
        }

        getParams(): any {
            return parse(this.props.location.search);
        }

        hasParamsChanged(obj: any): boolean {
            var query = parse(this.props.location.search);
            for (var qProp in query) {
                for (var objProp in obj) {
                    if (qProp == objProp) {
                        if (query[qProp] != obj[qProp]) {
                            return true;
                        }
                    }
                }
            }

            return false;
        }

        haveDifferences(obj: any, query: any): boolean {
            for (var qProp in query) {
                for (var objProp in obj) {
                    if (qProp == objProp) {
                        if (query[qProp] != obj[qProp]) {
                            return true;
                        }
                    }
                }
            }

            return false;
        }

        getOnBackEventName() {
            return "popstate"
        }
    };

    return ReactRouter.withRouter(wrapper) as any;;
}

import * as React from "react";
import { DataServiceContext } from '../Common/DataServiceContext'

export function withDataServiceProvider<C extends React.ComponentClass<any>>(Component: C): any {
    return function (props: any) {
        return (
            <DataServiceContext.Consumer>
                {value => <Component {...props} dataSrvProvider={value.dataSrvProvider}>{props.children}</Component>}
            </DataServiceContext.Consumer>);
    }
}
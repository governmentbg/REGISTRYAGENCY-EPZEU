import * as React from "react";
import * as PropTypes from 'prop-types';
import { IApplicationFormManager } from "../../";




export interface ApplicationFormContextProviderProps {
  applicationManager?: IApplicationFormManager;
}

//TODO: Use new context https://reactjs.org/docs/context.html when new d.ts of @types/react is released
export class ApplicationFormContextProviderUI extends React.Component<ApplicationFormContextProviderProps, any>{

  constructor(props?: ApplicationFormContextProviderProps, context?: any) {
    super(props, context);
  }

  render(): JSX.Element {
    if (React.Children.count(this.props.children) <= 1)
      return React.Children.only(this.props.children);
    else
      return (<>{this.props.children} </>);
  }

  getChildContext() {
    return { applicationManager: this.props.applicationManager };
  }
}

(ApplicationFormContextProviderUI as any).childContextTypes = { applicationManager: PropTypes.object };


export interface ApplicationFormContextProps {
  applicationManager?: IApplicationFormManager;
}

export function withApplicationFormContext<C extends React.ComponentClass<ApplicationFormContextProps>>(Component: C, showError: boolean = true): C {

  class Wrapper extends React.Component<ApplicationFormContextProps, any> {

    constructor(props: ApplicationFormContextProps) {
      super(props);
    }

    render() {
      return (<Component {...this.props} applicationManager={this.context.applicationManager}>{this.props.children}</Component>);
    }
  }

  (Wrapper as any).displayName = `withApplicationFormContext(${Component.displayName || (Component as any).name || "Component"})`;
  (Wrapper as any).contextTypes = { applicationManager: PropTypes.object };

  return Wrapper as any;
}

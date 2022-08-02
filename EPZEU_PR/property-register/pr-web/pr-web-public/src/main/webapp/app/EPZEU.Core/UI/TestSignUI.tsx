import * as React from 'react';
import { EPZEUBaseComponent } from './EPZEUBaseComponent';
import { BaseProps } from '../../Cnsys.UI.React';
import { appConfig } from 'Cnsys.Core';

export interface TestSignUIProps extends BaseProps {   
    onTestSign: () => void;
}

export class TestSignUI extends EPZEUBaseComponent<TestSignUIProps, any> {
    render(): JSX.Element {
        if (appConfig.allowTestSign === true) {
            return <button type="button" className="btn btn-primary" onClick={this.props.onTestSign}>{this.getResource('GL_TEST_SIGNATURE_L')}</button>
        }

        return null;
    }
}
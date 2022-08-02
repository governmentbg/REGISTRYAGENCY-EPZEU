import * as React from "react";
import { ApplicationFormTypes } from "EPZEU.PR.Core";
import { moduleContext } from '../'


interface InfoProps {
    infoTextKey: string;
}

interface ApplicationTitleProps {
    appType: ApplicationFormTypes;
}

interface SectionTitleProps {
    titleKey: string;
    anchor?: string;
}

export function ApplicationInfoUI(props: InfoProps): JSX.Element {
    return (
        <div className="help-text">
            <p>{moduleContext.resourceManager.getResourceByKey(props.infoTextKey)}</p>
        </div>);
}

export function SectionInfoUI(props: InfoProps): JSX.Element {
    return (
        <div className="help-text">
            <p>{moduleContext.resourceManager.getResourceByKey(props.infoTextKey)}</p>
        </div>);
}

export function InputInfoUI(props: InfoProps): JSX.Element {
    return <div className="help-text-inline">{moduleContext.resourceManager.getResourceByKey(props.infoTextKey)}</div>;
}

export function SectionTitleUI(props: SectionTitleProps): JSX.Element {
    if (props.anchor) {
        return (
                <h2 className="section-title section-title--form" id={props.anchor}>{moduleContext.resourceManager.getResourceByKey(props.titleKey)}</h2>);
    }
    else {
        return (
            <div>
                <h2 className="section-title section-title--form">{moduleContext.resourceManager.getResourceByKey(props.titleKey)}</h2>
            </div>);
    }
}

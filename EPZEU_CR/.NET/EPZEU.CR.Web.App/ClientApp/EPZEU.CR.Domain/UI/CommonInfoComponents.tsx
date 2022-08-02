import { AsyncUIProps, withAsyncFrame } from 'Cnsys.UI.React';
import { Nomenclatures } from 'EPZEU.Core';
import { ApplicationFormTypes, ApplicationState, ApplicationStatuses } from 'EPZEU.CR.Core';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from "react";
import { moduleContext } from '../';

interface InfoProps {
    infoTextKey: string[];
}

interface ApplicationTitleProps extends AsyncUIProps {
    appType: ApplicationFormTypes;
    alternativeCode?: string;
    alternativeTitle?: string;
}

interface SectionTitleProps {
    titleKey?: string;
    title?: string;
    anchor?: string;
    isForPreview?: boolean;
}

export function ApplicationTitleUI(props: ApplicationTitleProps) {

    return <h1 className="application-title">
        <span className="application-title__number"><GetApplicationCode appType={props.appType} /></span>
        <GetApplicationTitle appType={props.appType} />
    </h1>
}

@observer class GetApplicationCodeImpl extends React.Component<ApplicationTitleProps> {
    @observable private _appCode: string = " ";

    constructor(props: ApplicationTitleProps) {
        super(props);

        this.props.registerAsyncOperation(Nomenclatures.getApplicationTypes(x => x.appType == (+this.props.appType).toString()).bind(this).then(res => {
            if (res && res.length == 1 && res[0].appCode)
                this._appCode = res[0].appCode
            else
                this._appCode = this.props.alternativeCode ? this.props.alternativeCode : "";
        }));
    }

    render() {
        return <>{this._appCode}</>
    }
}

export const GetApplicationCode = withAsyncFrame(GetApplicationCodeImpl);


@observer class GetApplicationTitleImpl extends React.Component<ApplicationTitleProps> {

    @observable private _appTitle: string = " ";

    constructor(props: ApplicationTitleProps) {
        super(props);

        this.props.registerAsyncOperation(Nomenclatures.getApplicationTypes(x => x.appType == (+this.props.appType).toString()).bind(this).then(res => {
            if (res && res.length == 1 && res[0].name)
                this._appTitle = res[0].name
            else
                this._appTitle = this.props.alternativeTitle ? this.props.alternativeTitle : "";
        }))
    }

    render() {
        return <>{this._appTitle}</>
    }
}

export const GetApplicationTitle = withAsyncFrame(GetApplicationTitleImpl);

interface SectionSubTitleProps {
    subTitleTextKey: string;
    isForPreview?: boolean;
}

export class SectionSubTitle extends React.PureComponent<SectionSubTitleProps>{
    constructor(props: SectionSubTitleProps) {
        super(props);
    }

    render() {
        return (
            <label className={this.props.isForPreview === true ? "field-title field-title--preview" : "field-subtitle"}>{ moduleContext.resourceManager.getResourceByKey(this.props.subTitleTextKey) }</label >
        );
    }
}

export class SectionInfoUI extends React.PureComponent<InfoProps>{
    constructor(props: InfoProps) {
        super(props);
    }

    render() {
        return (
            <div className="help-text">
                {getAllInfoTextKeys(this.props.infoTextKey)}
            </div>);
    }
}

export function InputInfoUI(props: InfoProps): JSX.Element {
    return <div className="help-text-inline">{getAllInfoTextKeys(props.infoTextKey)}</div>;
}

export function SectionTitleUI(props: SectionTitleProps): JSX.Element {
    if (props.anchor)
        return (<h2 id={props.anchor} className={"section-title " + (props.isForPreview ? "section-title--preview" : "section-title--form")}> {props.titleKey ? moduleContext.resourceManager.getResourceByKey(props.titleKey) : props.title}</h2 >);
    else
        return (<h2 className={"section-title " + (props.isForPreview ? "section-title--preview" : "section-title--form")}>{props.titleKey ? moduleContext.resourceManager.getResourceByKey(props.titleKey) : props.title}</h2>);
}

export function getApplicationStatusCode(applicationStatus: ApplicationStatuses) {
    switch (applicationStatus) {
        case ApplicationStatuses.SentToCourt: return 'GL_SEND_COURT_L';
        case ApplicationStatuses.WaitingCourtAct: return 'GL_AWAITING_ACT_COURT_L';
        case ApplicationStatuses.Waiting14Days: return 'GL_AWAITING_14_DAY_DEADLINE_L';
        case ApplicationStatuses.NotEntered: return 'GL_NOT_RECORD_L';
        case ApplicationStatuses.Processing: return 'GL_PROCESSED_L';
        case ApplicationStatuses.Refusal: return 'GL_REJECTION_L';
        case ApplicationStatuses.TerminationOfRegProcedure: return 'GL_CANCEL_REG_PROCESS_L';
        case ApplicationStatuses.RequestedCSCFromTheCourt: return 'GL_REQUEST_UAC_COURT_L';
        case ApplicationStatuses.StopProceeding: return 'GL_STOP_REG_PROCESS_L';
        case ApplicationStatuses.ResumeProceeding: return 'GL_RESUMPTION_REG_PROCESS_L';
        case ApplicationStatuses.NotReserved: return 'GL_NOT_SAVE_L';
        case ApplicationStatuses.WaitingFor3DaysTerm: return 'GL_AWAITING_3_DAY_DEADLINE_L';
        case ApplicationStatuses.WaitingForProcessingPreviousApplication: return 'GL_AWAITING_PROCESSING_PREVIOUS_APPLICATION_L';
        case ApplicationStatuses.Instruction: return 'GL_INSTRUCTIONS_L';
        case ApplicationStatuses.Reserved: return 'CR_APP_SAVE_COMPANY_NAME_L'; //Запазва фирма/наименование
        case ApplicationStatuses.DeleteReservationCompany: return 'GL_DELETE_RESERVATION_L';
        case ApplicationStatuses.NotDeleteReservationCompany: return 'CR_APP_NOT_DELETE_SAVE_COMPANY_NAME_L'; //не заличава запазването на фирма/наименование
        case ApplicationStatuses.Accepted: return 'CR_APP_ACCEPTED_L'; //прието
        case ApplicationStatuses.Entered: return 'CR_APP_INSCRIBED_L'; //вписано
        case ApplicationStatuses.EnteredWithRefusal: return 'CR_APP_INSCRIBED_REFUSAL_L'; //вписване с отказ
        case ApplicationStatuses.StopAssignmentProceeding: return 'CR_APP_TERMINATION_OF_APPOINTMENT_PROCEDURE_L'; //Прекратяване на производство по назначение
        case ApplicationStatuses.IncomingRegistrationRefusal: return 'CR_APP_TERMINATION_PROCEEDINGS_L'; //Прекратяване на производство
        case ApplicationStatuses.StopNewAssignmentProceeding: return 'CR_APP_TERMINATION_OF_APPOINTMENT_PROCEDURE_L'; //Прекратяване на производство по назначение
        case ApplicationStatuses.AssignmentAccepted: return 'CR_APP_ACCEPTED_APPOINTMENR_DOCUMENT_L'; //Приет документ по назначение
        case ApplicationStatuses.AssignmentAct: return 'CR_APP_APPOINTMENT_ACT_L'; //Акт за назначение
        case ApplicationStatuses.AssignmentNextAct: return 'CR_APP_ACT_AMENDING_APPOINTMENT_ACT_L'; //Акт за изменение на акт
        case ApplicationStatuses.AssignmentWaitForAttitude: return 'CR_APP_AWAITING_OPINION_L'; //Изчаква становище на назначено лице при искане за промяна на назначено лице от заявителя
        case ApplicationStatuses.AssignmentLiquidatorInterestedPersonDeposit: return 'CR_APP_DEPOSIT_REQIURED_BY_INTERESTED_PERSONS_L'; //Поискан депозит от заинтересованите лица
        case ApplicationStatuses.AssignmentLiquidatorReleaseDeposit: return 'CR_APP_NOTIFICATION_DEPOSIT_RELEASE_L'; //Уведомление за освобождаване на депозит
        default: return "Resource not found!"
    }
}

export function getApplicationStateCode(appState: ApplicationState) {
    switch (appState) {
        case ApplicationState.New: return 'CR_GL_INITIAL_ENTRY_L';
        case ApplicationState.ForChange: return 'CR_GL_CHANGE_CIRCUMSTANCES_L';
        case ApplicationState.Preregistration: return 'CR_GL_RE_REGISTRATION_L';
        case ApplicationState.Transformation: return 'Трансформация';
        default: return "Resource not found!"
    }
}

export function getAllInfoTextKeys(infoTxtKeys: string[]) {
    var all: any[] = [];
    if (all) {
        for (var i = 0; i < infoTxtKeys.length; i++) {
            all.push(<p key={i}>{moduleContext.resourceManager.getResourceByKey(infoTxtKeys[i])}</p>);
        }
        return all;
    }
    else {
        return null;
    }
}
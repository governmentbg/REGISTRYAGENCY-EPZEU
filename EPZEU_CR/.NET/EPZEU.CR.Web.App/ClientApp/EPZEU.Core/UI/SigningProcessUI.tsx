import { AsyncUIProps, BaseProps, withAsyncFrame } from 'Cnsys.UI.React';
import { runInAction, observable, action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { SigningProcess } from '../Models/SigningProcess';
import { SigningProcessContext } from './SigningProcessContext'
import { SigningProcessesDataService } from '../Services/SigningProcessesDataService';
import { EPZEUBaseComponent } from './EPZEUBaseComponent';
import { SigningRequestStatuses, SignerSigningStatuses, SigningChannels } from '../Models/SignProcessEnums';
import { ArrayHelper, ObjectHelper } from 'Cnsys.Core';
import { SignerUI } from './SignerUI';
import { Signer } from '../Models/Signer';
import { EvrotrustSigningUI } from './EvrotrustSigningUI';
import { BtrustSigningUI } from './BtrustSigningUI';
import { TestSignUI } from './TestSignUI';

export interface SigningProcessUIProps extends BaseProps, AsyncUIProps {
    signingProcessGuid: string;
    onRejected: () => Promise<void>;
    onCompleted: () => Promise<void>;
}

declare const openWebHelp: (key: string) => void;

@observer class SigningProcessUIImpl extends EPZEUBaseComponent<SigningProcessUIProps, SigningProcess> {
    @observable private timerId: number;
    @observable private currentSignerID: number;
    @observable private currentSignerChannel: SigningChannels;

    constructor(props?: SigningProcessUIProps) {
        super(props);

        //Bind
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.onRejectSigningProcess = this.onRejectSigningProcess.bind(this);
        this.onTestSign = this.onTestSign.bind(this);

        this.onSignerChooseChannel = this.onSignerChooseChannel.bind(this);
        this.onSignerCompletSigning = this.onSignerCompletSigning.bind(this);
        this.onSignerRejectChannel = this.onSignerRejectChannel.bind(this);
        this.checkProcessExist = this.checkProcessExist.bind(this);

        //Init
        this.timerId = undefined;
        this.currentSignerID = undefined;
        this.currentSignerChannel = undefined;

        let that = this;

        this.props.registerAsyncOperation((new SigningProcessesDataService()).search(this.props.signingProcessGuid).bind(this).then((res: SigningProcess[]) => {
            if (res && res.length == 1) {
                runInAction(() => {
                    that.model = res[0];

                    let currentSigner = ArrayHelper.queryable.from(this.model.signers).firstOrDefault(s => s.status == SignerSigningStatuses.StartSigning);
                    that.currentSignerID = currentSigner ? currentSigner.signerID : undefined;
                    that.currentSignerChannel = currentSigner ? currentSigner.signingChannel : undefined;

                    if (that.model.status == SigningRequestStatuses.Rejecting || that.model.status == SigningRequestStatuses.Completing) {
                        that.checkProcessExist();
                    }
                });
            } else {
                runInAction(() => {
                    that.model = new SigningProcess();
                    that.model.addError('GL_NO_DATA_FOUND_L');
                });
            }
        }));
    }

    render(): JSX.Element {
        if (!this.model) return null;

        if (this.timerId) {
            return (<div id="loader" className="loader-overlay load"></div>);
        }

        let modelErrors = this.model.getModelErrors();
        if (this.model && modelErrors && modelErrors.length > 0)
            return <div className="alert alert-danger">{modelErrors[0].message}</div>

        return (
            <SigningProcessContext.Provider value={{ processID: this.model.processID, signerID: this.currentSignerID, signerChooseChannel: this.onSignerChooseChannel, signerCompletSigning: this.onSignerCompletSigning, signerRejectChannel: this.onSignerRejectChannel }}>
                <section id='SIGN_FORM' className={'card card--search'}>
                    <div className='card-header'>
                        <h3>{this.getResource('GL_SIGNING_L')}</h3>
                    </div>
                    <div className='card-body'>
                        <div className="help-text">
                            {this.getResource('EP_SIGN_GEN_INFO_L')}<button type="button" onClick={this.onOpenWebHelp} className="btn btn-secondary btn-context-help" title={this.getResource('GL_CONTEXT_HELP')}></button>
                        </div>

                        {this.model.signers.map((item: Signer, idx: number) => {
                            return (
                                <React.Fragment key={item.signerID}>
                                    {ObjectHelper.isStringNullOrEmpty(item.rejectReson) || item.status == SignerSigningStatuses.Signed ? null : <div className="alert alert-danger">{this.getResource(item.rejectReson)}</div>}
                                    {item.signerID == this.currentSignerID && this.currentSignerChannel != SigningChannels.BtrustLocal ?
                                        this.currentSignerChannel == SigningChannels.EvrotrustRemote ?
                                            <EvrotrustSigningUI {...this.bind(item, '')} />
                                            : <BtrustSigningUI {...this.bind(item, '')} />
                                        :
                                        <SignerUI  {...this.bind(item, '')} />}
                                    {idx < (this.model.signers.length - 1) ? <hr className="hr--doted-line" /> : null}
                                </React.Fragment>);
                        })}
                    </div>
                    <div className='card-footer'>
                        <div className="button-bar">
                            <div className="left-side">
                                {(ObjectHelper.isNullOrUndefined(this.currentSignerChannel) || this.currentSignerChannel == SigningChannels.BtrustLocal) ?
                                    <>
                                        <button type="button" className="btn btn-secondary" onClick={this.onRejectSigningProcess}>{this.getResource('GL_CANCEL_SIGNING_L')}</button>
                                        {this.model.signers.length === 1 ? <TestSignUI onTestSign={this.onTestSign} /> : null}                                      
                                    </> : null}
                            </div>
                            <div className="right-side">
                            </div>
                        </div>
                    </div>
                </ section>
            </SigningProcessContext.Provider>
        );
    }

    componentWillUnmount() {
        if (this.timerId)
            clearInterval(this.timerId);
    }

    onRejectSigningProcess(e: any): void {
        let that = this;

        that.props.registerAsyncOperation(new SigningProcessesDataService().rejectSigningProcess(that.model.processID).then((res) => {
            if (res) {
                runInAction(() => {
                    that.model.status = SigningRequestStatuses.Rejecting;
                    that.checkProcessExist();
                });
            }
        }));
    }

    @action onTestSign(): void {
        let that = this;
        this.currentSignerID = that.model.signers[0].signerID;
        this.currentSignerChannel = SigningChannels.BtrustLocal;

        that.props.registerAsyncOperation(new SigningProcessesDataService().testSign(that.model.processID).then(() => {
            runInAction(() => {
                that.model.status = SigningRequestStatuses.Completing;
                that.checkProcessExist();
            });
        }).catch(err => {
            console.log(err);

            runInAction(() => {
                let currentSigner = ArrayHelper.queryable.from(this.model.signers).firstOrDefault(s => s.signerID == this.currentSignerID);

                currentSigner.status = SignerSigningStatuses.Waiting;
                currentSigner.signingChannel = undefined;

                if (err && err.code) {
                    currentSigner.rejectReson = err.code;
                }
                else {
                    currentSigner.rejectReson = 'EP_SIGN_FAIL_E';
                }

                that.currentSignerID = undefined;
                that.currentSignerChannel = undefined;
            });
        }));
    }

    onOpenWebHelp(e: any): void {
        openWebHelp('cr-sign-how-to');
    }


    //signerChooseChannel
    @action onSignerChooseChannel(signerID: number, channel: SigningChannels): void {
        this.currentSignerID = signerID;
        this.currentSignerChannel = channel;
        let currentSigner = ArrayHelper.queryable.from(this.model.signers).firstOrDefault(s => s.signerID == this.currentSignerID);
        currentSigner.rejectReson = undefined;
    }

    //signerSigned
    @action onSignerCompletSigning(): void {
        for (let i: number = 0; i < this.model.signers.length; i++) {
            let s: Signer = this.model.signers[i];
            if (s.signerID == this.currentSignerID) {
                s.status = SignerSigningStatuses.Signed;
                s.signingChannel = this.currentSignerChannel;
                s.rejectReson = undefined;
                break;
            }
        }

        this.currentSignerID = undefined;
        this.currentSignerChannel = undefined;

        if (ArrayHelper.queryable.from(this.model.signers).count(s => s.status == SignerSigningStatuses.Signed) == this.model.signers.length) {
            this.model.status = SigningRequestStatuses.Completing;
            this.checkProcessExist();
        }
    }

    //signerRejectChannel
    @action onSignerRejectChannel(rejectFromPortal: boolean, rejectReson: string): void {
        let currentSigner = ArrayHelper.queryable.from(this.model.signers).firstOrDefault(s => s.signerID == this.currentSignerID);

        if (this.currentSignerChannel != SigningChannels.BtrustLocal && currentSigner) {
            if (rejectFromPortal === true) {
                let that = this;

                this.props.registerAsyncOperation(new SigningProcessesDataService().signerRejectSigning(that.props.signingProcessGuid, currentSigner.signerID).then(() => {
                    runInAction(() => {
                        currentSigner.status = SignerSigningStatuses.Waiting;
                        currentSigner.signingChannel = undefined;
                        currentSigner.rejectReson = undefined;

                        that.currentSignerID = undefined;
                        that.currentSignerChannel = undefined;
                    });
                }));
            } else {
                currentSigner.status = SignerSigningStatuses.Waiting;
                currentSigner.signingChannel = undefined;
                currentSigner.rejectReson = rejectReson;

                this.currentSignerID = undefined;
                this.currentSignerChannel = undefined;
            }
        }
    }

    checkProcessExist(): void {
        let that = this;

        this.timerId = setTimeout(() => {
            this.props.registerAsyncOperation(new SigningProcessesDataService().search(this.props.signingProcessGuid).then(process => {
                if (!process || process.length == 0) {
                    if (that.model.status == SigningRequestStatuses.Completing)
                        return that.props.onCompleted();
                    else
                        return that.props.onRejected();
                } else {
                    that.checkProcessExist();
                }
            }));
        }, 500);

        
    }
}

export const SigningProcessUI = withAsyncFrame(SigningProcessUIImpl);
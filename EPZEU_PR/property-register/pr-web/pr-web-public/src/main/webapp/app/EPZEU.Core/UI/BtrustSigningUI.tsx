import * as React from 'react';
import { observer } from 'mobx-react';
import { observable, runInAction, action } from 'mobx';
import { BaseProps, AsyncUIProps, withAsyncFrame } from 'Cnsys.UI.React';
import { EPZEUBaseComponent } from './EPZEUBaseComponent';
import { ObjectHelper, ValidationHelper } from 'Cnsys.Core'
import { BTrustProcessorDataService } from '../Services/BTrustProcessorDataService';
import { withSigningProcessContext } from './withSigningProcessContext';
import { ISigningProcessContextProps } from './SigningProcessContext';
import { Signer } from '../Models/Signer';
import { BtrustDocStatus } from '../Models/BtrustPullingResult';
import { SignerSigningStatuses, SigningChannels } from '../Models/SignProcessEnums';
import { BtrustUserInputRequest, BtrustUserInputTypes } from '../Models/BtrustUserInputRequest';

const BY_EGN_LNCH: string = "byEgnLnch";
const BY_PROFILEID: string = "byProfile";

interface BtrustSigningUIProps extends BaseProps, AsyncUIProps, ISigningProcessContextProps {
}

@observer class BtrustSigningUIImpl extends EPZEUBaseComponent<BtrustSigningUIProps, Signer> {
  private timerId: number;
  private radioButtonGroupId: string;
  private radioButtonByEGN: string;
  private radioButtonByProfile: string;

  @observable private waitTryInitRemoteSigningBySignerIdent: boolean;
  @observable private profileID: string;
  @observable private profileError: string;
  @observable private otp: string;
  @observable private otpError: string;
  @observable private waySendRemoteRequest: string;
  @observable private egnLnch: string;
  @observable private egnLnchError: string;

  constructor(props?: BtrustSigningUIProps) {
    super(props);

    //Bind
    this.createRemoteSignRequest = this.createRemoteSignRequest.bind(this);
    this.rejectChannel = this.rejectChannel.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.checkSignerSign = this.checkSignerSign.bind(this);
    this.profileIDChange = this.profileIDChange.bind(this);
    this.otpChange = this.otpChange.bind(this);
    this.createRemoteSignRequestInternal = this.createRemoteSignRequestInternal.bind(this);
    this.onWaySendRequestChange = this.onWaySendRequestChange.bind(this);
    this.egnLnchChange = this.egnLnchChange.bind(this);

    //Init
    this.radioButtonGroupId = ObjectHelper.newGuid();
    this.radioButtonByEGN = `ByEGN${this.radioButtonGroupId}`;
    this.radioButtonByProfile = `ByProfile${this.radioButtonGroupId}`;
    this.profileID = undefined;
    this.profileError = undefined;
    this.otp = undefined;
    this.otpError = undefined;
    this.waySendRemoteRequest = BY_EGN_LNCH;
    this.waitTryInitRemoteSigningBySignerIdent = false;
    this.egnLnch = undefined;
    this.egnLnchError = undefined;

    if (this.model.status == SignerSigningStatuses.StartSigning) {
      this.checkSignerSign();
    } else {
      if (!ObjectHelper.isStringNullOrEmpty(this.model.ident) && this.model.ident.length > 6) {
        //Автоматично правим заявка по ЕГН/ЛНЧ на заявителя.
        this.waitTryInitRemoteSigningBySignerIdent = true;
        this.egnLnch = this.model.ident;
        this.createRemoteSignRequest(null);
      }
    }
  }

  render(): JSX.Element {
    if (this.waitTryInitRemoteSigningBySignerIdent === true) return null;

    return (
      <div id="signingBTrust" className="interactive-container interactive-container--form">
        {this.model.status == SignerSigningStatuses.StartSigning ? <div className="interactive-container__loading ui-icon-spin"></div> : null}
        <div className="interactive-container__content">
          {
            (!ObjectHelper.isStringNullOrEmpty(this.model.name) || !ObjectHelper.isStringNullOrEmpty(this.model.ident)) &&
            <p className="field-text">
              <b>{this.model.name}</b>{!ObjectHelper.isStringNullOrEmpty(this.model.name) && ', '}{this.getResource('EP_SIGN_ID_SHOW_L')}: {this.model.ident}
            </p>
          }

          {this.model.status == SignerSigningStatuses.Waiting ?
            <>
              <div className="help-text">
                {this.getResource('EP_SIGN_ENTER_ID_BTRUST_I')}
              </div>
              {this.props.asyncErrors && this.props.asyncErrors.length > 0 ? <>{this.props.drawErrors()}{this.props.drawWarnings()}</> : null}
              <div className="row">
                <div className="form-group col">
                  <div className="custom-control custom-radio">
                    <input id={this.radioButtonByEGN} name={this.radioButtonGroupId} type="radio" value={BY_EGN_LNCH} className="custom-control-input" checked={this.waySendRemoteRequest == BY_EGN_LNCH} onChange={this.onWaySendRequestChange} />
                    <label htmlFor={this.radioButtonByEGN} className="custom-control-label">{this.getResource('GL_PERSON_ID_L')}</label>
                  </div>
                  <div className="custom-control custom-radio">
                    <input id={this.radioButtonByProfile} name={this.radioButtonGroupId} type="radio" value={BY_PROFILEID} className="custom-control-input" checked={this.waySendRemoteRequest == BY_PROFILEID} onChange={this.onWaySendRequestChange} />
                    <label htmlFor={this.radioButtonByProfile} className="custom-control-label">{this.getResource('EP_SIGN_PROFILE_ID_AND_AUTHORIZATION_CODE_L')}</label>
                  </div>
                </div>
              </div>
              {this.waySendRemoteRequest == BY_EGN_LNCH ?
                <>
                  <div className="row">
                    <div className="col">
                      <label>{this.getResource('GL_PERSON_ID_L')}</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-sm-5 col-lg-3">
                      <input type="text" className="form-control" value={this.egnLnch ? this.egnLnch : ''} onChange={this.egnLnchChange} />
                      {ObjectHelper.isStringNullOrEmpty(this.egnLnchError) ? null : <ul className="invalid-feedback"><li key={0}>{this.egnLnchError}</li></ul>}
                    </div>
                    <div className="form-group col-sm-auto">
                      <button className="btn btn-primary" onClick={this.createRemoteSignRequest}>{this.getResource('GL_SEND_L')}</button>
                    </div>
                  </div>
                </>
                :
                <div className="row">
                  <div className="col-sm-5 col-lg-3">
                    <div className="row">
                      <div className="col">
                        <label>{this.getResource('EP_SIGN_PERS_ID_L')}</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col">
                        <input type="text" className="form-control" value={this.profileID ? this.profileID : ''} onChange={this.profileIDChange} />
                        {ObjectHelper.isStringNullOrEmpty(this.profileError) ? null : <ul className="invalid-feedback"><li key={0}>{this.profileError}</li></ul>}
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-7 col-lg-4">
                    <div className="row">
                      <div className="col">
                        <label>{this.getResource('EP_SIGN_CODE_L')}</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col">
                        <input type="text" className="form-control" value={this.otp ? this.otp : ''} onChange={this.otpChange} />
                        {ObjectHelper.isStringNullOrEmpty(this.profileError) ? null : <ul className="invalid-feedback"><li key={0}>{this.otpError}</li></ul>}
                      </div>
                      <div className="form-group col-sm-auto">
                        <button className="btn btn-primary" onClick={this.createRemoteSignRequest}>{this.getResource('GL_SEND_L')}</button>
                      </div>
                    </div>
                  </div>
                </div>}
            </>
            :
            <div className="row">
              <div className="form-group col-12">
                <p className="field-text">
                  {this.getResource('EP_SIGN_ONGOING_BTRUST_I')}
                </p>
              </div>
            </div>}

        </div>

        <div className="interactive-container__controls">
          <button onClick={this.rejectChannel} className="btn btn-secondary btn-sm" onMouseOver={this.onHover} onMouseLeave={this.onHoverLeave} title={this.getResource('GL_CANCEL_REMOTE_SIGNING_L')}>
            <i className="ui-icon ui-icon-times" aria-hidden="true"></i>
          </button>
        </div>

      </div>);
  }

  componentWillUnmount() {
    if (this.timerId)
      clearTimeout(this.timerId);
  }

  @action private onWaySendRequestChange(event: any): void {
    this.waySendRemoteRequest = event.target.value;
  }

  @action private egnLnchChange(e: any): void {
    this.egnLnch = e.target.value;

    if (!ValidationHelper.isValidEGNLNCh(this.egnLnch)) {
      this.egnLnchError = this.getResource('GL_INPUT_PERSON_ID_E');
    } else {
      this.egnLnchError = undefined;
    }
  }

  @action private profileIDChange(e: any): void {
    this.profileID = e.target.value;

    if (ObjectHelper.isStringNullOrEmpty(this.profileID)) {
      this.profileError = this.getResource('GL_INPUT_FIELD_MUST_E');
    } else {
      this.profileError = undefined;
    }
  }

  @action private otpChange(e: any): void {
    this.otp = e.target.value;

    if (ObjectHelper.isStringNullOrEmpty(this.otp)) {
      this.otpError = this.getResource('GL_INPUT_FIELD_MUST_E');
    } else {
      this.otpError = undefined;
    }
  }

  private rejectChannel(e: any): void {
    if (this.timerId)
      clearTimeout(this.timerId);

    if (this.props.signerRejectChannel) {
      this.props.signerRejectChannel(true);
    }
  }

  @action private createRemoteSignRequest(e: any): void {
    let inputType: BtrustUserInputTypes;
    let userData: BtrustUserInputRequest;

    if (this.waySendRemoteRequest == BY_EGN_LNCH) {
      if (ObjectHelper.isStringNullOrEmpty(this.egnLnchError)) {
        if (!ValidationHelper.isValidEGNLNCh(this.egnLnch)) {
          this.egnLnchError = this.getResource('GL_INPUT_PERSON_ID_E');
          this.waitTryInitRemoteSigningBySignerIdent = false;
          return;
        }
      }

      inputType = ValidationHelper.isValidEGN(this.egnLnch) ? BtrustUserInputTypes.EGN : BtrustUserInputTypes.LNCH;
      userData = { input: this.egnLnch, inputType: inputType };
    } else {
      let hasError: boolean = false;
      inputType = BtrustUserInputTypes.PROFILE;

      if (ObjectHelper.isStringNullOrEmpty(this.profileError) && ObjectHelper.isStringNullOrEmpty(this.otpError)) {
        if (ObjectHelper.isStringNullOrEmpty(this.profileID)) {
          this.profileError = this.getResource('GL_INPUT_FIELD_MUST_E');
          hasError = true;
        }

        if (ObjectHelper.isStringNullOrEmpty(this.otp)) {
          this.otpError = this.getResource('GL_INPUT_FIELD_MUST_E');
          hasError = true;
        }
      }

      if (hasError == true)
        return;

      userData = { input: this.profileID, inputType: inputType, otp: this.otp };
    }

    this.createRemoteSignRequestInternal(userData);
  }

  private createRemoteSignRequestInternal(userData: BtrustUserInputRequest): void {
    let that = this;

    this.props.registerAsyncOperation(new BTrustProcessorDataService().createRemoteSignRequest(this.props.processID, this.props.signerID, userData)
      .then(() => {
        runInAction(() => {
          that.waitTryInitRemoteSigningBySignerIdent = false;
          that.model.status = SignerSigningStatuses.StartSigning;
          that.model.signingChannel = SigningChannels.BtrustRemote;
          that.model.rejectReson = undefined;
          that.checkSignerSign();
        });
      })
      .finally(() => {
        if (that.waitTryInitRemoteSigningBySignerIdent == true)
          that.waitTryInitRemoteSigningBySignerIdent = false;
      })
    );
  }

  checkSignerSign(): void {
    let that = this;

    this.timerId = setTimeout(() => {
      (new BTrustProcessorDataService()).completeRemoteSigning(this.props.processID, this.props.signerID).then(res => {
        if (res.code.toUpperCase() === 'OK'
          && !ObjectHelper.isNullOrUndefined(res.status)) {

          if (res.status == BtrustDocStatus.SIGNED) {
            that.props.signerCompletSigning();
          } else if (res.status == BtrustDocStatus.REJECTED) {
            that.props.signerRejectChannel(false, res.rejectReson);
          }
          else {
            that.checkSignerSign();
          }
        } else {
          that.checkSignerSign();
        }
      }).catch(err => {
        console.log(err);

        that.checkSignerSign();
      });
    }, 500);
  }

  private onHover(e: any) {
    $("#" + "signingBTrust").addClass("interactive-container--focus");
  }

  private onHoverLeave(e: any) {
    $("#" + "signingBTrust").removeClass("interactive-container--focus");
  }
}

export const BtrustSigningUI = withAsyncFrame(withSigningProcessContext(BtrustSigningUIImpl), false);

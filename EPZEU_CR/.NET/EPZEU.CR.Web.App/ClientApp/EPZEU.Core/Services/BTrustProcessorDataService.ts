﻿import { BaseDataService } from 'Cnsys.Core';
import { appConfig } from '../Common';
import { BtrustPullingResult } from '../Models/BtrustPullingResult';
import { BtrustUserInputRequest } from '../Models/BtrustUserInputRequest';

export class BTrustProcessorDataService extends BaseDataService {

    protected baseUrl(): string {
        return appConfig.epzeuApiRoot + 'BTrustProcessor';
    }

    public createBissSignRequest(processID: string, userCertBase64: string): Promise<any> {
        return this.ajax({
            url: this.getFullUrl('/CreateBissSignRequest'),
            contentType: 'application/json',
            type: 'POST',
            crossDomain: true,
            dataType: "json",
            data: JSON.stringify({ processID: processID, userCertBase64: userCertBase64})
        }, null);
    }
    
    public completeBissSignProcess(processID: string, signerID: number, userCertBase64: string, docSignatureBase64: string, hashTime: number): Promise<void> {
        return this.ajax({
            url: this.getFullUrl('/completeBissSignProcess'),
            contentType: 'application/json',
            type: 'PUT',
            crossDomain: true,
            data: JSON.stringify({ processID: processID, signerID: signerID, base64SigningCert: userCertBase64, base64DocSignature: docSignatureBase64, hashTime: hashTime })
        }, null);
    }

    public createRemoteSignRequest(processID: string, signerID: number, userData: BtrustUserInputRequest): Promise<void> {
        return this.ajax({
            url: this.getFullUrl('/createRemoteSignRequest'),
            contentType: 'application/json',
            type: 'POST',
            crossDomain: true,
            data: JSON.stringify({ processID: processID, signerID: signerID, userData: userData })
        }, null);
    }

    public completeRemoteSigning(processID: string, signerID: number): Promise<BtrustPullingResult> {
        return this.ajax({
            url: this.getFullUrl('/completeRemoteSigning'),
            contentType: 'application/json',
            type: 'PUT',
            crossDomain: true,
            dataType: "json",
            data: JSON.stringify({ processID: processID, signerID: signerID })
        }, null);
    }
}
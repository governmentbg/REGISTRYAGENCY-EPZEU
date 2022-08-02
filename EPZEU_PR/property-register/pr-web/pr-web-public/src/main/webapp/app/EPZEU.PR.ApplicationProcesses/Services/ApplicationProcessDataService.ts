import { BaseDataService } from 'Cnsys.Core';
import { ApplicationFormTypes } from 'EPZEU.PR.Core';
import { ApplicationCreateRequest, ApplicationFormBase, AttachedDocument } from 'EPZEU.PR.ApplicationBase';
import { APApplication, APApplicationProcess, ProcessStatuses } from '../Models';
import { Obligation } from 'EPZEU.Core';

export class ApplicationProcessDataService extends BaseDataService {
  protected baseUrl(): string {
    return super.baseUrl() + "ApplicationProcesses";
  }

  public provideApplicationProcessByApplicationFormType(appFormType: ApplicationFormTypes, loadAllData: boolean): Promise<APApplicationProcess> {
    return this.get<APApplicationProcess>('', APApplicationProcess, { applicationType: appFormType , loadAllData : loadAllData });
  }

  public getApplicationProcess(appProcessID: number, loadAllData: boolean): Promise<APApplicationProcess> {
    return this.get<APApplicationProcess>(`${appProcessID}`, APApplicationProcess, { loadAllData: loadAllData});
  }

  public createApplicationProcess(appRequest: ApplicationCreateRequest): Promise<APApplicationProcess> {
    return this.post<APApplicationProcess>(null, APApplicationProcess, appRequest);
  }

  public deleteApplicationProcess(appProcessID: number): Promise<void> {
    return this.delete(`${appProcessID}`, null, null);
  }

  public startSigning(appProcessID: number): Promise<string> {
    return this.post<string>(`${appProcessID}/StartSigning`, null);
  }

  public startSending(appProcessID: number): Promise<void> {
    return this.post<void>(`${appProcessID}/StartSending`, null);
  }

  public returnToBeginningStatus(appProcessID: number): Promise<ProcessStatuses> {
    return this.post<ProcessStatuses>(`${appProcessID}/ReturnToBeginningStatus`, null);
  }

  public saveApplicationContent(appProcessID: number, applID: number, application: ApplicationFormBase): Promise<void> {
    return this.put(`${appProcessID}/Applications/${applID}/Content/`, null, application);
  }

  public deleteApplicationDocument(appProcessID: number, applID: number, docGuid: string): Promise<void> {
    return this.delete(`${appProcessID}/Applications/${applID}/AttachedDocument/${docGuid}`, null, null);
  }

  public updateApplicationDocument(appProcessID: number, applID: number, document: AttachedDocument): Promise<void> {
    return this.put(`${appProcessID}/Applications/${applID}/AttachedDocument/${document.applicationDocumentId}`, null, document);
  }

  public getObligations(appProcessID: number): Promise<Obligation[]> {
    return this.get<Obligation[]>(`${appProcessID}/Obligations`, Obligation);
  }

  public getUploadURL(application:APApplication):string{
    let result = this.baseUrl()
      + '/' + application.applicationProcessId
      + '/Applications/' + application.applicationId
      + '/AttachedDocument/';

    return result;
  }

  public getDownloadURL(application: APApplication, docGuid: string): string {
    let result = this.baseUrl()
      + '/' + application.applicationProcessId
      + '/Applications/' + application.applicationId
      + '/AttachedDocument/' + docGuid;

    return result;
  }
}

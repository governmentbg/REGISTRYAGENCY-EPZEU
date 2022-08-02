import { BaseDataModel, TypeSystem } from "Cnsys.Core";
import { ApplicantInfo, ApplicantCapacity, Applicant } from "EPZEU.CR.Domain";
import { observable } from "mobx";
import { moduleContext } from '../ModuleContext';

@TypeSystem.typeDecorator('RequestForCorrectionForScanning', moduleContext.moduleName)
export class RequestForCorrectionForScanning extends BaseDataModel {

    @observable private _applicant: Applicant = null;

    @TypeSystem.propertyDecorator(Applicant ? Applicant : moduleContext.moduleName + '.' + 'Applicant')
    public set applicant(val: Applicant) {
        this._applicant = val;
    }

    public get applicant(): Applicant {
        return this._applicant;
    }

    @observable private _applicantCapacity: ApplicantCapacity = null;

    @TypeSystem.propertyDecorator(ApplicantCapacity ? ApplicantCapacity : moduleContext.moduleName + '.' + 'ApplicantCapacity')
    public set applicantCapacity(val: ApplicantCapacity) {
        this._applicantCapacity = val;
    }

    public get applicantCapacity(): ApplicantCapacity {
        return this._applicantCapacity;
    }

    @observable private _communicationNote: string = null;

    @TypeSystem.propertyDecorator('string')
    public set communicationNote(val: string) {
        this._communicationNote = val;
    }

    public get communicationNote(): string {
        return this._communicationNote;
    }

    @observable private _incomingNumber: string = null;

    @TypeSystem.propertyDecorator('string')
    public set incomingNumber(val: string) {
        this._incomingNumber = val;
    }

    public get incomingNumber(): string {
        return this._incomingNumber;
    }

    constructor(obj?: any) {
        super(obj)

        this.copyFrom(obj);
    }
}
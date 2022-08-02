import { action } from 'mobx'
import { TypeSystem, BaseDataModel, ObjectHelper } from 'Cnsys.Core'
import { DocumentTemplateFields } from 'EPZEU.Core'
import { IApplicationFormManager, ApplicationFormBaseManager } from './ApplicationFormBaseManager'
import { ApplicationWithFieldsFormBase, ApplicationFormFieldsBase, ProcessStates, Record, CompositeField, DomainModelHepler, RecordOperations, Address, IApplicationProvider, AttachedDocument, IApplicationProcessContext } from '../'

export interface IApplicationWithFieldsFormManager extends IApplicationFormManager {
    application: ApplicationWithFieldsFormBase<ApplicationFormFieldsBase>,

    returnRecordToInititialState: <TRec extends Record>(record: TRec) => void,
    updateRecordsOperation: () => void;
}

export abstract class ApplicationWithFieldsFormBaseManager<TAppl extends ApplicationWithFieldsFormBase<ApplicationFormFieldsBase>> extends ApplicationFormBaseManager<TAppl> implements IApplicationWithFieldsFormManager {

    //#region IApplicationWithFieldsFormManager

    @action public returnRecordToInititialState<TRec extends Record>(record: TRec): void {
        var recInitState: any = record.initialState;
        var hasInitState = !!recInitState;

        //Записа е добавен от клиента
        if (!hasInitState) {
            var ctor = TypeSystem.getTypeInfo(record).ctor;
            recInitState = new ctor();
            recInitState.recordID = record.recordID;
            this.getInitObject(recInitState);
            recInitState = JSON.parse(JSON.stringify(recInitState));
        }

        record.copyFrom(recInitState);
        record.initialState = hasInitState ? recInitState : undefined;
        record.recordOperation = RecordOperations.Current;
        record.clearErrors(true);
    }

    @action public updateRecordsOperation(): void {
        var allRecords = DomainModelHepler.getAllRecords(this.application);

        for (var rec of allRecords) {
            DomainModelHepler.updateRecordOperation(rec);
        }
    }

    //#endregion

    //#region virtual overrides

    public getTemplateFieldData(templateFields: DocumentTemplateFields): string {

        switch (templateFields) {           
            case DocumentTemplateFields.EIK_BULSTAT_PIK: {
                return this.application.fields.uic ?
                    this.application.fields.uic.text : null;
            }
        }

        return super.getTemplateFieldData(templateFields);
    }

    //#endregion

    //#region Helpers

    private getInitObject(model: BaseDataModel) {
        var typeInfo = TypeSystem.getTypeInfo(model);
        var modelObj: any = model;

        for (var prop of typeInfo.properties) {
            if (prop.type.isSubClassOf(BaseDataModel)) {
                var propVal = new prop.type.ctor();

                this.getInitObject(propVal);

                modelObj[prop.name] = propVal;
            }
        }
    }

    //#endregion
}

export function isApplicationWithFieldsFormManager(obj: IApplicationWithFieldsFormManager | any): obj is IApplicationWithFieldsFormManager {
    return obj && ObjectHelper.isSubClassOf(obj, ApplicationWithFieldsFormBaseManager);
}


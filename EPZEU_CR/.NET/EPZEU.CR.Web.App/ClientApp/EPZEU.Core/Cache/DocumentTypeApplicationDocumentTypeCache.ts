import { Dictionary } from "typescript-collections";
import { ItemCacheBase } from 'Cnsys.Core'
import { DocumentType, ApplicationDocumentType, Registers } from '../'
import { NomenclaturesDataService } from '../Services/NomenclaturesDataService'
import { Nomenclatures } from './Nomenclatures'

class NomDocumentTypeApplicationDocumentType {
    private _documentTypesByID: Dictionary<string, DocumentType>;
    private _applicationDocumentTypesByAppID: Dictionary<string, ApplicationDocumentType[]>;

    public get documentTypesByID(): Dictionary<string, DocumentType> {
        return this._documentTypesByID;
    }

    public get applicationDocumentTypesByAppID(): Dictionary<string, ApplicationDocumentType[]> {
        return this._applicationDocumentTypesByAppID;
    }

    constructor(documentTypes: DocumentType[], applicationDocumentTypes: ApplicationDocumentType[]) {
        this._documentTypesByID = new Dictionary<string, DocumentType>();
        this._applicationDocumentTypesByAppID = new Dictionary<string, ApplicationDocumentType[]>();

        for (var docType of documentTypes) {
            this._documentTypesByID.setValue(docType.documentTypeID, docType);
        }

        for (var appDocType of applicationDocumentTypes) {
            appDocType.documentType = this._documentTypesByID.getValue(appDocType.documentTypeID);

            if (appDocType.documentType) {
                if (!this._applicationDocumentTypesByAppID.containsKey(appDocType.applicationTypeID)) {
                    this._applicationDocumentTypesByAppID.setValue(appDocType.applicationTypeID, []);
                }

                this._applicationDocumentTypesByAppID.getValue(appDocType.applicationTypeID).push(appDocType);
            }
        }
    }
}

export class DocumentTypeApplicationDocumentTypeCache extends ItemCacheBase<NomDocumentTypeApplicationDocumentType> {

    protected generateValue(key: string): Promise<NomDocumentTypeApplicationDocumentType> {
        var nomenclaturesDataService = new NomenclaturesDataService();

        var docTypesPromise = Nomenclatures.getDocumentTypes(Number(key));
        var appDocTypePromise = nomenclaturesDataService.getApplicationDocumentTypes(Number(key));

        return Promise.all([docTypesPromise, appDocTypePromise]).then(result => {
            return new NomDocumentTypeApplicationDocumentType(result[0], result[1]);
        });
    }
}
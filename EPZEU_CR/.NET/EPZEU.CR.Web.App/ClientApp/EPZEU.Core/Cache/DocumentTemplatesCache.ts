import { ItemCacheBase } from 'Cnsys.Core'
import { NomenclaturesDataService } from '../Services/NomenclaturesDataService'
import { DocumentTemplate, DocumentTemplateField } from "../Models"

export class DocumentTemplatesCache extends ItemCacheBase<DocumentTemplate[]> {

    protected generateValue(key: string): Promise<DocumentTemplate[]> {
        var servicesDataService = new NomenclaturesDataService();

        return servicesDataService.getDocumentTemplates();
    }
}

export class DocumentTemplateFieldsCache extends ItemCacheBase<DocumentTemplateField[]> {

    protected generateValue(key: string): Promise<DocumentTemplateField[]> {
        var servicesDataService = new NomenclaturesDataService();

        return servicesDataService.getDocumentTemplateFields();
    }
}

export class DocumentTemplateContentsCache extends ItemCacheBase<string> {

    protected generateValue(key: string): Promise<string> {
        var servicesDataService = new NomenclaturesDataService();

        return servicesDataService.getDocumentTemplateContent(Number(key));
    }
}
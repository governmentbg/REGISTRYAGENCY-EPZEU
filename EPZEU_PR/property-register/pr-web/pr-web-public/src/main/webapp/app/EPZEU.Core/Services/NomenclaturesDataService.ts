import { appConfig as cnsysConfig, BaseDataService } from 'Cnsys.Core';
import { appConfig } from "../Common";
import { Act, ApplicationDocumentType, ApplicationType, Area, Authority, Country, District, DocumentTemplate, DocumentTemplateField, DocumentType, ForeignCommercialRegister, ForeignLegalForm, Language, LegalForm, Municipality, NKID, Registers, ReleaseReasons, Service, Settlement, SpecialAccessUserType } from "../Models";

export class NomenclaturesDataService extends BaseDataService {

    protected baseUrl(): string {
        return appConfig.epzeuApiRoot + "nomenclatures";
    }

    public getServices(register?: Registers): Promise<Service[]> {
        return this.get<Service[]>("Services", Service, { register: register, lang: cnsysConfig.clientLanguage });
    }

    public getApplicationTypes(): Promise<ApplicationType[]> {
        return this.get<ApplicationType[]>("ApplicationTypes", ApplicationType, { lang: cnsysConfig.clientLanguage });
    }

    public getCountries(): Promise<Country[]> {
        return this.get<Country[]>('countries', Country, { lang: cnsysConfig.clientLanguage });
    }

    public getAuthorities(): Promise<Authority[]> {
        return this.get<Authority[]>('Authorities', Authority, { lang: cnsysConfig.clientLanguage });
    }

    public getNKID(): Promise<NKID[]> {
        return this.get<NKID[]>('nkid', NKID, { lang: cnsysConfig.clientLanguage });
    }

    public getEkatteDistricts(): Promise<District[]> {
        return this.get<District[]>('ekatte/District', District, { lang: cnsysConfig.clientLanguage });
    }

    public getEkatteMunicipalities(): Promise<Municipality[]> {
        return this.get<Municipality[]>('ekatte/Municipality', Municipality, { lang: cnsysConfig.clientLanguage });
    }

    public getEkatteSettlements(): Promise<Settlement[]> {
        return this.get<Settlement[]>('ekatte/Settlement', Settlement, { lang: cnsysConfig.clientLanguage });
    }

    public getEkatteAreas(): Promise<Area[]> {
        return this.get<Area[]>('ekatte/Area', Area, { lang: cnsysConfig.clientLanguage });
    }

    public getLegalForms(): Promise<LegalForm[]> {
        return this.get<LegalForm[]>('legalForms', LegalForm, { lang: cnsysConfig.clientLanguage });
    }

    public getForeignLegalForms(): Promise<ForeignLegalForm[]> {
        return this.get<ForeignLegalForm[]>('foreignLegalForms', ForeignLegalForm, { lang: cnsysConfig.clientLanguage });
    }

    public getForeignComRegisters(): Promise<ForeignCommercialRegister[]> {
        return this.get<ForeignCommercialRegister[]>('foreignComRegisters', ForeignCommercialRegister, { lang: cnsysConfig.clientLanguage });
    }

    public getDocumentTypes(register?: Registers): Promise<DocumentType[]> {
        return this.get<DocumentType[]>('doctypes', DocumentType, { register: register, lang: cnsysConfig.clientLanguage });
    }

    public getApplicationDocumentTypes(register?: Registers): Promise<ApplicationDocumentType[]> {
        return this.get<ApplicationDocumentType[]>('applicationdocTypes', ApplicationDocumentType, { register: register, lang: cnsysConfig.clientLanguage });
    }

    public getApplicationDocumentType(applicationTypeID: string): Promise<ApplicationDocumentType> {
        return this.get<ApplicationDocumentType>(`applicationdocTypes/${applicationTypeID}`, ApplicationDocumentType, { lang: cnsysConfig.clientLanguage });
    }

    public getDocumentTemplates(): Promise<DocumentTemplate[]> {
        return this.get<DocumentTemplate[]>('DocTemplates', DocumentTemplate, { lang: cnsysConfig.clientLanguage });
    }

    public getDocumentTemplateFields(): Promise<DocumentTemplateField[]> {
        return this.get<DocumentTemplateField[]>('DocTemplateFields', DocumentTemplateField, { lang: cnsysConfig.clientLanguage });
    }

    public getDocumentTemplateContent(docTemplateID: number): Promise<string> {
        return this.get<string>(`DocTemplates/${docTemplateID}/Content`, null, { lang: cnsysConfig.clientLanguage });
    }

    public getReleaseReasons(): Promise<ReleaseReasons[]> {
        return this.get<ReleaseReasons[]>('releaseReasons', ReleaseReasons, { lang: cnsysConfig.clientLanguage });
    }

    public getActs(): Promise<Act[]> {
        return this.get<Act[]>('acts', Act, { lang: cnsysConfig.clientLanguage });
    }

    public getLanguages(): Promise<Language[]> {
        return this.get<Language[]>('Languages', Language);
    }

    public getSpecialAccessUserTypes(): Promise<SpecialAccessUserType[]> {
        return this.get<SpecialAccessUserType[]>('SpecialAccessUserTypes', SpecialAccessUserType);
    }
}
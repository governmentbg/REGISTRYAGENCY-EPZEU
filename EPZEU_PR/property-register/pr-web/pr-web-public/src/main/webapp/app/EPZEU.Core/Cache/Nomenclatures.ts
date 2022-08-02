import { ArrayHelper, ItemCacheBase } from "Cnsys.Core";
import { Constants } from "../Common/Constants";
import { Act, ApplicationDocumentType, ApplicationType, Area, Authority, Country, District, DocumentTemplate, DocumentTemplateField, DocumentType, ForeignCommercialRegister, ForeignLegalForm, Language, LegalForm, Municipality, NKID, Registers, ReleaseReasons, Settlement, SpecialAccessUserType } from "../Models";
import { Service } from "../Models/Service";
import { ActsCache } from "./ActsCache";
import { ApplicationTypesCache } from "./ApplicationTypesCache";
import { AuthoritiesCache } from "./AuthoritiesCache";
import { CountriesCache } from "./CountriesCache";
import { DocumentTemplateContentsCache, DocumentTemplateFieldsCache, DocumentTemplatesCache } from "./DocumentTemplatesCache";
import { DocumentTypeApplicationDocumentTypeCache } from "./DocumentTypeApplicationDocumentTypeCache";
import { DocumentTypesCache } from "./DocumentTypesCache";
import { EkatteAreasCache } from "./EkatteAreasCache";
import { EkatteDistrictsCache } from "./EkatteDistrictsCache";
import { EkatteMunicipalitiesCache } from "./EkatteMunicipalitiesCache";
import { EkatteSettlementsCache } from "./EkatteSettlementsCache";
import { ForeignComRegistersCache } from "./ForeignComRegistersCache";
import { ForeignLegalFormsCache } from "./ForeignLegalFormsCache";
import { LanguagesCache } from "./LanguagesCache";
import { LegalFormsCache } from "./LegalFormsCache";
import { NKIDCache } from "./NKIDCache";
import { ReleaseReasonsCache } from "./ReleaseReasonsCache";
import { ServicesCache } from "./ServicesCache";
import { SpecialAccessUserTypesCache } from "./SpecialAccessUserTypesCache";

let countriesCache: CountriesCache = new CountriesCache();
let authoritiesCache: AuthoritiesCache = new AuthoritiesCache();
let nkidCache: NKIDCache = new NKIDCache();
let documentTypeApplicationDocumentTypeCache: DocumentTypeApplicationDocumentTypeCache = new DocumentTypeApplicationDocumentTypeCache();
let ekatteDistrictsCache: EkatteDistrictsCache = new EkatteDistrictsCache();
let ekatteMunicipalitiesCache: EkatteMunicipalitiesCache = new EkatteMunicipalitiesCache();
let ekatteSettlementsCache: EkatteSettlementsCache = new EkatteSettlementsCache();
let ekatteAreasCache: EkatteAreasCache = new EkatteAreasCache();
let legalFormsCache: LegalFormsCache = new LegalFormsCache();
let foreignComRegistersCache: ForeignComRegistersCache = new ForeignComRegistersCache();
let foreignLegalFormsCache: ForeignLegalFormsCache = new ForeignLegalFormsCache();
let servicesCache: ServicesCache = new ServicesCache();
let applicationTypesCache: ApplicationTypesCache = new ApplicationTypesCache();
let docTemplatesCache: DocumentTemplatesCache = new DocumentTemplatesCache();
let docTemplateFieldsCache: DocumentTemplateFieldsCache = new DocumentTemplateFieldsCache();
let docTemplateContentsCache: DocumentTemplateContentsCache = new DocumentTemplateContentsCache();
let releaseReasonsCache: ReleaseReasonsCache = new ReleaseReasonsCache();
let actsCache: ActsCache = new ActsCache();
let documentTypesCache: DocumentTypesCache = new DocumentTypesCache();
let languagesCache: LanguagesCache = new LanguagesCache();
let specialAccessUserTypesCache: SpecialAccessUserTypesCache = new SpecialAccessUserTypesCache();
const NAPid = 10004;

export namespace Nomenclatures {

    export function getServices(predicate?: (elem: Service) => boolean): Promise<Service[]> {
        return getCollectionItems(servicesCache, predicate);
    }

    export function getApplicationTypes(predicate?: (elem: ApplicationType) => boolean): Promise<ApplicationType[]> {
        return getCollectionItems(applicationTypesCache, predicate);
    }

    export function getCountries(predicate?: (elem: Country) => boolean): Promise<Country[]> {
        return getCollectionItems(countriesCache, predicate);
    }

    export function getBGCountry(predicate?: (elem: Country) => boolean): Promise<Country> {
        return getCountries().then(items => {
            return ArrayHelper.queryable.from(items).single(t => t.code == Constants.BG_COUNTRY_CODE);
        });
    }

    export function getAuthorities(predicate?: (elem: Authority) => boolean): Promise<Authority[]> {
        return getCollectionItems(authoritiesCache, predicate);
    }

    export function getLanguages(predicate?: (elem: Language) => boolean): Promise<Language[]> {
        return getCollectionItems(languagesCache, predicate);
    }

    export function getCourts(): Promise<Authority[]> {
        // добавяме НАП, защото има промяна в закона и НАП вече могат да налагат запор - съответно трябва да може да се впише "НАП" в полета 221, 321 и 408 ("Вдигане на запора").
        return getAuthorities((authority: Authority) => (authority.authorityType == 1) || (authority.authorityID == NAPid));
    }

    export function getNKID(predicate?: (elem: NKID) => boolean): Promise<NKID[]> {
        return getCollectionItems(nkidCache, predicate);
    }

    export function getEkatteDistricts(predicate?: (elem: District) => boolean): Promise<District[]> {
        return getCollectionItems(ekatteDistrictsCache, predicate);
    }

    export function getEkatteMunicipalities(predicate?: (elem: Municipality) => boolean): Promise<Municipality[]> {
        return getCollectionItems(ekatteMunicipalitiesCache, predicate);
    }

    export function getEkatteSettlements(predicate?: (elem: Settlement) => boolean): Promise<Settlement[]> {
        return getCollectionItems(ekatteSettlementsCache, predicate);
    }

    export function getEkatteAreas(predicate?: (elem: Area) => boolean): Promise<Area[]> {
        return getCollectionItems(ekatteAreasCache, predicate);
    }

    export function getLegalForms(predicate?: (elem: LegalForm) => boolean): Promise<LegalForm[]> {
        return getCollectionItems(legalFormsCache, predicate);
    }

    export function getForeignComRegistersCache(predicate?: (elem: ForeignCommercialRegister) => boolean): Promise<ForeignCommercialRegister[]> {
        return getCollectionItems(foreignComRegistersCache, predicate);
    }

    export function getForeignLegalForms(predicate?: (elem: ForeignLegalForm) => boolean): Promise<ForeignLegalForm[]> {
        return getCollectionItems(foreignLegalFormsCache, predicate);
    }

    export function getDocumentTemplate(documentTypeID: string): Promise<DocumentTemplate> {
        return getDocumentTemplates((template: DocumentTemplate) => template.documentTypeID == documentTypeID).then((templates: DocumentTemplate[]) => { return templates ? templates[0] : null });
    }

    export function getDocumentTemplates(predicate?: (elem: DocumentTemplate) => boolean): Promise<DocumentTemplate[]> {
        return getCollectionItems(docTemplatesCache, predicate);
    }

    export function getDocumentTemplateFields(predicate?: (elem: DocumentTemplateField) => boolean): Promise<DocumentTemplateField[]> {
        return getCollectionItems(docTemplateFieldsCache, predicate);
    }

    export function getDocumentTemplateContent(docTemplateID: number): Promise<string> {
        return docTemplateContentsCache.getItem(docTemplateID.toString());
    }

    export function getLegalForm(id: number): Promise<LegalForm> {
        return getLegalForms((legalForm: LegalForm) => legalForm.id == id).then((legalForms: LegalForm[]) => { return legalForms ? legalForms[0] : null });;
    }

    export function getApplicationDocumentTypes(registers: Registers, applicationTypeID: string): Promise<ApplicationDocumentType[]> {
        return documentTypeApplicationDocumentTypeCache.getItem(registers.toString()).then(caches => {
            return caches.applicationDocumentTypesByAppID.getValue(applicationTypeID);
        })
    }

    export function getReleaseReasons(predicate?: (elem: ReleaseReasons) => boolean): Promise<ReleaseReasons[]> {
        return getCollectionItems(releaseReasonsCache, predicate);
    }

    export function getActs(predicate?: (elem: Act) => boolean): Promise<Act[]> {
        return getCollectionItems(actsCache, predicate);
    }

    export function getDocumentTypes(registers?: Registers, predicate?: (elem: DocumentType) => boolean): Promise<DocumentType[]> {
        return getCollectionItems(documentTypesCache, predicate, registers.toString());
    }

    export function getSpecialAccessUserTypes(predicate?: (elem: SpecialAccessUserType) => boolean): Promise<SpecialAccessUserType[]> {
        return getCollectionItems(specialAccessUserTypesCache, predicate);
    }
}

export function getCollectionItems<TItem>(cache: ItemCacheBase<TItem[]>, predicate?: (elem: TItem) => boolean, key?: string): Promise<TItem[]> {
    if (predicate) {
        return cache.getItem(key).then(items => {
            return ArrayHelper.queryable.from(items).where(predicate).toArray();
        });
    }
    else {
        return cache.getItem(key);
    }
}
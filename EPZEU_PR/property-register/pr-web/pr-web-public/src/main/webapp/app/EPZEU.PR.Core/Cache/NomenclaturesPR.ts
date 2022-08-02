import { ArrayHelper, ItemCacheBase } from "Cnsys.Core";
import {Authority, Constants, Country, Nomenclatures} from "EPZEU.Core";
import { RegistryOffice, ApplicantCategory, RegisterType, ApplicationStatus, PlaceNomenclaturePR, PropertyType, ApplicationTypePR, Book, DocumentTypePR, PermanentUsage } from "../Models/NomenclaturesModels";
import { RegistryOfficeCache } from "./RegistryOfficeCache";
import { BooksCache } from "./BooksCache";
import { PlacesNomenclaturePrCache } from "./PlacesNomenclaturePrCache";
import { PropertyTypesCache } from "./PropertyTypesCache";
import { ApplicationTypesPRCache } from "./ApplicationTypesPRCache";
import { ApplicantCategoriesCache } from "./ApplicantCategoriesCache";
import { ApplicantCategoriesForUpcomingDealCache } from "./ApplicantCategoriesForUpcomingDealCache";
import { RegisterTypesCache } from "./RegisterTypesCache";
import { ApplicationStatusesCache } from "./ApplicationStatusesCache"
import { DocumentTypesPRCache } from "./DocumentTypesPRCache";
import { PermanentUsagesCache } from "./PermanentUsagesCache";

let registryOfficeCache: RegistryOfficeCache = new RegistryOfficeCache();
let booksCache: BooksCache = new BooksCache();
let settlementsCache: PlacesNomenclaturePrCache = new PlacesNomenclaturePrCache();
let propertyTypesCache: PropertyTypesCache = new PropertyTypesCache();
let applicationTypesCache: ApplicationTypesPRCache = new ApplicationTypesPRCache();
let applicantCategoriesCache: ApplicantCategoriesCache = new ApplicantCategoriesCache();
let applicantCategoriesForUpcomingDealCache: ApplicantCategoriesForUpcomingDealCache = new ApplicantCategoriesForUpcomingDealCache();
let registerTypesCache: RegisterTypesCache = new RegisterTypesCache();
let applicationStatusesCache: ApplicationStatusesCache = new ApplicationStatusesCache();
let documentTypesCache: DocumentTypesPRCache = new DocumentTypesPRCache();
let permanentUsageCache: PermanentUsagesCache = new PermanentUsagesCache();

export namespace NomenclaturesPR {

  export function getRegistryOffice(predicate?: (elem: RegistryOffice) => boolean): Promise<RegistryOffice[]> {
    return getCollectionItems(registryOfficeCache, predicate);
  }

  export function getBooks(predicate?: (elem: Book) => boolean): Promise<Book[]> {
    return getCollectionItems(booksCache, predicate);
  }

  export function getPlaces(predicate?: (elem: PlaceNomenclaturePR) => boolean): Promise<PlaceNomenclaturePR[]> {
    return getCollectionItems(settlementsCache, predicate);
  }

  export function getPropertyTypes(predicate?: (elem: PropertyType) => boolean): Promise<PropertyType[]> {
    return getCollectionItems(propertyTypesCache, predicate);
  }

  export function getApplicationTypes(predicate?: (elem: ApplicationTypePR) => boolean): Promise<ApplicationTypePR[]> {
    return getCollectionItems(applicationTypesCache, predicate);
  }

  export function getApplicantCategories(predicate?: (elem: ApplicantCategory) => boolean): Promise<ApplicantCategory[]> {
    return getCollectionItems(applicantCategoriesCache, predicate);
  }

  export function getApplicantCategoriesForUpcomingDeal(predicate?: (elem: ApplicantCategory) => boolean): Promise<ApplicantCategory[]> {
    return getCollectionItems(applicantCategoriesForUpcomingDealCache, predicate);
  }

  export function getRegisterTypes(predicate?: (elem: RegisterType) => boolean): Promise<RegisterType[]> {
    return getCollectionItems(registerTypesCache, predicate);
  }

  export function getApplicationStatuses(predicate?: (elem: ApplicationStatus) => boolean): Promise<ApplicationStatus[]> {
    return getCollectionItems(applicationStatusesCache, predicate);
  }

  export function getDocumentTypes(predicate?: (elem: DocumentTypePR) => boolean): Promise<DocumentTypePR[]> {
    return getCollectionItems(documentTypesCache, predicate);
  }

  export function getPermanentUsages(predicate?: (elem: PermanentUsage) => boolean): Promise<PermanentUsage[]> {
    return getCollectionItems(permanentUsageCache, predicate);
  }

  export function getSortedCountries(predicate?: (elem: Country) => boolean): Promise<Country[]> {
    //In Property Register there is no "БЕЗ ГРАЖДАНСТВО" we exclude this value from cache
    return Nomenclatures.getCountries(predicate).then(c => c.filter(c => c.id != 239).sort((a, b) => {
      return a.code == Constants.BG_COUNTRY_CODE ? -1 : a.name.localeCompare(b.name)
    }));
  }

  export function getSortedAuthorities(predicate?: (elem: Authority) => boolean): Promise<Authority[]> {
    return Nomenclatures.getAuthorities(predicate).then(a => a.sort((a, b) => {
      return a.authorityName.localeCompare(b.authorityName)
    }));
  }

  function getCollectionItems<TItem>(cache: ItemCacheBase<TItem[]>, predicate?: (elem: TItem) => boolean, key?: string): Promise<TItem[]> {
    if (predicate) {
      return cache.getItem(key).then(items => {
        return ArrayHelper.queryable.from(items).where(predicate).toArray();
      });
    } else {
      return cache.getItem(key);
    }
  }
}

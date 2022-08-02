import { BaseDataService } from 'Cnsys.Core';
import { Act } from 'EPZEU.Core';
import { ApplicantCategory } from '../Models/NomenclaturesModels/ApplicantCategory';
import { RegisterType } from '../Models/NomenclaturesModels/RegisterType';
import { ApplicationTypePR } from "../Models/NomenclaturesModels/ApplicationTypePR";
import { Book } from "../Models/NomenclaturesModels/Book";
import { PlaceNomenclaturePR } from "../Models/NomenclaturesModels/PlaceNomenclaturePR";
import { PropertyType } from "../Models/NomenclaturesModels/PropertyType";
import { RegistryOffice } from "../Models/NomenclaturesModels/RegistryOffice";
import { ApplicationStatus } from '../Models/NomenclaturesModels/ApplicationStatus';
import { DocumentTypePR } from "../Models/NomenclaturesModels/DocumentTypePR";
import {PermanentUsage} from "../Models/NomenclaturesModels/PermanentUsage";


export class NomenclaturesPRDataService extends BaseDataService {

  protected baseUrl(): string {
    return super.baseUrl() + "Nomenclatures";
  }

  public getRegistryOffice(): Promise<RegistryOffice[]> {
    return this.get<RegistryOffice[]>('registryOffice', RegistryOffice);
  }

  public getBooks(): Promise<Book[]> {
    return this.get<Book[]>('book', Book);
  }

  public getPlaces(): Promise<PlaceNomenclaturePR[]>{
    return this.get<PlaceNomenclaturePR[]>('place',PlaceNomenclaturePR);
  }

  public getPropertyTypes(): Promise<PropertyType[]>{
    return this.get<PropertyType[]>('propertyType',PropertyType);
  }

  public getApplicationTypes(): Promise<ApplicationTypePR[]>{
    return this.get<ApplicationTypePR[]>('applicationTypes', ApplicationTypePR);
  }

  public getApplicantCategories(): Promise<ApplicantCategory[]> {
    return this.get<ApplicantCategory[]>('applicantCategories', ApplicantCategory);
  }

  public getApplicantCategoriesForUpcomingDeal(): Promise<ApplicantCategory[]> {
    return this.get<ApplicantCategory[]>('applicantCategoriesForUpcomingDeal', ApplicantCategory);
  }

  public getActsByBook(bookId: string): Promise<Act[]> {
    return this.get<Act[]>('actsByBook', Act, { bookId: bookId});
  }

  public getRegisterTypes(): Promise<RegisterType[]> {
    return this.get<RegisterType[]>('registerTypes', RegisterType);
  }

  public getApplicationStatuses(): Promise<ApplicationStatus[]> {
    return this.get<ApplicationStatus[]>('applicationStatuses', ApplicationStatus);
  }

  public getDocumentTypes(): Promise<DocumentTypePR[]>{
    return this.get<DocumentTypePR[]>('documentTypes', DocumentTypePR);
  }

  public getPermanentUsages(): Promise<PermanentUsage[]>{
    return this.get<PermanentUsage[]>('permanentUsages', PermanentUsage);
  }
}

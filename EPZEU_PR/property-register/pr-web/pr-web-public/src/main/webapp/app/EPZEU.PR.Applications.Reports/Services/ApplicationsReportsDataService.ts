import { BaseDataService } from 'Cnsys.Core';
import { SearchAccountPropertiesForReport } from "../Models/SearchAccountPropertiesForReport";
import { PropertyOfReport } from "../Models/PropertyOfReport";
import { AccountPropertyOfReport } from "../Models/AccountPropertyOfReport";
import { SearchPersonsOfReport } from "../Models/SearchPersonsOfReport";
import { PersonOfReport } from "../Models/PersonOfReport";
import { PersonType } from "EPZEU.PR.ApplicationBase";
import { SearchPropertiesForReport } from "../Models/SearchPropertiesForReport";

export class ApplicationsReportsDataService extends BaseDataService {
  protected baseUrl(): string {
    return super.baseUrl() + "SubjectOfReport";
  }

  public searchAccountPropertiesForReport(searchAccountsForReport: SearchAccountPropertiesForReport): Promise<AccountPropertyOfReport[]> {
    return this.get<AccountPropertyOfReport[]>('/accountProperties', AccountPropertyOfReport, searchAccountsForReport);
  }

  public searchPersonsForReport(searchPersonsForReport: SearchPersonsOfReport): Promise<PersonOfReport[]> {

    if(searchPersonsForReport.type== PersonType.INDIVIDUAL){
      searchPersonsForReport.individualSearchCriteria.registryOfficeId = searchPersonsForReport.registryOfficeId;
      return this.get<PersonOfReport[]>('/individualPersons', PersonOfReport, searchPersonsForReport.individualSearchCriteria);
    }else if(searchPersonsForReport.type == PersonType.LEGAL_ENTITY) {
      searchPersonsForReport.legalEntitySearchCriteria.registryOfficeId = searchPersonsForReport.registryOfficeId;
      return this.get<PersonOfReport[]>('/legalEntityPersons', PersonOfReport, searchPersonsForReport.legalEntitySearchCriteria);
    }
  }

  public searchPropertiesForReport(searchPropertiesForReport: SearchPropertiesForReport): Promise<PropertyOfReport[]> {
    return this.get<PropertyOfReport[]>('/properties', PropertyOfReport, searchPropertiesForReport);
  }
}

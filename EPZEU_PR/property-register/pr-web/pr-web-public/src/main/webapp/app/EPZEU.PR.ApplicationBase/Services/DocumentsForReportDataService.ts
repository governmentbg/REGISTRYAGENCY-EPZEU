import { BaseDataService } from 'Cnsys.Core';
import { Document } from "../Models/Document";
import { SearchDocumentsForReport } from "../Models/SearchDocumentsForReport";

export class DocumentsForReportDataService extends BaseDataService {
  protected baseUrl(): string {
    return super.baseUrl() + "SubjectOfReport";
  }

  public searchDocumentsForReport(searchDocumentsForReport: SearchDocumentsForReport): Promise<Document[]> {
    return this.get<Document[]>('/documents', Document, searchDocumentsForReport);
  }
}

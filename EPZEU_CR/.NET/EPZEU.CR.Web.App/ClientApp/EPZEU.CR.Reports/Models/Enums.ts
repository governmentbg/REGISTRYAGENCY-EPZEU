import { TypeSystem } from 'Cnsys.Core';
import { moduleContext } from '../ModuleContext';

export enum InstructionSearchMode {
    ByUIC = 1,
    ByIncomingNumber = 2,
    DocumentsWithoutDeed = 3
}
TypeSystem.registerEnumInfo(InstructionSearchMode, 'InstructionSearchMode', moduleContext.moduleName);

export enum SortColumnsWithOrder {
    CompanyNameASC = 0,
    CompanyNameDESC = 1,
    ActiveFromASC = 2,
    ActiveFromDESC = 3
}
TypeSystem.registerEnumInfo(SortColumnsWithOrder, 'SortColumnsWithOrder', moduleContext.moduleName);

export enum VerificationPersonOrgResultFilters {
    PhysicalForm = 0,
    CompanyForm = 1
}
TypeSystem.registerEnumInfo(VerificationPersonOrgResultFilters, 'VerificationPersonOrgResultFilters', moduleContext.moduleName);

export enum StatementsByDateResultFilter {
    /**За текуща и предстояща дата */
    CurrentUpcomingDate = 1,

    /**По дата на обявяване */
    ByDateAnnouncement = 2
}
TypeSystem.registerEnumInfo(StatementsByDateResultFilter, 'StatementsByDateResultFilter', moduleContext.moduleName);

export enum NotificationTypes {
    NotificationsFromRA = 1,
    NotificationsUnderNPO = 2
}
TypeSystem.registerEnumInfo(NotificationTypes, 'NotificationTypes', moduleContext.moduleName);
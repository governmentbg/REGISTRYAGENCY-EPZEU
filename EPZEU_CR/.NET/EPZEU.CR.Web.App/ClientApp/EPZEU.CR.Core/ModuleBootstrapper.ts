import { BaseModuleInitializaitonContext } from 'Cnsys.Core';
import { moduleContext } from './ModuleContext';
import { bootstrapperModuleDataServices } from 'EPZEU.Core';
import { ApplicationsService } from './Services/ApplicationsService';
import { AssignmentsService } from './Services/AssignmentsService';
import { CompaniesDataService } from './Services/CompaniesDataService';

export function registerModule(initContext: BaseModuleInitializaitonContext): Promise<void> {
    moduleContext.initializeContext(initContext);

    bootstrapperModuleDataServices([ApplicationsService, AssignmentsService, CompaniesDataService]);

    return Promise.resolve();
}
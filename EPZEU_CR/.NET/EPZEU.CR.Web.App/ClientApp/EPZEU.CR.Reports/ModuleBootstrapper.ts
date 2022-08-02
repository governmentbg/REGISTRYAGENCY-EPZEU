import { BaseModuleInitializaitonContext } from 'Cnsys.Core'
import { moduleContext } from './ModuleContext'
import { resourceManager, breadcrumb, bootstrapperModuleDataServices } from 'EPZEU.Core';
import { Constants as coreConstants } from 'EPZEU.CR.Core';
import { Constants } from './Constants'
import { DeedsDataService } from './Services/DeedsDataService';
import { InstructionDataService } from './Services/InstructionDataService';

export function registerModule(initContext: BaseModuleInitializaitonContext): Promise<void> {
    moduleContext.initializeContext(initContext);
    bootstrapperModuleDataServices([DeedsDataService, InstructionDataService]);

    return resourceManager.loadResourcesByPrefixes(['CR_APP', 'CR_F']).bind(this).then(() => {
        initializeBreadcrumb();
    });
}

function initializeBreadcrumb() {
    breadcrumb.addBreadcrumbNodes([
        {
            pathPattern: Constants.PATHS.ACTIVE_CONDITION,
            text: resourceManager.getResourceByKey("CR_GL_CURRENT_STATUS_L")
        },
        {
            pathPattern: Constants.PATHS.ACTIVE_CONDITION_RESULT,
            text: resourceManager.getResourceByKey("CR_GL_CURRENT_STATUS_L")
        },
        {
            pathPattern: Constants.PATHS.PRESERVED_COMPANIES,
            text: resourceManager.getResourceByKey("CR_GL_LIST_SAVE_COMPANIES_NAME_L")
        },
        {
            pathPattern: Constants.PATHS.RIGHTS_FOR_COMPANY,
            text: resourceManager.getResourceByKey("CR_GL_COMPANY_RIGHTS_L")
        },
        {
            pathPattern: Constants.PATHS.VERIFICATION_PERSON_ORG,
            text: resourceManager.getResourceByKey("CR_GL_REPORT_INDIVIDUAL_LEGAL_ENTRIES_L")
        },
        {
            pathPattern: Constants.PATHS.ENTRIES_DELITIONS_ANNOUNCEMENTS,
            text: resourceManager.getResourceByKey("CR_GL_ENTRIES_DELETIONS_ANNOUNCES_L")
        },
        {
            pathPattern: Constants.PATHS.VERIFICATION_ACTS,
            text: resourceManager.getResourceByKey("CR_GL_RECCORDED_CIRCUMSTANCE_ACT_L")
        },
        {
            pathPattern: Constants.PATHS.VERIFICATION_ACTS_RESULT,
            text: resourceManager.getResourceByKey("CR_GL_RECCORDED_CIRCUMSTANCE_ACT_L")
        },
        {
            pathPattern: Constants.PATHS.DOCUMENTS_WITHOUT_DEED,
            text: resourceManager.getResourceByKey("CR_GL_DOCUMENTS_WITHOUT_BATCH_L")
        },
        {
            pathPattern: Constants.PATHS.DOCUMENTS_WITHOUT_APPOINTMENT,
            text: resourceManager.getResourceByKey("CR_GL_DOCUMENTS_WITHOUT_APPOINTMENT_L")
        },
        {
            pathPattern: Constants.PATHS.BULSTATDEEDS,
            text: resourceManager.getResourceByKey("CR_GL_RE_REGISTER_COMPANY_L")
        },
        {
            pathPattern: Constants.PATHS.ASSIGNMENTS_WITHOUT_LOT,
            text: resourceManager.getResourceByKey("CR_GL_APPOINTMENT_WITHOUT_BATCH_L")
        },
        {
            pathPattern: Constants.PATHS.STABILIZATION,
            text: resourceManager.getResourceByKey("CR_GL_REPORT_STABILIZATION_L")
        },
        {
            pathPattern: Constants.PATHS.BANKRUPTCY,
            text: resourceManager.getResourceByKey("CR_GL_REPORT_INSOLVENCY_L")
        },
        {
            pathPattern: Constants.PATHS.INSTRUCTIONS_WITHOUT_DEED,
            text: resourceManager.getResourceByKey("CR_GL_INSTRUCTIONS_FOR_NO_REG_COMPANIES_L")
        },
        {
            pathPattern: Constants.PATHS.LIQUIDATION,
            text: resourceManager.getResourceByKey("CR_GL_REPORT_LIQUIDATION_L")
        },
        {
            pathPattern: Constants.PATHS.NOTIFICATIONS_UNDER_NPO,
            text: resourceManager.getResourceByKey("CR_GL_NOTIFICATION_44A_L")
        },
        {
            pathPattern: Constants.PATHS.REGISTRATIONS,
            text: resourceManager.getResourceByKey("CR_GL_INCOMING_APPLICATION_NUMBER_L")
        },
        {
            pathPattern: Constants.PATHS.STATEMENTS_BY_DATE,
            text: resourceManager.getResourceByKey("CR_GL_ANNOUNCED_ACTS_L")
        },
        {
            pathPattern: Constants.PATHS.TRANSFORMATIONS_BY_PERIOD,
            text: resourceManager.getResourceByKey("CR_GL_TRANSFORMATION_OVER_PERIOD_L")
        },
        {
            pathPattern: coreConstants.PATHS.INSTRUCTION,
            text: resourceManager.getResourceByKey("GL_INSTRUCTIONS_L")
        }
        ,
        {
            pathPattern: coreConstants.PATHS.OUTGOING_DOCUMENTS,
            text: resourceManager.getResourceByKey("CR_APP_ATTACHED_DOCUMENTS_L")
        }
    ]);
}
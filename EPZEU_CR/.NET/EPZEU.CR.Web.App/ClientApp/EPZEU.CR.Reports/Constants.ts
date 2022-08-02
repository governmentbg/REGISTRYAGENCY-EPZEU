import { Constants as MainConstants } from 'EPZEU.CR.Core'

export const Constants = {
    PATHS: {
        ACTIVE_CONDITION:                `${MainConstants.PATHS.REPORTS}/ActiveCondition`,
        ACTIVE_CONDITION_RESULT:         `${MainConstants.PATHS.REPORTS}/ActiveConditionTabResult`,
        PRESERVED_COMPANIES:             `${MainConstants.PATHS.REPORTS}/PreservedCompanies`,
        RIGHTS_FOR_COMPANY:              `${MainConstants.PATHS.REPORTS}/RightsForCompany`,
        DOCUMENTS_WITHOUT_DEED:          `${MainConstants.PATHS.REPORTS}/DocumentsWithoutDeed`,
        VERIFICATION_PERSON_ORG:         `${MainConstants.PATHS.REPORTS}/VerificationPersonOrg`,
        ENTRIES_DELITIONS_ANNOUNCEMENTS: `${MainConstants.PATHS.REPORTS}/EntriesDelitionsAnnouncements`,
        LIQUIDATION:                     `${MainConstants.PATHS.REPORTS}/Liquidation`,
        STABILIZATION:                   `${MainConstants.PATHS.REPORTS}/Stabilization`,
        BANKRUPTCY:                      `${MainConstants.PATHS.REPORTS}/Bankruptcy`,
        VERIFICATION_ACTS:               `${MainConstants.PATHS.REPORTS}/VerificationActs`,
        VERIFICATION_ACTS_RESULT:        `${MainConstants.PATHS.REPORTS}/VerificationActsResult/:uic`,
        TRANSFORMATIONS_BY_PERIOD:       `${MainConstants.PATHS.REPORTS}/TransformationsByPeriod`,
        STATEMENTS_BY_DATE:              `${MainConstants.PATHS.REPORTS}/StatementsByDate`,
        INSTRUCTIONS_WITHOUT_DEED:       `${MainConstants.PATHS.REPORTS}/InstructionsWithoutDeed`,
        REGISTRATIONS:                   `${MainConstants.PATHS.REPORTS}/Registrations`,
        BULSTATDEEDS:                    `${MainConstants.PATHS.REPORTS}/BulstatDeeds`,
        DOCUMENTS_WITHOUT_APPOINTMENT:   `${MainConstants.PATHS.REPORTS}/DocumentsWithoutAppointment`,
        ASSIGNMENTS_WITHOUT_LOT:         `${MainConstants.PATHS.REPORTS}/AssignmentsWithoutLot`,
        NOTIFICATIONS_UNDER_NPO:         `${MainConstants.PATHS.REPORTS}/NotificationsUnderNPO`
    }
}
using EPZEU.CR.Domain.Fields;
using Integration.EPZEU.Models;
using System.Collections.Generic;

namespace EPZEU.CR.Nomenclatures
{
    public static class LocalizationHelper
    {
        #region Private static members

        //TODO: Да се помисли дали не може да ползваме SubUICType
        private static readonly Dictionary<int, string> SectionNameCode = new Dictionary<int, string>()
        {
            {1,  "CR_GL_GENERAL_STATUS_L"},
            {2,  "CR_GL_PROCURA_L"},
            {3,  "CR_GL_BRANCHES_L"},
            {4,  "CR_GL_PLEDGE_SHARE_L"},
            {5,  "CR_GL_PLEDGE_COMPANY_L"},
            {6,  "CR_APP_ARREST_SHARE_L"},
            {7,  "CR_APP_LIQUIDATION_L"},
            {8,  "CR_APP_TRANSFER_OF_COMMERCIAL_ENTERPRISE_L"},
            {9,  "CR_GL_TRANSFORMATION_L"},
            {10,  "CR_GL_REALIGNMENT_L"},
            {11,  "CR_GL_INSOLVENCY_L"},
            {13,  "CR_GL_ANNOUNCED_ACTS_L"},
            {14,  "CR_RESERVED_COMPANY_L"},
            {15,  "CR_GL_CIRCUMSTANCES_SPECIAL_SUBJECT_L"},
            {79,  "CR_GL_STABILIZATION_L"},

            //TODO: Deso: говорено с Албена: няма такъв ресурс в Актуално състояние. Да се види къде се ползва.
            {288,  "TODO_Key_Други документи"}, //да се пита за ресурс
            //TODO: Deso: говорено с Албена: няма такъв ресурс в Актуално състояние. Да се види къде се ползва.
            {414,  "TODO_Key_Обща информация"}, //да се пита за ресурс
            //{450,  "CR_GL_CURRENT_CONSTUTIVE_ACT_L"}, - Актуален учредителен акт - няма го в оракъл базата
            {500,  "CR_GL_ACTUAL_PERSON_OWNERS_L"},
            {551,  "CR_APP_ANNOUNCED_INSOLVENCY_ACTS_L"}
        };

        private static readonly Dictionary<int, string> GroupNameCode = new Dictionary<int, string>()
        {
            {11,  "CR_GL_INSOLVENCY_PROCEED_L"},
            {16,  "CR_GL_FUND_L"},
            {17,  "CR_GL_PROCURA_L"},
            {18,  "CR_GL_BRANCH_L" },
            {19,  "CR_GL_AUTHORITY_BEHALF_APPLICATION_L"},
            {20,  "GL_BANK_L"},
            {21,  "CR_GL_INSURER_L"},
            {22,  "CR_GL_ZPPCK_L"},
            {23,  "CR_APP_PLEDGER_L"},
            {24,  "CR_APP_DEBTOR_SEC_CLAIM_L"},
            {25,  "CR_APP_PLEDGEE_L"},
            {26,  "CR_APP_SECURED_CLAIM_L"},
            {27, "CR_APP_AMOUNT_BET_SET_L" },
            {28, "CR_APP_PLEDGE_POSSESSION_L" },
            {29, "CR_APP_MODALITIES_L" },
            {30, "CR_APP_TAKE_BET_L" },
            {31,  "CR_APP_ARREST_AMOUNT_L" },
            {32,  "CR_APP_ARREST_AMOUNT_REMAIN_DISTRIBUTION_L" },
            {33,  "CR_APP_ABANDONMENT_EXECUTION_L" },
            {34,  "CR_APP_DELETE_PLEDGE_L" },
            {35,  "CR_GL_LEGAL_PERSON_FAFOR_BED_L" },
            {36,  "CR_APP_AMOUNT_ARREST_L" },
            {37,  "CR_APP_ARREST_HAVINGS_L" },
            {38,  "CR_GL_LIQUIDATION_PROCEEDING_L" },
            {39,  "CR_GL_COMMERCIAL_ENTERPRISE_L"},
            {40,  "CR_GL_TRANSFORMATION_L"},
            {41,  "CR_GL_REALIGNMENT_L"},
            {42,  "CR_GL_ANNOUNCED_ACTS_L"},
            {43,  "CR_GL_RESERVED_COMPANY_L"},
            {44,  "GL_APPLICANT_DATA_L"},
            {45,  "GL_IDENTIFICATION_L"},
            {46,  "TODO_Key_Заличаване на вписване"}, //да се пита за ресурс / има Заличаване на вписан залог?
            {47,  "TODO_Key_Допълнение"}, //да се пита за ресурс 
            {48,  "TODO_Key_Електронен обмен"}, //да се пита за ресурс 
            {49,  "CR_APPLICATIONS_L"},
            {50,  "GL_APPLICANT_L"},
            {211,  "CR_GL_SHARE_COMPANY_INVESTMENT_L"},
            {213,  "CR_GL_OTHER_LICENSED_COMPANIES_L"},
            {218, "CR_APP_ABANDONMENT_EXECUTION_L" },
            {221, "CR_APP_RENEWAL_ENTRY_BET_L" },
            {223, "CR_APP_DELETE_PLEDGE_L" },
            {225, "CR_APP_DEBTOR_SEC_CLAIM_L" },
            {226, "CR_APP_PLEDGEE_L" },
            {227, "CR_APP_AMOUNT_BET_SET_L" },
            {228, "CR_APP_SECURED_CLAIM_L" },
            {229, "CR_APP_PLEDGE_POSSESSION_L" },
            {230, "CR_APP_MODALITIES_L" },
            {231, "CR_APP_TAKE_BET_L" },
            {232, "CR_APP_SECURED_CLAIM_L" },
            {233, "CR_APP_ABANDONMENT_EXECUTION_L" },
            {289, "TODO_Key_Други документи"}, //да се пита за ресурс
            {298,  "CR_GL_INSOLVENCY_PROCEED_L"},
            {351, "CR_GL_CONVERSION_ACT_L"},
            {315, "CR_GL_CONVERSION_ACT_L"},
            {415,  "CR_GL_MAIN_CIRCUMSTANCES_L"},
            {447,  "CR_APP_RENEWAL_ENTRY_BET_L"},
            {451,  "CR_GL_CURRENT_CONSTUTIVE_ACT_L"},
            {467,  "CR_GL_ADDITIONAL_INFORMATION_L" },
            {469,  "CR_GL_DEPAR_L"},
            {501,  "CR_GL_BASIC_INFORMATION_L"},
            {508,  "CR_GL_CIRCUMSTANCES_PART4_L"},
            {510,  "CR_GL_ACTUAL_PERSON_OWNERS_L"},
            {552,  "CR_APP_ANNOUNCED_INSOLVENCY_ACTS_L"},
            {580,  "CR_GL_LEGAL_PERSON_DIRECTLY_INDIRECTLY_CONTROL_L"},
            {625,  "CR_APP_ANNOUNCED_INSOLVENCY_ACTS_L"},
            {630,  "CR_GL_CONSENT_PLEDGE_CREDITOR_L" },
            {632,  "CR_GL_ENTRY_PLEDGE_CREDITOR_RIGHTS_L"},
            {635,  "CR_GL_CONSENT_PLEDGE_CREDITOR_L"},
            {637,  "CR_GL_ENTRY_PLEDGE_CREDITOR_RIGHTS_L"},
            {639,  "CR_GL_ANNOUNCED_STABILIZATION_ACTS_L"},
            {640 , "CR_GL_STABILIZATION_PROCEED_L"},
            {645 , "CR_GL_AUTHORITIES_STABILIZATION_PROCEED_L"},
            {650, "CR_GL_AUTHORITIES_INSOLVENCY_PROCEED_L"}
        };

        private static readonly Dictionary<string, string> FieldNameCode = new Dictionary<string, string>()
        {
            {F001_UIC.FieldIdentCode,  "CR_F_1_L"},
            {F001a_NumberNationalRegister.FieldIdentCode,  "CR_F_1a_L"},
            {F011_WayOfRepresentation.FieldIdentCode,  "CR_F_11_L"},
            {F002_Company.FieldIdentCode,  "CR_F_2_L"},
            {F003_LegalForm.FieldIdentCode,  "CR_F_3_L"},
            {F004_Transliteration.FieldIdentCode,  "CR_F_4_L"},
            {F005_Seat.FieldIdentCode,  "CR_F_5_L"},
            {F005a_SeatForCorrespondence.FieldIdentCode,  "CR_F_5a_L"},
            {F006_SubjectOfActivity.FieldIdentCode,  "CR_F_6_L"},
            {F006a_SubjectOfActivityNKID.FieldIdentCode,  "CR_F_6a_L"},
            {F006b_Objectives.FieldIdentCode,  "CR_F_6b_L"},
            {F006g_SubjectToAdditionalBusinessActivity.FieldIdentCode,  "CR_F_6g_L"},
            {F006v_MeansOfAchievingTheObjectives.FieldIdentCode,  "CR_F_6v_L"},
            {F007_Managers.FieldIdentCode,  "CR_F_7_L"},
            {F007a_AssignedManagers.FieldIdentCode, "CR_F_7a_L"},
            {F008_WayOfManagement.FieldIdentCode, "CR_F_8_L"},
            {F009_ChairMan.FieldIdentCode, "CR_F_9_L"},
            {F060_DivisionsOfEuropeanUnification.FieldIdentCode, "CR_F_60_L"},
            {F010_Representatives.FieldIdentCode, "CR_F_10_L"},
            {F0101_Representatives101.FieldIdentCode, "CR_F_10_L"},
            {F0102_Representatives102.FieldIdentCode, "CR_F_10_L"},
            {F012_BoardOfDirectors.FieldIdentCode, "CR_F_12_L"},
            {F012a_BoardOfManagers3.FieldIdentCode, "CR_F_12a_L"},
            {F01211_BoardManager3.FieldIdentCode, "CR_F_12a_L"},
            {F012b_AdministrativeBoard.FieldIdentCode, "CR_F_12b_L"},
            {F012v_AdministrativeBoardSupporters.FieldIdentCode, "CR_F_12v_L"},
            {F013_BoardOfManagers.FieldIdentCode, "CR_F_13_L"},
            {F013_BoardOfManagers2.FieldIdentCode, "CR_F_13_L"},
            {F013a_BoardOfManagersSupporters.FieldIdentCode, "CR_F_13a_L"},
            {F013b_LeadingBoard.FieldIdentCode, "CR_F_13b_L" },
            {F013v_BoardOfManagersSupporters2.FieldIdentCode, "CR_F_13v_L" },
            {F014_SupervisingBoard.FieldIdentCode, "CR_F_14_L"},
            {F014b_SupervisingBoard2.FieldIdentCode, "CR_F_14b_L"},
            {F014v_SupervisingBoardSupporters.FieldIdentCode, "CR_F_14v_L"},
            {F015_ControllingBoard.FieldIdentCode, "CR_F_15_L"},
            {F015a_ControllingBoardSupporters.FieldIdentCode, "CR_F_15a_L"},
            {F016_TermsOfPartnership.FieldIdentCode,  "CR_F_16_L"},
            { F016a_TermOfExisting.FieldIdentCode,  "CR_F_16a_L"},
            { F016b_TermOfExistingEUIE.FieldIdentCode,  "CR_F_16b_L"},
            {F017_SpecialConditions.FieldIdentCode,  "CR_F_17_L"},
            {F018_PhysicalPersonTrader.FieldIdentCode,  "CR_F_18_L"},
            {F019_Partners.FieldIdentCode,  "CR_F_19_L"},
            {F020_UnlimitedLiabilityPartners.FieldIdentCode, "CR_F_20_L"},
            {F020a_UnlimitedLiabilityPartnersEUIE.FieldIdentCode, "CR_F_20a_L"},
            {F021_LimitedLiabilityPartners.FieldIdentCode, "CR_F_21_L"},
            {F022_ForeignTraders.FieldIdentCode, "CR_F_22_L"},
            {F022a_DiscontinuanceOfForeignTrader.FieldIdentCode, "CR_F_22a_L"},
            {F022b_InsolvenciesOfForeignTrader.FieldIdentCode, "CR_F_22b_L"},
            {F0223_EuropeanEconomicInterestGrouping.FieldIdentCode, "CR_F_22v_L"},
            {F0224_DiscontinuanceOfTheEUIE.FieldIdentCode, "CR_F_22g_L"},
            {F0225_InsolvenciesOfEUIE.FieldIdentCode, "CR_F_22d_L"},
            {F023_SoleCapitalOwner.FieldIdentCode,  "CR_F_23_L"},
            {F023a_Owner.FieldIdentCode,  "CR_F_23a_L"},
            {F023b_EuropeanHoldingCompanysAsShareholders.FieldIdentCode,  "CR_F_23b_L"},
            {F024_ShareTransfers.FieldIdentCode,  "CR_F_24_L"},
            {F024a_HiddenNonMonetaryDeposit.FieldIdentCode,  "CR_F_24a_L"},
            {F025_SharePaymentResponsibility.FieldIdentCode,  "CR_F_25_L"},
            {F025a_ConcededEstateValue.FieldIdentCode,  "CR_F_25a_L"},
            {F026_CessationOfTrade.FieldIdentCode, "CR_F_26_L" },
            {F026a_CessationOfNonProfitLegalEntity.FieldIdentCode, "CR_F_26a_L" },
            {F027_AddemptionOfTrader.FieldIdentCode,  "CR_F_27_L"},
            {F027a_AddemptionOfTraderSeatChange.FieldIdentCode,  "CR_F_27a_L"},
            {F027v_AddemptionOfTraderEraseForeignTrader.FieldIdentCode,  "CR_F_27v_L"},
            {F028_ClosureBranchOfForeignTrader.FieldIdentCode,  "CR_F_28_L"},
            {F028a_AddemptionOfEUIE.FieldIdentCode,  "CR_F_28а_L"},
            {F031_Funds.FieldIdentCode,  "CR_F_31_L"},
            {F031a_Shares.FieldIdentCode,  "CR_F_31a_L"},
            {F031b_MinimumAmount.FieldIdentCode,  "CR_F_31b_L"},
            {F032_DepositedFunds.FieldIdentCode,  "CR_F_32_L"},
            {F033_NonMonetaryDeposits.FieldIdentCode,  "CR_F_33_L"},
            {F034_BuyBackDecision.FieldIdentCode,  "CR_F_34_L"},
            {F051_BranchSeat.FieldIdentCode,  "CR_F_51_L"},
            {F051a_BranchFirm.FieldIdentCode,  "CR_F_51a_L"},
            {F051b_BranchIdentifier.FieldIdentCode,  "CR_F_51b_L"},
            {F052_BranchSubjectOfActivity.FieldIdentCode,  "CR_F_52_L"},
            {F052a_MainActivityNKID.FieldIdentCode,  "CR_F_52а_L"},
            {F053_BranchManagers.FieldIdentCode,  "CR_F_53_L"},
            {F054_VolumeOfRepresentationPower.FieldIdentCode,  "CR_F_54_L"},
            {F054a_VolumeOfRepresentationPower541.FieldIdentCode,  "CR_F_54_L"},
            {F055_BranchClosure.FieldIdentCode,  "CR_F_55_L"},
            {F041_Procurators.FieldIdentCode,  "CR_F_41_L"},
            {F042_SepcialPowers.FieldIdentCode,  "CR_F_42_L"},
            {F043_WayOfRepresentation43.FieldIdentCode,  "CR_F_43_L"},
            {F044_EraseProcura.FieldIdentCode,  "CR_F_44_L"},
            {F070_WayOfEstablishingEuropeanCompany.FieldIdentCode,  "CR_F_70_L"},
            {F070a_WayOfEstablishingEuropeanCooperativeSociety.FieldIdentCode,  "CR_F_70a_L"},
            {F071_SeatChange.FieldIdentCode,  "CR_F_71_L"},
            {F101_LimitSubjectOfActivity101.FieldIdentCode, "CR_F_101_L" },
            {F102_License102.FieldIdentCode, "CR_F_102_L"},
            {F102a_PutUnderParticularSupervision.FieldIdentCode, "CR_F_102a_L"},
            {F103_Authorization.FieldIdentCode, "CR_F_103_L" },
            { F104_Suquestrators104.FieldIdentCode, "CR_F_104_L"},
            { F105_OtherCircumstances105.FieldIdentCode, "CR_F_105_L"},
            { F106_LimitSubjectOfActivity106.FieldIdentCode, "CR_F_106_L"},
            { F107_ManageOrganizationAssets107.FieldIdentCode, "CR_F_107_L"},
            { F108_License108.FieldIdentCode, "CR_F_108_L"},
            { F109_Suquestrators109.FieldIdentCode, "CR_F_109_L"},
            { F110_OtherCircumstances110.FieldIdentCode, "CR_F_110_L"},
            { F115_RefusalOfLicense.FieldIdentCode, "CR_F_115_L"},

            {F111_LimitSubjectOfActivity111.FieldIdentCode,  "CR_F_111_L"},
            {F112_ManageOrganizationAssets112.FieldIdentCode, "CR_F_112_L" },
            {F113_Suquestrators113.FieldIdentCode, "CR_F_113_L" },
            {F114_OtherCircumstances114.FieldIdentCode, "CR_F_114_L" },
            {F116_SpecialManager.FieldIdentCode, "CR_F_116_L" },
            {F117_OtherCircumstances117.FieldIdentCode, "CR_F_117_L" },
            {F200_PledgeDDIdentifier.FieldIdentCode,  "CR_F_200_L"},
            {F201_Pledgors.FieldIdentCode,  "CR_F_201_L"},
            {F0100_Representative.FieldIdentCode,  "CR_APP_00093_L"},
            {F01020_Representative102.FieldIdentCode, "CR_GL_REPRESENTATIVE_L" },
           
            //B3
            {F203_SecuredClaimDebtors.FieldIdentCode,  "CR_F_203_L"},
            {F205_PledgeCreditors.FieldIdentCode,  "CR_F_205_L"},
            {F207_SecuredClaimReason.FieldIdentCode,  "CR_F_207_L"},
            {F207a_ContractOfPledgeForShare.FieldIdentCode,  "CR_F_207a_L"},
            {F208_SecuredClaimSubject.FieldIdentCode,  "CR_F_208_L"},
            {F209_SecuredClaimAmount.FieldIdentCode,  "CR_F_209_L"},
            {F210_SecuredClaimInterests.FieldIdentCode,  "CR_F_210_L"},
            {F211_SecuredClaimDelayInterests.FieldIdentCode,  "CR_F_211_L"},
            {F212_PledgeMoney.FieldIdentCode,  "CR_F_212_L"},
            {F213_PledgePropertyDescription.FieldIdentCode,  "CR_F_213_L"},
            {F214_PledgePropertyPrice.FieldIdentCode,  "CR_F_214_L"},
            {F215_ModalityDate.FieldIdentCode,  "CR_F_215_L"},
            {F216_ModalityCondition.FieldIdentCode,  "CR_F_216_L"},
            {F216a_PledgedCreditorAgreement.FieldIdentCode, "CR_F_216a_L"},
            {F217_PledgeExecutionClaim.FieldIdentCode,  "CR_F_217_L"},
            {F218_Partners218.FieldIdentCode,  "CR_F_218_L"},
            {F219_PledgeExecutionDepozitar.FieldIdentCode,  "CR_F_219_L"},
            {F220_Depozitar.FieldIdentCode,  "CR_F_220_L"},
            {F221_DepozitarDistraintRemove.FieldIdentCode,  "CR_F_221_L"},
            {F222_StopOfExecutionSize.FieldIdentCode,  "CR_F_222_L"},
            {F223_StopOfExecutionProperty.FieldIdentCode,  "CR_F_223_L"},
            {F223a_EntryIntoPledgeCreditorRights.FieldIdentCode,  "CR_F_223a_L"},
            {F224_PledgeRenewDate.FieldIdentCode,  "CR_F_224_L"},
            {F225_PledgeAddemption.FieldIdentCode,  "CR_F_225_L"},
            {F300_ForfeitCompanyIdentifier.FieldIdentCode,  "CR_F_300_L"},
            //End of B3

              //B4
            { F301_DebtorOverSecureClaims.FieldIdentCode, "CR_F_301_L" },
            { F303_AtPawnCreditors.FieldIdentCode, "CR_F_303_L" },
            { F305_Reason.FieldIdentCode, "CR_F_305_L" },
            { F305a_PledgeContractForTrader.FieldIdentCode, "CR_F_305a_L" },
            { F306_Object306.FieldIdentCode, "CR_F_306_L" },
            { F307_Size307.FieldIdentCode, "CR_F_307_L" },
            { F308_Interest.FieldIdentCode, "CR_F_308_L" },
            { F309_InterestAndDefaultForDelay.FieldIdentCode, "CR_F_309_L" },
            { F310_Size310.FieldIdentCode, "CR_F_310_L" },
            { F311_Description.FieldIdentCode, "CR_F_311_L" },
            { F312_Price312.FieldIdentCode, "CR_F_312_L" },
            { F313_Term.FieldIdentCode, "CR_F_313_L" },
            { F314_Circumstances.FieldIdentCode, "CR_F_314_L" },
            { F314a_PledgedCreditorAgreement2.FieldIdentCode, "CR_F_314a_L" },
            { F315_PartOfClaimwhatIsSeek.FieldIdentCode, "CR_F_315_L" },
            { F316_PropertyOverExecution.FieldIdentCode, "CR_F_316_L" },
            { F317_Depositor.FieldIdentCode, "CR_F_317_L" },
            { F318_InvitationForAppointingOfManager.FieldIdentCode, "CR_F_318_L" },
            { F319_ManagerOfTradeEnterprise.FieldIdentCode, "CR_F_319_L" },
            { F320_RestoringManagementRight.FieldIdentCode, "CR_F_320_L" },
            { F321_DistraintData.FieldIdentCode, "CR_F_321_L" },
            { F322_RaiseDistraint.FieldIdentCode, "CR_F_322_L" },
            { F323_Size323.FieldIdentCode, "CR_F_323_L" },
            { F324_StopExecutionOverProperty.FieldIdentCode, "CR_F_324_L" },
            { F324a_EntryIntoPledgeCreditorRights2.FieldIdentCode, "CR_F_324a_L" },
            { F325_EraseDistraint.FieldIdentCode, "CR_F_325_L" },
            { F325a_PartialEraseDistraint.FieldIdentCode, "CR_F_325a_L" },
            { F326_DateOfRenewingDistraint.FieldIdentCode, "CR_F_326_L" },
            //End Of B4

            //B6
            { F501_TermsOfLiquidation.FieldIdentCode, "CR_F_501_L" },
            { F502_Liquidators.FieldIdentCode, "CR_F_502_L" },
            { F503_Representative503.FieldIdentCode, "CR_F_503_L" },
            { F504_ContinuingTradeActivity.FieldIdentCode, "CR_F_504_L" },
            //End of B6

            { F506_ResumeOfLiquidation.FieldIdentCode, "CR_F_506_L"},

            //B7
            { F001b_NumberNationalRegister1b.FieldIdentCode, "CR_F_1b_L" },
            {F530_OffshoreIdentifier.FieldIdentCode,  "CR_F_530_L"},
            { F529_ReasonForEntry529.FieldIdentCode, "CR_F_529_L" },
            { F531_OffshoreCompany.FieldIdentCode, "CR_F_531_L" },
            { F532_OffshoreTransliteration.FieldIdentCode, "CR_F_532_L" },
            { F533_OffshoreSeat.FieldIdentCode, "CR_F_533_L" },
            { F534_OffshoreRepresentatives.FieldIdentCode, "CR_F_534_L" },
            { F535_OffshoreWayOfRepresentation.FieldIdentCode, "CR_F_535_L" },
            { F536_OffshoreSpecialConditions.FieldIdentCode, "CR_F_536_L" },

            { F537_OffshoreDirectControlCompanies.FieldIdentCode, "CR_F_537_L" },
            { F5371_OffshoreDirectControlCompanyRepresentatives.FieldIdentCode, "CR_F_5371_L" },
            { F538_OffshoreNoDirectControlCompanies.FieldIdentCode, "CR_F_538_L" },
            { F5381_OffshoreNoDirectControlCompanyRepresentatives.FieldIdentCode, "CR_F_5381_L" },

            { F540_CircumstanceArticle4.FieldIdentCode, "CR_F_540_L" },
            { F550_ActualOwners.FieldIdentCode, "CR_F_550_L" },
            { F550a_ContactPerson550a.FieldIdentCode, "CR_F_550a_L" },
            { F551_EraseActualOwner.FieldIdentCode, "CR_F_551_L" },
            //End Of B7

            {F400_DistraintIdentifier.FieldIdentCode,  "CR_F_400_L"},
            {F401_Distraints.FieldIdentCode,  "CR_F_401_L"},
            {F403_Reason403.FieldIdentCode,  "CR_F_403_L"},
            {F404_Size404.FieldIdentCode,  "CR_F_404_L"},
            {F404a_MoratoryRate.FieldIdentCode,  "CR_F_404a_L"},
            {F405_Interests.FieldIdentCode,  "CR_F_405_L"},
            {F406_Descriptions.FieldIdentCode,  "CR_F_406_L"},
            {F408_LiftingDistraint.FieldIdentCode,  "CR_F_408_L"},
            {F409_Size409.FieldIdentCode,  "CR_F_409_L"},
            {F410_StopExecutionOverProperty410.FieldIdentCode,  "CR_F_410_L"},
            {F505_StopOfLiquidation.FieldIdentCode,  "CR_F_505_L"},
            {F600_TransferringTypeOfTradeEnterprise.FieldIdentCode,  "CR_F_600_L"},
            {F601_TransferringEnterprise.FieldIdentCode,  "CR_F_601_L"},
            {F602_AcquisitionEnterprises.FieldIdentCode,  "CR_F_602_L"},
            {F701_FormOfTransforming701.FieldIdentCode,  "CR_F_701_L"},
            {F7020_TransformingCompany.FieldIdentCode,  "CR_F_702_L"},
            {F702_TransformingCompanys.FieldIdentCode,  "CR_F_702_L"},
            {F702a0_TransformingCompany2.FieldIdentCode,  "CR_F_702a_L"},
            {F702a_TransformingCompanys2.FieldIdentCode,  "CR_F_702a_L"},
            {F702b_TransformingNPOs.FieldIdentCode, "CR_F_702b_L" },
            {F7030_Successor.FieldIdentCode,  "CR_F_703_L"},
            {F703_Successors.FieldIdentCode,  "CR_F_703_L"},
            {F704_Branches704.FieldIdentCode,  "CR_F_704_L"},
            {F705_StoppingEntry.FieldIdentCode,  "CR_F_705_L"},
            {F706_NumberApplication.FieldIdentCode,  "CR_F_706_L"},
            {F801_FormOfTransforming801.FieldIdentCode,  "CR_F_801_L"},
            {F801a_FormOfTransforming801a.FieldIdentCode,  "CR_F_801а_L"},
            {F8020_CoOperative.FieldIdentCode,  "CR_F_802_L"},
            {F802_ReorganizeCoOperatives.FieldIdentCode,  "CR_F_802_L"},
            {F802a0_CoOperative2.FieldIdentCode,  "CR_F_802a_L"},
            {F802a_ReorganizeCoOperatives2.FieldIdentCode,  "CR_F_802a_L"},
            {F8030_Successor803.FieldIdentCode,  "CR_F_803_L"},
            {F803_Successors803.FieldIdentCode,  "CR_F_803_L"},
            {F804_ReorgBranches.FieldIdentCode,  "CR_F_804_L"},
            {F8500_StabilizationOpenProccedings.FieldIdentCode,  "CR_F_850_L"},
            {F8510_StabilizationAdoptionOfPrecautionaryMeasures.FieldIdentCode,  "CR_F_851_L"},
            {F8520_StabilizatioLimitingTheDebtorsAuthority.FieldIdentCode,  "CR_F_852_L"},
            {F8530_StabilizationSuspendProceeding.FieldIdentCode,  "CR_F_853_L"},
            {F8550_StabilizationDottedPersons.FieldIdentCode,  "CR_F_855_L"},
            {F8560_StabilizationInspectors.FieldIdentCode,  "CR_F_856_L"},
            {F8570_StabilizationSupervisorBody.FieldIdentCode,  "CR_F_857_L"},
            {F901_OpenProccedings.FieldIdentCode,  "CR_F_901_L"},
            {F901_2_OpenProccedingsSecIns.FieldIdentCode, "CR_F_901_2_L" },
            {F901_3_OpenProccedingsThirdIns.FieldIdentCode, "CR_F_901_3_L" },
            { F902_InsolvencyDate.FieldIdentCode, "CR_F_902_L"},
            { F902_InsolvencyData.FieldIdentCode, "CR_F_902_L"},
            { F902_2_InsolvencyDataSecIns.FieldIdentCode, "CR_F_902_2_L"},
            { F902_3_InsolvencyDataThirdIns.FieldIdentCode, "CR_F_902_3_L"},
            { F903_DebtorBodies.FieldIdentCode, "CR_F_903_L"},
            { F903_2_DebtorBodiesSecIns.FieldIdentCode, "CR_F_903_2_L"},
            { F903_3_DebtorBodiesThirdIns.FieldIdentCode, "CR_F_903_3_L"},
            { F904_HoldProceedings.FieldIdentCode, "CR_F_904_L"},
            { F904_2_HoldProceedingsSecIns.FieldIdentCode, "CR_F_904_2_L"},
            { F904_3_HoldProceedingsThirdIns.FieldIdentCode, "CR_F_904_3_L"},
            { F905_ReOpenProceedings.FieldIdentCode, "CR_F_905_L"},
            { F905_2_ReOpenProceedingsSecIns.FieldIdentCode, "CR_F_905_2_L"},
            { F905_3_ReOpenProceedingsThirdIns.FieldIdentCode, "CR_F_905_3_L"},
            { F906_SuspendProceedings.FieldIdentCode, "CR_F_906_L" },
            { F906_2_SuspendProceedingsSecIns.FieldIdentCode, "CR_F_906_2_L"},
            { F906_3_SuspendProceedingsThirdIns.FieldIdentCode, "CR_F_906_3_L"},
            { F906a_TraverseOfRecoverPlan.FieldIdentCode, "CR_F_906a_L" },
            { F906a_2_TraverseOfRecoverPlanSecIns.FieldIdentCode, "CR_F_906a_2_L"},
            { F906a_3_TraverseOfRecoverPlanThirdIns.FieldIdentCode, "CR_F_906a_3_L"},
            { F907_RestrictDebtorOrderPower.FieldIdentCode, "CR_F_907_L" },
            { F907_2_RestrictDebtorOrderPowerSecIns.FieldIdentCode, "CR_F_907_2_L"},
            { F907_3_RestrictDebtorOrderPowerThirdIns.FieldIdentCode, "CR_F_907_3_L"},
            { F908_GeneralSeizure.FieldIdentCode, "CR_F_908_L" },
            { F908_2_GeneralSeizureSecIns.FieldIdentCode, "CR_F_908_2_L"},
            { F908_3_GeneralSeizureThirdIns.FieldIdentCode, "CR_F_908_3_L"},
            { F909_CashIn.FieldIdentCode, "CR_F_909_L" },
            { F909_2_CashInSecIns.FieldIdentCode, "CR_F_909_2_L"},
            { F909_3_CashInThirdIns.FieldIdentCode, "CR_F_909_3_L"},
            { F910_DeclareBankrupt.FieldIdentCode, "CR_F_910_L" },
            { F910_2_DeclareBankruptSecIns.FieldIdentCode, "CR_F_910_2_L"},
            { F910_3_DeclareBankruptThirdIns.FieldIdentCode, "CR_F_910_3_L"},
            { F911_Reinstatements.FieldIdentCode, "CR_F_911_L" },
            { F911_2_ReinstatementsSecIns.FieldIdentCode, "CR_F_911_2_L"},
            { F911_3_ReinstatementsThirdIns.FieldIdentCode, "CR_F_911_3_L"},
            { F911a_ReinstatementsDisallowPetition.FieldIdentCode, "CR_F_911a_L" },
            { F911a_2_ReinstatementsDisallowPetitionSecIns.FieldIdentCode, "CR_F_911a_2_L"},
            { F911a_3_ReinstatementsDisallowPetitionThirdIns.FieldIdentCode, "CR_F_911a_3_L"},
            { F912_Trustees.FieldIdentCode, "CR_F_912_L" },
            { F912_2_TrusteesSecIns.FieldIdentCode, "CR_F_912_2_L"},
            { F912_3_TrusteesThirdIns.FieldIdentCode, "CR_F_912_3_L"},
            { F915_SupervisionBody.FieldIdentCode, "CR_F_915_old_L"},
            { F915_SupervisionBodyFull.FieldIdentCode, "CR_F_915_L"},
            { F915_2_SupervisionBodyFullSecIns.FieldIdentCode, "CR_F_915_2_L"},
            { F915_3_SupervisionBodyFullThirdIns.FieldIdentCode, "CR_F_915_3_L"},

            //ТОДО: За всеки един акт да се добави ресурса.

            {F10019A_StatementsA.FieldIdentCode,  "CR_GL_CURRENT_CONSTUTIVE_ACT_L"}, //Актуален учредителен акт
            {F10019B_StatementsB.FieldIdentCode,  "CR_GL_ANNUAL_FINANCIAL_REPORT_L"}, //Годишен финансов отчет
            {F10019C_StatementsC.FieldIdentCode,  "CR_GL_INVITATION_GENERAL_MEETING_SHAREHOLDERS_L"}, //Покана за свикване на общо събрание на акционерите
            {F10019D_StatementsD.FieldIdentCode,  "CR_GL_INVITATION_GENERAL_MEETING_BONDHOLDERS_L"}, //Покана за свикване на общо събрание на облигационерите
            {F10019E_StatementsE.FieldIdentCode,  "CR_GL_INVITATION_SUBSCRIBE_NEW_SHARES_L"}, //Покана за записване на нови акции
            {F10019F_StatementsF.FieldIdentCode,  "CR_GL_INVITATION_TO_CREDITORS_L"}, //Покана до кредиторите
            {F10019G_StatementsG.FieldIdentCode,  "CR_GL_INVITATION_MEETING_CREDITORS_L"}, //Покана за събрание на кредиторите
            {F10019H_StatementsH.FieldIdentCode,  "CR_GL_ANNOUNCEMENT_DEBENTURE_LOAN_L"}, //Съобщение за сключен облигационен заем
            {F10019I_StatementsI.FieldIdentCode,  "CR_GL_EXCLUSION_WARNING_SHAKEHOLDER_L"}, //Предупреждение за изключване на акционер
            {F10019J_StatementsJ.FieldIdentCode,  "CR_GL_DECISION_REDUCE_CAPITAL_L"}, //Решение за намаляване на капитала
            {F10019K_StatementsK.FieldIdentCode,  "CR_GL_DECISION_INCREASE_CAPITAL_L"}, //Решение за увеличаване на капитала
            {F10019L_StatementsL.FieldIdentCode,  "CR_GL_DECISION_DROP_LIMIT_BENEFITS_SHAREHOLDERS_L"}, //Решение за отпадане или ограничаване на предимствата на акционерите
            {F10019M_StatementsM.FieldIdentCode,  "CR_GL_REDEMPTION_PROPOSAL_SHARES_L"}, //Предложение за обратно изкупуване на акции
            {F10019N_StatementsN.FieldIdentCode,  "CR_GL_CONVERSION_PLAN_L"}, //План за преобразуване
            {F10019O_StatementsO.FieldIdentCode,  "CR_GL_REPORT_MANAGEMENT_AUTHORITY_L"}, //Доклад на управителния орган
            {F10019P_StatementsP.FieldIdentCode,  "CR_GL_LIST_ACCEPTED_FINANCIAL_STATEMENTS_L"}, //Списък на приетите вземания и финансовите отчети
            {F10019Q_StatementsQ.FieldIdentCode,  "CR_GL_ANNOUNCEMENT_DISTRIBUTION_ACCOUNT_L"}, //Съобщение за изготвена сметка за разпределение
            {F10019R_StatementsR.FieldIdentCode,  "CR_GL_REQUEST_REIMBURSEMENT_RIGHTS_L"}, //Молба за възстановяване на права
            {F10019S_StatementsS.FieldIdentCode,  "CR_GL_ANOTHER_ACT_L"}, //Друг акт
            {F10019T_StatementsT.FieldIdentCode,  "CR_GL_SUMMONS_CREDITOR_WITHOUT_ADDRESS_COUNTRY_L"}, //Призовка до кредитор със седалище в чужбина без съдебен адрес в страната
            {F10019U_StatementsU.FieldIdentCode,  "CR_GL_COURT_APPROVAL_DISTRIBUTION_ACCOUNT_L"}, //Определение на съда за одобряване на сметката за разпределение
            {F10019V_StatementsV.FieldIdentCode,  "CR_GL_COURT_APPROVAL_LIST_ACCEPTED_SYNDIC_L"}, //Определение на съда за одобряване на списъка на приетите от синдика вземания
            {F10019W_StatementsW.FieldIdentCode,  "CR_GL_ANNOUNCEMENT_DATE_CREDITORS_MEETING_L"}, //Съобщение за датата на провеждане на събранието на кредиторите за приемане на допуснатия за разглеждане план
            {F10019X_StatementsX.FieldIdentCode,  "CR_GL_ACCEPTANCE_RESCUE_PLAN_CREDITORS_MEETING_L"}, //Приемане на плана за оздравяване от събранието на кредиторите
            {F10019Y_StatementsY.FieldIdentCode,  "CR_GL_COMPLAINT_AGAINST_COURT_ORDER_L"}, //Жалба срещу определение на съда за одобряване на сметката за разпределени
            {F10019Z_StatementsZ.FieldIdentCode,  "CR_GL_PROPOSAL_MINORITY_SHAREHOLDERS_L"}, //Предложение от миноритарните акционери по чл. 223а, ал. 1 и 2 от Търговския закон
            {F1001AA_StatementsAA.FieldIdentCode,  "CR_GL_DECISION_SIMULTANEOUSLY_INCREASE_DECREASE_CAPITAL_L"}, //Решение за едновременно увеличаване и намаляване на капитала по чл. 203 от Търговския закон
            {F1001AB_StatementsAB.FieldIdentCode,  "CR_GL_ANNOUNCEMENT_PLACE_AVAILABLE_INSPECTION_LIST_L"}, //Съобщение за мястото, където списъкът на приетите вземания ще бъде на разположение за проверка, съгласно чл. 64, ал. 2 от Закона за банковата несъстоятелност
            {F1001AC_StatementsAC.FieldIdentCode,  "CR_GL_CONTRACT_CONVERSION_PLAN_L"}, //Договор / план за преобразуване
            {F1001AD_StatementsAD.FieldIdentCode,  "TODO_KEY_CR_F_1001_L"},
            {F1001AE_StatementsAE.FieldIdentCode,  "TODO_KEY_CR_F_1001_L"},
            {F1001AF_StatementsAF.FieldIdentCode,  "TODO_KEY_CR_F_1001_L"},
            {F1001AG_StatementsAG.FieldIdentCode,  "TODO_KEY_CR_F_1001_L"},
            {F1001AH_StatementsAH.FieldIdentCode,  "TODO_KEY_CR_F_1001_L"},
            {F1001AI_StatementsAI.FieldIdentCode,  "CR_GL_REPORT_MANAGEMENT_AUTHORITY_TRANSFORMATION_L"}, //Доклад на управителния орган за преобразуването
            {F1001AJ_StatementsAJ.FieldIdentCode,  "CR_APP_00053_L"}, //Актуален дружествен договор/учредителен акт/устав
            {F1001AK_StatementsAK.FieldIdentCode,  "CR_APP_00054_L"}, //Молба за откриване на производство по несъстоятелност
            {F1001AL_StatementsAL.FieldIdentCode,  "CR_APP_00055_L"}, //Вписване на решение на чуждестранен съд относно образувано производство по несъстоятелност в чужбина
            {F1001AM_StatementsAM.FieldIdentCode,  "CR_APP_00056_L"}, //Друг акт несъстоятелност
            {F1001AN_StatementsAN.FieldIdentCode,  "CR_APP_00057_L"}, //Съобщение за подадена молба за стабилизация на търговеца
            {F1001AO_StatementsAO.FieldIdentCode,  "CR_APP_00058_L"}, //Съобщение за отстраняване на нередовности на молбата за стабилизация на търговеца
            {F1001AP_StatementsAP.FieldIdentCode,  "CR_APP_00059_L"}, //Призовка за съдебно заседание
            {F1001AQ_StatementsAQ.FieldIdentCode,  "CR_APP_00060_L"}, //Призовка за съдебно заседание за разглеждане и приемане на плана
            {F1001AR_StatementsAR.FieldIdentCode,  "CR_APP_00061_L"}, //Списък на кредиторите по чл. 770, ал. 2, т. 1
            {F1001AS_StatementsAS.FieldIdentCode,  "CR_APP_00062_L"}, //Определение на съда за откриване на производството по стабилизация на търговеца
            {F1001AT_StatementsAT.FieldIdentCode,  "CR_APP_00063_L"}, //Определение на съда за отхвърляне на молбата за стабилизация на търговеца
            {F1001AU_StatementsAU.FieldIdentCode,  "CR_APP_00064_L"}, //Определение на съда за одобряване на окончателния списък на кредиторите
            {F1001AV_StatementsAV.FieldIdentCode,  "CR_APP_00065_L"}, //Определение на съда за утвърждаване или отказ за утвърждаване на плана
            {F1001AW_StatementsAW.FieldIdentCode,  "CR_APP_00066_L"}, //Жалба срещу Определение на съда за утвърждаване или отказ за утвърждаване на плана
            {F1001AX_StatementsAX.FieldIdentCode,  "CR_APP_00067_L"}, //Определение на съда за прекратяване на производството по стабилизация
            {F1001AY_StatementsAY.FieldIdentCode,  "CR_APP_00068_L"}, //Жалба срещу Определение на съда за прекратяване на производството по стабилизация
            {F1001AZ_StatementsAZ.FieldIdentCode,  "CR_APP_00069_L"}, //Друг акт: Стабилизация
            {F1001BA_StatementsBA.FieldIdentCode,  "CR_APP_00070_L"}, //Обявление за продажба на заложеното имущество по чл. 37, ал. 3 от Закон за особените залози
            {F1001BB_StatementsBB.FieldIdentCode,  "CR_APP_00071_L"}, //Списък на лицата, имащи права върху заложеното имущество по чл. 39 , ал. 1 от ЗОЗ
            {F1001BC_StatementsBC.FieldIdentCode,  "CR_APP_00072_L"}, //Окончателен списък на лицата, имащи права върху заложеното имущество по чл. 39, ал. 4 от ЗОЗ
            {F1001BD_StatementsBD.FieldIdentCode,  "CR_APP_00073_L"}, //Разпределение на сумите, получени при изпълнение върху заложеното имущество имущество по чл. 41, ал. 1 от ЗОЗ
            {F1001BE_StatementsBE.FieldIdentCode,  "CR_APP_00074_L"}, //Покана за свикване на общо събрание на членовете на ЮЛНЦ
            {F1001BF_StatementsBF.FieldIdentCode,  "CR_APP_00075_L"}, //Решение за учредяване на ЮЛНЦ
            {F1001BG_StatementsBG.FieldIdentCode,  "CR_APP_00076_L"}, //Решенията за промени в обстоятелствата, подлежащи на вписване за ЮЛНЦ
            {F1001BH_StatementsBH.FieldIdentCode,  "CR_APP_00077_L"}, //Годишен доклад за дейността
            {F1001BI_StatementsBI.FieldIdentCode,  "CR_APP_00078_L" }, //Декларация по чл.38, ал.9, т.2 от ЗСч

            {F016v_TermOfExistenceNonProfitLegalEntity.FieldIdentCode,  "CR_F_16v_L"},
            {F0103_Representative103.FieldIdentCode,  "CR_F_TODO_WAITING_ANALISIS"},
            {F0103_Representatives103.FieldIdentCode,  "CR_F_10a_L"},

            {F012d_ManagementBody12d.FieldIdentCode,  "CR_F_TODO_WAITING_ANALISIS"},
            {F012d_ManagementBody12dMandate.FieldIdentCode,  "CR_F_TODO_WAITING_ANALISIS"},
            {F012d_ManagementBodies12d.FieldIdentCode,  "CR_F_12d_L"},
            {F012g_Authority12g.FieldIdentCode,  "CR_F_TODO_WAITING_ANALISIS"},
            {F012g_Authorities12g.FieldIdentCode,  "CR_F_12g_L"},
            {F013g_Trustee13g.FieldIdentCode,  "CR_F_TODO_WAITING_ANALISIS"},
            {F013g_BoardOfTrusties13gMandate.FieldIdentCode,  "CR_F_TODO_WAITING_ANALISIS"},
            {F013g_BoardOfTrusties13g.FieldIdentCode,  "CR_F_13g_L"},
            {F015b1_CommissionMember15b.FieldIdentCode,  "CR_F_TODO_WAITING_ANALISIS"},
            {F015b0_VerificationCommission15bMandate.FieldIdentCode,  "CR_F_TODO_WAITING_ANALISIS"},
            {F015b_VerificationCommission15b.FieldIdentCode,  "CR_F_15b_L"},
            {F017a_DesignatedToPerformPublicBenefit.FieldIdentCode,  "CR_F_17a_L"},
            {F017b_TemporarilySuspendedStatusForPublicBenefits.FieldIdentCode,  "CR_F_17b_L"},
            {F017v_RestorationOfStatusInPublicBenefit.FieldIdentCode,  "CR_F_17v_L"},
            {F017g_DesignatedToCarryOutPrivateActivity.FieldIdentCode,  "CR_F_17g_L"},
            {F025b_TotalAmountOfInitialPropertyContributions.FieldIdentCode,  "CR_F_25b_L"},
            {F02530_MembershipFees25v.FieldIdentCode,  "CR_F_TODO_WAITING_ANALISIS"},
            {F02531_CulturalEducationalAndInformationActivities25v.FieldIdentCode,  "CR_F_TODO_WAITING_ANALISIS"},
            {F02532_SubsidyFromStateAndMunicipalBudgets25v.FieldIdentCode,  "CR_F_TODO_WAITING_ANALISIS"},
            {F02533_RentalOfMovableAndImmovableProperty25v.FieldIdentCode,  "CR_F_TODO_WAITING_ANALISIS"},
            {F02534_DonationAndWills25v.FieldIdentCode,  "CR_F_TODO_WAITING_ANALISIS"},
            {F02535_OtherExpenses25v.FieldIdentCode,  "CR_F_TODO_WAITING_ANALISIS"},
            {F025v_SourcesOfInitialFinancing25v.FieldIdentCode,  "CR_F_25v_L"},
            {Domain.ApplicationForms.ContestationAct.FieldIdentCode, "CR_F_COURT_ACT_APPL_CONTESTATION_TRANSFORM_L" },
        };

        private static readonly Dictionary<LegalForms, string> LegalFormNameCode = new Dictionary<LegalForms, string>()
        {
            {LegalForms.ET,    "CR_GL_EUROPEAN_SOLE_TRADER_SHORT_L"}, //ЕТ
            {LegalForms.SD,    "CR_GL_COLLECTIVE_COMPANY_SHORT_L"}, //СД
            {LegalForms.KD,    "CR_GL_LIMITED_PARTNERSHIPS_SHORT_L"}, //КД
            {LegalForms.OOD,   "CR_GL_LIMITED_COMPANY_SHORT_L"}, //ООД
            {LegalForms.EOOD,  "CR_GL_LIMITED_COMPANY_SHORT_EOOD_L"}, //ЕООД
            {LegalForms.AD,    "CR_GL_STOCK_COMPANY_SHORT_L"}, //АД
            {LegalForms.EAD,   "CR_GL_STOCK_COMPANY_SHORT_EAD_L"}, //ЕАД
            {LegalForms.IAD,   "CR_GL_SHARE_COMPANY_INVESTMENT_SHORT_L"}, //АДСИЦ
            {LegalForms.IEAD,  "CR_GL_SOLE_COMPANY_INVESTMENT_SHORT_L"}, //ЕАДСИЦ
            {LegalForms.KDA,   "CR_GL_LIMITED_PARTNERSHIPS_SHARES_SHORT_L"}, //КДА
            {LegalForms.K,     "CR_GL_COOPERATION_L"}, //Кооперация
            {LegalForms.KCHT,  "CR_GL_BRANCH_FOREIGN_TRADER_SHORT_L"}, //КЧТ
            {LegalForms.TPPD,  "CR_GL_STATE_COMPANY_SHORT_L"}, //ДП
            {LegalForms.TPPO,  "CR_GL_MUNICIPAL_COMPANY_SHORT_L"}, //ОП
            {LegalForms.EUIE,  "CR_GL_EUROPEAN_UNITED_INTERESTS_SHORT_L"}, //ЕОИИ
            {LegalForms.DEUIE, "CR_GL_UNIT_EOII_L"}, //Поделение на ЕОИИ
            {LegalForms.ED,    "CR_GL_EUROPEAN_COMPANY_SHORT_L"}, //ЕД
            {LegalForms.EKD,   "CR_GL_EUROPEAN_COOPERATIVE_COMPANY_SHORT_L"}, //ЕКД
            {LegalForms.LEKD,  "CR_GL_EUROPEAN_COOPERATIVE_LIMITED_COMPANY_SHORT_L"}, //ЕКДОО
            {LegalForms.CHD,   "CR_GL_OFFSHORE_COMPANY_SHORT_L"}, //ЧДПР
            {LegalForms.CHDU,  "CR_GL_FOREIGN_LEGAL_ENTITY_SHORT_L"}, //ЧЮП
            {LegalForms.CHDF,  "CR_GL_FOREIGN_INDIVIDUAL_SHORT_L"},  //ЧФЛ
            {LegalForms.ASSOC, "CR_GL_ASSOCIATION_L"}, //Сдружение
            {LegalForms.FOUND, "CR_GL_FONDATION_L"}, //Фондация
            {LegalForms.BFLE,  "CR_GL_BRANCH_FOREIGN_NPO_SHORT_L"},  //КЧЮЛНЦ
            {LegalForms.CC,    "CR_GL_NATIONAL_CHITALISHTE_SHORT_L"}, //Читалище
            {LegalForms.TPP,   "GL_CR_TRADER_PUBLIC_ENTERPRISE_SHORT_L" } //ТПП
        };

        #endregion

        public static string GetSectionNameCode(int key)
        {
            return SectionNameCode.ContainsKey(key) ? SectionNameCode[key] : string.Format("TODO_Key_Section_ID_{0}", key);
        }

        public static string GetGroupNameCode(int key)
        {
            return GroupNameCode.ContainsKey(key) ? GroupNameCode[key] : string.Format("TODO_Key_Group_ID_{0}", key);
        }

        public static string GetFieldNameCode(string key)
        {
            return FieldNameCode.ContainsKey(key) ? FieldNameCode[key] : string.Format("TODO_Key_FieldCode_{0}", key);
        }

        public static string GetLegalFormNameCode(LegalForms key)
        {
            return LegalFormNameCode.ContainsKey(key) ? LegalFormNameCode[key] : string.Format("TODO_Key_LegalForm_{0}", key);
        }
    }
}

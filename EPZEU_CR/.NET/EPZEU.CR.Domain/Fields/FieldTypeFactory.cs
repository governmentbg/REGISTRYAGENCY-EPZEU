﻿using EPZEU.CR.Domain.ApplicationForms;
using System;
using System.Collections.Generic;

namespace EPZEU.CR.Domain.Fields
{
    public static class FieldTypeFactory
    {
        public static Dictionary<string, Type> FieldTypeDict = new Dictionary<string, Type>()
        {
            { F001_UIC.FieldIdentCode, typeof(F001_UIC) },
            { F001a_NumberNationalRegister.FieldIdentCode, typeof(F001a_NumberNationalRegister) },
            { F002_Company.FieldIdentCode, typeof(F002_Company) },
            { F003_LegalForm.FieldIdentCode, typeof(F003_LegalForm) },
            { F004_Transliteration.FieldIdentCode, typeof(F004_Transliteration) },
            { F005_Seat.FieldIdentCode, typeof(F005_Seat) },
            { F005a_SeatForCorrespondence.FieldIdentCode, typeof(F005a_SeatForCorrespondence) },
            { F006_SubjectOfActivity.FieldIdentCode, typeof(F006_SubjectOfActivity) },
            { F006a_SubjectOfActivityNKID.FieldIdentCode, typeof(F006a_SubjectOfActivityNKID) },
            { F006b_Objectives.FieldIdentCode, typeof(F006b_Objectives) },
            { F006g_SubjectToAdditionalBusinessActivity.FieldIdentCode, typeof(F006g_SubjectToAdditionalBusinessActivity) },
            { F006v_MeansOfAchievingTheObjectives.FieldIdentCode, typeof(F006v_MeansOfAchievingTheObjectives) },
            { F007_Managers.FieldIdentCode, typeof(F007_Managers) },
            { F007a_AssignedManagers.FieldIdentCode, typeof(F007a_AssignedManagers) },
            { F008_WayOfManagement.FieldIdentCode, typeof(F008_WayOfManagement)},
            { F009_ChairMan.FieldIdentCode, typeof(F009_ChairMan)},
            { F0101_Representatives101.FieldIdentCode, typeof(F0101_Representatives101)},
            { F0102_Representatives102.FieldIdentCode, typeof(F0102_Representatives102)},
            { F0103_Representatives103.FieldIdentCode, typeof(F0103_Representatives103)},
            { F010_Representatives.FieldIdentCode, typeof(F010_Representatives)},
            { F011_WayOfRepresentation.FieldIdentCode, typeof(F011_WayOfRepresentation) },
            { F012_BoardOfDirectors.FieldIdentCode, typeof(F012_BoardOfDirectors) },
            { F012a_BoardOfManagers3.FieldIdentCode, typeof(F012a_BoardOfManagers3) },
            { F012b_AdministrativeBoard.FieldIdentCode, typeof(F012b_AdministrativeBoard) },
            { F012v_AdministrativeBoardSupporters.FieldIdentCode, typeof(F012v_AdministrativeBoardSupporters) },
            { F012g_Authorities12g.FieldIdentCode, typeof(F012g_Authorities12g) },
            { F012d_ManagementBodies12d.FieldIdentCode, typeof(F012d_ManagementBodies12d) },
            { F012d_ManagementBody12d.FieldIdentCode, typeof(F012d_ManagementBody12d) },
            { F012d_ManagementBody12dMandate.FieldIdentCode, typeof(F012d_ManagementBody12dMandate) },
            { F013_BoardOfManagers.FieldIdentCode, typeof(F013_BoardOfManagers) },
            { F013_BoardOfManagers2.FieldIdentCode, typeof(F013_BoardOfManagers2) },
            { F013a_BoardOfManagersSupporters.FieldIdentCode, typeof(F013a_BoardOfManagersSupporters) },
            { F013b_LeadingBoard.FieldIdentCode, typeof(F013b_LeadingBoard) },
            { F013v_BoardOfManagersSupporters2.FieldIdentCode, typeof(F013v_BoardOfManagersSupporters2) },
            { F013g_BoardOfTrusties13g.FieldIdentCode, typeof(F013g_BoardOfTrusties13g) },
            { F014_SupervisingBoard.FieldIdentCode, typeof(F014_SupervisingBoard) },
            { F014b_SupervisingBoard2.FieldIdentCode, typeof(F014b_SupervisingBoard2) },
            { F014v_SupervisingBoardSupporters.FieldIdentCode, typeof(F014v_SupervisingBoardSupporters) },
            { F015_ControllingBoard.FieldIdentCode, typeof(F015_ControllingBoard) },
            { F015a_ControllingBoardSupporters.FieldIdentCode, typeof(F015a_ControllingBoardSupporters) },
            { F015b_VerificationCommission15b.FieldIdentCode, typeof(F015b_VerificationCommission15b) },
            { F016_TermsOfPartnership.FieldIdentCode, typeof(F016_TermsOfPartnership) },
            { F016a_TermOfExisting.FieldIdentCode, typeof(F016a_TermOfExisting) },
            { F016b_TermOfExistingEUIE.FieldIdentCode, typeof(F016b_TermOfExistingEUIE) },
            { F016v_TermOfExistenceNonProfitLegalEntity.FieldIdentCode, typeof(F016v_TermOfExistenceNonProfitLegalEntity) },
            { F017_SpecialConditions.FieldIdentCode, typeof(F017_SpecialConditions) },
            { F017a_DesignatedToPerformPublicBenefit.FieldIdentCode, typeof(F017a_DesignatedToPerformPublicBenefit) },
            { F017b_TemporarilySuspendedStatusForPublicBenefits.FieldIdentCode, typeof(F017b_TemporarilySuspendedStatusForPublicBenefits)},
            { F017v_RestorationOfStatusInPublicBenefit.FieldIdentCode, typeof(F017v_RestorationOfStatusInPublicBenefit) },
            { F017g_DesignatedToCarryOutPrivateActivity.FieldIdentCode, typeof(F017g_DesignatedToCarryOutPrivateActivity) },
            { F019_Partners.FieldIdentCode, typeof(F019_Partners) },
            { F020_UnlimitedLiabilityPartners.FieldIdentCode, typeof(F020_UnlimitedLiabilityPartners)},
            { F020a_UnlimitedLiabilityPartnersEUIE.FieldIdentCode, typeof(F020a_UnlimitedLiabilityPartnersEUIE)},
            { F021_LimitedLiabilityPartners.FieldIdentCode, typeof(F021_LimitedLiabilityPartners)},
            { F022_ForeignTraders.FieldIdentCode, typeof(F022_ForeignTraders)},
            { F022a_DiscontinuanceOfForeignTrader.FieldIdentCode, typeof(F022a_DiscontinuanceOfForeignTrader)},
            { F022b_InsolvenciesOfForeignTrader.FieldIdentCode, typeof(F022b_InsolvenciesOfForeignTrader)},
            { F0223_EuropeanEconomicInterestGrouping.FieldIdentCode, typeof(F0223_EuropeanEconomicInterestGrouping)},
            { F0224_DiscontinuanceOfTheEUIE.FieldIdentCode, typeof(F0224_DiscontinuanceOfTheEUIE)},
            { F0225_InsolvenciesOfEUIE.FieldIdentCode, typeof(F0225_InsolvenciesOfEUIE)},
            { F023_SoleCapitalOwner.FieldIdentCode, typeof(F023_SoleCapitalOwner) },
            { F023a_Owner.FieldIdentCode, typeof(F023a_Owner) },
            { F023b_EuropeanHoldingCompanysAsShareholders.FieldIdentCode, typeof(F023b_EuropeanHoldingCompanysAsShareholders) },
            { F024_ShareTransfers.FieldIdentCode, typeof(F024_ShareTransfers) },
            { F024a_HiddenNonMonetaryDeposit.FieldIdentCode, typeof(F024a_HiddenNonMonetaryDeposit) },
            { F025_SharePaymentResponsibility.FieldIdentCode, typeof(F025_SharePaymentResponsibility) },
            { F025a_ConcededEstateValue.FieldIdentCode, typeof(F025a_ConcededEstateValue) },
            { F025b_TotalAmountOfInitialPropertyContributions.FieldIdentCode, typeof(F025b_TotalAmountOfInitialPropertyContributions) },
            { F025v_SourcesOfInitialFinancing25v.FieldIdentCode, typeof(F025v_SourcesOfInitialFinancing25v) },
            { F026_CessationOfTrade.FieldIdentCode, typeof(F026_CessationOfTrade) },
            { F026a_CessationOfNonProfitLegalEntity.FieldIdentCode, typeof(F026a_CessationOfNonProfitLegalEntity)},
            { F027_AddemptionOfTrader.FieldIdentCode, typeof(F027_AddemptionOfTrader) },
            { F027a_AddemptionOfTraderSeatChange.FieldIdentCode, typeof(F027a_AddemptionOfTraderSeatChange) },
            { F027v_AddemptionOfTraderEraseForeignTrader.FieldIdentCode, typeof(F027v_AddemptionOfTraderEraseForeignTrader) },
            { F028_ClosureBranchOfForeignTrader.FieldIdentCode, typeof(F028_ClosureBranchOfForeignTrader) },
            { F028a_AddemptionOfEUIE.FieldIdentCode, typeof(F028a_AddemptionOfEUIE) },
            { F031_Funds.FieldIdentCode, typeof(F031_Funds) },
            { F031a_Shares.FieldIdentCode, typeof(F031a_Shares) },
            { F031b_MinimumAmount.FieldIdentCode, typeof(F031b_MinimumAmount) },
            { F032_DepositedFunds.FieldIdentCode, typeof(F032_DepositedFunds) },
            { F033_NonMonetaryDeposits.FieldIdentCode, typeof(F033_NonMonetaryDeposits) },
            { F034_BuyBackDecision.FieldIdentCode, typeof(F034_BuyBackDecision) },
            { F051_BranchSeat.FieldIdentCode, typeof(F051_BranchSeat) },
            { F051a_BranchFirm.FieldIdentCode, typeof(F051a_BranchFirm) },
            { F053_BranchManagers.FieldIdentCode, typeof(F053_BranchManagers) },
            { F051b_BranchIdentifier.FieldIdentCode, typeof(F051b_BranchIdentifier) },
            { F052_BranchSubjectOfActivity.FieldIdentCode, typeof(F052_BranchSubjectOfActivity) },
            { F052a_MainActivityNKID.FieldIdentCode, typeof(F052a_MainActivityNKID) },
            { F054_VolumeOfRepresentationPower.FieldIdentCode, typeof(F054_VolumeOfRepresentationPower) },
            { F054a_VolumeOfRepresentationPower541.FieldIdentCode, typeof(F054a_VolumeOfRepresentationPower541) },
            { F055_BranchClosure.FieldIdentCode, typeof(F055_BranchClosure) },
            { F041_Procurators.FieldIdentCode, typeof(F041_Procurators) },
            { F042_SepcialPowers.FieldIdentCode, typeof(F042_SepcialPowers) },
            { F043_WayOfRepresentation43.FieldIdentCode, typeof(F043_WayOfRepresentation43) },
            { F044_EraseProcura.FieldIdentCode, typeof(F044_EraseProcura) },
            { F060_DivisionsOfEuropeanUnification.FieldIdentCode, typeof(F060_DivisionsOfEuropeanUnification) },
            { F070_WayOfEstablishingEuropeanCompany.FieldIdentCode, typeof(F070_WayOfEstablishingEuropeanCompany) },
            { F070a_WayOfEstablishingEuropeanCooperativeSociety.FieldIdentCode, typeof(F070a_WayOfEstablishingEuropeanCooperativeSociety) },
            { F071_SeatChange.FieldIdentCode, typeof(F071_SeatChange) },
            { F101_LimitSubjectOfActivity101.FieldIdentCode, typeof(F101_LimitSubjectOfActivity101)},
            { F102_License102.FieldIdentCode, typeof(F102_License102)},
            { F102a_PutUnderParticularSupervision.FieldIdentCode, typeof(F102a_PutUnderParticularSupervision)},
            { F103_Authorization.FieldIdentCode, typeof(F103_Authorization)},
            { F104_Suquestrators104.FieldIdentCode, typeof(F104_Suquestrators104)},
            { F105_OtherCircumstances105.FieldIdentCode, typeof(F105_OtherCircumstances105)},
            {F106_LimitSubjectOfActivity106.FieldIdentCode, typeof(F106_LimitSubjectOfActivity106) },
            { F107_ManageOrganizationAssets107.FieldIdentCode, typeof(F107_ManageOrganizationAssets107)},
            {F108_License108.FieldIdentCode, typeof(F108_License108) },
            { F109_Suquestrators109.FieldIdentCode, typeof(F109_Suquestrators109)},
            { F110_OtherCircumstances110.FieldIdentCode, typeof(F110_OtherCircumstances110)},
            { F115_RefusalOfLicense.FieldIdentCode, typeof(F115_RefusalOfLicense)},

            { F111_LimitSubjectOfActivity111.FieldIdentCode, typeof(F111_LimitSubjectOfActivity111) },
            { F112_ManageOrganizationAssets112.FieldIdentCode, typeof(F112_ManageOrganizationAssets112)},
            { F113_Suquestrators113.FieldIdentCode, typeof(F113_Suquestrators113) },
            { F114_OtherCircumstances114.FieldIdentCode, typeof(F114_OtherCircumstances114)},
            { F116_SpecialManager.FieldIdentCode, typeof(F116_SpecialManager)},
            { F117_OtherCircumstances117.FieldIdentCode, typeof(F117_OtherCircumstances117)},
            { F200_PledgeDDIdentifier.FieldIdentCode, typeof(F200_PledgeDDIdentifier) },
            { F201_Pledgors.FieldIdentCode, typeof(F201_Pledgors) },
            { F203_SecuredClaimDebtors.FieldIdentCode, typeof(F203_SecuredClaimDebtors) },
            { F205_PledgeCreditors.FieldIdentCode, typeof(F205_PledgeCreditors) },
            { F207_SecuredClaimReason.FieldIdentCode, typeof(F207_SecuredClaimReason) },
            { F207a_ContractOfPledgeForShare.FieldIdentCode, typeof(F207a_ContractOfPledgeForShare) },
            { F208_SecuredClaimSubject.FieldIdentCode, typeof(F208_SecuredClaimSubject) },
            { F209_SecuredClaimAmount.FieldIdentCode, typeof(F209_SecuredClaimAmount) },
            { F210_SecuredClaimInterests.FieldIdentCode, typeof(F210_SecuredClaimInterests) },
            { F211_SecuredClaimDelayInterests.FieldIdentCode, typeof(F211_SecuredClaimDelayInterests) },
            { F212_PledgeMoney.FieldIdentCode, typeof(F212_PledgeMoney) },
            { F213_PledgePropertyDescription.FieldIdentCode, typeof(F213_PledgePropertyDescription) },
            { F214_PledgePropertyPrice.FieldIdentCode, typeof(F214_PledgePropertyPrice) },
            { F215_ModalityDate.FieldIdentCode, typeof(F215_ModalityDate) },
            { F216_ModalityCondition.FieldIdentCode, typeof(F216_ModalityCondition) },
            { F216a_PledgedCreditorAgreement.FieldIdentCode, typeof(F216a_PledgedCreditorAgreement) },
            { F217_PledgeExecutionClaim.FieldIdentCode, typeof(F217_PledgeExecutionClaim) },
            { F218_Partners218.FieldIdentCode, typeof(F218_Partners218) },
            { F219_PledgeExecutionDepozitar.FieldIdentCode, typeof(F219_PledgeExecutionDepozitar) },
            { F220_Depozitar.FieldIdentCode, typeof(F220_Depozitar) },
            { F221_DepozitarDistraintRemove.FieldIdentCode, typeof(F221_DepozitarDistraintRemove) },
            { F222_StopOfExecutionSize.FieldIdentCode, typeof(F222_StopOfExecutionSize) },
            { F223_StopOfExecutionProperty.FieldIdentCode, typeof(F223_StopOfExecutionProperty) },
            { F223a_EntryIntoPledgeCreditorRights.FieldIdentCode, typeof(F223a_EntryIntoPledgeCreditorRights) },
            { F224_PledgeRenewDate.FieldIdentCode, typeof(F224_PledgeRenewDate) },
            { F225_PledgeAddemption.FieldIdentCode, typeof(F225_PledgeAddemption) },

            //B4
            { F300_ForfeitCompanyIdentifier.FieldIdentCode, typeof(F300_ForfeitCompanyIdentifier) },
            { F301_DebtorOverSecureClaims.FieldIdentCode, typeof(F301_DebtorOverSecureClaims) },
            { F303_AtPawnCreditors.FieldIdentCode, typeof(F303_AtPawnCreditors) },
            { F305_Reason.FieldIdentCode, typeof(F305_Reason) },
            { F305a_PledgeContractForTrader.FieldIdentCode, typeof(F305a_PledgeContractForTrader) },
            { F306_Object306.FieldIdentCode, typeof(F306_Object306) },
            { F307_Size307.FieldIdentCode, typeof(F307_Size307) },
            { F308_Interest.FieldIdentCode, typeof(F308_Interest) },
            { F309_InterestAndDefaultForDelay.FieldIdentCode, typeof(F309_InterestAndDefaultForDelay) },
            { F310_Size310.FieldIdentCode, typeof(F310_Size310) },
            { F311_Description.FieldIdentCode, typeof(F311_Description) },
            { F312_Price312.FieldIdentCode, typeof(F312_Price312) },
            { F313_Term.FieldIdentCode, typeof(F313_Term) },
            { F314_Circumstances.FieldIdentCode, typeof(F314_Circumstances) },
            { F314a_PledgedCreditorAgreement2.FieldIdentCode, typeof(F314a_PledgedCreditorAgreement2) },         
            { F315_PartOfClaimwhatIsSeek.FieldIdentCode, typeof(F315_PartOfClaimwhatIsSeek) },
            { F316_PropertyOverExecution.FieldIdentCode, typeof(F316_PropertyOverExecution) },
            { F317_Depositor.FieldIdentCode, typeof(F317_Depositor) },
            { F318_InvitationForAppointingOfManager.FieldIdentCode, typeof(F318_InvitationForAppointingOfManager) },
            { F319_ManagerOfTradeEnterprise.FieldIdentCode, typeof(F319_ManagerOfTradeEnterprise) },
            { F320_RestoringManagementRight.FieldIdentCode, typeof(F320_RestoringManagementRight) },
            { F321_DistraintData.FieldIdentCode, typeof(F321_DistraintData) },
            { F322_RaiseDistraint.FieldIdentCode, typeof(F322_RaiseDistraint) },
            { F323_Size323.FieldIdentCode, typeof(F323_Size323) },
            { F324_StopExecutionOverProperty.FieldIdentCode, typeof(F324_StopExecutionOverProperty) },
            { F324a_EntryIntoPledgeCreditorRights2.FieldIdentCode, typeof(F324a_EntryIntoPledgeCreditorRights2) },
            { F325_EraseDistraint.FieldIdentCode, typeof(F325_EraseDistraint) },
            { F325a_PartialEraseDistraint.FieldIdentCode, typeof(F325a_PartialEraseDistraint) },
            { F326_DateOfRenewingDistraint.FieldIdentCode, typeof(F326_DateOfRenewingDistraint) },
            //End Of B4 

            #region B5
            { F400_DistraintIdentifier.FieldIdentCode, typeof(F400_DistraintIdentifier) },
            { F401_Distraints.FieldIdentCode, typeof(F401_Distraints) },
            { F403_Reason403.FieldIdentCode, typeof(F403_Reason403) },
            { F404_Size404.FieldIdentCode, typeof(F404_Size404) },
            { F404a_MoratoryRate.FieldIdentCode, typeof(F404a_MoratoryRate) },
            { F405_Interests.FieldIdentCode, typeof(F405_Interests) },
            { F406_Descriptions.FieldIdentCode, typeof(F406_Descriptions) },
            { F408_LiftingDistraint.FieldIdentCode, typeof(F408_LiftingDistraint) },
            { F409_Size409.FieldIdentCode, typeof(F409_Size409) },
            { F410_StopExecutionOverProperty410.FieldIdentCode, typeof(F410_StopExecutionOverProperty410) },
            #endregion

            //B6
            { F501_TermsOfLiquidation.FieldIdentCode, typeof(F501_TermsOfLiquidation) },
            { F502_Liquidators.FieldIdentCode, typeof(F502_Liquidators) },
            { F503_Representative503.FieldIdentCode, typeof(F503_Representative503) },
            { F504_ContinuingTradeActivity.FieldIdentCode, typeof(F504_ContinuingTradeActivity) },
            //End of B6

            { F506_ResumeOfLiquidation.FieldIdentCode, typeof(F506_ResumeOfLiquidation)},

            //Б7
            { F001b_NumberNationalRegister1b.FieldIdentCode, typeof(F001b_NumberNationalRegister1b) },
            { F529_ReasonForEntry529.FieldIdentCode, typeof(F529_ReasonForEntry529) },
            { F530_OffshoreIdentifier.FieldIdentCode, typeof(F530_OffshoreIdentifier) },
            { F531_OffshoreCompany.FieldIdentCode, typeof(F531_OffshoreCompany) },
            { F532_OffshoreTransliteration.FieldIdentCode, typeof(F532_OffshoreTransliteration) },
            { F533_OffshoreSeat.FieldIdentCode, typeof(F533_OffshoreSeat) },
            { F534_OffshoreRepresentatives.FieldIdentCode, typeof(F534_OffshoreRepresentatives) },
            { F535_OffshoreWayOfRepresentation.FieldIdentCode, typeof(F535_OffshoreWayOfRepresentation) },
            { F536_OffshoreSpecialConditions.FieldIdentCode, typeof(F536_OffshoreSpecialConditions) },
            { F537_OffshoreDirectControlCompanies.FieldIdentCode, typeof(F537_OffshoreDirectControlCompanies) },
            { F5371_OffshoreDirectControlCompanyRepresentatives.FieldIdentCode, typeof(F5371_OffshoreDirectControlCompanyRepresentatives) },
            { F538_OffshoreNoDirectControlCompanies.FieldIdentCode, typeof(F538_OffshoreNoDirectControlCompanies) },
            { F5381_OffshoreNoDirectControlCompanyRepresentatives.FieldIdentCode, typeof(F5381_OffshoreNoDirectControlCompanyRepresentatives) },
            { F540_CircumstanceArticle4.FieldIdentCode, typeof(F540_CircumstanceArticle4) },
            { F550_ActualOwners.FieldIdentCode, typeof(F550_ActualOwners) },
            { F550a_ContactPerson550a.FieldIdentCode, typeof(F550a_ContactPerson550a) },
            { F551_EraseActualOwner.FieldIdentCode, typeof(F551_EraseActualOwner) },

            //End Of Б7
            { F505_StopOfLiquidation.FieldIdentCode, typeof(F505_StopOfLiquidation) },
            { F600_TransferringTypeOfTradeEnterprise.FieldIdentCode, typeof(F600_TransferringTypeOfTradeEnterprise) },
            { F601_TransferringEnterprise.FieldIdentCode, typeof(F601_TransferringEnterprise) },
            { F602_AcquisitionEnterprises.FieldIdentCode, typeof(F602_AcquisitionEnterprises)},
            { F701_FormOfTransforming701.FieldIdentCode, typeof(F701_FormOfTransforming701) },
            { F702_TransformingCompanys.FieldIdentCode, typeof(F702_TransformingCompanys) },
            { F702a_TransformingCompanys2.FieldIdentCode, typeof(F702a_TransformingCompanys2) },
            { F702b_TransformingNPOs.FieldIdentCode, typeof(F702b_TransformingNPOs)},
            { F703_Successors.FieldIdentCode, typeof(F703_Successors) },
            { F704_Branches704.FieldIdentCode, typeof(F704_Branches704) },
            { F705_StoppingEntry.FieldIdentCode, typeof(F705_StoppingEntry) },
            { F706_NumberApplication.FieldIdentCode, typeof(F706_NumberApplication) },
            { F801_FormOfTransforming801.FieldIdentCode, typeof(F801_FormOfTransforming801) },
            { F801a_FormOfTransforming801a.FieldIdentCode, typeof(F801a_FormOfTransforming801a) },
            { F802_ReorganizeCoOperatives.FieldIdentCode, typeof(F802_ReorganizeCoOperatives) },
            { F802a_ReorganizeCoOperatives2.FieldIdentCode, typeof(F802a_ReorganizeCoOperatives2) },
            { F803_Successors803.FieldIdentCode, typeof(F803_Successors803) },
            { F804_ReorgBranches.FieldIdentCode, typeof(F804_ReorgBranches)},
            { F8500_StabilizationOpenProccedings.FieldIdentCode, typeof(F8500_StabilizationOpenProccedings) },
            { F8510_StabilizationAdoptionOfPrecautionaryMeasures.FieldIdentCode, typeof(F8510_StabilizationAdoptionOfPrecautionaryMeasures) },
            { F8520_StabilizatioLimitingTheDebtorsAuthority.FieldIdentCode, typeof(F8520_StabilizatioLimitingTheDebtorsAuthority) },
            { F8530_StabilizationSuspendProceeding.FieldIdentCode, typeof(F8530_StabilizationSuspendProceeding) },
            { F8550_StabilizationDottedPersons.FieldIdentCode, typeof(F8550_StabilizationDottedPersons) },
            { F8560_StabilizationInspectors.FieldIdentCode, typeof(F8560_StabilizationInspectors) },
            { F8570_StabilizationSupervisorBody.FieldIdentCode, typeof(F8570_StabilizationSupervisorBody) },
            { F901_OpenProccedings.FieldIdentCode, typeof(F901_OpenProccedings) },
            { F901_2_OpenProccedingsSecIns.FieldIdentCode, typeof(F901_2_OpenProccedingsSecIns)},
            { F901_3_OpenProccedingsThirdIns.FieldIdentCode, typeof(F901_3_OpenProccedingsThirdIns)},
            { F902_InsolvencyDate.FieldIdentCode, typeof(F902_InsolvencyDate)},
            { F902_InsolvencyData.FieldIdentCode, typeof(F902_InsolvencyData)},
            { F902_2_InsolvencyDataSecIns.FieldIdentCode, typeof(F902_2_InsolvencyDataSecIns)},
            { F902_3_InsolvencyDataThirdIns.FieldIdentCode, typeof(F902_3_InsolvencyDataThirdIns)},
            { F903_DebtorBodies.FieldIdentCode, typeof(F903_DebtorBodies)},
            { F903_2_DebtorBodiesSecIns.FieldIdentCode, typeof(F903_2_DebtorBodiesSecIns)},
            { F903_3_DebtorBodiesThirdIns.FieldIdentCode, typeof(F903_3_DebtorBodiesThirdIns)},
            { F904_HoldProceedings.FieldIdentCode, typeof(F904_HoldProceedings)},
            { F904_2_HoldProceedingsSecIns.FieldIdentCode, typeof(F904_2_HoldProceedingsSecIns)},
            { F904_3_HoldProceedingsThirdIns.FieldIdentCode, typeof(F904_3_HoldProceedingsThirdIns)},
            { F905_ReOpenProceedings.FieldIdentCode, typeof(F905_ReOpenProceedings)},
            { F905_2_ReOpenProceedingsSecIns.FieldIdentCode, typeof(F905_2_ReOpenProceedingsSecIns)},
            { F905_3_ReOpenProceedingsThirdIns.FieldIdentCode, typeof(F905_3_ReOpenProceedingsThirdIns)},
            { F906_SuspendProceedings.FieldIdentCode, typeof(F906_SuspendProceedings)},
            { F906_2_SuspendProceedingsSecIns.FieldIdentCode, typeof(F906_2_SuspendProceedingsSecIns)},
            { F906_3_SuspendProceedingsThirdIns.FieldIdentCode, typeof(F906_3_SuspendProceedingsThirdIns)},
            { F906a_TraverseOfRecoverPlan.FieldIdentCode, typeof(F906a_TraverseOfRecoverPlan)},
            { F906a_2_TraverseOfRecoverPlanSecIns.FieldIdentCode, typeof(F906a_2_TraverseOfRecoverPlanSecIns)},
            { F906a_3_TraverseOfRecoverPlanThirdIns.FieldIdentCode, typeof(F906a_3_TraverseOfRecoverPlanThirdIns)},
            { F907_RestrictDebtorOrderPower.FieldIdentCode, typeof(F907_RestrictDebtorOrderPower)},
            { F907_2_RestrictDebtorOrderPowerSecIns.FieldIdentCode, typeof(F907_2_RestrictDebtorOrderPowerSecIns)},
            { F907_3_RestrictDebtorOrderPowerThirdIns.FieldIdentCode, typeof(F907_3_RestrictDebtorOrderPowerThirdIns)},
            { F908_GeneralSeizure.FieldIdentCode, typeof(F908_GeneralSeizure)},
            { F908_2_GeneralSeizureSecIns.FieldIdentCode, typeof(F908_2_GeneralSeizureSecIns)},
            { F908_3_GeneralSeizureThirdIns.FieldIdentCode, typeof(F908_3_GeneralSeizureThirdIns)},
            { F909_CashIn.FieldIdentCode, typeof(F909_CashIn)},
            { F909_2_CashInSecIns.FieldIdentCode, typeof(F909_2_CashInSecIns)},
            { F909_3_CashInThirdIns.FieldIdentCode, typeof(F909_3_CashInThirdIns)},
            { F910_DeclareBankrupt.FieldIdentCode, typeof(F910_DeclareBankrupt)},
            { F910_2_DeclareBankruptSecIns.FieldIdentCode, typeof(F910_2_DeclareBankruptSecIns)},
            { F910_3_DeclareBankruptThirdIns.FieldIdentCode, typeof(F910_3_DeclareBankruptThirdIns)},
            { F911_Reinstatements.FieldIdentCode, typeof(F911_Reinstatements)},
            { F911_2_ReinstatementsSecIns.FieldIdentCode, typeof(F911_2_ReinstatementsSecIns)},
            { F911_3_ReinstatementsThirdIns.FieldIdentCode, typeof(F911_3_ReinstatementsThirdIns)},
            { F911a_ReinstatementsDisallowPetition.FieldIdentCode, typeof(F911a_ReinstatementsDisallowPetition)},
            { F911a_2_ReinstatementsDisallowPetitionSecIns.FieldIdentCode, typeof(F911a_2_ReinstatementsDisallowPetitionSecIns)},
            { F911a_3_ReinstatementsDisallowPetitionThirdIns.FieldIdentCode, typeof(F911a_3_ReinstatementsDisallowPetitionThirdIns)},
            { F912_Trustees.FieldIdentCode, typeof(F912_Trustees)},
            { F912_2_TrusteesSecIns.FieldIdentCode, typeof(F912_2_TrusteesSecIns)},
            { F912_3_TrusteesThirdIns.FieldIdentCode, typeof(F912_3_TrusteesThirdIns)},
            { F915_SupervisionBody.FieldIdentCode, typeof(F915_SupervisionBody)},
            { F915_SupervisionBodyFull.FieldIdentCode, typeof(F915_SupervisionBodyFull)},
            { F915_2_SupervisionBodyFullSecIns.FieldIdentCode, typeof(F915_2_SupervisionBodyFullSecIns)},
            { F915_3_SupervisionBodyFullThirdIns.FieldIdentCode, typeof(F915_3_SupervisionBodyFullThirdIns)},

            { F018_PhysicalPersonTrader.FieldIdentCode, typeof(F018_PhysicalPersonTrader) },
            { F10019A_StatementsA.FieldIdentCode, typeof(F10019A_StatementsA) },
            { F10019B_StatementsB.FieldIdentCode, typeof(F10019B_StatementsB) },
            { F10019C_StatementsC.FieldIdentCode, typeof(F10019C_StatementsC) },
            { F10019D_StatementsD.FieldIdentCode, typeof(F10019D_StatementsD) },
            { F10019E_StatementsE.FieldIdentCode, typeof(F10019E_StatementsE) },
            { F10019F_StatementsF.FieldIdentCode, typeof(F10019F_StatementsF) },
            { F10019G_StatementsG.FieldIdentCode, typeof(F10019G_StatementsG) },
            { F10019H_StatementsH.FieldIdentCode, typeof(F10019H_StatementsH) },
            { F10019I_StatementsI.FieldIdentCode, typeof(F10019I_StatementsI) },
            { F10019J_StatementsJ.FieldIdentCode, typeof(F10019J_StatementsJ) },
            { F10019K_StatementsK.FieldIdentCode, typeof(F10019K_StatementsK) },
            { F10019L_StatementsL.FieldIdentCode, typeof(F10019L_StatementsL) },
            { F10019M_StatementsM.FieldIdentCode, typeof(F10019M_StatementsM) },
            { F10019N_StatementsN.FieldIdentCode, typeof(F10019N_StatementsN) },
            { F10019O_StatementsO.FieldIdentCode, typeof(F10019O_StatementsO) },
            { F10019P_StatementsP.FieldIdentCode, typeof(F10019P_StatementsP) },
            { F10019Q_StatementsQ.FieldIdentCode, typeof(F10019Q_StatementsQ) },
            { F10019R_StatementsR.FieldIdentCode, typeof(F10019R_StatementsR) },
            { F10019S_StatementsS.FieldIdentCode, typeof(F10019S_StatementsS) },
            { F10019T_StatementsT.FieldIdentCode, typeof(F10019T_StatementsT) },
            { F10019U_StatementsU.FieldIdentCode, typeof(F10019U_StatementsU) },
            { F10019V_StatementsV.FieldIdentCode, typeof(F10019V_StatementsV) },
            { F10019W_StatementsW.FieldIdentCode, typeof(F10019W_StatementsW) },
            { F10019X_StatementsX.FieldIdentCode, typeof(F10019X_StatementsX) },
            { F10019Y_StatementsY.FieldIdentCode, typeof(F10019Y_StatementsY) },
            { F10019Z_StatementsZ.FieldIdentCode, typeof(F10019Z_StatementsZ) },
            { F1001AA_StatementsAA.FieldIdentCode, typeof(F1001AA_StatementsAA) },
            { F1001AB_StatementsAB.FieldIdentCode, typeof(F1001AB_StatementsAB) },
            { F1001AC_StatementsAC.FieldIdentCode, typeof(F1001AC_StatementsAC) },
            { F1001AD_StatementsAD.FieldIdentCode, typeof(F1001AD_StatementsAD) },
            { F1001AE_StatementsAE.FieldIdentCode, typeof(F1001AE_StatementsAE) },
            { F1001AF_StatementsAF.FieldIdentCode, typeof(F1001AF_StatementsAF) },
            { F1001AG_StatementsAG.FieldIdentCode, typeof(F1001AG_StatementsAG) },
            { F1001AH_StatementsAH.FieldIdentCode, typeof(F1001AH_StatementsAH) },
            { F1001AI_StatementsAI.FieldIdentCode, typeof(F1001AI_StatementsAI) },
            { F1001AJ_StatementsAJ.FieldIdentCode, typeof(F1001AJ_StatementsAJ) },
            { F1001AK_StatementsAK.FieldIdentCode, typeof(F1001AK_StatementsAK) },
            { F1001AL_StatementsAL.FieldIdentCode, typeof(F1001AL_StatementsAL) },
            { F1001AM_StatementsAM.FieldIdentCode, typeof(F1001AM_StatementsAM) },
            { F1001AN_StatementsAN.FieldIdentCode, typeof(F1001AN_StatementsAN) },
            { F1001AO_StatementsAO.FieldIdentCode, typeof(F1001AO_StatementsAO) },
            { F1001AP_StatementsAP.FieldIdentCode, typeof(F1001AP_StatementsAP) },
            { F1001AQ_StatementsAQ.FieldIdentCode, typeof(F1001AQ_StatementsAQ) },
            { F1001AR_StatementsAR.FieldIdentCode, typeof(F1001AR_StatementsAR) },
            { F1001AS_StatementsAS.FieldIdentCode, typeof(F1001AS_StatementsAS) },
            { F1001AT_StatementsAT.FieldIdentCode, typeof(F1001AT_StatementsAT) },
            { F1001AU_StatementsAU.FieldIdentCode, typeof(F1001AU_StatementsAU) },
            { F1001AV_StatementsAV.FieldIdentCode, typeof(F1001AV_StatementsAV) },
            { F1001AW_StatementsAW.FieldIdentCode, typeof(F1001AW_StatementsAW) },
            { F1001AX_StatementsAX.FieldIdentCode, typeof(F1001AX_StatementsAX) },
            { F1001AY_StatementsAY.FieldIdentCode, typeof(F1001AY_StatementsAY) },
            { F1001AZ_StatementsAZ.FieldIdentCode, typeof(F1001AZ_StatementsAZ) },
            { F1001BA_StatementsBA.FieldIdentCode, typeof(F1001BA_StatementsBA) },
            { F1001BB_StatementsBB.FieldIdentCode, typeof(F1001BB_StatementsBB) },
            { F1001BC_StatementsBC.FieldIdentCode, typeof(F1001BC_StatementsBC) },
            { F1001BD_StatementsBD.FieldIdentCode, typeof(F1001BD_StatementsBD) },
            { F1001BE_StatementsBE.FieldIdentCode, typeof(F1001BE_StatementsBE) },
            { F1001BF_StatementsBF.FieldIdentCode, typeof(F1001BF_StatementsBF) },
            { F1001BG_StatementsBG.FieldIdentCode, typeof(F1001BG_StatementsBG) },
            { F1001BH_StatementsBH.FieldIdentCode, typeof(F1001BH_StatementsBH) },
            { F1001BI_StatementsBI.FieldIdentCode, typeof(F1001BI_StatementsBI) },           
            { ContestationAct.FieldIdentCode, typeof(ContestationAct)}
        };
    }
}
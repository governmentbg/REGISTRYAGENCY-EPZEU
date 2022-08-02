
// Auto Generated Object
using EPZEU.CR.Domain.Fields.Common;

namespace EPZEU.CR.Domain.Fields
{


    public partial class F001_UIC
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Text))
                return false; 
            
            if (IsNew != false)
                return false;
            
            if (!string.IsNullOrEmpty(CompanyControl))
                return false; 
            
            if (BulstatDeed != null && !BulstatDeed.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class UIC
    {
        public virtual bool IsEmpty()
        {
            if (!string.IsNullOrEmpty(Text))
                return false; 
            
            if (IsNew != false)
                return false;
            
            if (!string.IsNullOrEmpty(CompanyControl))
                return false; 
            
            if (BulstatDeed != null && !BulstatDeed.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F001a_NumberNationalRegister
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F001b_NumberNationalRegister1b
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F002_Company
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F003_LegalForm
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Text))
                return false; 
            
            if (!string.IsNullOrEmpty(Code))
                return false; 
            
            return true; 
        }
    }

    public partial class F004_Transliteration
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F005_Seat
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F005a_SeatForCorrespondence
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Address != null && !Address.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F006_SubjectOfActivity
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (IsBank != false)
                return false;
            
            if (!string.IsNullOrEmpty(IsBankText))
                return false; 
            
            if (IsInsurer != false)
                return false;
            
            if (!string.IsNullOrEmpty(IsInsurerText))
                return false; 
            
            return true; 
        }
    }

    public partial class F006a_SubjectOfActivityNKID
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F006b_Objectives
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (IsBFLE != false)
                return false;
            
            if (!string.IsNullOrEmpty(Text))
                return false; 
            
            if (!string.IsNullOrEmpty(TextExt))
                return false; 
            
            return true; 
        }
    }

    public partial class F006g_SubjectToAdditionalBusinessActivity
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F006v_MeansOfAchievingTheObjectives
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F0070_Manager
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Person != null && !Person.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F007_Managers
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (ManagersList != null && ManagersList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F007a0_AssignedManager
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Subject != null && !Subject.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F007a_AssignedManagers
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (AssignedManageList != null && AssignedManageList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F008_WayOfManagement
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F009_ChairMan
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Person != null && !Person.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F0100_Representative
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Subject != null && !Subject.IsEmpty())
                return false; 
            
            if (Person != null && !Person.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F010_Representatives
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (RepresentativeList != null && RepresentativeList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F01010_Representative101
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Subject != null && !Subject.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F0101_Representatives101
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (RepresentativeList != null && RepresentativeList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F01020_Representative102
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Person != null && !Person.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F0102_Representatives102
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (RepresentativeList != null && RepresentativeList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F0103_Representative103
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Person != null && !Person.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F0103_Representatives103
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (RepresentativeList != null && RepresentativeList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F011_WayOfRepresentation
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F01201_Director
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Subject != null && !Subject.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F01200_BoardOfDirectorsMandate
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F012_BoardOfDirectors
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (BoardOfDirectorsMandate != null && !BoardOfDirectorsMandate.IsEmpty())
                return false; 
            
            if (DirectorList != null && DirectorList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F01211_BoardManager3
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Subject != null && !Subject.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F01210_ManagerMandate3
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F012a_BoardOfManagers3
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (ManagerMandate3 != null && !ManagerMandate3.IsEmpty())
                return false; 
            
            if (BoardManagersList != null && BoardManagersList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F01221_AdministrativeBody
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Subject != null && !Subject.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F01220_AdministrativeBoardMandate
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F012b_AdministrativeBoard
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (AdministrativeBoardMandate != null && !AdministrativeBoardMandate.IsEmpty())
                return false; 
            
            if (AdministrativeBodyList != null && AdministrativeBodyList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F012d_ManagementBody12d
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Subject != null && !Subject.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F012d_ManagementBody12dMandate
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(ManagementAuthority))
                return false; 
            
            return true; 
        }
    }

    public partial class F012d_ManagementBodies12d
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (ManagementBodies12dList != null && ManagementBodies12dList.Count > 0)
                return false; 
            
            if (ManagementBody12dMandate != null && !ManagementBody12dMandate.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F012g_Authority12g
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Text))
                return false; 
            
            return true; 
        }
    }

    public partial class F012g_Authorities12g
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Authorities12gList != null && Authorities12gList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F01230_AdministrativeBoardSupporter
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Subject != null && !Subject.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F012v_AdministrativeBoardSupporters
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (AdministrativeBoardSupporterList != null && AdministrativeBoardSupporterList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F01301_BoardManager
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Person != null && !Person.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F0130_ManagerMandate
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F013_BoardOfManagers
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (ManagerMandate != null && !ManagerMandate.IsEmpty())
                return false; 
            
            if (BoardManagerList != null && BoardManagerList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F01321_BoardManager2
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Subject != null && !Subject.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F01320_ManagerMandate2
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F013_BoardOfManagers2
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (ManagerMandate2 != null && !ManagerMandate2.IsEmpty())
                return false; 
            
            if (BoardManager2List != null && BoardManager2List.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F01310_BoardOfManagersSupportersPerson
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Person != null && !Person.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F013a_BoardOfManagersSupporters
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (BoardOfManagersSupportersPersonList != null && BoardOfManagersSupportersPersonList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F01331_Leader
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Subject != null && !Subject.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F01330_LeadingBoardMandate
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F013b_LeadingBoard
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (LeadingBoardMandate != null && !LeadingBoardMandate.IsEmpty())
                return false; 
            
            if (LeaderList != null && LeaderList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F013g_Trustee13g
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Person != null && !Person.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F013g_BoardOfTrusties13gMandate
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F013g_BoardOfTrusties13g
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Trustees13gList != null && Trustees13gList.Count > 0)
                return false; 
            
            if (BoardOfTrusties13gMandate != null && !BoardOfTrusties13gMandate.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F01340_BoardManagersSupporter2
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Subject != null && !Subject.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F013v_BoardOfManagersSupporters2
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (F01340_BoardManagersSupporter2List != null && F01340_BoardManagersSupporter2List.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F01401_Supervisor
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Subject != null && !Subject.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F0140_SupervisingBoardMandate
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F014_SupervisingBoard
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (SupervisingBoardMandate != null && !SupervisingBoardMandate.IsEmpty())
                return false; 
            
            if (SupervisorList != null && SupervisorList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F01421_Supervisor2
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Subject != null && !Subject.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F01420_SupervisingBoardMandate2
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F014b_SupervisingBoard2
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (SupervisingBoard2Mandate != null && !SupervisingBoard2Mandate.IsEmpty())
                return false; 
            
            if (Supervisor2List != null && Supervisor2List.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F01430_SupervisingBoardSupporter
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Subject != null && !Subject.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F014v_SupervisingBoardSupporters
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (SupervisingBoardSupporterList != null && SupervisingBoardSupporterList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F01501_ControllingBoardPerson
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Person != null && !Person.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F0150_ControllingBoardMandate
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F015_ControllingBoard
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (ControllingBoardMandate != null && !ControllingBoardMandate.IsEmpty())
                return false; 
            
            if (ControllingBoardPersonList != null && ControllingBoardPersonList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F01510_ControllingBoardSupportersPerson
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Person != null && !Person.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F015a_ControllingBoardSupporters
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (ControllingBoardSupportersPersonList != null && ControllingBoardSupportersPersonList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F015b1_CommissionMember15b
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Person != null && !Person.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F015b0_VerificationCommission15bMandate
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F015b_VerificationCommission15b
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (CommissionMembers15bList != null && CommissionMembers15bList.Count > 0)
                return false; 
            
            if (VerificationCommission15bMandate != null && !VerificationCommission15bMandate.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F016_TermsOfPartnership
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Date.HasValue)
                return false;
            
            if (!string.IsNullOrEmpty(Text))
                return false; 
            
            if (!string.IsNullOrEmpty(TermType))
                return false; 
            
            return true; 
        }
    }

    public partial class F016a_TermOfExisting
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Date.HasValue)
                return false;
            
            if (!string.IsNullOrEmpty(Text))
                return false; 
            
            return true; 
        }
    }

    public partial class F016b_TermOfExistingEUIE
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Date.HasValue)
                return false;
            
            if (!string.IsNullOrEmpty(Text))
                return false; 
            
            if (!string.IsNullOrEmpty(TermTypeEUIE))
                return false; 
            
            return true; 
        }
    }

    public partial class F016v_TermOfExistenceNonProfitLegalEntity
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Date.HasValue)
                return false;
            
            if (!string.IsNullOrEmpty(Text))
                return false; 
            
            if (!string.IsNullOrEmpty(TermTypeNonProfitLegalEntity))
                return false; 
            
            return true; 
        }
    }

    public partial class F017_SpecialConditions
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (IsConsortium != false)
                return false;
            
            if (IsHolding != false)
                return false;
            
            return true; 
        }
    }

    public partial class F017a_DesignatedToPerformPublicBenefit
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F017b_TemporarilySuspendedStatusForPublicBenefits
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F017g_DesignatedToCarryOutPrivateActivity
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F017v_RestorationOfStatusInPublicBenefit
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F018_PhysicalPersonTrader
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Person != null && !Person.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F0190_Partner
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Subject != null && !Subject.IsEmpty())
                return false; 
            
            if (!string.IsNullOrEmpty(Share))
                return false; 
            
            return true; 
        }
    }

    public partial class F019_Partners
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (PartnersList != null && PartnersList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F0200_UnlimitedLiabilityPartner
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Subject != null && !Subject.IsEmpty())
                return false; 
            
            if (Address != null && !Address.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F020_UnlimitedLiabilityPartners
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (UnlimitedLiabilityPartnerList != null && UnlimitedLiabilityPartnerList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F0201_UnlimitedLiabilityPartnerEUIE
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Subject != null && !Subject.IsEmpty())
                return false; 
            
            if (Address != null && !Address.IsEmpty())
                return false; 
            
            if (NoObligationsEUIE.HasValue)
                return false;
            
            if (Date.HasValue)
                return false;
            
            if (!string.IsNullOrEmpty(NoObligationsEUIEText))
                return false; 
            
            if (!string.IsNullOrEmpty(DateOfAcceptanceEUIE))
                return false; 
            
            return true; 
        }
    }

    public partial class F020a_UnlimitedLiabilityPartnersEUIE
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (UnlimitedLiabilityPartnerEUIEList != null && UnlimitedLiabilityPartnerEUIEList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F0210_LimitedLiabilityPartner
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Subject != null && !Subject.IsEmpty())
                return false; 
            
            if (Address != null && !Address.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F021_LimitedLiabilityPartners
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (LiabilityPartnerList != null && LiabilityPartnerList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F02200_ForeignTraderRegistration
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Name))
                return false; 
            
            if (!string.IsNullOrEmpty(LegalForm))
                return false; 
            
            if (!string.IsNullOrEmpty(Register))
                return false; 
            
            if (!string.IsNullOrEmpty(EntryNumber))
                return false; 
            
            if (!string.IsNullOrEmpty(ForeignRegisterCode))
                return false; 
            
            if (!string.IsNullOrEmpty(ForeignLegalFormCode))
                return false; 
            
            return true; 
        }
    }

    public partial class F02201_ForeignTraderCountry
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (IsEUCountry != false)
                return false;
            
            if (OtherCountr != false)
                return false;
            
            if (!string.IsNullOrEmpty(Country))
                return false; 
            
            if (!string.IsNullOrEmpty(CountryCode))
                return false; 
            
            if (!string.IsNullOrEmpty(CountryCodeBRIS))
                return false; 
            
            if (!string.IsNullOrEmpty(IsEUCountryText))
                return false; 
            
            if (!string.IsNullOrEmpty(OtherCountrText))
                return false; 
            
            return true; 
        }
    }

    public partial class F02203_ForeignTraderWayOfRepresentation
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Jointly != false)
                return false;
            
            if (Severally != false)
                return false;
            
            if (OtherWay != false)
                return false;
            
            if (RepresentSelected != false)
                return false;
            
            if (!string.IsNullOrEmpty(JointlyText))
                return false; 
            
            if (!string.IsNullOrEmpty(SeverallyText))
                return false; 
            
            if (!string.IsNullOrEmpty(OtherWayText))
                return false; 
            
            if (!string.IsNullOrEmpty(Text))
                return false; 
            
            return true; 
        }
    }

    public partial class F02204_AddemptionOfForeignTrader
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Checked != false)
                return false;
            
            if (!string.IsNullOrEmpty(CheckedText))
                return false; 
            
            return true; 
        }
    }

    public partial class F0220_ForeignTrader
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Text))
                return false; 
            
            return true; 
        }
    }

    public partial class F022_ForeignTraders
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (ForeignTraderRegistration != null && !ForeignTraderRegistration.IsEmpty())
                return false; 
            
            if (ForeignTraderCountry != null && !ForeignTraderCountry.IsEmpty())
                return false; 
            
            if (ForeignTraderWayOfRepresentation != null && !ForeignTraderWayOfRepresentation.IsEmpty())
                return false; 
            
            if (AddemptionOfForeignTrader != null && !AddemptionOfForeignTrader.IsEmpty())
                return false; 
            
            if (ForeignTraderList != null && ForeignTraderList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F0223_ForeignCompanyData
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (CompanyData != null && !CompanyData.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F02231_EUIEAddempted
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Addempted != false)
                return false;
            
            if (!string.IsNullOrEmpty(AddemptedText))
                return false; 
            
            return true; 
        }
    }

    public partial class F02232_RepresentersWayOfManagement
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Jointly != false)
                return false;
            
            if (Severally != false)
                return false;
            
            if (OtherWay != false)
                return false;
            
            if (RepresentSelected != false)
                return false;
            
            if (!string.IsNullOrEmpty(Text))
                return false; 
            
            if (!string.IsNullOrEmpty(JointlyText))
                return false; 
            
            if (!string.IsNullOrEmpty(SeverallyText))
                return false; 
            
            if (!string.IsNullOrEmpty(OtherWayText))
                return false; 
            
            return true; 
        }
    }

    public partial class F02233_PowerOfLiquidators
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Text))
                return false; 
            
            return true; 
        }
    }

    public partial class F02234_PowerOfTrustees
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Text))
                return false; 
            
            return true; 
        }
    }

    public partial class F02235_EuropeanEconomicInterestRepresenter
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (RepresenterType != 0)
                return false;
            
            if (!string.IsNullOrEmpty(RepresenterName))
                return false; 
            
            return true; 
        }
    }

    public partial class F0223_EuropeanEconomicInterestGrouping
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (EuropeanEconomicInterestRepresenterRegularList != null && EuropeanEconomicInterestRepresenterRegularList.Count > 0)
                return false; 
            
            if (EuropeanEconomicInterestRepresenterLiquidatorList != null && EuropeanEconomicInterestRepresenterLiquidatorList.Count > 0)
                return false; 
            
            if (EuropeanEconomicInterestRepresenterTrusteeList != null && EuropeanEconomicInterestRepresenterTrusteeList.Count > 0)
                return false; 
            
            if (ForeignCompanyData != null && !ForeignCompanyData.IsEmpty())
                return false; 
            
            if (EUIEAddempted != null && !EUIEAddempted.IsEmpty())
                return false; 
            
            if (RepresentersWayOfManagement != null && !RepresentersWayOfManagement.IsEmpty())
                return false; 
            
            if (PowerOfLiquidators != null && !PowerOfLiquidators.IsEmpty())
                return false; 
            
            if (PowerOfTrustees != null && !PowerOfTrustees.IsEmpty())
                return false; 
            
            if (EuropeanEconomicInterestRepresenterList != null && EuropeanEconomicInterestRepresenterList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F0224_DiscontinuanceOfTheEUIE
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (StopOfLiquidation != false)
                return false;
            
            if (ContinuationOfActivity != false)
                return false;
            
            if (BeginOfLiquidation != false)
                return false;
            
            if (StopEUIE != false)
                return false;
            
            if (!string.IsNullOrEmpty(StopOfLiquidationText))
                return false; 
            
            if (!string.IsNullOrEmpty(ContinuationOfActivityText))
                return false; 
            
            if (!string.IsNullOrEmpty(BeginOfLiquidationText))
                return false; 
            
            if (!string.IsNullOrEmpty(StopEUIEText))
                return false; 
            
            return true; 
        }
    }

    public partial class F02250_InsolvencyOfEUIE
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Decision759 != false)
                return false;
            
            if (Decision760 != false)
                return false;
            
            if (Date.HasValue)
                return false;
            
            if (!string.IsNullOrEmpty(InsolvencyText))
                return false; 
            
            if (!string.IsNullOrEmpty(ActNumber))
                return false; 
            
            if (!string.IsNullOrEmpty(ActDate))
                return false; 
            
            if (!string.IsNullOrEmpty(JudicialCode))
                return false; 
            
            if (!string.IsNullOrEmpty(Decision759Text))
                return false; 
            
            if (!string.IsNullOrEmpty(Decision760Text))
                return false; 
            
            return true; 
        }
    }

    public partial class F0225_InsolvenciesOfEUIE
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (InsolvencyOfEUIEList != null && InsolvencyOfEUIEList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F022a_DiscontinuanceOfForeignTrader
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (FinishingOfLiquidation != false)
                return false;
            
            if (StopOfLiquidation != false)
                return false;
            
            if (ContinuationOfActivity != false)
                return false;
            
            if (BeginOfLiquidation != false)
                return false;
            
            if (StopForeignerTrader != false)
                return false;
            
            if (!string.IsNullOrEmpty(FinishingOfLiquidationText))
                return false; 
            
            if (!string.IsNullOrEmpty(StopOfLiquidationText))
                return false; 
            
            if (!string.IsNullOrEmpty(ContinuationOfActivityText))
                return false; 
            
            if (!string.IsNullOrEmpty(BeginOfLiquidationText))
                return false; 
            
            if (!string.IsNullOrEmpty(StopForeignerTraderText))
                return false; 
            
            return true; 
        }
    }

    public partial class F02220_InsolvencyOfForeignTrader
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Decision759 != false)
                return false;
            
            if (Decision760 != false)
                return false;
            
            if (Date.HasValue)
                return false;
            
            if (!string.IsNullOrEmpty(InsolvencyText))
                return false; 
            
            if (!string.IsNullOrEmpty(ActNumber))
                return false; 
            
            if (!string.IsNullOrEmpty(ActDate))
                return false; 
            
            if (!string.IsNullOrEmpty(JudicialCode))
                return false; 
            
            if (!string.IsNullOrEmpty(Decision759Text))
                return false; 
            
            if (!string.IsNullOrEmpty(Decision760Text))
                return false; 
            
            return true; 
        }
    }

    public partial class F022b_InsolvenciesOfForeignTrader
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (InsolvencyOfForeignTraderList != null && InsolvencyOfForeignTraderList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F023_SoleCapitalOwner
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Subject != null && !Subject.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F023a_Owner
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Subject != null && !Subject.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F02320_EuropeanHoldingCompanyAsShareholder
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Subject != null && !Subject.IsEmpty())
                return false; 
            
            if (Address != null && !Address.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F023b_EuropeanHoldingCompanysAsShareholders
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (EuropeanHoldingCompanyAsShareholderList != null && EuropeanHoldingCompanyAsShareholderList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F0240_ShareTransfer
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (OldOwner != null && !OldOwner.IsEmpty())
                return false; 
            
            if (NewOwner != null && !NewOwner.IsEmpty())
                return false; 
            
            if (!string.IsNullOrEmpty(ShareAmount))
                return false; 
            
            if (!string.IsNullOrEmpty(Date))
                return false; 
            
            if (OldOwnerCountryID.HasValue)
                return false;
            
            if (!string.IsNullOrEmpty(OldOwnerCountryName))
                return false; 
            
            if (NewOwnerCountryID.HasValue)
                return false;
            
            if (!string.IsNullOrEmpty(NewOwnerCountryName))
                return false; 
            
            if (TransferDate.HasValue)
                return false;
            
            return true; 
        }
    }

    public partial class F024_ShareTransfers
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (ShareTransfersList != null && ShareTransfersList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F024a_HiddenNonMonetaryDeposit
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Cheked != false)
                return false;
            
            if (!string.IsNullOrEmpty(Text))
                return false; 
            
            return true; 
        }
    }

    public partial class F025_SharePaymentResponsibility
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F025a_ConcededEstateValue
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F025b_TotalAmountOfInitialPropertyContributions
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F02530_MembershipFees25v
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Cheked != false)
                return false;
            
            if (!string.IsNullOrEmpty(Text))
                return false; 
            
            return true; 
        }
    }

    public partial class F02531_CulturalEducationalAndInformationActivities25v
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Cheked != false)
                return false;
            
            if (!string.IsNullOrEmpty(Text))
                return false; 
            
            return true; 
        }
    }

    public partial class F02532_SubsidyFromStateAndMunicipalBudgets25v
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Cheked != false)
                return false;
            
            if (!string.IsNullOrEmpty(Text))
                return false; 
            
            return true; 
        }
    }

    public partial class F02533_RentalOfMovableAndImmovableProperty25v
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Cheked != false)
                return false;
            
            if (!string.IsNullOrEmpty(Text))
                return false; 
            
            return true; 
        }
    }

    public partial class F02534_DonationAndWills25v
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Cheked != false)
                return false;
            
            if (!string.IsNullOrEmpty(Text))
                return false; 
            
            return true; 
        }
    }

    public partial class F02535_OtherExpenses25v
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Text))
                return false; 
            
            if (Cheked != false)
                return false;
            
            if (OtherWay != false)
                return false;
            
            if (!string.IsNullOrEmpty(OtherWayText))
                return false; 
            
            return true; 
        }
    }

    public partial class F025v_SourcesOfInitialFinancing25v
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (MembershipFees25v != null && !MembershipFees25v.IsEmpty())
                return false; 
            
            if (CulturalEducationalAndInformationActivities25v != null && !CulturalEducationalAndInformationActivities25v.IsEmpty())
                return false; 
            
            if (SubsidyFromStateAndMunicipalBudgets25v != null && !SubsidyFromStateAndMunicipalBudgets25v.IsEmpty())
                return false; 
            
            if (RentalOfMovableAndImmovableProperty25v != null && !RentalOfMovableAndImmovableProperty25v.IsEmpty())
                return false; 
            
            if (DonationAndWills25v != null && !DonationAndWills25v.IsEmpty())
                return false; 
            
            if (OtherExpenses25v != null && !OtherExpenses25v.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F026_CessationOfTrade
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Cheked != false)
                return false;
            
            if (!string.IsNullOrEmpty(Text))
                return false; 
            
            return true; 
        }
    }

    public partial class F026a_CessationOfNonProfitLegalEntity
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Cheked != false)
                return false;
            
            if (!string.IsNullOrEmpty(Text))
                return false; 
            
            return true; 
        }
    }

    public partial class F027_AddemptionOfTrader
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Cheked != false)
                return false;
            
            if (!string.IsNullOrEmpty(Text))
                return false; 
            
            return true; 
        }
    }

    public partial class F027a_AddemptionOfTraderSeatChange
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (IsTraderAddempted != false)
                return false;
            
            if (!string.IsNullOrEmpty(IsTraderAddemptedText))
                return false; 
            
            if (ForeignAuthority != null && !ForeignAuthority.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F027b_EraseReservation
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(ReservedFirmIncomingNumber))
                return false; 
            
            if (ReservedFirmIncomingID != 0)
                return false;
            
            if (Cheked != false)
                return false;
            
            if (!string.IsNullOrEmpty(Text))
                return false; 
            
            return true; 
        }
    }

    public partial class F027v_AddemptionOfTraderEraseForeignTrader
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Cheked != false)
                return false;
            
            if (!string.IsNullOrEmpty(Text))
                return false; 
            
            return true; 
        }
    }

    public partial class F028_ClosureBranchOfForeignTrader
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Cheked != false)
                return false;
            
            if (!string.IsNullOrEmpty(Text))
                return false; 
            
            return true; 
        }
    }

    public partial class F028a_AddemptionOfEUIE
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Cheked != false)
                return false;
            
            if (!string.IsNullOrEmpty(Text))
                return false; 
            
            return true; 
        }
    }

    public partial class F029_PersonConcerned
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Subject != null && !Subject.IsEmpty())
                return false; 
            
            if (Address != null && !Address.IsEmpty())
                return false; 
            
            if (!string.IsNullOrEmpty(Quality))
                return false; 
            
            return true; 
        }
    }

    public partial class F031_Funds
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (IsInEuro != false)
                return false;
            
            if (!string.IsNullOrEmpty(EuroText))
                return false; 
            
            return true; 
        }
    }

    public partial class F03110_CredentialsForDifferentTypes
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F03111_SpecialConditionsForTransfer
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F0310a_Share
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Type))
                return false; 
            
            if (!string.IsNullOrEmpty(Count))
                return false; 
            
            if (!string.IsNullOrEmpty(NominalValue))
                return false; 
            
            return true; 
        }
    }

    public partial class F031a_Shares
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (CredentialsForDifferentTypes != null && !CredentialsForDifferentTypes.IsEmpty())
                return false; 
            
            if (SpecialConditionsForTransfer != null && !SpecialConditionsForTransfer.IsEmpty())
                return false; 
            
            if (ShareList != null && ShareList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F031b_MinimumAmount
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (IsInEuro != false)
                return false;
            
            if (!string.IsNullOrEmpty(EuroText))
                return false; 
            
            return true; 
        }
    }

    public partial class F032_DepositedFunds
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (IsInEuro != false)
                return false;
            
            if (!string.IsNullOrEmpty(EuroText))
                return false; 
            
            return true; 
        }
    }

    public partial class F0330_NonMonetaryDeposit
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Description))
                return false; 
            
            if (!string.IsNullOrEmpty(Value))
                return false; 
            
            if (OutgoingNumber != null && !OutgoingNumber.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F033_NonMonetaryDeposits
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (NonMonetaryDepositsList != null && NonMonetaryDepositsList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F034_BuyBackDecision
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Cheked != false)
                return false;
            
            if (!string.IsNullOrEmpty(Text))
                return false; 
            
            return true; 
        }
    }

    public partial class F0410_Procurator
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Person != null && !Person.IsEmpty())
                return false; 
            
            if (Address != null && !Address.IsEmpty())
                return false; 
            
            if (Passport != null && !Passport.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F041_Procurators
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (ProcuratorsList != null && ProcuratorsList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F0420_SpecialPower
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(ProcuratorName))
                return false; 
            
            if (RightToAlienate.HasValue)
                return false;
            
            if (RightToBurden.HasValue)
                return false;
            
            if (!string.IsNullOrEmpty(RightToAlienateText))
                return false; 
            
            if (!string.IsNullOrEmpty(RightToBurdenText))
                return false; 
            
            return true; 
        }
    }

    public partial class F042_SepcialPowers
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (SepcialPowersList != null && SepcialPowersList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F043_WayOfRepresentation43
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F044_EraseProcura
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Cheked != false)
                return false;
            
            if (!string.IsNullOrEmpty(Text))
                return false; 
            
            return true; 
        }
    }

    public partial class F051_BranchSeat
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F051a_BranchFirm
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F051b_BranchIdentifier
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F052_BranchSubjectOfActivity
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F052a_MainActivityNKID
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F053_BranchManagers
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (ManagersList != null && ManagersList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F0530_BranchManager
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Person != null && !Person.IsEmpty())
                return false; 
            
            if (Address != null && !Address.IsEmpty())
                return false; 
            
            if (Passport != null && !Passport.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F054_VolumeOfRepresentationPower
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F054a_VolumeOfRepresentationPower541
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F055_BranchClosure
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Company))
                return false; 
            
            if (!string.IsNullOrEmpty(Seat))
                return false; 
            
            if (!string.IsNullOrEmpty(SubUIC))
                return false; 
            
            if (Closed != false)
                return false;
            
            if (!string.IsNullOrEmpty(ClosedText))
                return false; 
            
            return true; 
        }
    }

    public partial class F0600_DivisionOfEuropeanUnification
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (ForeignCompanyBaseData != null && !ForeignCompanyBaseData.IsEmpty())
                return false; 
            
            if (Address != null && !Address.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F060_DivisionsOfEuropeanUnification
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (DivisionOfEuropeanUnificationList != null && DivisionOfEuropeanUnificationList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F070_WayOfEstablishingEuropeanCompany
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (FromAcquisition != false)
                return false;
            
            if (FromMerge != false)
                return false;
            
            if (FromHolding != false)
                return false;
            
            if (FromSubsidiary != false)
                return false;
            
            if (FromConvert != false)
                return false;
            
            if (!string.IsNullOrEmpty(FromAcquisitionText))
                return false; 
            
            if (!string.IsNullOrEmpty(FromMergeText))
                return false; 
            
            if (!string.IsNullOrEmpty(FromHoldingText))
                return false; 
            
            if (!string.IsNullOrEmpty(FromSubsidiaryText))
                return false; 
            
            if (!string.IsNullOrEmpty(FromConvertText))
                return false; 
            
            return true; 
        }
    }

    public partial class F070a_WayOfEstablishingEuropeanCooperativeSociety
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (ThroughInitialFormation != false)
                return false;
            
            if (ThroughAcquisitionOrMerge != false)
                return false;
            
            if (ByConvertingCooperativeSocietyIntoEuropeanCooperativeSociety != false)
                return false;
            
            if (!string.IsNullOrEmpty(ThroughInitialFormationText))
                return false; 
            
            if (!string.IsNullOrEmpty(ThroughAcquisitionOrMergeText))
                return false; 
            
            if (!string.IsNullOrEmpty(ByConvertingCooperativeSocietyIntoEuropeanCooperativeSocietyText))
                return false; 
            
            return true; 
        }
    }

    public partial class F071_SeatChange
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (ForeignAuthority != null && !ForeignAuthority.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public abstract partial class Statement
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(ActModeText))
                return false; 
            
            if (!string.IsNullOrEmpty(ActModeValue))
                return false; 
            
            if (!string.IsNullOrEmpty(Description))
                return false; 
            
            if (!string.IsNullOrEmpty(ActDate))
                return false; 
            
            if (!string.IsNullOrEmpty(ActYear))
                return false; 
            
            if (!string.IsNullOrEmpty(ActID))
                return false; 
            
            if (!string.IsNullOrEmpty(ActWithErasedPersonalData))
                return false; 
            
            if (IsActWithErasedPersonalData.HasValue)
                return false;
            
            return true; 
        }
    }

    public abstract partial class StatementsBase<T>
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            if (StatementsList != null && StatementsList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F10019A0_StatementA
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F10019A_StatementsA
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F10019B0_StatementB
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F10019B_StatementsB
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F10019C0_StatementC
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F10019C_StatementsC
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F10019D0_StatementD
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F10019D_StatementsD
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F10019E0_StatementE
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F10019E_StatementsE
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F10019F0_StatementF
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F10019F_StatementsF
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F10019G0_StatementG
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F10019G_StatementsG
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F10019H0_StatementH
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F10019H_StatementsH
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F10019I0_StatementI
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F10019I_StatementsI
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F10019J0_StatementJ
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F10019J_StatementsJ
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F10019K0_StatementK
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F10019K_StatementsK
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F10019L0_StatementL
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F10019L_StatementsL
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F10019M0_StatementM
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F10019M_StatementsM
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F10019N0_StatementN
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F10019N_StatementsN
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F10019O0_StatementO
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F10019O_StatementsO
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F10019P0_StatementP
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F10019P_StatementsP
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F10019Q0_StatementQ
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F10019Q_StatementsQ
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F10019R0_StatementR
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F10019R_StatementsR
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F10019S0_StatementS
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F10019S_StatementsS
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F10019T0_StatementT
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F10019T_StatementsT
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F10019U0_StatementU
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F10019U_StatementsU
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F10019V0_StatementV
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F10019V_StatementsV
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F10019W0_StatementW
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F10019W_StatementsW
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F10019X0_StatementX
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F10019X_StatementsX
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F10019Y0_StatementY
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F10019Y_StatementsY
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F10019Z0_StatementZ
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F10019Z_StatementsZ
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F1001AA0_StatementAA
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F1001AA_StatementsAA
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F1001AB0_StatementAB
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F1001AB_StatementsAB
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F1001AC0_StatementAC
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F1001AC_StatementsAC
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F1001AD0_StatementAD
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F1001AD_StatementsAD
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F1001AE0_StatementAE
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F1001AE_StatementsAE
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F1001AF0_StatementAF
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F1001AF_StatementsAF
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F1001AG0_StatementAG
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F1001AG_StatementsAG
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F1001AH0_StatementAH
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F1001AH_StatementsAH
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F1001AI0_StatementAI
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F1001AI_StatementsAI
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F1001AJ0_StatementAJ
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F1001AJ_StatementsAJ
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F1001AK0_StatementAK
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F1001AK_StatementsAK
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F1001AL0_StatementAL
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F1001AL_StatementsAL
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F1001AM0_StatementAM
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F1001AM_StatementsAM
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F1001AN0_StatementAN
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F1001AN_StatementsAN
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F1001AO0_StatementAO
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F1001AO_StatementsAO
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F1001AP0_StatementAP
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F1001AP_StatementsAP
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F1001AQ0_StatementAQ
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F1001AQ_StatementsAQ
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F1001AR0_StatementAR
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F1001AR_StatementsAR
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F1001AS0_StatementAS
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F1001AS_StatementsAS
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F1001AT0_StatementAT
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F1001AT_StatementsAT
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F1001AU0_StatementAU
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F1001AU_StatementsAU
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F1001AV0_StatementAV
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F1001AV_StatementsAV
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F1001AW0_StatementAW
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F1001AW_StatementsAW
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F1001AX0_StatementAX
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F1001AX_StatementsAX
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F1001AY0_StatementAY
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F1001AY_StatementsAY
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F1001AZ0_StatementAZ
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F1001AZ_StatementsAZ
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F1001BA0_StatementBA
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F1001BA_StatementsBA
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F1001BB0_StatementBB
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F1001BB_StatementsBB
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F1001BC0_StatementBC
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F1001BC_StatementsBC
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F1001BD0_StatementBD
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F1001BD_StatementsBD
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F1001BE0_StatementBE
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F1001BE_StatementsBE
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F1001BF0_StatementBF
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F1001BF_StatementsBF
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F1001BG0_StatementBG
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F1001BG_StatementsBG
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F1001BH0_StatementBH
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F1001BH_StatementsBH
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F1001BI0_StatementBI
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F1001BI_StatementsBI
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Statements != null && Statements.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F101_LimitSubjectOfActivity101
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(FobiddenDeals))
                return false; 
            
            if (!string.IsNullOrEmpty(ForbiddenActivity))
                return false; 
            
            if (!string.IsNullOrEmpty(FobiddenOperations))
                return false; 
            
            return true; 
        }
    }

    public partial class F102_License102
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F102a_PutUnderParticularSupervision
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Date))
                return false; 
            
            if (!string.IsNullOrEmpty(Conditions))
                return false; 
            
            return true; 
        }
    }

    public partial class F103_Authorization
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Deprived != false)
                return false;
            
            if (!string.IsNullOrEmpty(DeprivedText))
                return false; 
            
            if (!string.IsNullOrEmpty(Description))
                return false; 
            
            return true; 
        }
    }

    public partial class F1040_Suquestrator104
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Person != null && !Person.IsEmpty())
                return false; 
            
            if (!string.IsNullOrEmpty(AppointedTill))
                return false; 
            
            return true; 
        }
    }

    public partial class F104_Suquestrators104
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (SuquestratorList != null && SuquestratorList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F105_OtherCircumstances105
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F1060_LimitInsuaranceActivity106
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(InsuaranceType))
                return false; 
            
            if (ForbiddanceOfNewContracts != false)
                return false;
            
            if (!string.IsNullOrEmpty(ForbiddanceOfNewContractsText))
                return false; 
            
            if (ForbiddanceToExtendContracts != false)
                return false;
            
            if (!string.IsNullOrEmpty(ForbiddanceToExtendContractsText))
                return false; 
            
            if (ForbiddanceToWidenContracts != false)
                return false;
            
            if (!string.IsNullOrEmpty(ForbiddanceToWidenContractsText))
                return false; 
            
            if (!string.IsNullOrEmpty(FobiddenTill))
                return false; 
            
            return true; 
        }
    }

    public partial class F106_LimitSubjectOfActivity106
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (LimitInsuaranceActivityList != null && LimitInsuaranceActivityList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F107_ManageOrganizationAssets107
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Limited != false)
                return false;
            
            if (!string.IsNullOrEmpty(LimitedText))
                return false; 
            
            if (Forbidden != false)
                return false;
            
            if (!string.IsNullOrEmpty(ForbiddenText))
                return false; 
            
            return true; 
        }
    }

    public partial class F108_License108
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F1090_Suquestrator109
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Person != null && !Person.IsEmpty())
                return false; 
            
            if (!string.IsNullOrEmpty(AppointedTill))
                return false; 
            
            return true; 
        }
    }

    public partial class F109_Suquestrators109
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (SuquestratorList != null && SuquestratorList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F110_OtherCircumstances110
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F1110_ZPPCKOrganizationLimit
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Securities))
                return false; 
            
            if (CessasionOfSales != false)
                return false;
            
            if (!string.IsNullOrEmpty(CessasionOfSalesText))
                return false; 
            
            if (CessasionOfDeals != false)
                return false;
            
            if (!string.IsNullOrEmpty(CessasionOfDealsText))
                return false; 
            
            if (!string.IsNullOrEmpty(CessatedTill))
                return false; 
            
            return true; 
        }
    }

    public partial class F111_LimitSubjectOfActivity111
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (ZPPCKOrganizationLimitsList != null && ZPPCKOrganizationLimitsList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F112_ManageOrganizationAssets112
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(CessationOfByingSecuritiesText))
                return false; 
            
            if (!string.IsNullOrEmpty(CessationOfByingStakesText))
                return false; 
            
            return true; 
        }
    }

    public partial class F1130_Suquestrator113
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Person != null && !Person.IsEmpty())
                return false; 
            
            if (!string.IsNullOrEmpty(AppointedTill))
                return false; 
            
            return true; 
        }
    }

    public partial class F113_Suquestrators113
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (SuquestratorsList != null && SuquestratorsList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F114_OtherCircumstances114
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F115_RefusalOfLicense
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F116_SpecialManager
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Person != null && !Person.IsEmpty())
                return false; 
            
            if (Address != null && !Address.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F117_OtherCircumstances117
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F200_PledgeDDIdentifier
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F2010_Pledgor
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Subject != null && !Subject.IsEmpty())
                return false; 
            
            if (Address != null && !Address.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F201_Pledgors
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (PledgorList != null && PledgorList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F2030_SecuredClaimDebtor
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Subject != null && !Subject.IsEmpty())
                return false; 
            
            if (Address != null && !Address.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F203_SecuredClaimDebtors
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (SecuredClaimDebtorList != null && SecuredClaimDebtorList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F2050_PledgeCreditor
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Subject != null && !Subject.IsEmpty())
                return false; 
            
            if (Address != null && !Address.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F205_PledgeCreditors
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (PledgeCreditorsList != null && PledgeCreditorsList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F207_SecuredClaimReason
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Contract != false)
                return false;
            
            if (CourtOrder != false)
                return false;
            
            if (AdministrativeAct != false)
                return false;
            
            if (OtherSource != false)
                return false;
            
            if (Date.HasValue)
                return false;
            
            if (!string.IsNullOrEmpty(ContractText))
                return false; 
            
            if (!string.IsNullOrEmpty(CourtOrderText))
                return false; 
            
            if (!string.IsNullOrEmpty(AdministrativeActText))
                return false; 
            
            if (!string.IsNullOrEmpty(OtherSourceText))
                return false; 
            
            if (!string.IsNullOrEmpty(Description))
                return false; 
            
            if (!string.IsNullOrEmpty(ReasonDate))
                return false; 
            
            return true; 
        }
    }

    public partial class F207a_ContractOfPledgeForShare
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Date.HasValue)
                return false;
            
            if (!string.IsNullOrEmpty(Text))
                return false; 
            
            if (!string.IsNullOrEmpty(TermType))
                return false; 
            
            return true; 
        }
    }

    public partial class F208_SecuredClaimSubject
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (GivingMoney != false)
                return false;
            
            if (GivingThing != false)
                return false;
            
            if (DoingActions != false)
                return false;
            
            if (NotDoingActions != false)
                return false;
            
            if (!string.IsNullOrEmpty(GivingMoneyText))
                return false; 
            
            if (!string.IsNullOrEmpty(GivingThingText))
                return false; 
            
            if (!string.IsNullOrEmpty(DoingActionsText))
                return false; 
            
            if (!string.IsNullOrEmpty(NotDoingActionsText))
                return false; 
            
            return true; 
        }
    }

    public partial class F209_SecuredClaimAmount
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(AmountDue))
                return false; 
            
            if (!string.IsNullOrEmpty(Units))
                return false; 
            
            return true; 
        }
    }

    public partial class F210_SecuredClaimInterests
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F211_SecuredClaimDelayInterests
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F212_PledgeMoney
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Price != null && !Price.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F213_PledgePropertyDescription
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (CorporateShare != false)
                return false;
            
            if (PartOfCorporateShare != false)
                return false;
            
            if (!string.IsNullOrEmpty(CorporateShareText))
                return false; 
            
            if (!string.IsNullOrEmpty(PartOfCorporateShareText))
                return false; 
            
            if (!string.IsNullOrEmpty(SharesCount))
                return false; 
            
            if (!string.IsNullOrEmpty(Nominal))
                return false; 
            
            if (!string.IsNullOrEmpty(Capital))
                return false; 
            
            return true; 
        }
    }

    public partial class F214_PledgePropertyPrice
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Price != null && !Price.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F215_ModalityDate
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Date.HasValue)
                return false;
            
            if (!string.IsNullOrEmpty(Text))
                return false; 
            
            return true; 
        }
    }

    public partial class F216_ModalityCondition
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F216a_PledgedCreditorAgreement
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Article_8_Para_3_Of_SPA != false)
                return false;
            
            if (Article_32_Para_5_Of_SPA != false)
                return false;
            
            if (!string.IsNullOrEmpty(Article_8_Para_3_Of_SPAText))
                return false; 
            
            if (!string.IsNullOrEmpty(Article_32_Para_5_Of_SPAText))
                return false; 
            
            return true; 
        }
    }

    public partial class F217_PledgeExecutionClaim
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F21800_Partner218Part
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Count))
                return false; 
            
            if (!string.IsNullOrEmpty(Value))
                return false; 
            
            return true; 
        }
    }

    public partial class F2180_Partner218
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Subject != null && !Subject.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F218_Partners218
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Partner218Part != null && !Partner218Part.IsEmpty())
                return false; 
            
            if (Partner218List != null && Partner218List.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F219_PledgeExecutionDepozitar
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Person != null && !Person.IsEmpty())
                return false; 
            
            if (Address != null && !Address.IsEmpty())
                return false; 
            
            if (!string.IsNullOrEmpty(BIC))
                return false; 
            
            if (!string.IsNullOrEmpty(IBAN))
                return false; 
            
            return true; 
        }
    }

    public abstract partial class DepozitarDistraintData
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (ReasonCourt != false)
                return false;
            
            if (ReasonCourtExecuter != false)
                return false;
            
            if (ReasonADV != false)
                return false;
            
            if (IncomingDistraint != false)
                return false;
            
            if (Subject != null && !Subject.IsEmpty())
                return false; 
            
            if (Address != null && !Address.IsEmpty())
                return false; 
            
            if (!string.IsNullOrEmpty(ReasonCourtText))
                return false; 
            
            if (!string.IsNullOrEmpty(ReasonCourtExecuterText))
                return false; 
            
            if (!string.IsNullOrEmpty(ReasonADVText))
                return false; 
            
            if (!string.IsNullOrEmpty(Court))
                return false; 
            
            if (!string.IsNullOrEmpty(CaseNo))
                return false; 
            
            if (!string.IsNullOrEmpty(IncomingDistraintText))
                return false; 
            
            if (!string.IsNullOrEmpty(PartValue))
                return false; 
            
            if (!string.IsNullOrEmpty(PartCount))
                return false; 
            
            return true; 
        }
    }

    public partial class F2200_DepozitarDistraintDetails
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F22001_DepozitarDistraint
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Subject != null && !Subject.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F22002_DepozitarReminderDistraint
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (ReminderDistraint != false)
                return false;
            
            if (!string.IsNullOrEmpty(ReminderDistraintText))
                return false; 
            
            if (!string.IsNullOrEmpty(Value))
                return false; 
            
            if (!string.IsNullOrEmpty(Currency))
                return false; 
            
            return true; 
        }
    }

    public partial class F220_Depozitar
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (DepozitarDistraintDetails != null && !DepozitarDistraintDetails.IsEmpty())
                return false; 
            
            if (DepozitarReminderDistraint != null && !DepozitarReminderDistraint.IsEmpty())
                return false; 
            
            if (DepozitarDistraintList != null && DepozitarDistraintList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F221_DepozitarDistraintRemove
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Court))
                return false; 
            
            if (!string.IsNullOrEmpty(CaseNo))
                return false; 
            
            return true; 
        }
    }

    public partial class F222_StopOfExecutionSize
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Price != null && !Price.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F223_StopOfExecutionProperty
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F2231_EntryIntoPledgeCreditorRight
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Subject != null && !Subject.IsEmpty())
                return false; 
            
            if (Address != null && !Address.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F223a_EntryIntoPledgeCreditorRights
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (EntryIntoPledgeCreditorRightList != null && EntryIntoPledgeCreditorRightList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F224_PledgeRenewDate
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Date.HasValue)
                return false;
            
            if (ProcessingRenewDistraintRequired.HasValue)
                return false;
            
            if (!string.IsNullOrEmpty(Text))
                return false; 
            
            if (!string.IsNullOrEmpty(RenewDistraintText))
                return false; 
            
            return true; 
        }
    }

    public partial class F225_PledgeAddemption
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Addempted != false)
                return false;
            
            if (!string.IsNullOrEmpty(AddemptedText))
                return false; 
            
            return true; 
        }
    }

    public partial class F300_ForfeitCompanyIdentifier
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F3010_DebtorOverSecureClaim
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Subject != null && !Subject.IsEmpty())
                return false; 
            
            if (Address != null && !Address.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F301_DebtorOverSecureClaims
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (DebtorOverSecureClaimList != null && DebtorOverSecureClaimList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F3030_AtPawnCreditor
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Subject != null && !Subject.IsEmpty())
                return false; 
            
            if (Address != null && !Address.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F303_AtPawnCreditors
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (AtPawnCreditorsList != null && AtPawnCreditorsList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F305_Reason
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Text))
                return false; 
            
            if (Contract != false)
                return false;
            
            if (CourtOrder != false)
                return false;
            
            if (AdministrativAct != false)
                return false;
            
            if (OtherSource != false)
                return false;
            
            if (!string.IsNullOrEmpty(ContractText))
                return false; 
            
            if (!string.IsNullOrEmpty(CourtOrderText))
                return false; 
            
            if (!string.IsNullOrEmpty(AdministrativActText))
                return false; 
            
            if (!string.IsNullOrEmpty(OtherSourceText))
                return false; 
            
            if (!string.IsNullOrEmpty(DateText))
                return false; 
            
            if (Date.HasValue)
                return false;
            
            return true; 
        }
    }

    public partial class F305a_PledgeContractForTrader
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Date.HasValue)
                return false;
            
            if (!string.IsNullOrEmpty(Text))
                return false; 
            
            return true; 
        }
    }

    public partial class F306_Object306
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (ForGivingAmount != false)
                return false;
            
            if (ForGive != false)
                return false;
            
            if (ForDoingActivity != false)
                return false;
            
            if (ForNotDoingActivity != false)
                return false;
            
            if (!string.IsNullOrEmpty(ForGivingAmountText))
                return false; 
            
            if (!string.IsNullOrEmpty(ForGiveText))
                return false; 
            
            if (!string.IsNullOrEmpty(ForDoingActivityText))
                return false; 
            
            if (!string.IsNullOrEmpty(ForNotDoingActivityText))
                return false; 
            
            return true; 
        }
    }

    public partial class F307_Size307
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(QuantityDue))
                return false; 
            
            if (!string.IsNullOrEmpty(Units))
                return false; 
            
            return true; 
        }
    }

    public partial class F308_Interest
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F309_InterestAndDefaultForDelay
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F310_Size310
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Price != null && !Price.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F311_Description
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (WholeCompany != false)
                return false;
            
            if (PartOfCompany != false)
                return false;
            
            if (!string.IsNullOrEmpty(WholeCompanyText))
                return false; 
            
            if (!string.IsNullOrEmpty(PartOfCompanyText))
                return false; 
            
            return true; 
        }
    }

    public partial class F312_Price312
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Price != null && !Price.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F313_Term
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Date.HasValue)
                return false;
            
            if (!string.IsNullOrEmpty(Text))
                return false; 
            
            return true; 
        }
    }

    public partial class F314_Circumstances
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F314a_PledgedCreditorAgreement2
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Article_8_Para_3_Of_SPA != false)
                return false;
            
            if (Article_32_Para_5_Of_SPA != false)
                return false;
            
            if (Article_21_Para_5_Of_SPA != false)
                return false;
            
            if (!string.IsNullOrEmpty(Article_8_Para_3_Of_SPAText))
                return false; 
            
            if (!string.IsNullOrEmpty(Article_21_Para_5_Of_SPAText))
                return false; 
            
            if (!string.IsNullOrEmpty(Article_32_Para_5_Of_SPAText))
                return false; 
            
            return true; 
        }
    }

    public partial class F315_PartOfClaimwhatIsSeek
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F316_PropertyOverExecution
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (WholeCompany != false)
                return false;
            
            if (PartOfCompany != false)
                return false;
            
            if (!string.IsNullOrEmpty(AssetsOfCompany))
                return false; 
            
            if (!string.IsNullOrEmpty(WholeCompanyText))
                return false; 
            
            if (!string.IsNullOrEmpty(PartOfCompanyText))
                return false; 
            
            return true; 
        }
    }

    public partial class F317_Depositor
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Person != null && !Person.IsEmpty())
                return false; 
            
            if (Address != null && !Address.IsEmpty())
                return false; 
            
            if (!string.IsNullOrEmpty(BIC))
                return false; 
            
            if (!string.IsNullOrEmpty(IBAN))
                return false; 
            
            return true; 
        }
    }

    public partial class F318_InvitationForAppointingOfManager
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Checked != false)
                return false;
            
            if (!string.IsNullOrEmpty(Text))
                return false; 
            
            return true; 
        }
    }

    public partial class F319_ManagerOfTradeEnterprise
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Person != null && !Person.IsEmpty())
                return false; 
            
            if (Address != null && !Address.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F320_RestoringManagementRight
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Checked != false)
                return false;
            
            if (!string.IsNullOrEmpty(Text))
                return false; 
            
            return true; 
        }
    }

    public partial class F321_DistraintData
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Subject != null && !Subject.IsEmpty())
                return false; 
            
            if (Address != null && !Address.IsEmpty())
                return false; 
            
            if (Price != null && !Price.IsEmpty())
                return false; 
            
            if (!string.IsNullOrEmpty(AssetsOfCompany))
                return false; 
            
            if (Court != false)
                return false;
            
            if (LegalExecutor != false)
                return false;
            
            if (ADV != false)
                return false;
            
            if (IncomingAmount != false)
                return false;
            
            if (RemainingAmount != false)
                return false;
            
            if (EnterprisesLikeCombination != false)
                return false;
            
            if (SeparateAssets != false)
                return false;
            
            if (!string.IsNullOrEmpty(CourtText))
                return false; 
            
            if (!string.IsNullOrEmpty(LegalExecutorText))
                return false; 
            
            if (!string.IsNullOrEmpty(ADVText))
                return false; 
            
            if (!string.IsNullOrEmpty(CourtLegalExecutor))
                return false; 
            
            if (!string.IsNullOrEmpty(CaseNumber))
                return false; 
            
            if (!string.IsNullOrEmpty(IncomingAmountText))
                return false; 
            
            if (!string.IsNullOrEmpty(RemainingAmountText))
                return false; 
            
            if (!string.IsNullOrEmpty(EnterprisesLikeCombinationText))
                return false; 
            
            if (!string.IsNullOrEmpty(SeparateAssetsText))
                return false; 
            
            return true; 
        }
    }

    public partial class F322_RaiseDistraint
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Court))
                return false; 
            
            if (!string.IsNullOrEmpty(CaseNumber))
                return false; 
            
            return true; 
        }
    }

    public partial class F323_Size323
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Price != null && !Price.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F324_StopExecutionOverProperty
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F32410_EntryIntoPledgeCreditorRight2
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Subject != null && !Subject.IsEmpty())
                return false; 
            
            if (Address != null && !Address.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F324a_EntryIntoPledgeCreditorRights2
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (EntryIntoPledgeCreditorRight2List != null && EntryIntoPledgeCreditorRight2List.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F325_EraseDistraint
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Checked != false)
                return false;
            
            if (!string.IsNullOrEmpty(Text))
                return false; 
            
            return true; 
        }
    }

    public partial class F325a_PartialEraseDistraint
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(description))
                return false; 
            
            if (Checked != false)
                return false;
            
            if (!string.IsNullOrEmpty(Text))
                return false; 
            
            return true; 
        }
    }

    public partial class F326_DateOfRenewingDistraint
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Date.HasValue)
                return false;
            
            if (ProcessingRenewDistraintRequired.HasValue)
                return false;
            
            if (!string.IsNullOrEmpty(Text))
                return false; 
            
            if (!string.IsNullOrEmpty(RenewDistraintText))
                return false; 
            
            return true; 
        }
    }

    public partial class F400_DistraintIdentifier
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F4010_Distraint
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Subject != null && !Subject.IsEmpty())
                return false; 
            
            if (Address != null && !Address.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F401_Distraints
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (DistraintsList != null && DistraintsList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F403_Reason403
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Court != false)
                return false;
            
            if (LegalExecutor != false)
                return false;
            
            if (ADV != false)
                return false;
            
            if (!string.IsNullOrEmpty(CourtText))
                return false; 
            
            if (!string.IsNullOrEmpty(LegalExecutorText))
                return false; 
            
            if (!string.IsNullOrEmpty(ADVText))
                return false; 
            
            if (!string.IsNullOrEmpty(CourtLegalExecutor))
                return false; 
            
            if (!string.IsNullOrEmpty(CaseNumber))
                return false; 
            
            return true; 
        }
    }

    public partial class F404_Size404
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Price != null && !Price.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F404a_MoratoryRate
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Date.HasValue)
                return false;
            
            if (Price != null && !Price.IsEmpty())
                return false; 
            
            if (!string.IsNullOrEmpty(DateOfCalculation))
                return false; 
            
            return true; 
        }
    }

    public partial class F405_Interests
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Text))
                return false; 
            
            return true; 
        }
    }

    public partial class F040601_Description406
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Subject != null && !Subject.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F04060_DescriptionCount
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Text))
                return false; 
            
            return true; 
        }
    }

    public partial class F406_Descriptions
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (DescriptionCount != null && !DescriptionCount.IsEmpty())
                return false; 
            
            if (Description406List != null && Description406List.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F408_LiftingDistraint
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(CourtLegalExecutor))
                return false; 
            
            if (!string.IsNullOrEmpty(CaseNumber))
                return false; 
            
            return true; 
        }
    }

    public partial class F409_Size409
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Price != null && !Price.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F410_StopExecutionOverProperty410
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F501_TermsOfLiquidation
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Date.HasValue)
                return false;
            
            if (!string.IsNullOrEmpty(Text))
                return false; 
            
            if (!string.IsNullOrEmpty(TermType))
                return false; 
            
            if (LiquidationProceedings != false)
                return false;
            
            if (ChangeCircumstances != false)
                return false;
            
            return true; 
        }
    }

    public partial class F5020_Liquidator
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Subject != null && !Subject.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F502_Liquidators
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (LiquidatorList != null && LiquidatorList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F503_Representative503
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Person != null && !Person.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F504_ContinuingTradeActivity
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Continue != false)
                return false;
            
            if (Restore != false)
                return false;
            
            if (!string.IsNullOrEmpty(ContinueText))
                return false; 
            
            if (!string.IsNullOrEmpty(RestoreText))
                return false; 
            
            return true; 
        }
    }

    public partial class F505_StopOfLiquidation
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (StoppingOfLiquidation != false)
                return false;
            
            if (CessationOfLiquidation != false)
                return false;
            
            if (!string.IsNullOrEmpty(StoppingOfLiquidationText))
                return false; 
            
            if (!string.IsNullOrEmpty(CessationOfLiquidationText))
                return false; 
            
            return true; 
        }
    }

    public partial class F506_ResumeOfLiquidation
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Cheked != false)
                return false;
            
            if (!string.IsNullOrEmpty(Text))
                return false; 
            
            return true; 
        }
    }

    public partial class F529_ReasonForEntry529
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Article63 != false)
                return false;
            
            if (Article6 != false)
                return false;
            
            if (!string.IsNullOrEmpty(Article63Text))
                return false; 
            
            if (!string.IsNullOrEmpty(Article6Text))
                return false; 
            
            return true; 
        }
    }

    public partial class F530_OffshoreIdentifier
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F531_OffshoreCompany
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F532_OffshoreTransliteration
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F533_OffshoreSeat
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F5340_OffshoreRepresentative
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Subject != null && !Subject.IsEmpty())
                return false; 
            
            if (Person != null && !Person.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F534_OffshoreRepresentatives
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (OffshoreRepresentativesList != null && OffshoreRepresentativesList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F535_OffshoreWayOfRepresentation
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F536_OffshoreSpecialConditions
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F537_OffshoreDirectControlCompanies
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (OffshoreDirectControlCompany != null && !OffshoreDirectControlCompany.IsEmpty())
                return false; 
            
            if (OffshoreDirectControlCompanyLegalForm != null && !OffshoreDirectControlCompanyLegalForm.IsEmpty())
                return false; 
            
            if (OffshoreDirectControlCompanyTransliteration != null && !OffshoreDirectControlCompanyTransliteration.IsEmpty())
                return false; 
            
            if (OffshoreDirectControlCompanyNumberInRegister != null && !OffshoreDirectControlCompanyNumberInRegister.IsEmpty())
                return false; 
            
            if (OffshoreDirectControlCompanyAddress != null && !OffshoreDirectControlCompanyAddress.IsEmpty())
                return false; 
            
            if (OffshoreDirectControlCompanyWayOfRepresentation != null && !OffshoreDirectControlCompanyWayOfRepresentation.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F5370_OffshoreDirectControlCompany
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Name))
                return false; 
            
            return true; 
        }
    }

    public partial class F53702_OffshoreDirectControlCompanyLegalForm
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(DCLegalForm))
                return false; 
            
            return true; 
        }
    }

    public partial class F53703_OffshoreDirectControlCompanyTransliteration
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(DCTransliteration))
                return false; 
            
            return true; 
        }
    }

    public partial class F53704_OffshoreDirectControlCompanyNumberInRegister
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(DCNumberInRegister))
                return false; 
            
            return true; 
        }
    }

    public partial class F53705_OffshoreDirectControlCompanyAddress
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Address != null && !Address.IsEmpty())
                return false; 
            
            if (Contacts != null && !Contacts.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F53707_OffshoreDirectControlCompanyWayOfRepresentation
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F53710_OffshoreDirectControlCompanyRepresentative
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Person != null && !Person.IsEmpty())
                return false; 
            
            if (Address != null && !Address.IsEmpty())
                return false; 
            
            if (CountryOfResidence != null && !CountryOfResidence.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F5371_OffshoreDirectControlCompanyRepresentatives
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (OffshoreDirectControlCompanyRepresentativesList != null && OffshoreDirectControlCompanyRepresentativesList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F538_OffshoreNoDirectControlCompanies
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (OffshoreNoDirectControlCompany != null && !OffshoreNoDirectControlCompany.IsEmpty())
                return false; 
            
            if (OffshoreNoDirectControlCompanyLegalForm != null && !OffshoreNoDirectControlCompanyLegalForm.IsEmpty())
                return false; 
            
            if (OffshoreNoDirectControlCompanyTransliteration != null && !OffshoreNoDirectControlCompanyTransliteration.IsEmpty())
                return false; 
            
            if (OffshoreNoDirectControlCompanyNumberInRegister != null && !OffshoreNoDirectControlCompanyNumberInRegister.IsEmpty())
                return false; 
            
            if (OffshoreNoDirectControlCompanyAddress != null && !OffshoreNoDirectControlCompanyAddress.IsEmpty())
                return false; 
            
            if (OffshoreNoDirectControlCompanyWayOfRepresentation != null && !OffshoreNoDirectControlCompanyWayOfRepresentation.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F5380_OffshoreNoDirectControlCompany
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Name))
                return false; 
            
            return true; 
        }
    }

    public partial class F53802_OffshoreNoDirectControlCompanyLegalForm
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(NDCLegalForm))
                return false; 
            
            return true; 
        }
    }

    public partial class F53803_OffshoreNoDirectControlCompanyTransliteration
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(NDCTransliteration))
                return false; 
            
            return true; 
        }
    }

    public partial class F53804_OffshoreNoDirectControlCompanyNumberInRegister
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(NDCNumberInRegister))
                return false; 
            
            return true; 
        }
    }

    public partial class F53805_OffshoreNoDirectControlCompanyAddress
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Address != null && !Address.IsEmpty())
                return false; 
            
            if (Contacts != null && !Contacts.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F53807_OffshoreNoDirectControlCompanyWayOfRepresentation
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F53810_OffshoreNoDirectControlCompanyRepresentative
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Person != null && !Person.IsEmpty())
                return false; 
            
            if (Address != null && !Address.IsEmpty())
                return false; 
            
            if (CountryOfResidence != null && !CountryOfResidence.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F5381_OffshoreNoDirectControlCompanyRepresentatives
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (OffshoreNoDirectControlCompanyRepresentativesList != null && OffshoreNoDirectControlCompanyRepresentativesList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F540_CircumstanceArticle4
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (IsArticle2 != false)
                return false;
            
            if (IsArticle3 != false)
                return false;
            
            if (IsArticle5 != false)
                return false;
            
            if (IsArticle6 != false)
                return false;
            
            if (IsArticle7 != false)
                return false;
            
            if (IsArticle8 != false)
                return false;
            
            return true; 
        }
    }

    public partial class F5500_ActualOwner
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Person != null && !Person.IsEmpty())
                return false; 
            
            if (Address != null && !Address.IsEmpty())
                return false; 
            
            if (!string.IsNullOrEmpty(OwnedRights))
                return false; 
            
            if (CountryOfResidence != null && !CountryOfResidence.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F550_ActualOwners
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (ActualOwnersList != null && ActualOwnersList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F550a_ContactPerson550a
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Person != null && !Person.IsEmpty())
                return false; 
            
            if (Address != null && !Address.IsEmpty())
                return false; 
            
            if (PermanentAddress != null && !PermanentAddress.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F551_EraseActualOwner
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Cheked != false)
                return false;
            
            if (!string.IsNullOrEmpty(Text))
                return false; 
            
            return true; 
        }
    }

    public partial class F600_TransferringTypeOfTradeEnterprise
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Fulltransfer != false)
                return false;
            
            if (Partialtransfer != false)
                return false;
            
            if (Taketransfer != false)
                return false;
            
            if (!string.IsNullOrEmpty(FullTransferText))
                return false; 
            
            if (!string.IsNullOrEmpty(PartialTransferText))
                return false; 
            
            if (!string.IsNullOrEmpty(TakeTransferText))
                return false; 
            
            return true; 
        }
    }

    public partial class F601_TransferringEnterprise
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Subject != null && !Subject.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F6020_AcquisitionEnterprise
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Subject != null && !Subject.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F602_AcquisitionEnterprises
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (AcquisitionEnterpriseList != null && AcquisitionEnterpriseList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F701_FormOfTransforming701
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Influx != false)
                return false;
            
            if (Fusion != false)
                return false;
            
            if (Division != false)
                return false;
            
            if (Separation != false)
                return false;
            
            if (ChangeLegalForm != false)
                return false;
            
            if (TransferringProperty != false)
                return false;
            
            if (ConversionOfBulgarianEuropeanCompanyIntoBulgarianPLC != false)
                return false;
            
            if (ConversionOfBulgarianPLCIntoBulgarianEuropeanCompany != false)
                return false;
            
            if (!string.IsNullOrEmpty(InfluxText))
                return false; 
            
            if (!string.IsNullOrEmpty(FusionText))
                return false; 
            
            if (!string.IsNullOrEmpty(DivisionText))
                return false; 
            
            if (!string.IsNullOrEmpty(SeparationText))
                return false; 
            
            if (!string.IsNullOrEmpty(ChangeLegalFormText))
                return false; 
            
            if (!string.IsNullOrEmpty(TransferringPropertyText))
                return false; 
            
            if (!string.IsNullOrEmpty(ConversionOfBulgarianEuropeanCompanyIntoBulgarianPLCText))
                return false; 
            
            if (!string.IsNullOrEmpty(ConversionOfBulgarianPLCIntoBulgarianEuropeanCompanyText))
                return false; 
            
            return true; 
        }
    }

    public partial class F7020_TransformingCompany
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Subject != null && !Subject.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F702_TransformingCompanys
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (TransformingCompanyList != null && TransformingCompanyList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F702a0_TransformingCompany2
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Subject != null && !Subject.IsEmpty())
                return false; 
            
            if (Address != null && !Address.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F702a_TransformingCompanys2
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (TransformingCompany2List != null && TransformingCompany2List.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F702b0_TransformingNPO
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Subject != null && !Subject.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F702b_TransformingNPOs
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (TransformingNPOList != null && TransformingNPOList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F7030_Successor
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Subject != null && !Subject.IsEmpty())
                return false; 
            
            if (!string.IsNullOrEmpty(LegalForm))
                return false; 
            
            return true; 
        }
    }

    public partial class F703_Successors
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (SuccessorList != null && SuccessorList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F7040_Branch704Subject
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (BranchSubject != null && !BranchSubject.IsEmpty())
                return false; 
            
            if (Branches != null && Branches.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F704_Branches704
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (BranchList != null && BranchList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F705_StoppingEntry
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(IncomingNumber))
                return false; 
            
            if (!string.IsNullOrEmpty(JudicialCode))
                return false; 
            
            if (!string.IsNullOrEmpty(AppType))
                return false; 
            
            if (TransformingCompanies != null && TransformingCompanies.Count > 0)
                return false; 
            
            if (Successors != null && Successors.Count > 0)
                return false; 
            
            if (HasTransformation != false)
                return false;
            
            return true; 
        }
    }

    public partial class F706_NumberApplication
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(IncomingNumber))
                return false; 
            
            if (Date.HasValue)
                return false;
            
            if (!string.IsNullOrEmpty(FromDate))
                return false; 
            
            if (!string.IsNullOrEmpty(CourtCode))
                return false; 
            
            return true; 
        }
    }

    public partial class F801_FormOfTransforming801
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Influx != false)
                return false;
            
            if (Fusion != false)
                return false;
            
            if (Division != false)
                return false;
            
            if (Separation != false)
                return false;
            
            if (!string.IsNullOrEmpty(InfluxText))
                return false; 
            
            if (!string.IsNullOrEmpty(FusionText))
                return false; 
            
            if (!string.IsNullOrEmpty(DivisionText))
                return false; 
            
            if (!string.IsNullOrEmpty(SeparationText))
                return false; 
            
            return true; 
        }
    }

    public partial class F801a_FormOfTransforming801a
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Influx801a != false)
                return false;
            
            if (Fusion801a != false)
                return false;
            
            if (ConversionToCoop != false)
                return false;
            
            if (ConversionToEUCoop != false)
                return false;
            
            if (!string.IsNullOrEmpty(Influx801aText))
                return false; 
            
            if (!string.IsNullOrEmpty(Fusion801aText))
                return false; 
            
            if (!string.IsNullOrEmpty(ConversionToCoopText))
                return false; 
            
            if (!string.IsNullOrEmpty(ConversionToEUCoopText))
                return false; 
            
            return true; 
        }
    }

    public partial class F8020_CoOperative
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Subject != null && !Subject.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F802_ReorganizeCoOperatives
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (CoOperativeList != null && CoOperativeList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F802a0_CoOperative2
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Subject != null && !Subject.IsEmpty())
                return false; 
            
            if (Address != null && !Address.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F802a_ReorganizeCoOperatives2
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (CoOperative2List != null && CoOperative2List.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F8030_Successor803
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(LegalForm))
                return false; 
            
            if (Subject != null && !Subject.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F803_Successors803
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (SuccessorList != null && SuccessorList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F8040_ReorgBranch
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (BranchSubject != null && !BranchSubject.IsEmpty())
                return false; 
            
            if (Branches != null && Branches.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F804_ReorgBranches
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (BranchList != null && BranchList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F8500_StabilizationOpenProccedings
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (StabilizationOpenProccedingFirstInstance != null && !StabilizationOpenProccedingFirstInstance.IsEmpty())
                return false; 
            
            if (StabilizationOpenProccedingSecondInstance != null && !StabilizationOpenProccedingSecondInstance.IsEmpty())
                return false; 
            
            if (StabilizationOpenProccedingThirdInstance != null && !StabilizationOpenProccedingThirdInstance.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F8510_StabilizationAdoptionOfPrecautionaryMeasures
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (StabilizationAdoptionOfPrecautionaryMeasuresFirstInstance != null && !StabilizationAdoptionOfPrecautionaryMeasuresFirstInstance.IsEmpty())
                return false; 
            
            if (StabilizationAdoptionOfPrecautionaryMeasuresSecondInstance != null && !StabilizationAdoptionOfPrecautionaryMeasuresSecondInstance.IsEmpty())
                return false; 
            
            if (StabilizationAdoptionOfPrecautionaryMeasuresThirdInstance != null && !StabilizationAdoptionOfPrecautionaryMeasuresThirdInstance.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F85101_StabilizationAdoptionOfPrecautionaryMeasuresFirstInstance
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Description))
                return false; 
            
            if (!string.IsNullOrEmpty(DistraintText))
                return false; 
            
            if (!string.IsNullOrEmpty(ForeclosureText))
                return false; 
            
            if (!string.IsNullOrEmpty(OtherText))
                return false; 
            
            if (!string.IsNullOrEmpty(Title))
                return false; 
            
            if (IsVisible != false)
                return false;
            
            if (!string.IsNullOrEmpty(Visible))
                return false; 
            
            return true; 
        }
    }

    public partial class F85102_StabilizationAdoptionOfPrecautionaryMeasuresSecondInstance
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Description))
                return false; 
            
            if (!string.IsNullOrEmpty(DistraintText))
                return false; 
            
            if (!string.IsNullOrEmpty(ForeclosureText))
                return false; 
            
            if (!string.IsNullOrEmpty(OtherText))
                return false; 
            
            if (!string.IsNullOrEmpty(Title))
                return false; 
            
            if (IsVisible != false)
                return false;
            
            if (!string.IsNullOrEmpty(Visible))
                return false; 
            
            return true; 
        }
    }

    public partial class F85103_StabilizationAdoptionOfPrecautionaryMeasuresThirdInstance
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Description))
                return false; 
            
            if (!string.IsNullOrEmpty(DistraintText))
                return false; 
            
            if (!string.IsNullOrEmpty(ForeclosureText))
                return false; 
            
            if (!string.IsNullOrEmpty(OtherText))
                return false; 
            
            if (!string.IsNullOrEmpty(Title))
                return false; 
            
            if (IsVisible != false)
                return false;
            
            if (!string.IsNullOrEmpty(Visible))
                return false; 
            
            return true; 
        }
    }

    public partial class F8520_StabilizatioLimitingTheDebtorsAuthority
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (StabilizationLimitingTheDebtorsAuthorityFirstInstance != null && !StabilizationLimitingTheDebtorsAuthorityFirstInstance.IsEmpty())
                return false; 
            
            if (StabilizationLimitingTheDebtorsAuthoritySecondInstance != null && !StabilizationLimitingTheDebtorsAuthoritySecondInstance.IsEmpty())
                return false; 
            
            if (StabilizationLimitingTheDebtorsAuthorityThirdInstance != null && !StabilizationLimitingTheDebtorsAuthorityThirdInstance.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F85201_StabilizationLimitingTheDebtorsAuthorityFirstInstance
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(TheActivityContinuesUnderTheSupervisionOfTheTrusteeText))
                return false; 
            
            if (!string.IsNullOrEmpty(TheTraderIsDeprivedOfAuthorityText))
                return false; 
            
            if (!string.IsNullOrEmpty(TheFulfillmentOfTheObligationToTheTraderIsAcceptedByTheTrusteeText))
                return false; 
            
            if (!string.IsNullOrEmpty(TheExecutionOfMonetaryObligationsIsCarriedOutWithTheConsentOfTheTrusteeText))
                return false; 
            
            if (!string.IsNullOrEmpty(Title))
                return false; 
            
            if (IsVisible != false)
                return false;
            
            if (!string.IsNullOrEmpty(Visible))
                return false; 
            
            return true; 
        }
    }

    public partial class F85202_StabilizationLimitingTheDebtorsAuthoritySecondInstance
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(TheActivityContinuesUnderTheSupervisionOfTheTrusteeText))
                return false; 
            
            if (!string.IsNullOrEmpty(TheTraderIsDeprivedOfAuthorityText))
                return false; 
            
            if (!string.IsNullOrEmpty(TheFulfillmentOfTheObligationToTheTraderIsAcceptedByTheTrusteeText))
                return false; 
            
            if (!string.IsNullOrEmpty(TheExecutionOfMonetaryObligationsIsCarriedOutWithTheConsentOfTheTrusteeText))
                return false; 
            
            if (!string.IsNullOrEmpty(Title))
                return false; 
            
            if (IsVisible != false)
                return false;
            
            if (!string.IsNullOrEmpty(Visible))
                return false; 
            
            return true; 
        }
    }

    public partial class F85203_StabilizationLimitingTheDebtorsAuthorityThirdInstance
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(TheActivityContinuesUnderTheSupervisionOfTheTrusteeText))
                return false; 
            
            if (!string.IsNullOrEmpty(TheTraderIsDeprivedOfAuthorityText))
                return false; 
            
            if (!string.IsNullOrEmpty(TheFulfillmentOfTheObligationToTheTraderIsAcceptedByTheTrusteeText))
                return false; 
            
            if (!string.IsNullOrEmpty(TheExecutionOfMonetaryObligationsIsCarriedOutWithTheConsentOfTheTrusteeText))
                return false; 
            
            if (!string.IsNullOrEmpty(Title))
                return false; 
            
            if (IsVisible != false)
                return false;
            
            if (!string.IsNullOrEmpty(Visible))
                return false; 
            
            return true; 
        }
    }

    public partial class F8530_StabilizationSuspendProceeding
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (StabilizationSuspendProceedingFirstInstance != null && !StabilizationSuspendProceedingFirstInstance.IsEmpty())
                return false; 
            
            if (StabilizationSuspendProceedingSecondInstance != null && !StabilizationSuspendProceedingSecondInstance.IsEmpty())
                return false; 
            
            if (StabilizationSuspendProceedingThirdInstance != null && !StabilizationSuspendProceedingThirdInstance.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public partial class F85301_StabilizationSuspendProceedingFirstInstance
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Title))
                return false; 
            
            if (IsVisible != false)
                return false;
            
            if (!string.IsNullOrEmpty(Visible))
                return false; 
            
            return true; 
        }
    }

    public partial class F85302_StabilizationSuspendProceedingSecondInstance
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Title))
                return false; 
            
            if (IsVisible != false)
                return false;
            
            if (!string.IsNullOrEmpty(Visible))
                return false; 
            
            return true; 
        }
    }

    public partial class F85303_StabilizationSuspendProceedingThirdInstance
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Title))
                return false; 
            
            if (IsVisible != false)
                return false;
            
            if (!string.IsNullOrEmpty(Visible))
                return false; 
            
            return true; 
        }
    }

    public partial class F8550_StabilizationDottedPersons
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (StabilizationDottedPersonList != null && StabilizationDottedPersonList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F85500_StabilizationDottedPerson
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(FirstInstanceText))
                return false; 
            
            if (!string.IsNullOrEmpty(SeconfInstanceText))
                return false; 
            
            if (!string.IsNullOrEmpty(ThirdInstanceText))
                return false; 
            
            return true; 
        }
    }

    public partial class F8560_StabilizationInspectors
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (StabilizationInspectorList != null && StabilizationInspectorList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F85600_StabilizationInspector
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(FirstInstanceText))
                return false; 
            
            if (!string.IsNullOrEmpty(SeconfInstanceText))
                return false; 
            
            if (!string.IsNullOrEmpty(ThirdInstanceText))
                return false; 
            
            return true; 
        }
    }

    public partial class F8570_StabilizationSupervisorBody
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (StabilizationSupervisorBodyPersonList != null && StabilizationSupervisorBodyPersonList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F85700_StabilizationSupervisorBodyPerson
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(FirstInstanceText))
                return false; 
            
            if (!string.IsNullOrEmpty(SeconfInstanceText))
                return false; 
            
            if (!string.IsNullOrEmpty(ThirdInstanceText))
                return false; 
            
            return true; 
        }
    }

    public partial class F901_2_OpenProccedingsSecIns
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Visible))
                return false; 
            
            if (RuleCheckBox != false)
                return false;
            
            return true; 
        }
    }

    public partial class F901_3_OpenProccedingsThirdIns
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Visible))
                return false; 
            
            if (RuleCheckBox != false)
                return false;
            
            return true; 
        }
    }

    public partial class F901_OpenProccedings
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Visible))
                return false; 
            
            return true; 
        }
    }

    public partial class F902_2_InsolvencyDataSecIns
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Visible))
                return false; 
            
            if (!string.IsNullOrEmpty(Date))
                return false; 
            
            return true; 
        }
    }

    public partial class F902_3_InsolvencyDataThirdIns
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Visible))
                return false; 
            
            if (!string.IsNullOrEmpty(Date))
                return false; 
            
            return true; 
        }
    }

    public partial class F902_InsolvencyData
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Visible))
                return false; 
            
            if (!string.IsNullOrEmpty(Date))
                return false; 
            
            return true; 
        }
    }

    public partial class F902_InsolvencyDate
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class F903_2_DebtorBodiesSecIns
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Visible))
                return false; 
            
            return true; 
        }
    }

    public partial class F903_3_DebtorBodiesThirdIns
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Visible))
                return false; 
            
            return true; 
        }
    }

    public partial class F903_DebtorBodies
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Visible))
                return false; 
            
            return true; 
        }
    }

    public partial class F904_2_HoldProceedingsSecIns
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Visible))
                return false; 
            
            return true; 
        }
    }

    public partial class F904_3_HoldProceedingsThirdIns
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Visible))
                return false; 
            
            return true; 
        }
    }

    public partial class F904_HoldProceedings
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Visible))
                return false; 
            
            return true; 
        }
    }

    public partial class F905_2_ReOpenProceedingsSecIns
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Visible))
                return false; 
            
            return true; 
        }
    }

    public partial class F905_3_ReOpenProceedingsThirdIns
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Visible))
                return false; 
            
            return true; 
        }
    }

    public partial class F905_ReOpenProceedings
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Visible))
                return false; 
            
            return true; 
        }
    }

    public partial class F906_2_SuspendProceedingsSecIns
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Visible))
                return false; 
            
            if (SuspendReson != null)
                return false; 
            
            return true; 
        }
    }

    public partial class F906_3_SuspendProceedingsThirdIns
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Visible))
                return false; 
            
            if (SuspendReson != null)
                return false; 
            
            return true; 
        }
    }

    public partial class F906_SuspendProceedings
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Visible))
                return false; 
            
            if (SuspendReson != null)
                return false; 
            
            return true; 
        }
    }

    public partial class F906a_2_TraverseOfRecoverPlanSecIns
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Visible))
                return false; 
            
            return true; 
        }
    }

    public partial class F906a_3_TraverseOfRecoverPlanThirdIns
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Visible))
                return false; 
            
            return true; 
        }
    }

    public partial class F906a_TraverseOfRecoverPlan
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Visible))
                return false; 
            
            return true; 
        }
    }

    public partial class F907_2_RestrictDebtorOrderPowerSecIns
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Visible))
                return false; 
            
            return true; 
        }
    }

    public partial class F907_3_RestrictDebtorOrderPowerThirdIns
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Visible))
                return false; 
            
            return true; 
        }
    }

    public partial class F907_RestrictDebtorOrderPower
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Visible))
                return false; 
            
            return true; 
        }
    }

    public partial class F908_2_GeneralSeizureSecIns
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Visible))
                return false; 
            
            return true; 
        }
    }

    public partial class F908_3_GeneralSeizureThirdIns
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Visible))
                return false; 
            
            return true; 
        }
    }

    public partial class F908_GeneralSeizure
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Visible))
                return false; 
            
            return true; 
        }
    }

    public partial class F909_2_CashInSecIns
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Visible))
                return false; 
            
            return true; 
        }
    }

    public partial class F909_3_CashInThirdIns
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Visible))
                return false; 
            
            return true; 
        }
    }

    public partial class F909_CashIn
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Visible))
                return false; 
            
            return true; 
        }
    }

    public partial class F910_2_DeclareBankruptSecIns
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Visible))
                return false; 
            
            return true; 
        }
    }

    public partial class F910_3_DeclareBankruptThirdIns
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Visible))
                return false; 
            
            return true; 
        }
    }

    public partial class F910_DeclareBankrupt
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Visible))
                return false; 
            
            return true; 
        }
    }

    public partial class F9110_2_ReinstatementSecIns
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Petitioner != null && !Petitioner.IsEmpty())
                return false; 
            
            if (SenderType != null)
                return false; 
            
            return true; 
        }
    }

    public partial class F911_2_ReinstatementsSecIns
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (ReinstatementSecInsList != null && ReinstatementSecInsList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F9110_3_ReinstatementThirdIns
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Petitioner != null && !Petitioner.IsEmpty())
                return false; 
            
            if (SenderType != null)
                return false; 
            
            return true; 
        }
    }

    public partial class F911_3_ReinstatementsThirdIns
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (ReinstatementThirdInsList != null && ReinstatementThirdInsList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F9110_Reinstatement
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Petitioner != null && !Petitioner.IsEmpty())
                return false; 
            
            if (SenderType != null)
                return false; 
            
            return true; 
        }
    }

    public partial class F911_Reinstatements
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (ReinstatementsList != null && ReinstatementsList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F911a0_2_ReinstatementDisallowPetitionSecIns
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Petitioner != null && !Petitioner.IsEmpty())
                return false; 
            
            if (SenderType != null)
                return false; 
            
            if (InscribedAct != false)
                return false;
            
            return true; 
        }
    }

    public partial class F911a_2_ReinstatementsDisallowPetitionSecIns
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (ReinstatementDisallowPetitionSecInsList != null && ReinstatementDisallowPetitionSecInsList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F911a0_3_ReinstatementDisallowPetitionThirdIns
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Petitioner != null && !Petitioner.IsEmpty())
                return false; 
            
            if (SenderType != null)
                return false; 
            
            if (InscribedAct != false)
                return false;
            
            return true; 
        }
    }

    public partial class F911a_3_ReinstatementsDisallowPetitionThirdIns
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (ReinstatementDisallowPetitionThirdInsList != null && ReinstatementDisallowPetitionThirdInsList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F911a0_ReinstatementDisallowPetition
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Petitioner != null && !Petitioner.IsEmpty())
                return false; 
            
            if (SenderType != null)
                return false; 
            
            if (InscribedAct != false)
                return false;
            
            return true; 
        }
    }

    public partial class F911a_ReinstatementsDisallowPetition
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (ReinstatementDisallowPetitionList != null && ReinstatementDisallowPetitionList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F9120_2_TrusteeSecIns
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Person != null && !Person.IsEmpty())
                return false; 
            
            if (Address != null && !Address.IsEmpty())
                return false; 
            
            if (Contacts != null && !Contacts.IsEmpty())
                return false; 
            
            if (Status != null)
                return false; 
            
            if (ActData != null && !ActData.IsEmpty())
                return false; 
            
            if (!string.IsNullOrEmpty(InductionDate))
                return false; 
            
            if (!string.IsNullOrEmpty(AcquittanseDate))
                return false; 
            
            if (WarrantyFund != false)
                return false;
            
            if (!string.IsNullOrEmpty(WarrantyFundText))
                return false; 
            
            return true; 
        }
    }

    public partial class F912_2_TrusteesSecIns
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (TrusteeSecInsList != null && TrusteeSecInsList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F9120_3_TrusteeThirdIns
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Person != null && !Person.IsEmpty())
                return false; 
            
            if (Address != null && !Address.IsEmpty())
                return false; 
            
            if (Contacts != null && !Contacts.IsEmpty())
                return false; 
            
            if (Status != null)
                return false; 
            
            if (ActData != null && !ActData.IsEmpty())
                return false; 
            
            if (!string.IsNullOrEmpty(InductionDate))
                return false; 
            
            if (!string.IsNullOrEmpty(AcquittanseDate))
                return false; 
            
            if (WarrantyFund != false)
                return false;
            
            if (!string.IsNullOrEmpty(WarrantyFundText))
                return false; 
            
            return true; 
        }
    }

    public partial class F912_3_TrusteesThirdIns
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (TrusteeThirdInsList != null && TrusteeThirdInsList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F9120_Trustee
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Person != null && !Person.IsEmpty())
                return false; 
            
            if (Address != null && !Address.IsEmpty())
                return false; 
            
            if (Contacts != null && !Contacts.IsEmpty())
                return false; 
            
            if (Status != null)
                return false; 
            
            if (ActData != null && !ActData.IsEmpty())
                return false; 
            
            if (!string.IsNullOrEmpty(InductionDate))
                return false; 
            
            if (!string.IsNullOrEmpty(AcquittanseDate))
                return false; 
            
            if (WarrantyFund != false)
                return false;
            
            if (!string.IsNullOrEmpty(WarrantyFundText))
                return false; 
            
            return true; 
        }
    }

    public partial class F912_Trustees
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (TrusteeList != null && TrusteeList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F9150_2_SupervisionBodyMemberFullSecIns
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Person != null && !Person.IsEmpty())
                return false; 
            
            if (Address != null && !Address.IsEmpty())
                return false; 
            
            if (Contacts != null && !Contacts.IsEmpty())
                return false; 
            
            if (ActData != null && !ActData.IsEmpty())
                return false; 
            
            if (!string.IsNullOrEmpty(InductionDate))
                return false; 
            
            if (!string.IsNullOrEmpty(AcquittanseDate))
                return false; 
            
            if (!string.IsNullOrEmpty(EntryType))
                return false; 
            
            return true; 
        }
    }

    public partial class F915_2_SupervisionBodyFullSecIns
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (SupervisionBodyMemberFullSecInsList != null && SupervisionBodyMemberFullSecInsList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F9150_3_SupervisionBodyMemberFullThirdIns
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Person != null && !Person.IsEmpty())
                return false; 
            
            if (Address != null && !Address.IsEmpty())
                return false; 
            
            if (Contacts != null && !Contacts.IsEmpty())
                return false; 
            
            if (ActData != null && !ActData.IsEmpty())
                return false; 
            
            if (!string.IsNullOrEmpty(InductionDate))
                return false; 
            
            if (!string.IsNullOrEmpty(AcquittanseDate))
                return false; 
            
            if (!string.IsNullOrEmpty(EntryType))
                return false; 
            
            return true; 
        }
    }

    public partial class F915_3_SupervisionBodyFullThirdIns
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (SupervisionBodyMemberFullThirdInsList != null && SupervisionBodyMemberFullThirdInsList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F9150_SupervisionBodyMember
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Person != null && !Person.IsEmpty())
                return false; 
            
            if (Address != null && !Address.IsEmpty())
                return false; 
            
            if (Contacts != null && !Contacts.IsEmpty())
                return false; 
            
            if (ActData != null && !ActData.IsEmpty())
                return false; 
            
            if (!string.IsNullOrEmpty(InductionDate))
                return false; 
            
            if (!string.IsNullOrEmpty(AcquittanseDate))
                return false; 
            
            return true; 
        }
    }

    public partial class F915_SupervisionBody
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (SupervisionBodyMemberList != null && SupervisionBodyMemberList.Count > 0)
                return false; 
            
            return true; 
        }
    }

    public partial class F9150_SupervisionBodyMemberFull
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Person != null && !Person.IsEmpty())
                return false; 
            
            if (Address != null && !Address.IsEmpty())
                return false; 
            
            if (Contacts != null && !Contacts.IsEmpty())
                return false; 
            
            if (ActData != null && !ActData.IsEmpty())
                return false; 
            
            if (!string.IsNullOrEmpty(InductionDate))
                return false; 
            
            if (!string.IsNullOrEmpty(AcquittanseDate))
                return false; 
            
            if (!string.IsNullOrEmpty(EntryType))
                return false; 
            
            return true; 
        }
    }

    public partial class F915_SupervisionBodyFull
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (SupervisionBodyMemberFullList != null && SupervisionBodyMemberFullList.Count > 0)
                return false; 
            
            return true; 
        }
    }

}

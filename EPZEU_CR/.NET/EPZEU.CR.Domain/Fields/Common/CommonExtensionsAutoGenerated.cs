
// Auto Generated Object

namespace EPZEU.CR.Domain.Fields.Common
{




    public abstract partial class ActivityNKIDField
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(CodeNkid))
                return false; 
            
            if (!string.IsNullOrEmpty(TextNkid))
                return false; 
            
            if (!string.IsNullOrEmpty(IDNkid))
                return false; 
            
            return true; 
        }
    }

    public partial class Address
    {
        public virtual bool IsEmpty()
        {
            if (CountryID.HasValue)
                return false;
            
            if (!string.IsNullOrEmpty(CountryCode))
                return false; 
            
            if (!string.IsNullOrEmpty(Country))
                return false;

            //TRIR-5120
            //if (IsForeign.HasValue)
            //    return false;

            if (DistrictID.HasValue)
                return false;
            
            if (!string.IsNullOrEmpty(DistrictEkatte))
                return false; 
            
            if (!string.IsNullOrEmpty(District))
                return false; 
            
            if (Municipalityid.HasValue)
                return false;
            
            if (!string.IsNullOrEmpty(MunicipalityEkatte))
                return false; 
            
            if (!string.IsNullOrEmpty(Municipality))
                return false; 
            
            if (SettlementID.HasValue)
                return false;
            
            if (!string.IsNullOrEmpty(SettlementEKATTE))
                return false; 
            
            if (!string.IsNullOrEmpty(Settlement))
                return false; 
            
            if (AreaID.HasValue)
                return false;
            
            if (!string.IsNullOrEmpty(Area))
                return false; 
            
            if (!string.IsNullOrEmpty(AreaEkatte))
                return false; 
            
            if (!string.IsNullOrEmpty(PostCode))
                return false; 
            
            if (!string.IsNullOrEmpty(ForeignPlace))
                return false; 
            
            if (!string.IsNullOrEmpty(HousingEstate))
                return false; 
            
            if (!string.IsNullOrEmpty(Street))
                return false; 
            
            if (!string.IsNullOrEmpty(StreetNumber))
                return false; 
            
            if (!string.IsNullOrEmpty(Block))
                return false; 
            
            if (!string.IsNullOrEmpty(Entrance))
                return false; 
            
            if (!string.IsNullOrEmpty(Floor))
                return false; 
            
            if (!string.IsNullOrEmpty(Apartment))
                return false; 
            
            return true; 
        }
    }

    public partial class BankruptcyAct
    {
        public virtual bool IsEmpty()
        {
            if (!string.IsNullOrEmpty(ActSeqID))
                return false; 
            
            if (!string.IsNullOrEmpty(CourtSeqID))
                return false; 
            
            if (!string.IsNullOrEmpty(CaseSeqID))
                return false; 
            
            if (!string.IsNullOrEmpty(CaseNumber))
                return false; 
            
            if (!string.IsNullOrEmpty(CaseYear))
                return false; 
            
            if (!string.IsNullOrEmpty(ActDate))
                return false; 
            
            if (!string.IsNullOrEmpty(ActNumber))
                return false; 
            
            if (Type != null)
                return false; 
            
            if (BankruptcyCourt != null)
                return false; 
            
            if (Merit != null)
                return false; 
            
            if (Execution != null && !Execution.IsEmpty())
                return false; 
            
            if (ProclaimMetod != null && !ProclaimMetod.IsEmpty())
                return false; 
            
            if (ComplaintTerm.HasValue)
                return false;
            
            return true; 
        }
    }

    public partial class BankruptcyExecution
    {
        public virtual bool IsEmpty()
        {
            if (ImmediateExecution != false)
                return false;
            
            if (EffectiveDate.HasValue)
                return false;
            
            return true; 
        }
    }

    public partial class BankruptcyProClaim
    {
        public virtual bool IsEmpty()
        {
            if (ID != 0)
                return false;
            
            if (!string.IsNullOrEmpty(Name))
                return false; 
            
            return true; 
        }
    }

    public abstract partial class BankruptcyRecord
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Title))
                return false; 
            
            if (ActData != null && !ActData.IsEmpty())
                return false; 
            
            return true; 
        }
    }

    public abstract partial class BankruptcyRecordField
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(Title))
                return false; 
            
            if (IsVisible != false)
                return false;
            
            if (ActData != null && !ActData.IsEmpty())
                return false; 
            
            return true; 
        }
    }


    public partial class BirthPlace
    {
        public virtual bool IsEmpty()
        {
            if (!string.IsNullOrEmpty(Country))
                return false; 
            
            if (!string.IsNullOrEmpty(Place))
                return false; 
            
            return true; 
        }
    }

    public partial class Branch
    {
        public virtual bool IsEmpty()
        {
            if (!string.IsNullOrEmpty(FirmName))
                return false; 
            
            if (!string.IsNullOrEmpty(BranchCode))
                return false; 
            
            return true; 
        }
    }

    public partial class BulstatDeed
    {
        public virtual bool IsEmpty()
        {
            if (!string.IsNullOrEmpty(Deed))
                return false; 
            
            if (!string.IsNullOrEmpty(Year))
                return false; 
            
            if (!string.IsNullOrEmpty(CourtCode))
                return false; 
            
            return true; 
        }
    }

    public abstract partial class CheckRecordField
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

    public partial class Contacts
    {
        public virtual bool IsEmpty()
        {
            if (!string.IsNullOrEmpty(Phone))
                return false; 
            
            if (!string.IsNullOrEmpty(Fax))
                return false; 
            
            if (!string.IsNullOrEmpty(EMail))
                return false; 
            
            if (!string.IsNullOrEmpty(URL))
                return false; 
            
            return true; 
        }
    }

    public partial class Deputy
    {
        public virtual bool IsEmpty()
        {
            if (!string.IsNullOrEmpty(Source))
                return false; 
            
            if (!string.IsNullOrEmpty(SourceDate))
                return false; 
            
            return true; 
        }
    }

    public partial class ForeignAuthority
    {
        public virtual bool IsEmpty()
        {
            if (!string.IsNullOrEmpty(CompetentAuthorityForRegistration))
                return false; 
            
            if (!string.IsNullOrEmpty(RegistrationNumber))
                return false; 
            
            return true; 
        }
    }

    public partial class ForeignCompanyBaseData
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (!string.IsNullOrEmpty(CompanyName))
                return false; 
            
            return true; 
        }
    }

    public abstract partial class Mandate
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            if (Date.HasValue)
                return false;
            
            if (!string.IsNullOrEmpty(MandateTypeText))
                return false; 
            
            if (!string.IsNullOrEmpty(Text))
                return false; 
            
            return true; 
        }
    }



    public abstract partial class TextRecordField
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

    public abstract partial class MannerRecordHolder
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
            
            if (!string.IsNullOrEmpty(JointlyText))
                return false; 
            
            if (!string.IsNullOrEmpty(SeverallyText))
                return false; 
            
            if (!string.IsNullOrEmpty(OtherWayText))
                return false; 
            
            return true; 
        }
    }

    public partial class OutgoingNumber
    {
        public virtual bool IsEmpty()
        {
            if (!string.IsNullOrEmpty(IncomingNumber))
                return false; 
            
            if (OutgoingDate.HasValue)
                return false;
            
            if (DocNumber.HasValue)
                return false;
            
            if (!string.IsNullOrEmpty(FullOutgoingNumber))
                return false; 
            
            return true; 
        }
    }

    public partial class Passport
    {
        public virtual bool IsEmpty()
        {
            if (IssuedDate.HasValue)
                return false;
            
            if (!string.IsNullOrEmpty(Number))
                return false; 
            
            if (!string.IsNullOrEmpty(IssueDate))
                return false; 
            
            if (!string.IsNullOrEmpty(IssuedFrom))
                return false; 
            
            return true; 
        }
    }

    public partial class Person
    {
        public virtual bool IsEmpty()
        {
            if (!string.IsNullOrEmpty(Indent))
                return false; 
            
            if (!string.IsNullOrEmpty(Name))
                return false; 
            
            if (IndentType != 0)
                return false;
            
            if (CountryID.HasValue)
                return false;
            
            if (!string.IsNullOrEmpty(CountryName))
                return false; 
            
            if (!string.IsNullOrEmpty(XsiType))
                return false; 
            
            if (!string.IsNullOrEmpty(CompetentAuthorityForRegistration))
                return false; 
            
            if (!string.IsNullOrEmpty(RegistrationNumber))
                return false; 
            
            if (!string.IsNullOrEmpty(ForeignRegisterCode))
                return false; 
            
            if (!string.IsNullOrEmpty(ForeignLegalFormCode))
                return false; 
            
            if (!string.IsNullOrEmpty(CountryCode))
                return false; 
            
            if (!string.IsNullOrEmpty(CountryCodeBRIS))
                return false; 
            
            if (!string.IsNullOrEmpty(LegalForm))
                return false; 
            
            if (!string.IsNullOrEmpty(Position))
                return false; 
            
            if (IsForeignTrader.HasValue)
                return false;
            
            if (!string.IsNullOrEmpty(NameAndLegalFormText))
                return false; 
            
            if (!string.IsNullOrEmpty(IsForeignTraderText))
                return false; 
            
            if (Type != 0)
                return false;
            
            return true; 
        }
    }

    public partial class Subject
    {
        public override bool IsEmpty()
        {
            if (!base.IsEmpty())
                return false;              
            
            return true; 
        }
    }

    public partial class Price
    {
        public virtual bool IsEmpty()
        {
            if (!string.IsNullOrEmpty(Amount))
                return false; 
            
            if (!string.IsNullOrEmpty(Units))
                return false; 
            
            return true; 
        }
    }

    public abstract partial class SeatRecordField
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
}

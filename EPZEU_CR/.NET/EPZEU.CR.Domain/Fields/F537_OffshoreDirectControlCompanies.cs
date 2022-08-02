using EPZEU.CR.Domain.Fields.Common;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "OffshoreDirectControlCompanies", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "OffshoreDirectControlCompanies", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F537_OffshoreDirectControlCompanies : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "05370";

        [XmlElement(ElementName = "OffshoreDirectControlCompany")]
        public F5370_OffshoreDirectControlCompany OffshoreDirectControlCompany { get; set; }

        [XmlElement(ElementName = "OffshoreDirectControlCompanyLegalForm")]
        public F53702_OffshoreDirectControlCompanyLegalForm OffshoreDirectControlCompanyLegalForm { get; set; }

        [XmlElement(ElementName = "OffshoreDirectControlCompanyTransliteration")]
        public F53703_OffshoreDirectControlCompanyTransliteration OffshoreDirectControlCompanyTransliteration { get; set; }

        [XmlElement(ElementName = "OffshoreDirectControlCompanyNumberInRegister")]
        public F53704_OffshoreDirectControlCompanyNumberInRegister OffshoreDirectControlCompanyNumberInRegister { get; set; }

        [XmlElement(ElementName = "OffshoreDirectControlCompanyAddress")]
        public F53705_OffshoreDirectControlCompanyAddress OffshoreDirectControlCompanyAddress { get; set; }

        [XmlElement(ElementName = "OffshoreDirectControlCompanyWayOfRepresentation")]
        public F53707_OffshoreDirectControlCompanyWayOfRepresentation OffshoreDirectControlCompanyWayOfRepresentation { get; set; }
    }
    
    [XmlType(TypeName = "OffshoreDirectControlCompany", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "OffshoreDirectControlCompany", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F5370_OffshoreDirectControlCompany : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "053700";

        public string Name { get; set; }
    }

    [XmlType(TypeName = "OffshoreDirectControlCompanyLegalForm", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "OffshoreDirectControlCompanyLegalForm", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F53702_OffshoreDirectControlCompanyLegalForm : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "053702";

        public string DCLegalForm { get; set; }
    }

    [XmlType(TypeName = "OffshoreDirectControlCompanyTransliteration", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "OffshoreDirectControlCompanyTransliteration", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F53703_OffshoreDirectControlCompanyTransliteration : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "053703";

        public string DCTransliteration { get; set; }
    }

    [XmlType(TypeName = "OffshoreDirectControlCompanyNumberInRegister", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "OffshoreDirectControlCompanyNumberInRegister", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F53704_OffshoreDirectControlCompanyNumberInRegister : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "053704";

        public string DCNumberInRegister { get; set; }
    }

    [XmlType(TypeName = "OffshoreDirectControlCompanyAddress", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "OffshoreDirectControlCompanyAddress", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F53705_OffshoreDirectControlCompanyAddress : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "053705";

        public Address Address { get; set; }

        public Contacts Contacts { get; set; }
    }

    [XmlType(TypeName = "OffshoreDirectControlCompanyWayOfRepresentation", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "OffshoreDirectControlCompanyWayOfRepresentation", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F53707_OffshoreDirectControlCompanyWayOfRepresentation : MannerRecordHolder
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "053707";
    }
}

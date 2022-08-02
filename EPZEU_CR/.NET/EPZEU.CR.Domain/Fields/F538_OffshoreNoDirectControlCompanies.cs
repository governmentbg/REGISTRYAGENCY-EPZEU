using EPZEU.CR.Domain.Fields.Common;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "OffshoreNoDirectControlCompanies", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "OffshoreNoDirectControlCompanies", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F538_OffshoreNoDirectControlCompanies : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "05380";

        [XmlElement(ElementName = "OffshoreNoDirectControlCompany")]
        public F5380_OffshoreNoDirectControlCompany OffshoreNoDirectControlCompany { get; set; }

        [XmlElement(ElementName = "OffshoreNoDirectControlCompanyLegalForm")]
        public F53802_OffshoreNoDirectControlCompanyLegalForm OffshoreNoDirectControlCompanyLegalForm { get; set; }

        [XmlElement(ElementName = "OffshoreNoDirectControlCompanyTransliteration")]
        public F53803_OffshoreNoDirectControlCompanyTransliteration OffshoreNoDirectControlCompanyTransliteration { get; set; }

        [XmlElement(ElementName = "OffshoreNoDirectControlCompanyNumberInRegister")]
        public F53804_OffshoreNoDirectControlCompanyNumberInRegister OffshoreNoDirectControlCompanyNumberInRegister { get; set; }

        [XmlElement(ElementName = "OffshoreNoDirectControlCompanyAddress")]
        public F53805_OffshoreNoDirectControlCompanyAddress OffshoreNoDirectControlCompanyAddress { get; set; }

        [XmlElement(ElementName = "OffshoreNoDirectControlCompanyWayOfRepresentation")]
        public F53807_OffshoreNoDirectControlCompanyWayOfRepresentation OffshoreNoDirectControlCompanyWayOfRepresentation { get; set; }
    }

    [XmlType(TypeName = "OffshoreNoDirectControlCompany", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "OffshoreNoDirectControlCompany", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F5380_OffshoreNoDirectControlCompany : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "053800";

        public string Name { get; set; }
    }

    [XmlType(TypeName = "OffshoreNoDirectControlCompanyLegalForm", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "OffshoreNoDirectControlCompanyLegalForm", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F53802_OffshoreNoDirectControlCompanyLegalForm : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "053802";

        public string NDCLegalForm { get; set; }
    }

    [XmlType(TypeName = "OffshoreNoDirectControlCompanyTransliteration", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "OffshoreNoDirectControlCompanyTransliteration", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F53803_OffshoreNoDirectControlCompanyTransliteration : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "053803";

        public string NDCTransliteration { get; set; }
    }

    [XmlType(TypeName = "OffshoreNoDirectControlCompanyNumberInRegister", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "OffshoreNoDirectControlCompanyNumberInRegister", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F53804_OffshoreNoDirectControlCompanyNumberInRegister : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "053804";

        public string NDCNumberInRegister { get; set; }
    }

    [XmlType(TypeName = "OffshoreNoDirectControlCompanyAddress", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "OffshoreNoDirectControlCompanyAddress", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F53805_OffshoreNoDirectControlCompanyAddress : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "053805";

        public Address Address { get; set; }

        public Contacts Contacts { get; set; }
    }

    [XmlType(TypeName = "OffshoreNoDirectControlCompanyWayOfRepresentation", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "OffshoreNoDirectControlCompanyWayOfRepresentation", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F53807_OffshoreNoDirectControlCompanyWayOfRepresentation : MannerRecordHolder
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "053807";
    }
}

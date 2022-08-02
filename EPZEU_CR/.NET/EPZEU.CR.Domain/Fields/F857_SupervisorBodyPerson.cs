﻿using EPZEU.CR.Domain.Fields.Common;
using System.Collections.Generic;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "StabilizationSupervisorBody", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    [XmlRoot(ElementName = "StabilizationSupervisorBody", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F8570_StabilizationSupervisorBody : CompositeField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "08570";

        [XmlElement(ElementName = "StabilizationSupervisorBodyPerson")]
        public List<F85700_StabilizationSupervisorBodyPerson> StabilizationSupervisorBodyPersonList { get; set; }

    }

    [XmlType(TypeName = "StabilizationSupervisorBodyPerson", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    [XmlRoot(ElementName = "StabilizationSupervisorBodyPerson", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F85700_StabilizationSupervisorBodyPerson : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "085700";

        public Person Person { get; set; }
        public Address Address { get; set; }
        public Contacts Contacts { get; set; }
        public BankruptcyAct ActData { get; set; }

        [XmlIgnore]
        public bool FirstInstance { get; set; }
        [XmlIgnore]
        public bool SecondInstance { get; set; }
        [XmlIgnore]
        public bool ThirdInstance { get; set; }

        [XmlAttribute("firstInstance")]
        public string FirstInstanceText
        {
            get { return FirstInstance ? "1" : "0"; }
            set { FirstInstance = (value == "1"); }
        }

        [XmlAttribute("secondInstance")]
        public string SeconfInstanceText
        {
            get { return SecondInstance ? "1" : "0"; }
            set { SecondInstance = (value == "1"); }
        }

        [XmlAttribute("thirdInstance")]
        public string ThirdInstanceText
        {
            get { return ThirdInstance ? "1" : "0"; }
            set { ThirdInstance = (value == "1"); }
        }
    }
}
﻿using EPZEU.CR.Domain.Fields.Common;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields
{
    [XmlType(TypeName = "DepozitarDistraintRemove", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
	[XmlRoot(ElementName = "DepozitarDistraintRemove", Namespace = EPZEU.CR.Domain.Common.Namespaces.FieldsNamespace)]
    public partial class F221_DepozitarDistraintRemove : RecordField
    {
        protected override string FieldIdentInternal => FieldIdentCode;

        public const string FieldIdentCode = "02210";

        public string Court { get; set; }

        public string CaseNo { get; set; }
    }
}
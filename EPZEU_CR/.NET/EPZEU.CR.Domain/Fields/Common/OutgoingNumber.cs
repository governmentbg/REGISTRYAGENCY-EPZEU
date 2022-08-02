using System;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields.Common
{
    public partial class OutgoingNumber
    {
        #region Properties

        [XmlElement("IncomingNumber")]
        public string IncomingNumber { get; set; }
    
        [XmlElement(ElementName = "OutgoingDate", IsNullable = true)]
        public DateTime? OutgoingDate { get; set; }

        [XmlElement(ElementName = "DocNumber", IsNullable = true)]
        public int? DocNumber { get; set; }

        [XmlElement(ElementName = "FullOutgoingNumber")]
        public string FullOutgoingNumber
        {
            get
            {
                if (string.IsNullOrEmpty(IncomingNumber))
                {
                    return null;
                }
                else
                {
                    if (DocNumber.HasValue && DocNumber.Value > 1)
                        return string.Format("{0}-{1}{2}", IncomingNumber, DocNumber.Value, OutgoingDate == null ? "" : string.Format("/{0:dd.MM.yyyy}", OutgoingDate.Value));
                    else
                        return string.Format("{0}{1}", IncomingNumber, OutgoingDate == null ? "" : string.Format("/{0:dd.MM.yyyy}", OutgoingDate.Value));
                }
            }
            set { }
        }

        [XmlIgnore]
        public bool FullOutgoingNumberSpecified { get; set; }

        #endregion
    }
}
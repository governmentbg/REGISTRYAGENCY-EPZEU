using Integration.EPZEU.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Xml;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Fields.Common
{
    /// <summary>
    /// Операция на Record: 0 = Добавяне.; 1 = Изтриване.; 2 = Без промяна.;
    /// </summary>
    public enum RecordOperations
    {
        /// <summary>
        /// Добавяне.
        /// </summary>
        [XmlEnum(Name = "Add")]
        Add,

        /// <summary>
        /// Изтриване.
        /// </summary>
        [XmlEnum(Name = "Erase")]
        Erase,

        /// <summary>
        /// Без промяна.
        /// </summary>
        [XmlEnum(Name = "Current")]
        Current
    }

    public abstract class Record
    {
        protected abstract string FieldIdentInternal { get; }

        #region Properties

        [XmlAttribute(AttributeName = "FieldIdent")]
        public string FieldIdent { get { return FieldIdentInternal; } set { } }

        #region Operation

        private RecordOperations? recordOperation;

        [XmlAttribute(AttributeName = "RecordOperation")]
        public RecordOperations RecordOperation
        {
            get
            {
                if (!recordOperation.HasValue)
                {
                    recordOperation = RecordOperations.Current;
                }

                return recordOperation.Value;
            }
            set
            {
                recordOperation = value;
            }
        }

        #endregion

        #region RecordMinActionDate

        [XmlIgnore]
        public DateTime? RecordMinActionDate { get; set; }

        [JsonIgnore]
        [XmlAttribute(AttributeName = "RecordMinActionDate")]
        public DateTime RecordMinActionDateAttribute
        {
            get
            {
                return RecordMinActionDate.HasValue ? RecordMinActionDate.Value : DateTime.MinValue;
            }
            set
            {
                RecordMinActionDate = value;
            }
        }

        [JsonIgnore]
        [XmlIgnore]
        public bool RecordMinActionDateAttributeSpecified
        {
            get { return RecordMinActionDate.HasValue; }
        }

        #endregion

        #region RecordID

        private string recordID;

        [XmlIgnore]
        public string RecordID
        {
            get
            {
                if (string.IsNullOrEmpty(recordID))
                {
                    recordID = Guid.NewGuid().ToString();
                }

                return recordID;
            }
            set
            {
                if (string.IsNullOrEmpty(value))
                {
                    recordID = Guid.NewGuid().ToString();
                }
                else
                {
                    recordID = value;
                }
            }
        }

        [JsonIgnore]
        [XmlAttribute(AttributeName = "RecordID")]
        public string RecordIDAttribute
        {
            get
            {
                return RecordID;
            }
            set
            {
                RecordID = value;
            }
        }

        [JsonIgnore]
        [XmlIgnore]
        public bool RecordIDAttributeSpecified
        {
            get
            {
                long recID;
                if (!string.IsNullOrWhiteSpace(recordID) && long.TryParse(recordID, out recID))
                {
                    return recID > 0;
                }
                else
                {
                    return false;
                };
            }
        }

        #endregion

        #region EraseOperation

        [XmlIgnore]
        public EraseOperations? EraseOperation { get; set; }

        [JsonIgnore]
        [XmlAttribute(AttributeName = "EraseOperation")]
        public EraseOperations EraseOperationAttribute
        {
            get
            {
                return EraseOperation.HasValue ? EraseOperation.Value : EraseOperations.Erase;
            }
            set
            {
                EraseOperation = value;
            }
        }

        [JsonIgnore]
        [XmlIgnore]
        public bool EraseOperationAttributeSpecified
        {
            get { return false; }
        }

        #endregion

        [XmlIgnore]
        public JsonElement? InitialState { get; set; }

        #endregion

        public virtual bool IsEmpty()
        {
            return false;
        }

        protected virtual void DeinicializeForEmptyCheck()
        {
            this.recordOperation = null;
            this.RecordMinActionDate = null;
            this.recordID = null;
            this.EraseOperation = null;
        }
    }

    #region Field

    public interface IField
    {
        string FieldIdent { get; }

        string FieldEntryNumber { get; set; }

        /// <summary>
        /// Дата на първоначално вписване.
        /// </summary>
        DateTime? RecordMinActionDate { get; set; }

        /// <summary>
        /// Дата на последно вписване.
        /// </summary>
        DateTime? FieldEntryDate { get; set; }

        /// <summary>
        /// Дата на
        /// </summary>
        DateTime? FieldActionDate { get; set; }

        FieldOperations? FieldOperation { get; set; }

        /// <summary>
        /// Тип на заявлението с което е вписано полето
        /// </summary>
        ApplicationFormTypes? EntryApplicationType { get; set; }
    }

    public abstract class RecordField : Record, IField
    {
        [ThreadStatic] static XmlNameTable nameTable;

        #region IField

        #region FieldEntryNumber

        [XmlAttribute(AttributeName = "FieldEntryNumber")]
        public string FieldEntryNumber { get; set; }

        private bool _fieldEntryNumberSpecified = false;

        [XmlIgnore]
        [JsonIgnore]
        public bool FieldEntryNumberSpecified
        {
            get { return _fieldEntryNumberSpecified; }
            set { _fieldEntryNumberSpecified = value; }
        }

        #endregion

        #region RecordMinActionDate

        [XmlIgnore]
        public DateTime? RecordMinActionDate { get; set; }

        [JsonIgnore]
        [XmlAttribute(AttributeName = "RecordMinActionDate")]
        public DateTime RecordMinActionDateAttribute
        {
            get
            {
                return RecordMinActionDate.HasValue ? RecordMinActionDate.Value : DateTime.MinValue;
            }
            set
            {
                RecordMinActionDate = value;
            }
        }

        private bool _recordMinActionDateAttributeSpecified = false;

        [JsonIgnore]
        [XmlIgnore]
        public bool RecordMinActionDateAttributeSpecified
        {
            get { return _recordMinActionDateAttributeSpecified; }
            set { _recordMinActionDateAttributeSpecified = value; }
        }

        #endregion

        #region FieldEntryDate

        [XmlIgnore]
        public DateTime? FieldEntryDate { get; set; }

        [JsonIgnore]
        [XmlAttribute(AttributeName = "FieldEntryDate")]
        public DateTime FieldEntryDateAttribute
        {
            get
            {
                return FieldEntryDate.HasValue ? FieldEntryDate.Value : DateTime.MinValue;
            }
            set
            {
                FieldEntryDate = value;
            }
        }

        private bool _fieldEntryDateAttributeSpecified = false;

        [JsonIgnore]
        [XmlIgnore]
        public bool FieldEntryDateAttributeSpecified
        {
            get { return _fieldEntryDateAttributeSpecified; }
            set { _fieldEntryDateAttributeSpecified = value; }
        }

        #endregion

        #region FieldActionDate

        [XmlIgnore]
        public DateTime? FieldActionDate { get; set; }

        [JsonIgnore]
        [XmlAttribute(AttributeName = "FieldActionDate")]
        public DateTime FieldActionDateAttribute
        {
            get
            {
                return FieldActionDate.HasValue ? FieldActionDate.Value : DateTime.MinValue;
            }
            set
            {
                FieldActionDate = value;
            }
        }

        private bool _fieldActionDateAttributeSpecified = false;

        [JsonIgnore]
        [XmlIgnore]
        public bool FieldActionDateAttributeSpecified
        {
            get { return _fieldActionDateAttributeSpecified; }
            set { _fieldActionDateAttributeSpecified = value; }
        }

        #endregion

        #region FieldOperation

        [XmlIgnore]
        public FieldOperations? FieldOperation { get; set; }

        [JsonIgnore]
        [XmlAttribute(AttributeName = "FieldOperation")]
        public FieldOperations FieldOperationAttribute
        {
            get
            {
                return FieldOperation.HasValue ? FieldOperation.Value : FieldOperations.Current;
            }
            set
            {
                FieldOperation = value;
            }
        }

        private bool _fieldOperationAttributeSpecified = false;

        [JsonIgnore]
        [XmlIgnore]
        public bool FieldOperationAttributeSpecified
        {
            get { return _fieldOperationAttributeSpecified; }
            set { _fieldOperationAttributeSpecified = value; }
        }

        #endregion

        #region EntryApplicationType

        [XmlIgnore]
        public ApplicationFormTypes? EntryApplicationType { get; set; }

        [JsonIgnore]
        [XmlAttribute(AttributeName = "EntryApplicationType")]
        public ApplicationFormTypes EntryApplicationTypeAttribute
        {
            get
            {
                return EntryApplicationType.HasValue ? EntryApplicationType.Value : ApplicationFormTypes.Undefined;
            }
            set
            {
                EntryApplicationType = value;
            }
        }

        private bool _entryApplicationTypeAttributeSpecified = false;

        [JsonIgnore]
        [XmlIgnore]
        public bool EntryApplicationTypeAttributeSpecified
        {
            get { return _entryApplicationTypeAttributeSpecified; }
            set { _entryApplicationTypeAttributeSpecified = value; }
        }

        #endregion

        #endregion

        protected override void DeinicializeForEmptyCheck()
        {
            base.DeinicializeForEmptyCheck();

            this.FieldEntryNumber = null;
            this.RecordMinActionDate = null;
            this.FieldEntryDate = null;
            this.FieldActionDate = null;
            this.FieldOperation = null;
            this.EntryApplicationType = null;
        }
    }

    public abstract class CompositeField : IField
    {
        #region IField

        protected abstract string FieldIdentInternal { get; }

        [XmlAttribute(AttributeName = "FieldIdent")]
        public string FieldIdent { get { return FieldIdentInternal; } set { } }

        #region FieldEntryNumber

        [XmlAttribute(AttributeName = "FieldEntryNumber")]
        public string FieldEntryNumber { get; set; }

        [XmlIgnore]
        [JsonIgnore]
        public bool FieldEntryNumberSpecified
        {
            get
            {
                return !string.IsNullOrWhiteSpace(FieldEntryNumber);
            }
            set
            {

            }
        }

        #endregion

        #region RecordMinActionDate

        [XmlIgnore]
        public DateTime? RecordMinActionDate { get; set; }

        [JsonIgnore]
        [XmlAttribute(AttributeName = "RecordMinActionDate")]
        public DateTime RecordMinActionDateAttribute
        {
            get
            {
                return RecordMinActionDate.HasValue ? RecordMinActionDate.Value : DateTime.MinValue;
            }
            set
            {
                RecordMinActionDate = value;
            }
        }

        private bool _recordMinActionDateAttributeSpecified = false;

        [JsonIgnore]
        [XmlIgnore]
        public bool RecordMinActionDateAttributeSpecified
        {
            get { return _recordMinActionDateAttributeSpecified; }
            set { _recordMinActionDateAttributeSpecified = value; }
        }

        #endregion

        #region FieldEntryDate

        [XmlIgnore]
        public DateTime? FieldEntryDate { get; set; }

        [JsonIgnore]
        [XmlAttribute(AttributeName = "FieldEntryDate")]
        public string FieldEntryDateAttribute
        {
            get
            {
                return FieldEntryDate.HasValue ? FieldEntryDate.Value.ToString() : null;
            }
            set
            {
                FieldEntryDate = string.IsNullOrEmpty(value) ? (DateTime?)null : DateTime.Parse(value);
            }
        }

        private bool _fieldEntryDateAttributeSpecified = false;

        [JsonIgnore]
        [XmlIgnore]
        public bool FieldEntryDateAttributeSpecified
        {
            get { return _fieldEntryDateAttributeSpecified; }
            set { _fieldEntryDateAttributeSpecified = value; }
        }

        #endregion

        #region FieldActionDate

        [XmlIgnore]
        public DateTime? FieldActionDate { get; set; }

        [JsonIgnore]
        [XmlAttribute(AttributeName = "FieldActionDate")]
        public DateTime FieldActionDateAttribute
        {
            get
            {
                return FieldActionDate.HasValue ? FieldActionDate.Value : DateTime.MinValue;
            }
            set
            {
                FieldActionDate = value;
            }
        }

        private bool _fieldActionDateAttributeSpecified = false;

        [JsonIgnore]
        [XmlIgnore]
        public bool FieldActionDateAttributeSpecified
        {
            get { return _fieldActionDateAttributeSpecified; }
            set { _fieldActionDateAttributeSpecified = value; }
        }

        #endregion

        #region FieldOperation

        [XmlIgnore]
        public FieldOperations? FieldOperation { get; set; }

        [JsonIgnore]
        [XmlAttribute(AttributeName = "FieldOperation")]
        public FieldOperations FieldOperationAttribute
        {
            get
            {
                return FieldOperation.HasValue ? FieldOperation.Value : FieldOperations.Current;
            }
            set
            {
                FieldOperation = value;
            }
        }

        private bool _fieldOperationAttributeSpecified = false;

        [JsonIgnore]
        [XmlIgnore]
        public bool FieldOperationAttributeSpecified
        {
            get { return _fieldOperationAttributeSpecified; }
            set { _fieldOperationAttributeSpecified = value; }
        }

        #endregion

        #region EntryApplicationType

        [XmlIgnore]
        public ApplicationFormTypes? EntryApplicationType { get; set; }

        [JsonIgnore]
        [XmlAttribute(AttributeName = "EntryApplicationType")]
        public ApplicationFormTypes EntryApplicationTypeAttribute
        {
            get
            {
                return EntryApplicationType.HasValue ? EntryApplicationType.Value : ApplicationFormTypes.Undefined;
            }
            set
            {
                EntryApplicationType = value;
            }
        }

        private bool _entryApplicationTypeAttributeSpecified = false;

        [JsonIgnore]
        [XmlIgnore]
        public bool EntryApplicationTypeAttributeSpecified
        {
            get { return _entryApplicationTypeAttributeSpecified; }
            set { _entryApplicationTypeAttributeSpecified = value; }
        }

        #endregion

        #endregion

        public virtual bool IsEmpty()
        {
            return false;
        }

        #region Records Helpers

        public List<Record> GetRecords(string fieldIdent = null)
        {
            List<Record> records = new List<Record>();

            foreach (var propInfo in this.GetType().GetProperties())
            {
                if (typeof(Record).IsAssignableFrom(propInfo.PropertyType))
                {
                    var propRecord = (Record)propInfo.GetValue(this);

                    if (propRecord != null && (fieldIdent == null || fieldIdent == propRecord.FieldIdent))
                    {
                        records.Add(propRecord);
                    }
                }

                if (propInfo.PropertyType.IsGenericType &&
                    typeof(IList).IsAssignableFrom(propInfo.PropertyType) &&
                    typeof(Record).IsAssignableFrom(propInfo.PropertyType.GetGenericArguments()[0]))
                {
                    var propRecords = (IList)propInfo.GetValue(this);

                    if (propRecords != null && propRecords.Count > 0)
                    {
                        foreach (Record propRecord in propRecords)
                        {
                            if (propRecord != null && (fieldIdent == null || fieldIdent == propRecord.FieldIdent))
                            {
                                records.Add(propRecord);
                            }
                        }
                    }
                }
            }

            return records;
        }

        public void AddRecord(Record record)
        {
            foreach (var propInfo in this.GetType().GetProperties())
            {
                if (typeof(Record).IsAssignableFrom(propInfo.PropertyType) && record.GetType() == propInfo.PropertyType)
                {
                    propInfo.SetValue(this, record);
                }

                if (propInfo.PropertyType.IsGenericType &&
                    typeof(IList).IsAssignableFrom(propInfo.PropertyType) &&
                    propInfo.PropertyType.GetGenericArguments()[0] == record.GetType())
                {
                    var propRecords = (IList)propInfo.GetValue(this);

                    if (propRecords == null)
                    {
                        propRecords = (IList)Activator.CreateInstance(propInfo.PropertyType);

                        propInfo.SetValue(this, propRecords);
                    }

                    propRecords.Add(record);
                }
            }
        }

        public void DeleteRecord(Record record)
        {
            foreach (var propInfo in this.GetType().GetProperties())
            {
                if (typeof(Record).IsAssignableFrom(propInfo.PropertyType) && record.GetType() == propInfo.PropertyType)
                {
                    var propRecord = propInfo.GetValue(this);

                    if (propRecord == record)
                    {
                        propInfo.SetValue(this, null);
                    }
                }

                if (propInfo.PropertyType.IsGenericType &&
                    typeof(IList).IsAssignableFrom(propInfo.PropertyType) &&
                    propInfo.PropertyType.GetGenericArguments()[0] == record.GetType())
                {
                    var propRecords = (IList)propInfo.GetValue(this);

                    if (propRecords != null)
                    {
                        propRecords.Remove(record);
                    }
                }
            }
        }

        #endregion
    }

    #endregion
}

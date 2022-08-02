
using CNSys;
using EPZEU.CR.Domain.Common;
using EPZEU.CR.Domain.Fields;
using EPZEU.CR.Domain.Fields.Common;
using Integration.EPZEU.Models;
using System.Text.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml;
using System.Xml.Schema;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.ApplicationForms
{
    /// <summary>
    /// Състояние на процес: 0 = Нов; 1 = За промяна; 2 = Пререгистрация;
    /// </summary>
    public enum ProcessStates
    {
        /// <summary>
        /// Нов.
        /// </summary>
        New = 0,

        /// <summary>
        /// За промяна.
        /// </summary>
        ForChange = 1,

        /// <summary>
        /// Пререгистрация
        /// </summary>
        Preregistration = 2
    }

    public interface IApplicationWithFieldsForm : IApplicationForm
    {
        SubUICTypes? SubUICType { get; set; }

        ProcessStates? ApplicationState { get; set; }

        string SubUIC { get; set; }

        List<ApplicationWithFieldsForm> Applications { get; set; }

        ApplicationFormFieldsBase GetFiledsContainer();
    }

    public abstract class ApplicationWithFieldsForm : ApplicationFormBase, IApplicationWithFieldsForm
    {
        #region IApplicationWithFieldsFormBase

        #region ApplicationState

        [XmlIgnore]
        public ProcessStates? ApplicationState { get; set; }

        [JsonIgnore]
        [XmlAttribute(AttributeName = "ApplicationState")]
        public ProcessStates ApplicationStateAttribute
        {
            get
            {
                return ApplicationState.HasValue ? ApplicationState.Value : ProcessStates.New;
            }
            set
            {
                ApplicationState = value;
            }
        }

        [JsonIgnore]
        [XmlIgnore]
        public bool ApplicationStateAttributeSpecified
        {
            get { return ApplicationState.HasValue; }
        }

        #endregion

        #region SubUICType

        [XmlIgnore]
        public SubUICTypes? SubUICType { get; set; }

        [JsonIgnore]
        [XmlAttribute(AttributeName = "SubUICType")]
        public SubUICTypes SubUICTypeAttribute
        {
            get
            {
                return SubUICType.HasValue ? SubUICType.Value : SubUICTypes.Undefined;
            }
            set
            {
                SubUICType = value;
            }
        }

        [JsonIgnore]
        [XmlIgnore]
        public bool SubUICTypeAttributeSpecified
        {
            get { return SubUICType.HasValue; }
        }

        #endregion 

        [XmlAttribute(AttributeName = "SubUIC")]
        public string SubUIC { get; set; }

        [JsonIgnore]
        [XmlIgnore]
        public abstract List<ApplicationWithFieldsForm> Applications { get; set; }

        [XmlIgnore]
        [JsonPropertyName("applications")]
        //Това пропарти е добавено заради сереизацищта към json защото System.Text.Json серилизира само пропартитата на обекта ApplicationWithFieldsForm, но не и на наговите наследници, за да серилизира и тях обекта трябва да е object
        public List<object> ApplicationJsonSerilizationObjects
        {
            get
            {
                if (Applications != null)
                {
                    return Applications.Select(app => (object)app).ToList();
                }

                return null;
            }
        }

        public abstract ApplicationFormFieldsBase GetFiledsContainer();

        #endregion
    }

    public abstract class ApplicationWithFieldsFormBase<TField> : ApplicationWithFieldsForm
        where TField : ApplicationFormFieldsBase
    {
        public ApplicationWithFieldsFormBase()
        {
            Fields = Activator.CreateInstance<TField>();
        }

        public override ApplicationFormFieldsBase GetFiledsContainer()
        {
            return Fields;
        }

        [EmptyCheckIgnore]
        [XmlElement(Order = 11)]
        public TField Fields { get; set; }

        [XmlArray(ElementName = "Documents", Order = 10000)]
        [XmlArrayItem("Document")]
        public override List<AttachedDocument> Documents
        {
            get; set;
        }

        [EmptyCheckIgnore]
        [XmlArray(ElementName = "AdditionalApplications", Order = 20000)]
        
        #region Additional Application Types
        [XmlArrayItem(Type = typeof(A1), ElementName = "A1")]
        [XmlArrayItem(Type = typeof(A2), ElementName = "A2")]
        [XmlArrayItem(Type = typeof(A3), ElementName = "A3")]
        [XmlArrayItem(Type = typeof(A4), ElementName = "A4")]
        [XmlArrayItem(Type = typeof(A5), ElementName = "A5")]
        [XmlArrayItem(Type = typeof(A6), ElementName = "A6")]
        [XmlArrayItem(Type = typeof(A7), ElementName = "A7")]
        [XmlArrayItem(Type = typeof(A8), ElementName = "A8")]
        [XmlArrayItem(Type = typeof(A9), ElementName = "A9")]
        [XmlArrayItem(Type = typeof(A10), ElementName = "A10")]
        [XmlArrayItem(Type = typeof(A11), ElementName = "A11")]
        [XmlArrayItem(Type = typeof(A12), ElementName = "A12")]
        [XmlArrayItem(Type = typeof(A13), ElementName = "A13")]
        [XmlArrayItem(Type = typeof(A14), ElementName = "A14")]
        [XmlArrayItem(Type = typeof(A15), ElementName = "A15")]
        [XmlArrayItem(Type = typeof(A16), ElementName = "A16")]
        [XmlArrayItem(Type = typeof(A17), ElementName = "A17")]
        [XmlArrayItem(Type = typeof(A18), ElementName = "A18")]
        [XmlArrayItem(Type = typeof(B1), ElementName = "B1")]
        [XmlArrayItem(Type = typeof(B2), ElementName = "B2")]
        [XmlArrayItem(Type = typeof(B3), ElementName = "B3")]
        [XmlArrayItem(Type = typeof(B4), ElementName = "B4")]
        [XmlArrayItem(Type = typeof(B5), ElementName = "B5")]
        [XmlArrayItem(Type = typeof(B6), ElementName = "B6")]
        [XmlArrayItem(Type = typeof(B7), ElementName = "B7")]
        [XmlArrayItem(Type = typeof(D1), ElementName = "D1")]
        [XmlArrayItem(Type = typeof(G1), ElementName = "G1")]
        [XmlArrayItem(Type = typeof(G2), ElementName = "G2")]
        [XmlArrayItem(Type = typeof(G3), ElementName = "G3")]
        [XmlArrayItem(Type = typeof(V1), ElementName = "V1")]
        [XmlArrayItem(Type = typeof(V21), ElementName = "V21")]
        [XmlArrayItem(Type = typeof(V22), ElementName = "V22")]
        [XmlArrayItem(Type = typeof(V23), ElementName = "V23")]
        [XmlArrayItem(Type = typeof(V24), ElementName = "V24")]
        [XmlArrayItem(Type = typeof(V25), ElementName = "V25")]
        [XmlArrayItem(Type = typeof(V26), ElementName = "V26")]
        [XmlArrayItem(Type = typeof(V31), ElementName = "V31")]
        [XmlArrayItem(Type = typeof(V32), ElementName = "V32")]
        [XmlArrayItem(Type = typeof(V33), ElementName = "V33")]
        #endregion
        [JsonIgnore]
        public override List<ApplicationWithFieldsForm> Applications { get; set; }
    }

    public class ApplicationFormFieldsBase
    {
        [XmlElement(Order = 10)]
        public F001_UIC UIC { get; set; }

        #region Fields Helpers

        public List<IField> GetFields()
        {
            List<IField> fields = new List<IField>();

            foreach (var propInfo in this.GetType().GetProperties())
            {
                if (typeof(IField).IsAssignableFrom(propInfo.PropertyType))
                {
                    var propField = (IField)propInfo.GetValue(this);

                    if (propField != null)
                    {
                        fields.Add(propField);
                    }
                }
            }

            return fields;
        }

        public IField GetField(string fieldIdent)
        {
            var fields = GetFields();

            return fields.SingleOrDefault(f => f.FieldIdent == fieldIdent);
        }

        public void AddField(IField field)
        {
            foreach (var propInfo in this.GetType().GetProperties())
            {
                if (typeof(IField).IsAssignableFrom(propInfo.PropertyType) && field.GetType() == propInfo.PropertyType)
                {
                    propInfo.SetValue(this, field);

                    break;
                }
            }
        }

        public void DeleteField(IField field)
        {
            foreach (var propInfo in this.GetType().GetProperties())
            {
                if (typeof(IField).IsAssignableFrom(propInfo.PropertyType) && field.GetType() == propInfo.PropertyType)
                {
                    propInfo.SetValue(this, null);
                }
            }
        }

        #endregion
    }
}

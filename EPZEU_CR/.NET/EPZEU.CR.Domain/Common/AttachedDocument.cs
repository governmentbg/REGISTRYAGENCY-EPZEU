using Integration.EPZEU.Models;
using System;
using System.Text.Json.Serialization;
using System.Xml.Serialization;

namespace EPZEU.CR.Domain.Common
{
    /// <summary>
    /// Прикачен документ.
    /// </summary>
    [XmlRoot(ElementName = "Document")]
    public class AttachedDocument
    {
        #region fields

        private FileMetadata fileMetadata = new FileMetadata();

        private string _description;

        #endregion

        #region ApplicationDocument

        /// <summary>
        /// Гуид.
        /// </summary>
        [XmlAttribute]
        public string Guid { get; set; }

        /// <summary>
        /// Идентификатор на вид документ.
        /// </summary>
        [XmlAttribute]
        public string DocumentTypeID { get; set; }

        /// <summary>
        /// Флаг указващ дали е оригинал.
        /// </summary>
        [XmlAttribute]
        public bool IsOriginal { get; set; }

        /// <summary>
        /// Описание.
        /// </summary>
        [XmlAttribute]
        public string Description
        {
            get { return _description; }
            set 
            {
                //Ограничението в базата е 2000, но се слага по-малко защото на места се ползва като име на файл и към него се добавя . + разширение.
                _description = string.IsNullOrEmpty(value) 
                    ? value 
                    : value.Length > 1995 
                        ? value.Substring(0, 1995) 
                        : value; 
            }
        }

        /// <summary>
        /// Преизползван входящ документ.
        /// </summary>
        [XmlAttribute]
        public string ReusedIncomingNumber { get; set; }

        #endregion

        #region FileMetadata

        /// <summary>
        /// Метаданни на файл.
        /// </summary>
        [JsonIgnore]
        public FileMetadata FileMetadata
        {
            get { return fileMetadata; }
            set { fileMetadata = value; }
        }

        /// <summary>
        /// Име на файл.
        /// </summary>
        [XmlIgnore]
        public string FileName
        {
            get { return fileMetadata.FileName; }
            set { fileMetadata.FileName = value; }
        }

        /// <summary>
        /// Вид съдържание.
        /// </summary>
        [XmlIgnore]
        public string ContentType
        {
            get { return fileMetadata.ContentType; }
            set { fileMetadata.ContentType = value; }
        }

        /// <summary>
        /// Размер.
        /// </summary>
        [XmlIgnore]
        public long? Size
        {
            get { return fileMetadata.Size; }
            set { fileMetadata.Size = value; }
        }

        /// <summary>
        /// Алгоритъм за хеширане.
        /// </summary>
        [XmlIgnore]
        public string HashAlgorithm
        {
            get { return fileMetadata.HashAlgorithm; }
            set { fileMetadata.HashAlgorithm = value; }
        }

        /// <summary>
        /// Хеш.
        /// </summary>
        [XmlIgnore]
        public byte[] Hash
        {
            get { return fileMetadata.Hash; }
            set { fileMetadata.Hash = value; }
        }

        /// <summary>
        /// Брой страници.
        /// </summary>
        [XmlIgnore]
        public long? NumberOfPages
        {
            get { return fileMetadata.NumberOfPages; }
            set { fileMetadata.NumberOfPages = value; }
        }

        #endregion

        #region Additonal Props

        /// <summary>
        /// Идентификатор на документ към заявлеие.
        /// </summary>
        [XmlIgnore]
        public long? ApplicationDocumentID { get; set; }

        /// <summary>
        /// Съдържаниена Html шаблон.
        /// </summary>
        [XmlIgnore]
        public string HtmlTemplateContent { get; set; }

        /// <summary>
        /// Гуид за подписване.
        /// </summary>
        [XmlIgnore]
        public Guid? SigningGuid { get; set; }

        /// <summary>
        /// Флаг указващ дали е ацт с изтрити лични данни.
        /// </summary>
        [XmlIgnore]
        public bool? IsActWithErasedPersonalData { get; set; }

        #endregion
    }
}

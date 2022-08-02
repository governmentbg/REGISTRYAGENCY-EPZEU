using EPZEU.CR.Domain.Fields.Common;
using Integration.EPZEU.Models;
using System;

namespace EPZEU.CR.Web.App.Models.Deeds
{
    /// <summary>
    /// Модел на поле.
    /// </summary>
    public class Field : IField
    {
        /// <summary>
        /// Код на ресурс за името на полето.
        /// </summary>
        public string NameCode { get; set; }

        /// <summary>
        /// HTML данни.
        /// </summary>
        public string HtmlData { get; set; }

        /// <summary>
        /// Номер на вписване, с който е вписано полето.
        /// </summary>
        public string FieldEntryNumber { get; set; }

        /// <summary>
        /// Дата на първоначално вписване.
        /// </summary>
        public DateTime? RecordMinActionDate { get; set; }

        /// <summary>
        /// Дата на последно вписване.
        /// </summary>
        public DateTime? FieldEntryDate { get; set; }

        /// <summary>
        /// Дата на
        /// </summary>
        public DateTime? FieldActionDate { get; set; }

        /// <summary>
        /// Идентификатор на полета.
        /// </summary>
        public string FieldIdent { get; set; }

        /// <summary>
        /// Операция на полето.
        /// </summary>
        public FieldOperations? FieldOperation { get; set; }

        /// <summary>
        /// Тип на заявлението с което е вписано полето
        /// </summary>
        public ApplicationFormTypes? EntryApplicationType { get; set; }

        /// <summary>
        /// Поредност.
        /// </summary>
        public string Order { get; set; }
    }
}
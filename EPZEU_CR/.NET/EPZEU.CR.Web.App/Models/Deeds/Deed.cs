using Integration.EPZEU.Models;
using System;
using System.Collections.Generic;

namespace EPZEU.CR.Web.App.Models.Deeds
{
    /// <summary>
    /// Модел на партида.
    /// </summary>
    public class Deed
    {
        /// <summary>
        /// Статус на партида.
        /// </summary>
        public DeedStatuses DeedStatus { get; set; }

        /// <summary>
        /// Име на фирма.
        /// </summary>
        public string CompanyName { get; set; }

        /// <summary>
        /// Уникален идентификатор.
        /// </summary>
        public string GUID { get; set; }

        /// <summary>
        /// ЕИК.
        /// </summary>
        public string UIC { get; set; }

        private string _uICWithCtx;

        /// <summary>
        /// ЕИК с контекстна информация.
        /// </summary>
        public string UICWithCtx 
        {
            get
            {
                return !string.IsNullOrEmpty(_uICWithCtx) ? _uICWithCtx : UIC;
            }
            set
            {
                _uICWithCtx = value;
            }
        }

        /// <summary>
        /// Правна форма.
        /// </summary>
        public LegalForms? LegalForm { get; set; }

        /// <summary>
        /// Наставка след името на компанията, указваща дали компанията е в ликвидация, несъстоятелност или нито едното.
        /// </summary>
        public CompanyNameSuffixFlags? CompanyNameSuffixFlag { get; set; }

        /// <summary>
        /// Флаг, указващ дали полетата от заявлението, за които се отнася, са с прекратени правомощия или лишени от разпоредителна власт.
        /// </summary>
        public ElementHolderAdditionFlags? ElementHolderAdditionFlag { get; set; }

        /// <summary>
        /// Секции.
        /// </summary>
        public List<Section> Sections { get; set; }

        /// <summary>
        /// Дата на справката.
        /// </summary>
        public DateTime? EntryDate { get; set; }

        /// <summary>
        /// Пълно име.
        /// </summary>
        public string FullName { get; set; }

        public bool? HasInstructions { get; set; }

        public bool? HasAssignments { get; set; }

        public bool? HasCompanyCasees { get; set; }

        public bool? HasLegalFormChange { get; set; }

        public bool? HasNotifications { get; set; }
    }
}

using System;

namespace EPZEU.CR.Web.App.Models.Deeds
{
    /// <summary>
    /// Информация за фирма.
    /// </summary>
    public class CompanyInfo
    {
        /// <summary>
        /// Име на фирма.
        /// </summary>
        public string CompanyName { get; set; }

        /// <summary>
        /// Транслитерация.
        /// </summary>
        public string Trasnliteration { get; set; }

        /// <summary>
        /// Име  на правна форма.
        /// </summary>
        public string LegalFormName { get; set; }

        /// <summary>
        /// Заинтересовано лице.
        /// </summary>
        public string InterestedPerson { get; set; }

        /// <summary>
        /// Заинтересован като.
        /// </summary>
        public string InterestedAs { get; set; }

        /// <summary>
        /// Активна от.
        /// </summary>
        public DateTime? ActiveFrom { get; set; }

        /// <summary>
        /// Активна до.
        /// </summary>
        public DateTime? ActiveTo { get; set; }

        /// <summary>
        /// Дата на изтриване.
        /// </summary>
        public DateTime? ErasedDate { get; set; }

        /// <summary>
        /// Позиция на човек.
        /// </summary>
        public string PersonPosition
        {
            get
            {
                if (!string.IsNullOrEmpty(InterestedAs) && !string.IsNullOrEmpty(InterestedPerson))
                {
                    return string.Format("{0}, {1}", InterestedPerson, InterestedAs);
                }

                if (string.IsNullOrEmpty(InterestedAs) && !string.IsNullOrEmpty(InterestedPerson))
                {
                    return InterestedPerson;
                }

                return String.Empty;
            }
        }
    }
}

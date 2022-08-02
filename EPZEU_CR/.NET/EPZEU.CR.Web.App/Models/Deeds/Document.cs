namespace EPZEU.CR.Web.App.Models.Deeds
{
    /// <summary>
    /// Модел на документ.
    /// </summary>
    public class Document
    {
        /// <summary>
        /// Уникален идентификатор на документа.
        /// </summary>
        public string DocGuid { get; set; }

        /// <summary>
        /// Описание
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Оригинал
        /// </summary>
        public bool? Original { get; set; }

        /// <summary>
        /// Брой станици.
        /// </summary>
        public string PagesCount { get; set; }

        /// <summary>
        /// Размер на документа.
        /// </summary>
        public string DocSize { get; set; }

        /// <summary>
        /// Име на файл.
        /// </summary>
        public string FileName { get; set; }
    }
}

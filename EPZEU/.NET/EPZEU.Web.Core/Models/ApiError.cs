using System;
using System.Collections.Generic;

namespace EPZEU.Web.Models
{
    /// <summary>
    /// Кодове за грешка
    /// </summary>
    public enum EPZEUCoreErrorCodes
    {
        /// <summary>
        /// Възникна грешка на сървъра.
        /// </summary>
        GL_ERROR_L = 1,

        /// <summary>
        /// Валидационна грешка.
        /// </summary>
        ValidationError = 2,

        /// <summary>
        /// Нямате достъп до този модул
        /// </summary>
        GL_NO_ACCESS_E = 3,
    }

    /// <summary>
    /// Модел на грешка.
    /// </summary>
    public class ApiError
    {
        /// <summary>
        /// Код.
        /// </summary>
        public string Code { get; set; }

        /// <summary>
        /// Съобщение.
        /// </summary>
        public string Message { get; set; }

        /// <summary>
        /// Описва къде в кода е възникнала грешката.
        /// </summary>
        public string StackTrace { get; set; }

        /// <summary>
        /// Вътрешни грешки.
        /// </summary>
        public List<ApiError> InnerErrors { get; set; }
    }
}

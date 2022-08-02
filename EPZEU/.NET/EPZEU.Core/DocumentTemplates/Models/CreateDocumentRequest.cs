using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EPZEU.DocumentTemplates.Models
{
    /// <summary>
    /// Заявка за създаване на документ.
    /// </summary>
    public class CreateDocumentRequest
    {
        /// <summary>
        /// HTML съдържание на шаблона.
        /// </summary>
        public string HtmlTemplateContent { get; set; }

        /// <summary>
        /// Наименование на файл.
        /// </summary>
        public string FileName { get; set; }
    }
}

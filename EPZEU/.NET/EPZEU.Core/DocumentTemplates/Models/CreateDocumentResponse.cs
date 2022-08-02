using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EPZEU.DocumentTemplates.Models
{
    /// <summary>
    /// Отговор на заявка за създаване на документ.
    /// </summary>
    public class CreateDocumentResponse
    {
        /// <summary>
        /// Съдържание.
        /// </summary>
        public Stream Content { get; set; }

        /// <summary>
        /// Тип на съдържанието.
        /// </summary>
        public string ContentType { get; set; }

        /// <summary>
        /// Име на файл.
        /// </summary>
        public string FileName { get; set; }
    }
}

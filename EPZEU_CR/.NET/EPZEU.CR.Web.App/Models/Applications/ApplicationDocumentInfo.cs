using EPZEU.Applications.Models;
using EPZEU.Nomenclatures;
using Integration.EPZEU.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Mvc.Routing;
using System;
using System.Collections.Generic;

namespace EPZEU.CR.Web.App.Models.Applications
{
    /// <summary>
    /// Информация за прикачен документ.
    /// </summary>
    public class ApplicationDocumentInfo : Integration.EPZEU.Models.ApplicationDocumentInfo
    {
        private string _guidWithCtx;

        /// <summary>
        /// Уникален идентификатор на документа с контекстна информация.
        /// </summary>
        public string GuidWithCtx
        {
            get
            {
                return !string.IsNullOrEmpty(_guidWithCtx) ? _guidWithCtx : Guid;
            }
            set
            {
                _guidWithCtx = value;
            }
        }
    }
}

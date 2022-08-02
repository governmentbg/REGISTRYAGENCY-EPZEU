using EPZEU.CMS.Models;
using EPZEU.Nomenclatures;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EPZEU.CMS
{
    /// <summary>
    /// Интерфейс за работа със страници.
    /// </summary>
    public interface IPages : ILoadable
    {
        /// <summary>
        /// Метод за достигане на всички статични страници по даден език.
        /// </summary>
        /// <param name="lang">Език, на който да бъдат върнати страниците.</param>
        /// <returns>Връща всички статични страници</returns>
        IEnumerable<Page> GetPages(string lang, out DateTime? lastModifiedDate);

        /// <summary>
        /// Метод за достигане на страница по ключ по даден език.
        /// </summary>
        /// <param name="lang">Език, на който да бъдат върнати страниците.</param>
        /// <param name="pageID">идентификатор на страница</param>
        /// <returns></returns>
        Page GetPage(string lang, int pageID);

        ValueTask EnsureLoadedAsync(string lang);
    }

    /// <summary>
    /// Интерфейс за работа със статични страници.
    /// </summary>
    public interface IStaticPages : ILoadable
    {
        /// <summary>
        /// Метод за достигане на всички статични страници.
        /// </summary>
        /// <returns>Връща всички статични страници</returns>
        IEnumerable<StaticPage> GetStaticPages(out DateTime? lastModifiedDate);

        /// <summary>
        /// Метод за достигане на статична страница по ключ.
        /// </summary>
        /// <param name="pageKey">ключ</param>
        /// <returns></returns>
        StaticPage GetStaticPage(string pageKey);

        IChangeToken GetChangeToken();
    }
}

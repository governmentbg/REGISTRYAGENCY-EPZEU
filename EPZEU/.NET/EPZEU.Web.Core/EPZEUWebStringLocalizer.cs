using EPZEU.Nomenclatures;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Localization;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text.RegularExpressions;

namespace EPZEU.Web
{
    public class EPZEUWebStringLocalizer : IStringLocalizer
    {
        private readonly string _currentLang;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ILabels _labels;
        private readonly Regex _regex = null;

        #region Constructors

        public EPZEUWebStringLocalizer(IHttpContextAccessor httpContextAccessor, ILabels labels)
        {
            _httpContextAccessor = httpContextAccessor;

            _labels = labels;

            _regex = new Regex("{[A-Za-z0-9_]*}");
        }

        protected EPZEUWebStringLocalizer(CultureInfo culture, ILabels labels)
        {
            _currentLang = culture.Name.Substring(0, 2);

            _httpContextAccessor = null;
            
            _labels = labels;
        }

        #endregion

        #region IStringLocalizer

        public LocalizedString this[string name]
        {
            get
            {
                LocalizedString result;
                var resultString = _labels.GetLabel(CurrentLanguage, name);

                if (string.IsNullOrEmpty(resultString))
                {
                    result = new LocalizedString(name, "MISSING_Label_" + name, true);
                }
                else
                {
                    result = new LocalizedString(name, resultString);
                }

                return result;
            }
        }

        public LocalizedString this[string name, params object[] arguments]
        {
            get
            {
                LocalizedString result;
                var resultString = _labels.GetLabel(CurrentLanguage, name);

                if (string.IsNullOrEmpty(resultString))
                {
                    result = new LocalizedString(name, "MISSING_Label_" + name, true);
                }
                else
                {
                    var argumentsKeys = new List<string>();

                    var match = _regex.Match(resultString);

                    while (match != null && match.Success)
                    {
                        argumentsKeys.Add(match.Groups[0].Value);

                        match = match.NextMatch();
                    }

                    for (int i = 0; i < argumentsKeys.Count; i++)
                    {
                        if (arguments.Count() > i)
                        {
                            resultString = resultString.Replace(argumentsKeys[i], (string)arguments[i]);
                        }
                    }

                    result = new LocalizedString(name, resultString);
                }

                return result;
            }
        }

        public IEnumerable<LocalizedString> GetAllStrings(bool includeParentCultures)
        {
            DateTime? lastModifiedDate;

            var labels = _labels.GetLabels(CurrentLanguage, out lastModifiedDate);

            if (labels != null && labels.Count > 0)
            {
                foreach (var labelPair in labels)
                {
                    yield return new LocalizedString(labelPair.Key, labelPair.Value);
                }
            }
        }

        public IStringLocalizer WithCulture(CultureInfo culture)
        {
            return new EPZEUWebStringLocalizer(culture, _labels);
        }

        #endregion

        #region Helpers

        private string CurrentLanguage
        {
            get { return _currentLang == null ? _httpContextAccessor?.HttpContext?.GetLanguage() : _currentLang; }
        }

        #endregion
    }
}

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.Threading.Tasks;

namespace EPZEU.CR.Web.App.Code
{
    public class LZQueryStringValueProvider : BindingSourceValueProvider, IEnumerableValueProvider
    {
        private static readonly Dictionary<string, StringValues> _emptyValues = new Dictionary<string, StringValues>();
        private readonly Dictionary<string, StringValues> _values;
        private PrefixContainer _prefixContainer;

        /// <summary>
        /// Creates a value provider for <see cref="IQueryCollection"/>.
        /// </summary>
        /// <param name="bindingSource">The <see cref="BindingSource"/> for the data.</param>
        /// <param name="values">The key value pairs to wrap.</param>
        /// <param name="culture">The culture to return with ValueProviderResult instances.</param>
        public LZQueryStringValueProvider(
            BindingSource bindingSource,
            IQueryCollection values,
            CultureInfo culture)
            : base(bindingSource)
        {
            if (bindingSource == null)
            {
                throw new ArgumentNullException(nameof(bindingSource));
            }

            if (values == null)
            {
                throw new ArgumentNullException(nameof(values));
            }

            _values = ExtractQueryCollection(values);

            Culture = culture;
        }

        public CultureInfo Culture { get; }

        protected PrefixContainer PrefixContainer
        {
            get
            {
                if (_prefixContainer == null)
                {
                    _prefixContainer = new PrefixContainer(_values.Keys);
                }

                return _prefixContainer;
            }
        }

        /// <inheritdoc />
        public override bool ContainsPrefix(string prefix)
        {
            return PrefixContainer.ContainsPrefix(prefix);
        }

        /// <inheritdoc />
        public virtual IDictionary<string, string> GetKeysFromPrefix(string prefix)
        {
            if (prefix == null)
            {
                throw new ArgumentNullException(nameof(prefix));
            }

            return PrefixContainer.GetKeysFromPrefix(prefix);
        }

        /// <inheritdoc />
        public override ValueProviderResult GetValue(string key)
        {
            if (key == null)
            {
                throw new ArgumentNullException(nameof(key));
            }

            if (key.Length == 0)
            {
                // Top level parameters will fall back to an empty prefix when the parameter name does not
                // appear in any value provider. This would result in the parameter binding to a query string
                // parameter with a empty key (e.g. /User?=test) which isn't a scenario we want to support.
                // Return a "None" result in this event.
                return ValueProviderResult.None;
            }

            if (_values == null)
                return ValueProviderResult.None;

            StringValues values;

            if (!_values.TryGetValue(key, out values) || values.Count == 0)
            {
                return ValueProviderResult.None;
            }
            else
            {
                return new ValueProviderResult(values, Culture);
            }
        }

        private Dictionary<string, StringValues> ExtractQueryCollection(IQueryCollection values)
        {
            string lzString = values["lzQuery"];

            if (string.IsNullOrEmpty(lzString))
                return _emptyValues;

            return QueryHelpers.ParseQuery(LZStringCSharp.LZString.DecompressFromEncodedURIComponent(lzString));
        }
    }

    public class LZQueryStringValueProviderFactory : IValueProviderFactory
    {
        /// <inheritdoc />
        public Task CreateValueProviderAsync(ValueProviderFactoryContext context)
        {
            if (context == null)
            {
                throw new ArgumentNullException(nameof(context));
            }

            var query = context.ActionContext.HttpContext.Request.Query;
            if (query != null && query.Count > 0)
            {
                var valueProvider = new LZQueryStringValueProvider(
                    BindingSource.Query,
                    query,
                    CultureInfo.InvariantCulture);

                context.ValueProviders.Add(valueProvider);
            }

            return Task.CompletedTask;
        }
    }
}

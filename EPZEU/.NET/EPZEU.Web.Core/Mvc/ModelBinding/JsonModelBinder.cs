using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Text.Json;
using System.Threading.Tasks;

namespace EPZEU.Web.Mvc.ModelBinding
{
    /// <summary>
    /// Имплементация на интерфейс IModelBinder за байндване на json модели.
    /// </summary>
    public class JsonModelBinder : IModelBinder
    {
        private readonly JsonOptions _jsonOptions;
        private ILogger _logger = null;

        public JsonModelBinder(
            IOptions<JsonOptions> jsonOptions, 
            ILogger<JsonModelBinder> logger)
        {
            _jsonOptions = jsonOptions.Value;
            _logger = logger;
        }
        public Task BindModelAsync(ModelBindingContext bindingContext)
        {
            if (bindingContext == null)
            {
                throw new ArgumentNullException(nameof(bindingContext));
            }

            string fieldName = bindingContext.FieldName;
            var valueProviderResult = bindingContext.ValueProvider.GetValue(fieldName);

            if (valueProviderResult == ValueProviderResult.None)
            {
                return Task.CompletedTask;
            }
            else
            {
                bindingContext.ModelState.SetModelValue(fieldName, valueProviderResult);
            }

            string value = valueProviderResult.FirstValue;
            if (string.IsNullOrEmpty(value))
            {
                return Task.CompletedTask;
            }

            try
            {
                object result = JsonSerializer.Deserialize(value, bindingContext.ModelType, _jsonOptions.JsonSerializerOptions);
                bindingContext.Result = ModelBindingResult.Success(result);
            }
            catch (JsonException jsonEx)
            {
                _logger.LogError(jsonEx.Message);

                bindingContext.ModelState.TryAddModelError(bindingContext.ModelType.Name, jsonEx, bindingContext.ModelMetadata);
                bindingContext.Result = ModelBindingResult.Failed();
            }

            return Task.CompletedTask;
        }
    }
}

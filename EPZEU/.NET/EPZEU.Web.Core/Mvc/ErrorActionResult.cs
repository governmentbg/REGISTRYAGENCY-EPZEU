using EPZEU.Nomenclatures;
using EPZEU.Web.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace EPZEU.Web.Mvc
{
    /// <summary>
    /// Реализация на интерфейс IActionResult за работа с грешки.
    /// </summary>
    public class ErrorActionResult : IActionResult
    {
        #region Fileds

        private readonly Exception _exception;
        private readonly IStringLocalizer _stringLocalizer;

        #endregion

        #region Constructor

        public ErrorActionResult(Exception exception, IStringLocalizer stringLocalizer)
        {
            _exception = exception;
            _stringLocalizer = stringLocalizer;
        }

        #endregion

        #region Public Methods

        public async Task ExecuteResultAsync(ActionContext context)
        {
            int statusCode = (int)StatusCodes.Status500InternalServerError;
            ApiError apiError = null;

            if (_exception != null)
            {
                HttpStatusCode httpStatusCode = GetHttpStatusCode(_exception);
                apiError = GetError(_exception, httpStatusCode);
                statusCode = (int)httpStatusCode;
            }

            var objectResult = new ObjectResult(apiError) { StatusCode = statusCode };

            await objectResult.ExecuteResultAsync(context);
        }

        #endregion

        #region Helpeprs

        private HttpStatusCode GetHttpStatusCode(Exception exception)
        {
            //Ако някоя специфичен тип грешка, се връща специфичен статус код. Тук се прави нейната обработка. Тук може да седи код който връща говорещите грешки от базата като 400.

            return HttpStatusCode.InternalServerError;
        }

        private ApiError GetError(Exception ex, HttpStatusCode statusCode)
        {
            var error = new ApiError();
            if (statusCode == HttpStatusCode.Unauthorized)
                error.Code = EPZEUCoreErrorCodes.GL_NO_ACCESS_E.ToString();
            else
                error.Code = EPZEUCoreErrorCodes.GL_ERROR_L.ToString();

            error.Message = _stringLocalizer[error.Code];

            return error;
        }

        #endregion
    }
}

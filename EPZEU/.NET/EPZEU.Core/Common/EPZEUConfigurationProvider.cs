using EPZEU.Common.Cache;
using EPZEU.Common.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;
using System.Linq;

namespace EPZEU.Common
{
    /// <summary>
    /// Източник за създаване на доставчик на конфигурационни параметри.
    /// </summary>
    public class EPZEUConfigurationSource : IConfigurationSource
    {
        private readonly IEnumerable<AppParameter> _appParameters;
        public EPZEUConfigurationSource(IEnumerable<AppParameter> appParameters)
        {
            _appParameters = appParameters;
        }
            public IConfigurationProvider Build(IConfigurationBuilder builder)
        {
            return new EPZEUConfigurationProvider(_appParameters);
        }
    }

    /// <summary>
    /// Доставчик на конфигурационни параметри.
    /// </summary>
    public class EPZEUConfigurationProvider : ConfigurationProvider
    {
        private IAppParameters _appParametersSource;
        private IEnumerable<AppParameter> _appParameeters;

        public EPZEUConfigurationProvider(IEnumerable<AppParameter> parameters)
        {
            _appParameeters = parameters;
        }

        public override void Load()
        {
            if (_appParametersSource != null)
                LoadParameters(_appParametersSource.GetAppParameters());
            else
                LoadParameters(_appParameeters);
        }

        public void RegisterAppParametersSource(IAppParameters parameters)
        {
            if (_appParametersSource != null)
                throw new NotSupportedException("already using appparameters!");

            _appParametersSource = parameters;

            ChangeToken.OnChange(() =>
            {
                return _appParametersSource.GetChangeToken();
            },
            (provider) =>
            {
                provider.Load();
                provider.OnReload();
            }, this);

            Load();
            OnReload();
        }

        #region Helpers

        private void LoadParameters(IEnumerable<AppParameter> parameters)
        {
            Data = parameters.ToDictionary((item) =>
            {
                return string.Format("{0}:{1}", ConfigurationEPZEUExtensions.EPZEUSectionName, item.Code);
            }, (item) =>
            {
                switch (item.ParameterType)
                {
                    case AppParameterTypes.DateTime:
                        return item.ValueDateTime.ToString();
                    case AppParameterTypes.Interval:
                        return item.ValueInterval.ToString();
                    case AppParameterTypes.String:
                        return item.ValueString;
                    case AppParameterTypes.Integer:
                        return item.ValueInt.ToString();
                    case AppParameterTypes.HourAndMinute:
                        return item.ValueHour.ToString();
                    default:
                        throw new NotImplementedException("Not Implemented AppParameterTypes mapper in EPZEU Configuration Provider");
                }
            });
        }

        #endregion
    }
}

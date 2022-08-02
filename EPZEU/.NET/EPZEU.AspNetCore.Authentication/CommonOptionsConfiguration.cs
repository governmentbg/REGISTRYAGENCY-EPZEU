using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Text;

namespace EPZEU.AspNetCore.Authentication
{
    internal class CommonOptionsConfiguration<TOptions> : IConfigureOptions<TOptions>, IConfigureNamedOptions<TOptions> where TOptions : class
    {
        private readonly Action<string, TOptions> _action;

        public CommonOptionsConfiguration(Action<string, TOptions> action)
        {
            _action = action;
        }

        public void Configure(TOptions options)
        {
            _action(null, options);
        }

        public void Configure(string name, TOptions options)
        {
            _action(name, options);
        }
    }
}

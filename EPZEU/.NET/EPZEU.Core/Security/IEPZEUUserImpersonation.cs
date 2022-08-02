using System;

namespace EPZEU.Security
{
    public interface IEPZEUUserImpersonation
    {
        EPZEUUserImpersonationControl Impersonate(EPZEUPrincipal user);
    }

    public struct EPZEUUserImpersonationControl : IDisposable
    {
        private Action _onDispose;

        public EPZEUUserImpersonationControl(Action onDispose)
        {
            _onDispose = onDispose;
        }

        public void Dispose()
        {
            _onDispose?.Invoke();
        }
    }
}

using Rebus.Bus;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace EPZEU.CR.Common
{
    public interface IActionDispatcher
    {
        Task SendAsync(object actionData);
    }

    public class DefaultActionDispatcher : IActionDispatcher
    {
        private readonly IBus Bus;

        public DefaultActionDispatcher(IBus bus)
        {
            Bus = bus;
        }

        public Task SendAsync(object actionData) => Bus.Send(actionData);
    }
}

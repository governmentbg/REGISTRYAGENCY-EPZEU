
using CNSys.Hosting;
using Dapper;
using Microsoft.Extensions.Logging;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using System.Transactions;

namespace EPZEU.Utilities
{
    internal class NpgNotification
    {
        public string TableName { get; set; }
    }

    public interface IDbCacheInvalidationDispatcher
    {
        void RegisterListener(string tableName, Action<object> handler);
        void UnregisterListener(string tableName, Action<object> handler);
    }

    public class NpgCacheInvalidationDispatcherOptions
    {
        public NpgCacheInvalidationDispatcherOptions()
        {
            ListenChannel = "cache_invalidation";
            MaxReconnectDelay = new TimeSpan(0, 1, 0);
            IncrementDelay = new TimeSpan(0, 0, 1);
            StartDelay = new TimeSpan(0, 0, 1);
        }
        public string ConnectionString { get; set; }
        public string ListenChannel { get; set; }

        public TimeSpan MaxReconnectDelay { get; set; }

        public TimeSpan IncrementDelay { get; set; }

        public TimeSpan StartDelay { get; set; }
    }


    public class NpgCacheInvalidationDispatcher : PollingBackgroundService, IDbCacheInvalidationDispatcher
    {
        private readonly object _locker = new object();
        private readonly NpgCacheInvalidationDispatcherOptions _options;
        private readonly JsonSerializerOptions _serializerOptions;

        private TimeSpan _nextDelay;
        private Dictionary<string, List<Action<object>>> _listeners = null;

        #region Constructors

        public NpgCacheInvalidationDispatcher(ILogger<NpgCacheInvalidationDispatcher> logger, NpgCacheInvalidationDispatcherOptions options) : base(logger)
        {
            _serializerOptions = new JsonSerializerOptions();
            _serializerOptions.PropertyNameCaseInsensitive = true;

            _options = options;
            _nextDelay = options.StartDelay;

            _listeners = new Dictionary<string, List<Action<object>>>();

            NextDelayCalculator = CalculateNextDelay;
        }

        #endregion

        #region Public Interface
        public void RegisterListener(string tableName, Action<object> handler)
        {
            lock (_locker)
            {
                if (_listeners.ContainsKey(tableName))
                {
                    _listeners[tableName].Add(handler);
                }
                else
                {
                    _listeners.Add(tableName, new List<Action<object>>() { handler });
                }
            }
        }

        public void UnregisterListener(string tableName, Action<object> handler)
        {
            lock (_locker)
            {
                if (!_listeners.ContainsKey(tableName))
                    throw new NotSupportedException("NpgNotificationDispatcher fail to remove notification handle");

                _listeners[tableName].Remove(handler);

                if (_listeners[tableName].Count == 0)
                {
                    _listeners.Remove(tableName);
                }
            }
        }

        #endregion

        #region Overriden Methods

        protected override Task PollAsync(CancellationToken stoppingToken)
        {
            return ConnectAndListenForNotificationsAsync(stoppingToken);
        }

        #endregion

        #region Helpers

        private void NotificationHandler(object sender, NpgsqlNotificationEventArgs e)
        {
            try
            {
                var eventPayload = JsonSerializer.Deserialize<NpgNotification>(e.Payload, _serializerOptions);

                Action<object>[] handlerArray = null;

                lock (_locker)
                {
                    if (_listeners.ContainsKey(eventPayload.TableName))
                    {
                        //Копираме всички хендлъри, защото при извикването им changeMotior-а на всеки хендлър си вика Dispose и хендлъра се премахва от NpgNotificationDispatcher-а.
                        //Така се променя енумерацията на списъка в listeners и може да възникне exception.
                        handlerArray = _listeners[eventPayload.TableName].ToArray();
                    }
                }

                if (handlerArray != null)
                {
                    foreach (var handler in handlerArray)
                    {
                        try
                        {
                            handler(sender);
                        }
                        catch (Exception exHandler)
                        {
                            LogException(exHandler);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                LogException(ex);
            }
        }

        private async Task ConnectAndListenForNotificationsAsync(CancellationToken stoppingToken)
        {
            using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Suppress, TransactionScopeAsyncFlowOption.Enabled))
            {
                using (var connection = new NpgsqlConnection(_options.ConnectionString))
                {
                    await connection.OpenAsync(stoppingToken);

                    await connection.ExecuteAsync(string.Format("listen \"{0}\";", _options.ListenChannel), commandType: CommandType.Text);

                    connection.Notification += NotificationHandler;

                    /*При свързване към базата данни инвалидираме всички changeMonitor - и. Това е важно, когато има отпадане на достъпа до базата данни и последващо възстановяване.
                     * Това се прави защото може да се изпусне известие от базата данни доакто не се слуша.*/
                    InvalidateAllMonitors();

                    /*след успешно връзване и изпълнение на командата, рестартираме времето за изчакване при проблем*/
                    ResetDelay();

                    while (!stoppingToken.IsCancellationRequested)
                    {
                        /*ако има проблем с обработката на данните или има Exception то ще бъде прихванато от външния цикъл и ще се върже отново*/
                        await connection.WaitAsync(stoppingToken);
                    }
                }
            }
        }

        private void InvalidateAllMonitors()
        {
            Action<object>[] handlerArray = null;
            lock (_locker)
            {
                //Копираме всички хендлъри, защото при извикването им changeMotior-а на всеки хендлър си вика Dispose и хендлъра се премахва от NpgNotificationDispatcher-а.
                //Така се променя енумерацията на списъка в listeners и може да възникне exception.
                handlerArray = _listeners.Values.SelectMany((item) => { return item; }).ToArray();
            }

            if (handlerArray != null)
            {
                foreach (var handler in handlerArray)
                {
                    try
                    {
                        handler(this);
                    }
                    catch (Exception exHandler)
                    {
                        LogException(exHandler);
                    }
                }
            }
        }

        private TimeSpan CalculateNextDelay(PollingBackgroundService service, Exception ex)
        {
            if (_nextDelay < _options.MaxReconnectDelay)
            {
                var newNextDelay = _nextDelay.Add(_options.IncrementDelay);

                _nextDelay = newNextDelay <= _options.MaxReconnectDelay ? newNextDelay : _options.MaxReconnectDelay;
            }

            return _nextDelay;
        }

        private void ResetDelay()
        {
            _nextDelay = _options.StartDelay;
        }

        private void LogException(Exception exception)
        {
            Logger.LogError(exception, exception.Message);
        }

        #endregion
    }
}

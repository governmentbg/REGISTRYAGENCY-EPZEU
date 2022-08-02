using Dapper;
using EPZEU.Audit;
using EPZEU.Audit.Models;
using EPZEU.Common;
using EPZEU.Utilities;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Threading;
using System.Threading.Tasks;
using CNSys.Data;
using EPZEU.Nomenclatures.Repositories;
using EPZEU.Nomenclatures;
using System.Diagnostics;

namespace EPZEU.Web.Test.Perf
{
    public class LoadTestService : BackgroundService
    {
        private readonly IConfiguration _configuration = null;
        private readonly IAuditServiceClient _httpClient = null;
        private readonly ILogger _logger;
        private readonly ILabelService _labelService;
        private int _createdActionsPerInterval = 0;
        private int _exceptionsPerInterval = 0;

        public LoadTestService(IConfiguration configuration, IAuditServiceClient httpClient, ILogger<LoadTestService> logger, ILabelService labelService)
        {
            _configuration = configuration;
            _httpClient = httpClient;
            _logger = logger;
            _labelService = labelService;
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            //MeasureTime(TestPgsqlSyncReadingBigDataRequest, 1000);
            //MeasureTime(TestPgsqlSyncReadingSmallDataRequest, 1000);

            MeasureTime(TestPgsqlAsyncReadingBigDataRequest, 1000);
            MeasureTime(TestPgsqlAsyncReadingSmallDataRequest, 1000);

            return Task.CompletedTask;
            //return TestWebRequestsAsync(stoppingToken);
        }

        public async Task TestWebRequestsAsync(CancellationToken stoppingToken)
        {

            List<Task> _usersWorkTasks = new List<Task>();

            var usersCount = _configuration.GetValue<int>("usersCount");
            for (short i = 0; i < usersCount; i++)
            {
                _usersWorkTasks.Add(UserRequest(i, stoppingToken));
            }

            _usersWorkTasks.Add(Startreporting(stoppingToken));

            await Task.WhenAll(_usersWorkTasks);
        }

        private async Task UserRequest(int currentUser, CancellationToken stoppingToken)
        {
            await Task.Yield(); // това е, за да се създават tasko-вете по-бързо (не се чака изпълнението на синхронния код преди следващия await

            int requestsCount = _configuration.GetValue<int>("requestsPerUser");
            for (int iter = 0; iter < requestsCount; iter++)
            {
                try
                {
                    var res = await _httpClient.CreateLogActionAsync(new Audit.Models.LogActionRequest()
                    {
                        ObjectType = ObjectTypes.TRRULNCBatch,
                        ActionType = ActionTypes.Preview,
                        Module = Modules.EPZEU_CR,
                        Functionality = Functionalities.PublicReports,
                        Key = "204634438",
                        UserSessionID = Guid.Parse("3a5c19f0-3638-4d0c-8ca3-38dee4424586"),
                        IpAddress = "192.168.70.64",
                        UserCIN = 1142,
                        LoginSessionID = Guid.Parse("694a9bbf-3937-41fd-ba04-b9f334866324"),
                        OperationID = Guid.NewGuid().ToString()
                    });

                    Interlocked.Increment(ref _createdActionsPerInterval);
                }
                catch (Exception ex)
                {
                    _logger.LogException(ex);
                    Interlocked.Increment(ref _exceptionsPerInterval);
                }
            }
        }

        private async Task Startreporting(CancellationToken stoppingToken)
        {
            await Task.Yield(); // това е, за да се създават tasko-вете по-бързо (не се чака изпълнението на синхронния код преди следващия await

            while (!stoppingToken.IsCancellationRequested)
            {
                int currentActionsPerInterval = Interlocked.Exchange(ref _createdActionsPerInterval, 0);
                int currentExceptionsPerInterval = Interlocked.Exchange(ref _exceptionsPerInterval, 0);

                _logger.LogWarning("{0} logs/s, {1} exc/s", currentActionsPerInterval, currentExceptionsPerInterval);

                try
                {
                    await Task.Delay(1000, stoppingToken);
                }
                catch (Exception ex)
                {
                    _logger.LogException(ex);
                }
            }
        }

        private void TestPgsqlAsyncReadingBigDataRequest()
        {
            var resAsync = _labelService.SearchLabel(new LabelSearchCriteria(), CancellationToken.None).GetAwaiter().GetResult();
        }

        //private void TestPgsqlSyncReadingBigDataRequest()
        //{
        //    var resSync = _labelService.SearchLabelTestSync(new LabelSearchCriteria());
        //}

        private void TestPgsqlAsyncReadingSmallDataRequest()
        {
            var resAsync = _labelService.SearchLabel(new LabelSearchCriteria() { LabelIDs=new int[] { 4850} }, CancellationToken.None).GetAwaiter().GetResult();
        }

        //private void TestPgsqlSyncReadingSmallDataRequest()
        //{
        //    var resSync = _labelService.SearchLabelTestSync(new LabelSearchCriteria() { LabelIDs = new int[] { 4850 } });
        //}

        static void MeasureTime(Action methodToMeasure, int repeatCount)
        {
            Stopwatch stopwatch = Stopwatch.StartNew();
            stopwatch.Start();
            for (int i = 0; i < repeatCount; i++)
            {
                methodToMeasure();
            }

            stopwatch.Stop();
            Console.WriteLine($"{methodToMeasure.Method.Name} - ".PadRight(50) + $"average - {stopwatch.Elapsed / repeatCount} for {repeatCount}");
        }

    }
}

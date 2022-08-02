using AutoMapper;
//using EPZEU.Common;
//using EPZEU.CR.Domain.Common;
//using EPZEU.CR.Domain.Fields.Common;
//using EPZEU.CR.Reports;
//using EPZEU.CR.Web.App.Code;
//using EPZEU.CR.Web.App.Models.ApplicationProcesses.Mapping;
//using EPZEU.CR.Web.App.Models.Applications.Mapping;
//using EPZEU.CR.Web.App.Models.Deeds.Mapping;
//using EPZEU.Security;
//using Integration.EPZEU;
//using Microsoft.AspNetCore.Http.Features;
//using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace TestAtanas
{
    public partial class Program
    {
        static partial void Run(string[] args)
        {
            //System.Data.Common.DbProviderFactories.RegisterFactory("Npgsql", typeof(Npgsql.NpgsqlFactory));

            //var hostBuilder = new HostBuilder();

            //hostBuilder.ConfigureHostConfiguration((builder) =>
            //{
            //    builder.SetBasePath(Directory.GetCurrentDirectory());
            //})
            //.ConfigureAppConfiguration((builder) =>
            //{
            //    builder.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
            //    builder.AddEPZEUConfigurationRemote();
            //})
            //.UseSerilog()
            //.ConfigureServices((context, services) =>
            //{
            //    var Configuration = context.Configuration;
            //    services.AddEPZEUDbContextProviderWithDefaultConnection(Configuration, EPZEUPrincipal.AnonymousLocalUserID);

            //    services.AddMemoryCache();
            //    services.AddEPZEUServiceClients();
            //    services.AddHttpContextEPZEUUserAccessor();
            //    services.AddEPZEUAppParametersRemote(Configuration);
            //    services.AddEPZEUCMSRemoteCachingServices();
            //    services.AddEPZEUNomenclaturesRemoteCachingServices();
            //    services.AddEPZEUHttpClients(Configuration);
            //    services.AddEPZEUUIHttpClients();
            //    services.AddEPZEUUIServiceClients();

            //    services.AddRemoteTRRULNCNomenclatures(EPZEUHttpClientNames.TRRULNCApi);
            //    services.AddTRRULNCServices(EPZEUHttpClientNames.TRRULNCApi);
            //    services.AddTRRULNCHttpClients(Configuration);

            //    /*подменя инфраструктурата за полване към ТРРЮЛНЦ*/
            //    services.AddSingleton<Integration.EPZEU.Caching.IPollingCacheInfrastructure, TRRULNCPollingInfrastructure>();

            //    services.AddEPZEUCRCommonServices();
            //    services.AddEPZEUCRWebServices();
            //    services.AddHttpContextAccessor();

            //    services.AddEPZEUDataProtection(Configuration.GetEPZEUSection().GetValue<string>("CR_ASPNETCORE_DP_KEY_CERT_THUMBPRINT"));

            //    services.AddAutoMapper((c) =>
            //    {
            //        AutoMapperConfiguration.Configure(c);
            //        ReportsAutoMapperConfiguration.Configure(c);
            //        ApplicationsAutoMapperConfiguration.Configure(c);
            //    });

            //    //Конфигурира максималния размер на мултипарт заявка (качване на файлове) на 5МB.
            //    services.Configure<FormOptions>(options =>
            //    {
            //        options.MultipartBodyLengthLimit = Configuration.GetEPZEUSection().GetValue<int>("GL_DOCUMENT_MAX_FILE_SIZE") * 1024;
            //    });

            //    services
            //        .AddSingleton<IActionContextAccessor, ActionContextAccessor>();

            //    services
            //        .ConfigureEPZEUGlobalOptions(Configuration)
            //        .ConfigureEPZEUHttpClientOptions(Configuration)
            //        .ConfigureEPZEUHttpAuthenticationClientsOptions(Configuration);

            //    services.AddServiceLimiterService();

            //    services.AddEPZEUWebStringLocalizer();

            //    services.AddEPZEUAuthentication((options) =>
            //    {
            //        options.ApiName = "epzeu.cr.api.public";
            //    }, Configuration);

            //    services.AddCachePollingBackgroundService((options) =>
            //    {
            //        options.PollingInterval = Configuration.GetEPZEUSection().GetValue<TimeSpan>("GL_POLLING_INTERVAL");
            //    });

            //    services.AddEPZEUCRHttpClients(Configuration);
            //    services.AddEPZEUCRServiceClients();

            //    services.AddPaymentsHttpClients(Configuration);
            //    services.AddPaymentServices();
            //    services.AddHostedService<Test>();
            //});

            //hostBuilder.RunConsoleAsync().Wait();
        }
    }


    //public class Test : BackgroundService
    //{
        //private readonly IDeedReportService _client;
        //public Test(IDeedReportService client)
        //{
        //    _client = client;
        //}
        //protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        //{
        //    try
        //    {
        //        await Task.Yield();

        //        while(true)
        //        {
        //            Console.WriteLine("Enter NumberOfIterations to start Test");
        //            int numberOfIterations = int.Parse(Console.ReadLine());

        //            Console.WriteLine("Test Started");
        //            await ExecuteTest(50, numberOfIterations, stoppingToken); 
        //        }
        //    }
        //    catch(Exception ex)
        //    {
        //        Console.WriteLine(ex.Message);
        //    }
        //}

        //protected async Task ExecuteTest(int numberOfUsers, int numberOfIterations, CancellationToken cancellationToken)
        //{
            //try
            //{
                //StringBuilder str = new StringBuilder();

                //foreach (var t in System.Reflection.Assembly.GetAssembly(typeof(Deed2)).GetTypes())
                //{
                //    if (t.GetInterface("IField", true) != null)
                //    {

                //        var typeAttributes = t.GetCustomAttributes(typeof(XmlTypeAttribute), true);
                //        XmlTypeAttribute typeAttr = (XmlTypeAttribute)(typeAttributes.Length > 0 ? typeAttributes[0] : null);

                //        if (typeAttr != null)
                //        {
                //            str.AppendFormat("[XmlElement(Type = typeof({0}), ElementName = \"{1}\", Namespace = Namespaces.FieldsNamespace)] ", t.Name, typeAttr.TypeName);
                //            str.AppendLine();
                //        }
                //        else
                //            Console.WriteLine("type{0}, no typeAttribute", t);
                //    }
                //}

                //XmlSerializer xmlSerializer = new XmlSerializer(typeof(Deed2));
                //using (var file = File.OpenRead("c:\\tmp\\test.xml"))
                //{

                //    var deed = xmlSerializer.Deserialize(file);
                //}

            //    List<Task> pendingWork = new List<Task>();

            //    Stopwatch stopwatch = Stopwatch.StartNew();

            //    for (int users = 0; users < numberOfUsers; users++)
            //    {
            //        pendingWork.Add(Task.Run(async () =>
            //        {
            //            for (var iter = 0; iter < numberOfIterations; iter++)
            //            {
            //                var deedData = await _client.GetDeedAsync("123123123", new Integration.EPZEU.Models.SearchCriteria.DeedLoadOption()
            //                {
            //                    LoadLinkedDeeds = true,
            //                    LoadErasedFields = true,
            //                    CheckHasInstructions = true,
            //                    CheckHasAssignments = true,

            //                    CheckHasCompanyCases = true,
            //                    LoadFieldsFromAllLegalForms = true
            //                });

            //            }
            //        }));
            //    }

            //    await Task.WhenAll(pendingWork.ToArray());

            //    stopwatch.Stop();

            //    Console.WriteLine("{0} iterations Completed in {1}. {2}r/s", numberOfIterations * numberOfUsers, stopwatch.Elapsed, (numberOfIterations * numberOfUsers) / stopwatch.Elapsed.TotalSeconds);
            //}
            //catch (Exception ex)
            //{
            //    Console.WriteLine(ex.Message);
            //}
    //    }
    //}
}

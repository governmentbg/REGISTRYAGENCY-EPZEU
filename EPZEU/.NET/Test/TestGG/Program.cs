using BenchmarkDotNet.Attributes;
using BenchmarkDotNet.Running;
using CNSys.Security;
using EPZEU.Security;
//using Integration.EPZEU.Models;
using Newtonsoft.Json;
using System;
using System.Threading;
using System.Xml;

namespace MyBenchmarks
{
    [ClrJob(baseline: true)]
    [RPlotExporter, RankColumn]
    [MemoryDiagnoser]
    public class Md5VsSha256
    {
        [Params(1, 2, 4)]
        public int R;
        [Params(1000)]
        public int N;

        [Benchmark]
        public void Test()
        {
            using (var mti = new ManagedThreadImpersonation(new GenericDataSourceUser(EPZEUPrincipal.SystemLocalUserID.ToString(), Thread.CurrentPrincipal)))
            {
                for (int i = 0; i < N; i++)
                    TestContext(R);
            }
        }

        private void TestContext(int iterations)
        {
        }
    }

    public class Program
    {
        public static void Main(string[] args)
        {
            //var summary = BenchmarkRunner.Run<Md5VsSha256>();

            string strJson = null;
            using (var sr = new System.IO.StreamReader("D://DeedJson.json"))
            {
                strJson = sr.ReadToEnd();
                sr.Close();
            }

            //Deed t = JsonConvert.DeserializeObject<Deed>(strJson);

            Console.WriteLine("Ready");
        }
    }
}
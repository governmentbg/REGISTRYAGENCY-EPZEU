using System;

namespace EPZEU.Utilities.Caching
{
    public class CachePollingOptions
    {
        public CachePollingOptions()
        {
            ParallelCachePoll = false;
            PollingInterval = new TimeSpan(0, 0, 13);
        }

        public TimeSpan PollingInterval { get; set; }
        public bool ParallelCachePoll { get; set; }
    }
}

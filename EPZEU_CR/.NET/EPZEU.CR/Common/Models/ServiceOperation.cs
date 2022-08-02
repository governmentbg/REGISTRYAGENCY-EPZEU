﻿using CNSys.Data;
using EPZEU.Utilities;

namespace EPZEU.CR.Common.Models
{
    public enum ServiceOperationTypes
    {
        ApplicationProcessCompleteSigning = 1,
        ApplicationProcessRejectSigning = 2,
    }

    public class ServiceOperationMapping
    {
        [DapperColumn("service_operation_id")]
        public long? ServiceOperationID { get; set; }

        [DapperColumn("operation_id")]
        public string OperationID { get; set; }

        [DapperColumn("operation_type")]
        public int ServiceOperationType { get; set; }

        [DapperColumn("is_completed")]
        public bool IsCompleted { get; set; }

        [DapperColumn("result")]
        public string Result { get; set; }

        [DapperColumn("next_ops")]
        public string NextOperations { get; set; }

        public ServiceOperation ToServiceOperation() => new ServiceOperation()
        {
            ServiceOperationID = ServiceOperationID,
            OperationID = OperationID,
            ServiceOperationType = ServiceOperationType,
            IsCompleted = IsCompleted,
            Result = Result,
            NextOperations = NextOperations,
        };
    }
}
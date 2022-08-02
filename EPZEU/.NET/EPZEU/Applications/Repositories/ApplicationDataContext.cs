using Dapper;
using EPZEU.Utilities;
using System;
using System.Data;
using System.Data.Common;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Applications.Repositories
{
    internal class ApplicationDataContext : BaseDataContext
    {
        public ApplicationDataContext(DbConnection dbConnection) : base(dbConnection)
        {
        }

        #region Application

        public async Task<long?> ApplicationCreateAsync(int? p_applicant_cin,
                                      short? p_register_id,
                                      short? p_application_type_id,
                                      string p_incoming_number,
                                      DateTime? p_registration_date,
                                      string p_application_display_url,
                                      string p_result_html,
                                      CancellationToken cancellationToken

            )
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_applicant_cin", p_applicant_cin);
            parameters.Add("p_register_id", p_register_id);
            parameters.Add("p_application_type_id", p_application_type_id);
            parameters.Add("p_incoming_number", p_incoming_number);
            parameters.Add("p_registration_date", p_registration_date);
            parameters.Add("p_application_display_url", p_application_display_url);
            parameters.Add("p_result_html", p_result_html);  
            parameters.Add("p_application_id", direction: ParameterDirection.Output);

            await _dbConnection.SPExecuteAsync("app", "f_applications_create", parameters, cancellationToken);

            return parameters.Get<long?>("p_application_id");
        }

        public Task ApplicationUpdateAsync(string p_incoming_number,
                                      string p_result_html, CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_incoming_number", p_incoming_number);
            parameters.Add("p_result_html", p_result_html);

            return _dbConnection.SPExecuteAsync("app", "f_applications_update", parameters, cancellationToken);
        }
               
        public async Task<(CnsysGridReader reader, int? count)> ApplicationSearchAsync(DateTime? p_from_registration_date,
                                                 DateTime? p_to_registration_date,
                                                 string[] p_incoming_numbers,
                                                 short? p_application_type_id,
                                                 int? p_applicant_cin,
                                                 short? p_register,
                                                 int? p_start_index,
                                                 int? p_page_size,
                                                 bool? p_calculate_count,
                                                 int? p_max_nor,
                                                 CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_from_registration_date", p_from_registration_date);
            parameters.Add("p_to_registration_date", p_to_registration_date);
            parameters.Add("p_incoming_numbers", p_incoming_numbers);
            parameters.Add("p_application_type_id", p_application_type_id);
            parameters.Add("p_applicant_cin", p_applicant_cin);
            parameters.Add("p_register", p_register);
            parameters.Add("p_start_index", p_start_index);
            parameters.Add("p_page_size", p_page_size);
            parameters.Add("p_calculate_count", p_calculate_count);
            parameters.Add("p_max_nor", p_max_nor);
            /*TODO: няма ли да е по прегледно да го няма System.Data.*/
            parameters.Add("p_count", direction: System.Data.ParameterDirection.Output);
            parameters.Add("ref_applications", direction: System.Data.ParameterDirection.Output);           

            /*TODO: да се цитират схемите, в който са функциите.*/
            var reader = await _dbConnection.SPExecuteReaderAsync("app", "f_applications_search", parameters, cancellationToken);
            var p_count = parameters.Get<int?>("p_count");

            return (reader, p_count);
        }

        #endregion
    }
}

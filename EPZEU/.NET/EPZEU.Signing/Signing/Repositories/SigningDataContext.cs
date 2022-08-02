using CNSys.Data;
using Dapper;
using EPZEU.Utilities;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.IO;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Signing.Repositories
{
    /// <summary>
    /// Клас капсулиращ работата по извикване на процедурите в базата данни свързани с процесите по подписване.
    /// </summary>
    internal class SigningDataContext : BaseDataContext
    {
        public SigningDataContext(DbConnection dbConnection) : base(dbConnection)
        {
        }

        #region Signers

        /// <summary>
        /// Създава запис за подписващ в базата.
        /// </summary>
        /// <param name="p_name">Име на подписващия.</param>
        /// <param name="p_ident">ЕГМ/ЛНЧ на подписващия.</param>
        /// <param name="p_order">Поредност на полагане на подписа.</param>
        /// <param name="p_process_id">Връзка към процеса за подписване.</param>
        /// <param name="cancellationToken"></param>
        public async Task<long?> SignerCreateAsync(string p_name,
                                 string p_ident,
                                 int? p_order,
                                 Guid? p_process_id,
                                 CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_name", p_name);
            parameters.Add("p_ident", p_ident);
            parameters.Add("p_order", p_order);
            parameters.Add("p_process_id", p_process_id);
            parameters.Add("p_signer_id_out", direction: ParameterDirection.Output);


            await _dbConnection.SPExecuteAsync("sign", "f_signers_create", parameters, cancellationToken);
            long? p_signer_id_out = parameters.Get<long?>("p_signer_id_out");

            return p_signer_id_out;
        }

        /// <summary>
        /// Редактира запис зза подписващ в базата.
        /// </summary>
        /// <param name="p_signer_id">Идентификатор на подписващия.</param>
        /// <param name="p_status">Статус на подписващия.</param>
        /// <param name="p_signing_channel">Канал на подписване.</param>
        /// <param name="p_additional_sign_data">Допълнителни данни за отдалечено подписване.</param>
        /// <param name="p_transaction_id"></param>
        /// <param name="p_reject_reson_label"></param>
        /// <param name="cancellationToken"></param>
        public Task SignerUpdateAsync(long? p_signer_id,
            short? p_status,
            short? p_signing_channel,
            string p_additional_sign_data,
            string p_transaction_id,
            string p_reject_reson_label,
            CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_signer_id", p_signer_id);
            parameters.Add("p_status", p_status);
            parameters.Add("p_signing_channel", p_signing_channel);
            parameters.Add("p_additional_sign_data", new NpgCustomParameterValue(NpgsqlTypes.NpgsqlDbType.Jsonb, (object)p_additional_sign_data ?? DBNull.Value));
            parameters.Add("p_transaction_id", p_transaction_id);
            parameters.Add("p_reject_reson_label", p_reject_reson_label);

            return _dbConnection.SPExecuteAsync("sign", "f_signers_update", parameters, cancellationToken);
        }

        /// <summary>
        ///  Изтрива запис за подписващ в базата.
        /// </summary>
        /// <param name="p_signer_id">Идентификатор на подписващия.</param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public Task SignerDeleteAsync(long? p_signer_id, CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_signer_id", p_signer_id);

            return _dbConnection.SPExecuteAsync("sign", "f_signers_delete", parameters, cancellationToken);
        }

        /// <summary>
        /// Търси подписващи по подадени критерии.
        /// </summary>
        /// <param name="p_signer_id">Идентификатор на подписващия.</param>
        /// <param name="p_process_ids">Списък с идентификатори на процеси за подписване.</param>
        /// <param name="p_signing_channel"></param>
        /// <param name="p_transaction_id"></param>
        /// <param name="p_start_index"></param>
        /// <param name="p_page_size"></param>
        /// <param name="p_calculate_count"></param>
        /// <param name="p_max_nor"></param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        public async Task<(CnsysGridReader reader, int? count)> SignersSearchAsync(long? p_signer_id,
                                             List<Guid> p_process_ids,
                                             short? p_signing_channel,
                                             string p_transaction_id,
                                             int? p_start_index,
                                             int? p_page_size,
                                             bool? p_calculate_count,
                                             int? p_max_nor,
                                             CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_signer_id", p_signer_id);
            parameters.Add("p_process_ids", p_process_ids != null && p_process_ids.Count > 0 ? p_process_ids.ToArray() : null);
            parameters.Add("p_signing_channel", p_signing_channel);
            parameters.Add("p_transaction_id", p_transaction_id);
            parameters.Add("p_start_index", p_start_index);
            parameters.Add("p_page_size", p_page_size);
            parameters.Add("p_calculate_count", p_calculate_count);
            parameters.Add("p_max_nor", p_max_nor);

            parameters.Add("p_count_out", direction: System.Data.ParameterDirection.Output);
            parameters.Add("ref_signers", direction: System.Data.ParameterDirection.Output);

            var reader = await _dbConnection.SPExecuteReaderAsync("sign", "f_signers_search", parameters, cancellationToken);

            int? p_count_out = parameters.Get<int?>("p_count_out");

            return (reader, p_count_out);
        }

        #endregion

        #region SigningProcesses

        /// <summary>
        /// Създава запис за процес по подписване в базата.
        /// </summary>
        /// <param name="p_process_id">Идентификатор на процес за подписване.</param>
        /// <param name="p_format">Формат.</param>
        /// <param name="p_file_name">Име на файла за подписване.</param>
        /// <param name="p_content_type">Mime тип на файла за подписване. </param>
        /// <param name="p_level">Ниво на подписа.</param>
        /// <param name="p_type">Тип на пакетиране на подписа.</param>
        /// <param name="p_digest_method">Хеш алгоритъм на подписа.</param>
        /// <param name="p_rejected_callback_url"></param>
        /// <param name="p_completed_callback_url"></param>
        /// <param name="p_additional_data"></param>
        /// <param name="cancellationToken"></param>
        public Task SigningProcessCreateAsync(Guid? p_process_id,
                                         short? p_format,
                                         string p_file_name,
                                         string p_content_type,
                                         short? p_level,
                                         short? p_type,
                                         short? p_digest_method,
                                         string p_rejected_callback_url,
                                         string p_completed_callback_url,
                                         string p_additional_data,
                                         CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_process_id", p_process_id);
            parameters.Add("p_format", p_format);
            parameters.Add("p_file_name", p_file_name);
            parameters.Add("p_content_type", p_content_type);
            parameters.Add("p_level", p_level);
            parameters.Add("p_type", p_type);
            parameters.Add("p_digest_method", p_digest_method);
            parameters.Add("p_rejected_callback_url", p_rejected_callback_url);
            parameters.Add("p_completed_callback_url", p_completed_callback_url);
            parameters.Add("p_additional_data", new NpgCustomParameterValue(NpgsqlTypes.NpgsqlDbType.Jsonb, (object)p_additional_data ?? DBNull.Value));

            return _dbConnection.SPExecuteAsync("sign", "f_signing_process_create", parameters, cancellationToken);
        }

        /// <summary>
        /// Редактира запис за процес по подписване в базата.
        /// </summary>
        /// <param name="p_process_id">Идентификатор на процес за подписване.</param>
        /// <param name="p_status">Статус на процес по подписване.</param>
        /// <param name="p_additional_data"></param>
        /// <param name="cancellationToken"></param>
        public Task SigningProcessUpdateAsync(Guid? p_process_id, short? p_status, string p_additional_data, CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_process_id", p_process_id);
            parameters.Add("p_status", p_status);
            parameters.Add("p_additional_data", new NpgCustomParameterValue(NpgsqlTypes.NpgsqlDbType.Jsonb, (object)p_additional_data ?? DBNull.Value));

            return _dbConnection.SPExecuteAsync("sign", "f_signing_process_update", parameters, cancellationToken);
        }

        public async Task<(CnsysGridReader reader, int? count)> SigningProcessSearchAsync(
            Guid? p_process_id,
            short? p_status,
            int? p_start_index,
            int? p_page_size,
            bool? p_calculate_count,
            int? p_max_nor,
            bool? p_with_tx_lock,
            CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_process_id", p_process_id);
            parameters.Add("p_status", p_status);
            parameters.Add("p_start_index", p_start_index);
            parameters.Add("p_page_size", p_page_size);
            parameters.Add("p_calculate_count", p_calculate_count);
            parameters.Add("p_max_nor", p_max_nor);
            parameters.Add("p_with_tx_lock", p_with_tx_lock);

            parameters.Add("p_count_out", direction: System.Data.ParameterDirection.Output);
            parameters.Add("ref_processes", direction: System.Data.ParameterDirection.Output);

            var reader = await _dbConnection.SPExecuteReaderAsync("sign", "f_signing_process_search", parameters, cancellationToken);

            int? p_count_out = parameters.Get<int?>("p_count_out");

            return (reader, p_count_out);
        }

        /// <summary>
        /// Изтрива запис за процес по подписване в базата.
        /// </summary>
        /// <param name="p_process_id">Идентификатор на процес за подписване.</param>
        /// <param name="cancellationToken"></param>
        public Task SigningProcessDeleteAsync(Guid? p_process_id, CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_process_id", p_process_id);

            return _dbConnection.SPExecuteAsync("sign", "f_signing_process_delete", parameters, cancellationToken);
        }

        public Task SigningProcessesDeleteAsync(Guid[] p_process_ids, CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_process_ids", p_process_ids);

            return _dbConnection.SPExecuteAsync("sign", "f_signing_process_delete_all", parameters, cancellationToken);
        }

        /// <summary>
        /// Създава или редактира запис за съдържанието на процес по подписване в базата.
        /// </summary>
        /// <param name="p_process_id">Идентификатор на процес за подписване.</param>
        /// <param name="p_content">Съдържание на документа за подписване.</param>
        /// <param name="p_offset">Изместване.</param>
        /// <param name="p_length">Брой байтове.</param>
        /// <param name="cancellationToken"></param>
        public Task SigningProcessContentUploadAsync(Guid? p_process_id,
                                                    byte[] p_content,
                                                    int? p_offset,
                                                    int? p_length,
                                                    CancellationToken cancellationToken)
        {
            var parameters = new DynamicParameters();

            parameters.Add("p_process_id", p_process_id);
            parameters.Add(name: "p_content", value: p_content, size: p_length.Value);
            parameters.Add("p_offset", p_offset);

            return _dbConnection.SPExecuteAsync("sign", "f_signing_process_content_upload", parameters, cancellationToken);
        }

        public static Stream CreateSigningProcessContenStream(Guid processID, IDbContextProvider dbContextProvider)
        {
            return new NpgsqlDeferredContentStream((context) =>
            {
                using (SigningDataContext dataContext = new SigningDataContext(context.Connection as DbConnection))
                {
                    return dataContext.SigningProcessContenRead(processID);
                }
            }, dbContextProvider);
        }
        /// <summary>
        /// Прочита съдържанието на процес по подписване в базата.
        /// </summary>
        /// <param name="p_process_id">Идентификатор на процес за подписване.</param>
        /// <returns></returns>
        public IDataReader SigningProcessContenRead(Guid p_process_id)
        {
            var parameters = new DynamicParameters();
            parameters.Add("p_process_id", p_process_id);
            var result = _dbConnection.SPExecuteReader("sign", "f_signing_process_content_read", parameters, CommandBehavior.SequentialAccess);

            return result;
        }

        #endregion
    }
}

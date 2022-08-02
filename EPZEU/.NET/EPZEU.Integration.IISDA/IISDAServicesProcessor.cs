using CNSys;
using CNSys.Data;
using EPZEU.Nomenclatures;
using EPZEU.Nomenclatures.Models;
using EPZEU.Nomenclatures.Repositories;
using IISDA.AdministrativeServices;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.Integration.IISDA
{
    /// <summary>
    /// Интерфейс за интеграция на услуги в IISDA.
    /// </summary>
    public interface IIISDAServicesProcessor
    {
        /// <summary>
        /// Прочитане и записване на услугите в IISDA 
        /// </summary>
        /// <returns></returns>
        Task ReadAndProcessItemsFromIISDAAsync(CancellationToken cancellationToken);
    }

    /// <summary>
    ///  Реализация на интерфейс IIISDAServicesProcessor за интеграция на услуги в IISDA.
    /// </summary>
    internal class IISDAServicesProcessor : IIISDAServicesProcessor
    {
        private readonly IntegrationIISDAOptions _integrationIISDAOptions;
        private readonly IIISDAServices _IISDAServices;
        private readonly IDbContextOperationExecutor _dbContextOperationExecutor;
        private IIISDAServicesRepository IISDAServicesRepository { get; set; }
        private IIISDAServiceDescriptionBuilder DescriptionBuilder { get; set; }
        private List<IISDAService> CachedItems { get; set; }

        public IISDAServicesProcessor(
            IIISDAServicesRepository iisdaServicesRepository, 
            IIISDAServiceDescriptionBuilder descriptionBuilder, 
            IIISDAServices IISDAServices,
            IOptionsSnapshot<IntegrationIISDAOptions> optionsSnapshot,
            IDbContextOperationExecutor dbContextOperationExecutor)
        {
            IISDAServicesRepository = iisdaServicesRepository;
            DescriptionBuilder = descriptionBuilder;
            _IISDAServices = IISDAServices;
            _integrationIISDAOptions = optionsSnapshot.Value;
            _dbContextOperationExecutor = dbContextOperationExecutor;
        }

        public Task ReadAndProcessItemsFromIISDAAsync(CancellationToken cancellationToken)
        {
            return ReadAndProcessItemsFromIISDAInternalAsync(cancellationToken);
        }

        private async Task<OperationResult> ReadAndProcessItemsFromIISDAInternalAsync(CancellationToken cancellationToken)
        {
            AdmServiceBatchDataType[] iisdaItems = null;
            DateTime readDate;
            OperationResult ret = null;
            AdmServicesServiceClient client = null;
            using ((client = new AdmServicesServiceClient(AdmServicesServiceClient.EndpointConfiguration.WSHttpBinding_IAdmServicesService, _integrationIISDAOptions.EP_INTGR_IISDA_ADM_SERVICES_API)) as IDisposable)
            {
                iisdaItems = (await client.SearchAdmServicesAsync(_integrationIISDAOptions.EP_INTGR_IISDA_RA_BATCH_NUMBER, null, null, null)).SearchAdmServicesResult;
                readDate = DateTime.Now;
            }
            
            if (iisdaItems != null && iisdaItems.Length > 0)
            {
                await _IISDAServices.EnsureLoadedAsync(cancellationToken);

                var servicesCollection = _IISDAServices.GetIISDAServices();

                CachedItems = servicesCollection.ToList();

                var iisdaItemsPrepared = iisdaItems.Where(x => x.AdmServiceBatchInfo != null).Select(x => new IISDAService()
                {
                    IIISDAServiceID = (int)x.AdmServiceBatchInfo.ServiceID,
                    ServiceNumber = (int)x.AdmServiceData.ServiceNumber,
                    Name = x.AdmServiceData.Name,
                    ShortDescription = x.AdmServiceData.Description,
                    Description = DescriptionBuilder.BuildServiceDescription(x),
                    HasEPayment = x.AdmServiceBatchInfo.PaymentInfo != null && x.AdmServiceBatchInfo.PaymentInfo.PaymentMethods != null ?
                            x.AdmServiceBatchInfo.PaymentInfo.PaymentMethods.Any(pm => pm == PaymentMethodsEnum.Electronic) : false,
                    ReadDate = readDate
                }).ToList();

                ret = await _dbContextOperationExecutor.ExecuteAsync(async (dbContext) =>
                {
                    foreach (var iisdaItem in iisdaItemsPrepared)
                    {
                        var cachedFound = CachedItems.SingleOrDefault(x => x.IIISDAServiceID == iisdaItem.IIISDAServiceID);

                        if (cachedFound == null)
                        {
                            await IISDAServicesRepository.CreateAsync(iisdaItem, cancellationToken);
                        }
                        else if (!AreIISDAServiceDataEqual(iisdaItem, cachedFound))
                        {
                            await IISDAServicesRepository.UpdateAsync(iisdaItem, cancellationToken);
                        }
                        else
                        {
                            await IISDAServicesRepository.MarkAsReadAsync(iisdaItem, cancellationToken);
                        }
                    }

                    foreach (var missingServiceInfo in CachedItems.Where(x => !iisdaItemsPrepared.Exists(t => t.IIISDAServiceID == x.IIISDAServiceID)))
                    {
                        var itemUpdate = new IISDAService()
                        {
                            IIISDAServiceID = missingServiceInfo.IIISDAServiceID,
                            Name = missingServiceInfo.Name, // В ИИСДА - Регистър на услугите не е намерена услугата, да се предоставя от  АВ
                            ShortDescription = missingServiceInfo.ShortDescription,
                            Description = missingServiceInfo.Description,
                            ReadDate = missingServiceInfo.ReadDate,
                            IsDiscontinued = true
                        };

                        await IISDAServicesRepository.UpdateAsync(itemUpdate);
                    }

                    return new OperationResult(OperationResultTypes.SuccessfullyCompleted);
                });
            }
            else 
                ret = new OperationResult(OperationResultTypes.SuccessfullyCompleted);

            return ret;
        }
        
        private bool AreIISDAServiceDataEqual(IISDAService first, IISDAService second)
        {
            return first.IIISDAServiceID == second.IIISDAServiceID
                && string.Compare(first.Name, second.Name) == 0
                && string.Compare(first.Description, second.Description) == 0;
        }
    }
}

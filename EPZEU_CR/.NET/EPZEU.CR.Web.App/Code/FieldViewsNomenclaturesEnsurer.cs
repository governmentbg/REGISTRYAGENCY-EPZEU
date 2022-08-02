using Integration.EPZEU.Nomenclatures;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace EPZEU.CR.Web.App.Code
{
    public interface IFieldViewsNomenclaturesEnsurer
    {
        Task EnsureNomenclaturesAsync(CancellationToken cancellationToken);
    }

    internal sealed class FieldViewsNomenclaturesEnsurer : IFieldViewsNomenclaturesEnsurer
    {
        private readonly EPZEU.Nomenclatures.IAuthorities _authorities;
        private readonly IBankruptcySenderTypes _bankruptcySenderTypes;
        private readonly IBankruptcySuspendReasons _bankruptcySuspendReasons;
        private readonly ITrusteeStatuses _trusteeStatuses;
        private readonly IForeignComRegisters _foreignComRegisters;
        private readonly IForeignLegalForms _foreignLegalForms;
        private readonly ISectionGroupFields _sectionGroupFields;
        private readonly IBankruptcyMerits _bankruptcyMerits;
        private readonly IBankruptcyActTypes _bankruptcyActTypes;
        private readonly ILegalFormFields _legalFormFields;

        public FieldViewsNomenclaturesEnsurer(
            EPZEU.Nomenclatures.IAuthorities authorities
            , IBankruptcySenderTypes bankruptcySenderTypes
            , IBankruptcySuspendReasons bankruptcySuspendReasons
            , ITrusteeStatuses trusteeStatuses
            , IForeignComRegisters foreignComRegisters
            , IForeignLegalForms foreignLegalForms
            , ISectionGroupFields sectionGroupFields
            , IBankruptcyMerits bankruptcyMerits
            , IBankruptcyActTypes bankruptcyActTypes
            , ILegalFormFields legalFormFields)
        {
            _authorities = authorities;
            _bankruptcySenderTypes = bankruptcySenderTypes;
            _bankruptcySuspendReasons = bankruptcySuspendReasons;
            _trusteeStatuses = trusteeStatuses;
            _foreignComRegisters = foreignComRegisters;
            _foreignLegalForms = foreignLegalForms;
            _sectionGroupFields = sectionGroupFields;
            _bankruptcyMerits = bankruptcyMerits;
            _bankruptcyActTypes = bankruptcyActTypes;
            _legalFormFields = legalFormFields;
        }

        public Task EnsureNomenclaturesAsync(CancellationToken cancellationToken)
        {
            return Task.WhenAll(CreateConfigurationTasks(cancellationToken));
        }

        private IEnumerable<Task> CreateConfigurationTasks(CancellationToken cancellationToken)
        {
            yield return _authorities.EnsureLoadedAsync(cancellationToken).AsTask();
            yield return _bankruptcySenderTypes.EnsureLoadedAsync(cancellationToken).AsTask();
            yield return _bankruptcySuspendReasons.EnsureLoadedAsync(cancellationToken).AsTask();
            yield return _trusteeStatuses.EnsureLoadedAsync(cancellationToken).AsTask();
            yield return _foreignComRegisters.EnsureLoadedAsync(cancellationToken).AsTask();
            yield return _foreignLegalForms.EnsureLoadedAsync(cancellationToken).AsTask();
            yield return _sectionGroupFields.EnsureLoadedAsync(cancellationToken).AsTask();
            yield return _bankruptcyMerits.EnsureLoadedAsync(cancellationToken).AsTask();
            yield return _bankruptcyActTypes.EnsureLoadedAsync(cancellationToken).AsTask();
            yield return _legalFormFields.EnsureLoadedAsync(cancellationToken).AsTask();
        }
    }
}

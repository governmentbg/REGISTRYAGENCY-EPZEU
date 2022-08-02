using CNSys.Caching;

namespace EPZEU.Utilities.Caching
{
    internal class NpgDbChangeToken : GenericChangeToken
    {
        private readonly IDbCacheInvalidationDispatcher _npgNotificationDispatcher;
        private string _tableName;

        public NpgDbChangeToken(string tableName, IDbCacheInvalidationDispatcher npgNotificationDispatcher)
        {
            _tableName = tableName;
            _npgNotificationDispatcher = npgNotificationDispatcher;
        }

        protected override void TokenCreated()
        {
            _npgNotificationDispatcher.RegisterListener(_tableName, ListenerCallback);
        }

        protected override void TokenReleased()
        {
            _npgNotificationDispatcher.UnregisterListener(_tableName, ListenerCallback);
        }

        private void ListenerCallback(object sender)
        {
            OnChanged();
        }
    }
}

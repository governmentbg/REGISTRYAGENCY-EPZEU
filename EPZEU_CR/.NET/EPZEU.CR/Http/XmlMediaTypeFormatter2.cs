using Microsoft.Extensions.ObjectPool;
using System;
using System.IO;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Text;
using System.Xml;

namespace EPZEU.CR.Http
{
    /// <summary>
    /// XmlMediaTypeFormatter with XmlNameTable pooling for better perfromance!
    /// </summary>
    internal class XmlMediaTypeFormatter2 : XmlMediaTypeFormatter
    {
        private ObjectPool<XmlNamespaceManager> _nsManagerPool;

        #region Constructors

        public XmlMediaTypeFormatter2()
        {
            DefaultObjectPoolProvider defaultObjectPoolProvider = new DefaultObjectPoolProvider();

            _nsManagerPool = defaultObjectPoolProvider.Create(new XmlNamespaceManagerPoolPolicy());
        }

        #endregion

        #region Internal Types

        private class XmlNamespaceManagerPoolPolicy : IPooledObjectPolicy<XmlNamespaceManager>
        {
            public XmlNamespaceManager Create()
            {
                return new XmlNamespaceManager(new NameTable());
            }

            public bool Return(XmlNamespaceManager obj)
            {
                return true;
            }
        }

        internal class DisposingXmlReader : CNSys.Xml.WrappingXmlReader
        {
            private Action _disposeCallBack;
            public DisposingXmlReader(XmlReader innerReader, Action disposeCallback) :
                base(innerReader)
            {
                if (disposeCallback == null)
                    throw new ArgumentNullException("disposedCallback");
                _disposeCallBack = disposeCallback;
            }

            protected override void Dispose(bool disposing)
            {
                base.Dispose(disposing);

                _disposeCallBack();
            }
        }

        #endregion

        protected override XmlReader CreateXmlReader(Stream readStream, HttpContent content)
        {
            XmlNamespaceManager nsManager = _nsManagerPool.Get();

            Encoding effectiveEncoding = SelectCharacterEncoding(content == null ? null : content.Headers);

            return new DisposingXmlReader(XmlReader.Create(
                readStream,
                new XmlReaderSettings() { CloseInput = false },
                new XmlParserContext(nsManager.NameTable, nsManager, null, XmlSpace.None, effectiveEncoding)),
                () =>
                {
                    _nsManagerPool.Return(nsManager);
                });
        }
    }
}

using System.Collections.Generic;

namespace EPZEU.Signing.Models
{
    public class SignatursVerificationResponse
    {
        [Newtonsoft.Json.JsonProperty("code", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string Code { get; set; }

        /// <summary>Response message</summary>
        [Newtonsoft.Json.JsonProperty("message", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string Message { get; set; }

        /// <summary>Validated signed document status</summary>
        [Newtonsoft.Json.JsonProperty("documentStatusValid", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string DocumentStatusValid { get; set; }

        /// <summary>Number of signatures over the validating document</summary>
        [Newtonsoft.Json.JsonProperty("signaturesCount", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public int? SignaturesCount { get; set; }

        /// <summary>Number of valid signatures over the validating document</summary>
        [Newtonsoft.Json.JsonProperty("validSignaturesCount", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public int? ValidSignaturesCount { get; set; }

        /// <summary>Validation time in miliseconds from 1970</summary>
        [Newtonsoft.Json.JsonProperty("validationDateTime", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public long? ValidationDateTime { get; set; }

        /// <summary>Base 64 encoded simple report XML</summary>
        [Newtonsoft.Json.JsonProperty("base64EncodedSimpleReportXML", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string Base64EncodedSimpleReportXML { get; set; }

        /// <summary>Base 64 encoded detailed report XML</summary>
        [Newtonsoft.Json.JsonProperty("base64EncodedDetailedReportXML", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string Base64EncodedDetailedReportXML { get; set; }

        /// <summary>Single signature data</summary>
        [Newtonsoft.Json.JsonProperty("signatures", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public ICollection<SignatuerData> Signatures { get; set; }

        [Newtonsoft.Json.JsonIgnore]
        public bool IsSignatursValid
        {
            get
            {
                return DocumentStatusValid == "TRUE" && SignaturesCount == ValidSignaturesCount;
            }
        }
    }

    public class SignatuerData
    {
        /// <summary>Signature Id</summary>
        [Newtonsoft.Json.JsonProperty("signatureId", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string SignatureId { get; set; }

        /// <summary>Signature valid</summary>
        [Newtonsoft.Json.JsonProperty("signatureValid", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string SignatureValid { get; set; }

        /// <summary>Digest algorithm</summary>
        [Newtonsoft.Json.JsonProperty("digestAlgorithm", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string DigestAlgorithm { get; set; }

        /// <summary>Signature algorithm</summary>
        [Newtonsoft.Json.JsonProperty("signatureAlgorithm", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string SignatureAlgorithm { get; set; }

        /// <summary>Signature file name</summary>
        [Newtonsoft.Json.JsonProperty("signatureFileName", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string SignatureFileName { get; set; }

        /// <summary>Signature file content type</summary>
        [Newtonsoft.Json.JsonProperty("signatureFileContentType", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string SignatureFileContentType { get; set; }

        /// <summary>Signature form</summary>
        [Newtonsoft.Json.JsonProperty("signatureForm", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string SignatureForm { get; set; }

        /// <summary>Signature format</summary>
        [Newtonsoft.Json.JsonProperty("signatureFormat", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string SignatureFormat { get; set; }

        /// <summary>Signature time in miliseconds from 1970</summary>
        [Newtonsoft.Json.JsonProperty("signatureTime", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public long? SignatureTime { get; set; }

        /// <summary>Signed by</summary>
        [Newtonsoft.Json.JsonProperty("signedBy", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string SignedBy { get; set; }

        /// <summary>Signer Certificate DN</summary>
        [Newtonsoft.Json.JsonProperty("signerCertificateDN", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string SignerCertificateDN { get; set; }

        /// <summary>Signer certificate</summary>
        [Newtonsoft.Json.JsonProperty("signerBase64EncodedCertificate", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string SignerBase64EncodedCertificate { get; set; }

        /// <summary>Signer personal identifier</summary>
        [Newtonsoft.Json.JsonProperty("signerPersonalIdentifier", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string SignerPersonalIdentifier { get; set; }

        /// <summary>Signer organization identifier</summary>
        [Newtonsoft.Json.JsonProperty("signerOrganizationIdentifier", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string SignerOrganizationIdentifier { get; set; }

        /// <summary>Signer certificate serial number identifier</summary>
        [Newtonsoft.Json.JsonProperty("signerCertificateSerialNumber", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string SignerCertificateSerialNumber { get; set; }

        /// <summary>Signer certificate signature is valid</summary>
        [Newtonsoft.Json.JsonProperty("signerCertificateSignatureIsValid", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string SignerCertificateSignatureIsValid { get; set; }

        /// <summary>Signer certificate is trusted</summary>
        [Newtonsoft.Json.JsonProperty("signerCertificateIsTrusted", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string SignerCertificateIsTrusted { get; set; }

        /// <summary>Signer certificate is revoked</summary>
        [Newtonsoft.Json.JsonProperty("signerCertificateIsRevoked", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string SignerCertificateIsRevoked { get; set; }

        /// <summary>Signer certificate digest algorithm</summary>
        [Newtonsoft.Json.JsonProperty("signerCertificateDigestAlgorithm", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string SignerCertificateDigestAlgorithm { get; set; }

        /// <summary>Signer certificate signature algorithm</summary>
        [Newtonsoft.Json.JsonProperty("signerCertificateSignatureAlgorithm", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string SignerCertificateSignatureAlgorithm { get; set; }

        /// <summary>Issuer certificate DN</summary>
        [Newtonsoft.Json.JsonProperty("issuerCertificateDN", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string IssuerCertificateDN { get; set; }

        /// <summary>Issuer certificate</summary>
        [Newtonsoft.Json.JsonProperty("issuerBase64EncodedCertificate", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string IssuerBase64EncodedCertificate { get; set; }

        /// <summary>Trusted anchor certificate DN</summary>
        [Newtonsoft.Json.JsonProperty("trustedAnchorCertificateDN", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string TrustedAnchorCertificateDN { get; set; }

        /// <summary>Trusted anchor certificate</summary>
        [Newtonsoft.Json.JsonProperty("trustedAnchorBase64EncodedCertificate", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string TrustedAnchorBase64EncodedCertificate { get; set; }

        /// <summary>Timestamp detailed data</summary>
        [Newtonsoft.Json.JsonProperty("timestamps", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public System.Collections.Generic.ICollection<TimestampToken> Timestamps { get; set; }

        /// <summary>Revocation detailed data</summary>
        [Newtonsoft.Json.JsonProperty("revocationTokens", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public ICollection<RevocationToken> RevocationTokens { get; set; }

        /// <summary>Signature info list</summary>
        [Newtonsoft.Json.JsonProperty("signatureInfoList", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public ICollection<string> SignatureInfoList { get; set; }

        /// <summary>Signature warning list</summary>
        [Newtonsoft.Json.JsonProperty("signatureWarningsList", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public ICollection<string> SignatureWarningsList { get; set; }

        /// <summary>Signature error list</summary>
        [Newtonsoft.Json.JsonProperty("signatureErrorsList", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public ICollection<string> SignatureErrorsList { get; set; }
    }

    public class TimestampToken
    {
        /// <summary>Timestamp token signature valid</summary>
        [Newtonsoft.Json.JsonProperty("timestampSignatureValid", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string TimestampSignatureValid { get; set; }

        /// <summary>Timestamp token signature trusted</summary>
        [Newtonsoft.Json.JsonProperty("timestampTrusted", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string TimestampTrusted { get; set; }

        /// <summary>Timestamp token time in miliseconds from 1970</summary>
        [Newtonsoft.Json.JsonProperty("timestampGenerationTime", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public long? TimestampGenerationTime { get; set; }

        /// <summary>Timestamp type</summary>
        [Newtonsoft.Json.JsonProperty("timestampType", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string TimestampType { get; set; }

        /// <summary>Timestamp issuer</summary>
        [Newtonsoft.Json.JsonProperty("timestampCertificateDN", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string TimestampCertificateDN { get; set; }

        /// <summary>Timestamp certificate</summary>
        [Newtonsoft.Json.JsonProperty("timestampBase64EncodedCertificate", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string TimestampBase64EncodedCertificate { get; set; }

        /// <summary>Timestamp digest algorithm</summary>
        [Newtonsoft.Json.JsonProperty("timestampDigestAlgorithm", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string TimestampDigestAlgorithm { get; set; }

        /// <summary>Timestamp signature algorithm</summary>
        [Newtonsoft.Json.JsonProperty("timestampSignatureAlgorithm", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string TimestampSignatureAlgorithm { get; set; }
    }

    public class RevocationToken
    {
        /// <summary>Signer certificate revocation reason</summary>
        [Newtonsoft.Json.JsonProperty("revocationReason", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public string RevocationReason { get; set; }

        /// <summary>Revocation time in miliseconds from 1970</summary>
        [Newtonsoft.Json.JsonProperty("revocationTime", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public long? RevocationTime { get; set; }

        /// <summary>Revocation token production time in miliseconds from 1970</summary>
        [Newtonsoft.Json.JsonProperty("revocationTokenProductionTime", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
        public long? RevocationTokenProductionTime { get; set; }
    }
}

namespace EPZEU.Signing.Models
{
    public class BtrustUserInputRequest
    {
        public string Input { get; set; }

        public BtrustUserInputTypes? InputType { get; set; }

        public string Otp { get; set; }

        public string CreateRpToClientAuthorizationHeder()
        {
            if (string.IsNullOrEmpty(Input) || InputType == null || InputType == BtrustUserInputTypes.PROFILE)
                return null;

            string headerValue = string.Format("personalId:{0}"
                , InputType.Value == BtrustUserInputTypes.LNCH ? string.Format("PI:BG-{0}", Input): Input);

            return headerValue;
        }

        public string CreateClientTokenHeader(string clientToken)
        {
            string tokenHeaderValue = string.Format("clientToken:{0}", clientToken);

            return tokenHeaderValue;
        }
    }

    public enum BtrustUserInputTypes
    {
        EGN = 0,

        LNCH = 1,

        PROFILE = 2
    }
}

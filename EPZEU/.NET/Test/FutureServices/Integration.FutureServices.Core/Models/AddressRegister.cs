using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Integration.FutureServices.Core.Models
{
    public class Address
    {
        public string DistrictEkatte { get; set; }

        public string MunicipalityEkatte { get; set; }

        public string SettlementEKATTE { get; set; }

        public string AreaEkatte { get; set; }

        public string HousingEstate { get; set; }

        public string Street { get; set; }

        public string StreetNumber { get; set; }

        public string Block { get; set; }

        public string Entrance { get; set; }

        public string Floor { get; set; }

        public string Apartment { get; set; }
    }

    public class AddressRegisterRequest : Address
    {
    }

    public class AddressRegisterResponse
    {
        public Address Address { get; set; }

        public bool? AddressExists { get; set; }
    }
}

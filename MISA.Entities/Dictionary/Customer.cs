using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MISA.Entities
{
       public class Customer
       {
        [Key]
        [Column(Order = 1)]
        public Guid refID { get; set; }

        [Key]
        [Column(Order = 2)]
        [Required]
        public string customerId { get; set; }
        [Required]
        public string customerName { get; set; }
        [Required]
        public string phone { get; set; }
        public string customerGroup { get; set; }
        public string company { get; set; }
        public string taxCode { get; set; }

        public string andress { get; set; }

        public string email { get; set; }

        public string membershipCard { get; set; }

        public string levelCard { get; set; }
        [Required]
        public DateTime born { get; set; }

        public string note { get; set; }
        public string member5food { get; set; }

        public string status { get; set; }
    }
}

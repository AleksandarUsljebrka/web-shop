using Data.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models
{
    public class Salesman:User, ISalesman
    {

        public ICollection<Article> Articles { get; set; }

        public SalesmanStatus ApprovalStatus { get; set; }
    }
}

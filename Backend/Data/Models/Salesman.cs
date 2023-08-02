using Data.Models.Interfaces;
using System.Collections.Generic;

namespace Data.Models
{
    public class Salesman:User, ISalesman
    {

        public ICollection<Article> Articles { get; set; }

        public SalesmanStatus ApprovalStatus { get; set; }
    }
}

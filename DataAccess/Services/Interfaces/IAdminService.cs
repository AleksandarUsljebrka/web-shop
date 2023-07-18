using DataAccess.Results;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Services.Interfaces
{
    public interface IAdminService
    {
        public IResult GetAllSalesmen();
        public IResult GetAllOrders();
        public IResult GetOrder(long id);
    }
}

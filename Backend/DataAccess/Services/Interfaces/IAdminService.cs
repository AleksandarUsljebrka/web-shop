using DataAccess.DTO.Salesman;
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
        IResult GetAllSalesmen();
        IResult GetAllOrders();
        IResult GetOrder(long id);
        IResult UpdateSalesmanStatus(SalesmanStatusDto salesmanStatusDto);
    }
}

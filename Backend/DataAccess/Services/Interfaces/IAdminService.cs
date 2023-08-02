using DataAccess.DTO.Salesman;
using DataAccess.Results;

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

using DataAccess.DTO.Order;
using DataAccess.Results;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Services.Interfaces
{
    public interface ICustomerService
    {
        public IResult GetArticles();
        public IResult GetFinishedOrders(string token);
        public IResult OrderDetails(long id);
        public IResult PendingOrders(string token);
        public IResult PlaceOrder(PlaceOrderDto placedOrderDto, string token);
        public IResult CancelOrder(long id, string token);


    }
}

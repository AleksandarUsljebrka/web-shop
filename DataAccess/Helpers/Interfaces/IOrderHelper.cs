using Data.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Helpers.Interfaces
{
    public interface IOrderHelper
    {
        public string GetRemainingTime(DateTime placedTime, int duration);
        public List<IOrder> GetFinishedOrders(List<IOrder> orders);

    }
}

using Data.Models.Interfaces;
using DataAccess.Helpers.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Helpers
{
    public class OrderHelper : IOrderHelper
    {
        public string GetRemainingTime(DateTime placedTime, int duration)
        {
            int passedTime = (int)(DateTime.Now - placedTime).TotalSeconds;
            int leftTime = duration - passedTime;

            if (leftTime < 0)
                leftTime = 0;

            string stringTime = TimeSpan.FromSeconds(leftTime).ToString(@"hh\:mm\:ss");
            return stringTime;
        }

        public List<IOrder> GetFinishedOrders(List<IOrder> orders)
        {
            int passedTime;
            int leftTime;
            List<IOrder> finishedOrders = new List<IOrder>();
            foreach(var order in orders)
            {
                passedTime = (int)(DateTime.Now - order.PlacedTime).TotalSeconds;
                leftTime = order.DeliveryDurationInSeconds - passedTime;
                if (leftTime < 0)
                    finishedOrders.Add(order);
            }
            return finishedOrders;
        }
    }
}

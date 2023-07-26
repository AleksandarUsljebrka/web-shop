using Data.Configurations.Context;
using Data.Models;
using Data.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repository
{
    public class OrderRepository: Repository<Order>, IOrderRepository
    {
        private readonly object lockObj = new object();
        public OrderRepository(ShopDbContext context) : base(context)
        { 
        }

		public IEnumerable<Order> FindAllIncludeItems(Expression<Func<Order, bool>> expression)
		{
			lock (lockObj)
			{
				var result = _context.Set<Order>().Include(order => order.Items).Where(expression).ToList();

				return result;
			}
		}

		public IEnumerable<Order> FindAllIncludeItemsIncludeArticles(Expression<Func<Order, bool>> expression)
		{
			lock (lockObj)
			{
				var result = _context.Set<Order>().Include(order => order.Items).ThenInclude(item => item.Article).Where(expression).ToList();

				return result;
			}
		}
		public Order FindFirstIncludeItems(Expression<Func<Order, bool>> expression)
		{
			lock (lockObj)
			{
				var result = _context.Set<Order>().Include(order => order.Items).FirstOrDefault(expression);

				return result;
			}
		}

	}
}

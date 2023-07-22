using Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repository.Interfaces
{
    public interface IOrderRepository:IRepository<Order>
    {
		public IEnumerable<Order> FindAllIncludeItems(Expression<Func<Order, bool>> expression);

		public IEnumerable<Order> FindAllIncludeItemsIncludeArticles(Expression<Func<Order, bool>> expression);
		public Order FindFirstIncludeItems(Expression<Func<Order, bool>> expression);
	}
}

﻿using Data.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Data.Repository.Interfaces
{
    public interface IOrderRepository:IRepository<Order>
    {
		public IEnumerable<Order> FindAllIncludeItems(Expression<Func<Order, bool>> expression);

		public IEnumerable<Order> FindAllIncludeItemsIncludeArticles(Expression<Func<Order, bool>> expression);
		public Order FindFirstIncludeItems(Expression<Func<Order, bool>> expression);
	}
}

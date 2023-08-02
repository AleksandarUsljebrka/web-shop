using Data.Configurations.Context;
using Data.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Data.Repository
{
    public class Repository<T>: IRepository<T> where T:class
    {
		private readonly object lockObj = new object();
		protected readonly ShopDbContext _context;

		public Repository(ShopDbContext context)
		{
			_context = context;
		}

		public void Add(T entity)
		{
			lock (lockObj)
			{
				_context.Set<T>().Add(entity);
			}
		}

		public IEnumerable<T> GetAll()
		{
			lock (lockObj)
			{
				var result = _context.Set<T>().ToList();

				return result;
			}
		}

		public T GetById(long id)
		{
			lock (lockObj)
			{
				var result = _context.Set<T>().Find(id);

				return result;
			}
		}

		public void Delete(T entity)
		{
			lock (lockObj)
			{
				_context.Set<T>().Remove(entity);
			}
		}


		public void Update(T entity)
		{
			lock (lockObj)
			{
				_context.Set<T>().Update(entity);
			}
		}
        public T FindFirst(Expression<Func<T, bool>> expression)
        {
			lock(lockObj)
            {
				var res = _context.Set<T>().Where(expression).FirstOrDefault();
				return res;
			}
        }
		

	}
}

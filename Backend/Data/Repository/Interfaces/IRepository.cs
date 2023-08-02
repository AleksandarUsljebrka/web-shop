using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Data.Repository.Interfaces
{
    public interface IRepository<T>
    {
        T FindFirst(Expression<Func<T, bool>> expression); 
        T GetById(long id);
        IEnumerable<T> GetAll();
        void Add(T entity);
        void Update(T entity);
        void Delete(T entity);
    }
}

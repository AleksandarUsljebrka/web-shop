using Data.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Data.Repository.Interfaces
{
    public interface IItemRepository:IRepository<Item>
    {
        IEnumerable<Item> FindAllIncludeArticles(Expression<Func<Item, bool>> expression);

    }
}

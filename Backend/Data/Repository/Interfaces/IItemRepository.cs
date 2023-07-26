using Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repository.Interfaces
{
    public interface IItemRepository:IRepository<Item>
    {
        IEnumerable<Item> FindAllIncludeArticles(Expression<Func<Item, bool>> expression);

    }
}

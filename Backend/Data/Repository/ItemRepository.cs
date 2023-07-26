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
    public class ItemRepository: Repository<Item>, IItemRepository
    {
        private readonly object lockObj = new Object();
        public ItemRepository(ShopDbContext context):base(context)
        {

        }
        public IEnumerable<Item> FindAllIncludeArticles(Expression<Func<Item, bool>> expression)
        {
            lock (lockObj)
            {
                var result = _context.Set<Item>().Include(item => item.Article).Where(expression).ToList();

                return result;
            }
        }
    }
}

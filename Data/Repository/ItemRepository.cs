using Data.Configurations.Context;
using Data.Models;
using Data.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repository
{
    public class ItemRepository: Repository<Item>, IItemRepository
    {
        public ItemRepository(WebShopDbContext context):base(context)
        {

        }
    }
}

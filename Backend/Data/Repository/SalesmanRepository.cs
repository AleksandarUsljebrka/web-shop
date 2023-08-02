using Data.Configurations.Context;
using Data.Models;
using Data.Repository.Interfaces;

namespace Data.Repository
{
    public class SalesmanRepository: Repository<Salesman>, ISalesmanRepository
    {
        public SalesmanRepository(ShopDbContext context):base(context)
        {
        }
    }
}

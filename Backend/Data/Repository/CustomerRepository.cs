using Data.Configurations.Context;
using Data.Models;
using Data.Repository.Interfaces;

namespace Data.Repository
{
    public class CustomerRepository: Repository<Customer>, ICustomerRepository
    {
        public CustomerRepository(ShopDbContext context):base(context)
        {

        }
    }
}

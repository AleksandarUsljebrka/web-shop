using Data.Configurations.Context;
using Data.Models;
using Data.Repository.Interfaces;

namespace Data.Repository
{
    public class AdminRepository:Repository<Admin>, IAdminRepository
    {
        public AdminRepository(ShopDbContext context) : base(context)
        {

        }
    }
}

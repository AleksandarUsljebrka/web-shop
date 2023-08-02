using Data.Models;
using Data.Models.Interfaces;
using Data.Repository.UnitOfWork;
using DataAccess.Helpers.Interfaces;

namespace DataAccess.Helpers
{
    public class UserHelper: IUserHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        
        public UserHelper(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }
        public bool UserExists(string username, string email)
        {
            var userByUsername = UserByUsername(username);
            var userByEmail = UserByEmail(email);

            if (userByEmail != null || userByUsername != null)
                return true;
            return false;
        }
        public IUser UserByUsername(string username)
        {
            if(_unitOfWork.AdminRepository.FindFirst(u=>u.Username == username) is Admin admin)
            {
                return admin;
            }
            else if(_unitOfWork.CustomerRepository.FindFirst(c => c.Username == username) is Customer customer)
            {
                return customer;
            }
            else if(_unitOfWork.SalesmanRepository.FindFirst(s => s.Username == username) is Salesman salesman)
            {
                return salesman;
            }
            return null;
        }
        public IUser UserByEmail(string email)
        {
            if (_unitOfWork.AdminRepository.FindFirst(u => u.Email == email) is Admin admin)
            {
                return admin;
            }
            else if (_unitOfWork.CustomerRepository.FindFirst(c => c.Email == email) is Customer customer)
            {
                return customer;
            }
            else if (_unitOfWork.SalesmanRepository.FindFirst(s => s.Email == email) is Salesman salesman)
            {
                return salesman;
            }
            return null;
        }

        public IUser UserByToken(string token, ITokenHelper _tokenHelper)
        {
            long id = int.Parse(_tokenHelper.GetClaim(token, "id"));
            string role = _tokenHelper.GetClaim(token, "role");
            IUser user;
            if (role.Equals("Admin") && _unitOfWork.AdminRepository.FindFirst(a => a.Id == id) is Admin admin)
                user = (IUser)admin;
            else if (role.Equals("Customer") && _unitOfWork.CustomerRepository.FindFirst(c => c.Id == id) is Customer customer)
                user = (IUser)customer;
            else if (role.Equals("Salesman") && _unitOfWork.SalesmanRepository.FindFirst(s => s.Id == id) is Salesman salesman)
                user = (IUser)salesman;
            else 
                return null;
            
            return user;
        }
    }
}

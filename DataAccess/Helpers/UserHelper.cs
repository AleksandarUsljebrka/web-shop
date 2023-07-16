using Data.Models;
using Data.Models.Interfaces;
using Data.Repository.UnitOfWork;
using DataAccess.Helpers.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
    }
}

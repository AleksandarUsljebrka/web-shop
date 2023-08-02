using AutoMapper;
using Data.Models;
using Data.Models.Interfaces;
using Data.Repository.UnitOfWork;
using DataAccess.DTO.User;
using DataAccess.Helpers;
using DataAccess.Helpers.Interfaces;
using DataAccess.Results;
using DataAccess.Services.Interfaces;

namespace DataAccess.Services
{
    public class UserService:IUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserHelper _userHelper;
        private readonly IMapper _mapper;
        private readonly ITokenHelper _tokenHelper;
        private readonly IAuthHelper _authHelper = new AuthHelper();
        public UserService(IUnitOfWork unitOfWork, ITokenHelper tokenHelper, IMapper mapper)
        {
            _tokenHelper = tokenHelper;
            _unitOfWork = unitOfWork;
            _userHelper = new UserHelper(unitOfWork);
            _mapper = mapper;
        }

        public IResult GetUser(string token)
        {
            IResult result;

            IUser user = _userHelper.UserByToken(token, _tokenHelper);
            if (user == null)
            {
                result = new Result(false, ErrorCode.NotFound, "User doesn't exists!");
                return result;
            }
            UserDto userDto = _mapper.Map<UserDto>(user);

            result = new Result(true, userDto);
            return result;
        }

        public IResult UpdateUser(string token, UserDto newUserDto)
        {
            IResult result;
            IUser currentUser = _userHelper.UserByToken(token, _tokenHelper);
            IUser newUser = _mapper.Map<User>(newUserDto);

            if (currentUser == null)
            {
                result = new Result(false, ErrorCode.NotFound, "User doesn't exists!");
                return result;
            }
            if (newUser == null)
            {
                result = new Result(false, ErrorCode.BadRequest, "Can't update!");
                return result;
            }
            if (_userHelper.UserByUsername(newUser.Username) != null && newUser.Username != currentUser.Username)
            {
                result = new Result(false, ErrorCode.Conflict, $"Username {newUser.Username} already exists!");
                return result;
            }

            currentUser.Username = newUser.Username;
            currentUser.Firstname = newUser.Firstname;
            currentUser.Lastname = newUser.Lastname;
            currentUser.Address = newUser.Address;
            currentUser.Email = newUser.Email;
            if (newUser.Birthdate != System.DateTime.MinValue)
                currentUser.Birthdate = newUser.Birthdate;

            if (currentUser is Admin)
                _unitOfWork.AdminRepository.Update((Admin)currentUser);
            else if (currentUser is Salesman)
                _unitOfWork.SalesmanRepository.Update((Salesman)currentUser);
            else if (currentUser is Customer)
                _unitOfWork.CustomerRepository.Update((Customer)currentUser);
            else
            {
                result = new Result(false, ErrorCode.NotFound);
                return result;
            }

            _unitOfWork.SaveChanges();
            result = new Result(true);
            return result;
        }

        public IResult ChangePassword(string token, PasswordDto passwordDto)
        {
            IResult result;
            IUser user = _userHelper.UserByToken(token, _tokenHelper);

            if (user == null)
            {
                result = new Result(false, ErrorCode.NotFound, "User doesn't exists!");
                return result;
            }
            if (!_tokenHelper.PasswordValidation(passwordDto.OldPassword, user.Password))
            {
                result = new Result(false, ErrorCode.Unauthorized, "Invalid password");
                return result;
            }
            if (passwordDto.NewPassword.Length <= 3)
            {
                result = new Result(false, ErrorCode.BadRequest, "Password is too short!");
                return result;
            }
            user.Password = _authHelper.HashPassword(passwordDto.NewPassword);

            if (user is Admin)
                _unitOfWork.AdminRepository.Update((Admin)user);
            else if (user is Salesman)
                _unitOfWork.SalesmanRepository.Update((Salesman)user);
            else if (user is Customer)
                _unitOfWork.CustomerRepository.Update((Customer)user);
            else
            {
                result = new Result(false, ErrorCode.NotFound);
                return result;
            }

            _unitOfWork.SaveChanges();
            result = new Result(true);
            return result;

        }
    }
}

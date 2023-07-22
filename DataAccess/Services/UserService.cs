using AutoMapper;
using Data.Models.Interfaces;
using Data.Repository.UnitOfWork;
using DataAccess.DTO.User;
using DataAccess.Helpers;
using DataAccess.Helpers.Interfaces;
using DataAccess.Results;
using DataAccess.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Services
{
    public class UserService:IUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserHelper _userHelper;
        private readonly IMapper _mapper;
        private readonly ITokenHelper _tokenHelper;
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

    }
}

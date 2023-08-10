﻿using Data.Repository.UnitOfWork;
using DataAccess.DTO.Auth;
using DataAccess.Results;
using DataAccess.Helpers.Interfaces;
using Data.Models.Interfaces;
using Data.Models;
using AutoMapper;
using DataAccess.Services.Interfaces;
using DataAccess.Helpers;

namespace DataAccess.Services
{
    public class AuthService: IAuthService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserHelper _userHelper;
        private readonly IAuthHelper _authHelper = new AuthHelper();
        private readonly IMapper _mapper;
        private readonly ITokenHelper _tokenHelper;
        private readonly IImageHelper _imageHelper = new ImageHelper();
        public AuthService(IUnitOfWork unitOfWork, IMapper mapper, ITokenHelper tokenHelper)
        {
            _tokenHelper = tokenHelper;
            _unitOfWork = unitOfWork;
            _userHelper = new UserHelper(_unitOfWork);
            _mapper = mapper;
      
        }
        public IResult Register(RegisterDto regDto)
        {
            IResult result;
            if(_userHelper.UserExists(regDto.Username, regDto.Email))
            {
                result = new Result(false, ErrorCode.Conflict, "User already exists!");
                return result;
            }
            if(!_authHelper.IsValidEmail(regDto.Email))
            {
                result = new Result(false, ErrorCode.BadRequest, "Email address is not valid!");
                return result;
            }
        
            if(regDto.Role.Contains("Customer"))
            {
                Customer customer = _mapper.Map<Customer>(regDto);
                customer.Password = _authHelper.HashPassword(regDto.Password);
                _imageHelper.UploadProfileImage(customer, regDto.ProfileImage);
                _unitOfWork.CustomerRepository.Add(customer);
            }
            else if(regDto.Role.Contains("Admin"))
            {
                Admin admin = _mapper.Map<Admin>(regDto);
                admin.Password = _authHelper.HashPassword(regDto.Password);
                _imageHelper.UploadProfileImage(admin, regDto.ProfileImage);
                _unitOfWork.AdminRepository.Add(admin);
            }
            else if(regDto.Role.Contains("Salesman"))
            {
                Salesman salesman = _mapper.Map<Salesman>(regDto);
                salesman.ApprovalStatus = SalesmanStatus.Pending;
                salesman.Password = _authHelper.HashPassword(regDto.Password);
                _imageHelper.UploadProfileImage(salesman, regDto.ProfileImage);
                _unitOfWork.SalesmanRepository.Add(salesman);
            }
            else
            {
                result = new Result(false, ErrorCode.BadRequest);
                return result;
            }

            _unitOfWork.SaveChanges();
            return new Result(true);
        }

        public IResult Login(LoginDto logDto)
        {
            IResult result;
            IUser user = _userHelper.UserByUsername(logDto.Username);
            if (user == null)
            {
                result = new Result(false, ErrorCode.NotFound, "User not found");
                return result;
            }
            if (!_tokenHelper.PasswordValidation(logDto.Password, user.Password))
            {
                result = new Result(false, ErrorCode.BadRequest, "Incorrect password");
                return result;
            }
            string token = _tokenHelper.GetToken(user);
            TokenDto tokenDto = new TokenDto(token);
            
            result = new Result(true, tokenDto);
            return result;
        }
    }
}

using Data.Repository.UnitOfWork;
using DataAccess.DTO.Auth;
using DataAccess.Results;
using DataAccess.Helpers.Interfaces;
using Data.Models.Interfaces;
using Data.Models;
using AutoMapper;
using DataAccess.Services.Interfaces;
using DataAccess.Helpers;
using FluentEmail.Core;
using Google.Apis.Auth;
using System;

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

                string mailMessage = $"Hello {salesman.Firstname}, your account is created, please wait for approval from the Admin.";
                _authHelper.SendEmail(mailMessage);
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
        public IResult GoogleLogin(GoogleLoginDto idToken)
        {
            IResult result;
           
            GoogleJsonWebSignature.Payload payload = GoogleJsonWebSignature.ValidateAsync(idToken.Credential).Result;

            IUser user = _userHelper.UserByEmail(payload.Email);
            if (user == null)
            {
                result = new Result(false, ErrorCode.NotFound, "User not found");
                return result;
            }

            string token = _tokenHelper.GetTokenGoogle(user);

            if (token == null)
            {
                result = new Result(false, ErrorCode.BadRequest, "Bad request");
                return result;
            }
            TokenDto tokenDto = new TokenDto(token);
          
            result = new Result(true, tokenDto);
            return result;
            
           
        }

        public IResult GoogleRegister(GoogleLoginDto idToken)
        {
            IResult result;

            GoogleJsonWebSignature.Payload payload = GoogleJsonWebSignature.ValidateAsync(idToken.Credential).Result;

            IUser user = _userHelper.UserByEmail(payload.Email);
            if (user == null)
            {
                string[] parts = payload.Email.Split('@');
                string username = parts[0];
                string address = username+"adr";
                DateTime birthdate = new DateTime(2000, 6, 15);

                Customer customer = new Customer(payload.Name, payload.FamilyName, username, payload.Email, address, null, birthdate);
                customer.Password = _authHelper.HashPassword("");
              //  _imageHelper.UploadProfileImage(customer, regDto.ProfileImage);
                _unitOfWork.CustomerRepository.Add(customer);
            }
            else
            {
                result = new Result(false, ErrorCode.Conflict, "User already exists!");
                return result;
            }

            _unitOfWork.SaveChanges();

            result = new Result(true);
            return result;
            //string token = _tokenHelper.GetToken(user);

            //if (token == null)
            //{
            //    result = new Result(false, ErrorCode.BadRequest, "Bad request");
            //    return result;
            //}
            //TokenDto tokenDto = new TokenDto(token);

            //result = new Result(true, tokenDto);
            //return result;


        }
        //private string VerifyGoogleToken(string googleToken)
        //{
        //    try
        //    {
        //        var payload = GoogleJsonWebSignature.ValidateAsync(googleToken, new GoogleJsonWebSignature.ValidationSettings()).Result;
        //        return payload.Subject;
        //    }
        //    catch
        //    {
        //        return null;
        //    }
        //}

    }
}

﻿namespace DataAccess.DTO.Auth
{
    public class TokenDto:IDto
    {
        public TokenDto(string token)
        {
            Token = token;
        }

        public string Token { get; set; }
    }
}

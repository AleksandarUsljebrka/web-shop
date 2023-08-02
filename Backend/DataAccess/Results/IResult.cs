using DataAccess.DTO;

namespace DataAccess.Results
{
    public interface IResult
    {
        bool Successfull { get; set; }
        string ErrorMess { get; set; }
        IDto Dto { get; set; }
        ErrorCode ErrorCode { get; set; }
        string Token { get; set; }
    }
}

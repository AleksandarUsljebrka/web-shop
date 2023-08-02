using System.Collections.Generic;

namespace DataAccess.DTO.Salesman
{
    public class SalesmanListDto:IDto
    {
        public List<SalesmanDto> Salesmen { get; set; }
    }
}

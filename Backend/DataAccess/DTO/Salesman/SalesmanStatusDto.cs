using Data.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DTO.Salesman
{
    public class SalesmanStatusDto:IDto
    {
        public bool ApprovalStatus { get; set; }
        public string Username { get; set; }
    }
}

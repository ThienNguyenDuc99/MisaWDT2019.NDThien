using MISA.DL;
using MISA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.BL
{
    public class RefBL
    {
        private CustomerDL _refDL = new CustomerDL();

        public IEnumerable<Customer> GetPagingData(int _pageIndex, int _pageSize)
        {
            var _employees = _refDL.GetData().OrderBy(p => p.customerId)
                .Skip((_pageIndex - 1) * _pageSize)
                .Take(_pageSize);
            return _employees;
        }
       
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MISA.Entities;

namespace MISA.DL
{
    public class CustomerDL
    {
        private MISAWDT02NDThienContext db = new MISAWDT02NDThienContext();

        //Hàm thực hiện lấy danh sách khách hàng
        public IEnumerable<Customer> GetData()
        {
            return db.Customers;
        }

        //Hàm thực hiện thêm mới khách hàng
        public void AddRef(Customer _ref)
        {
            _ref.refID = Guid.NewGuid();
            db.Customers.Add(_ref);
            db.SaveChanges();
        }
        /**
         * Hàm xóa một khách hàng
         * Ng tạo: NDthien
         * Time: 7:51PM 03/08/2019
         */

        public void DeleteMultiple(List<Guid> refids)
        {
            foreach (var refid in refids)
            {
                var refitem = db.Customers.Where(p => p.refID == refid).FirstOrDefault();
                db.Customers.Remove(refitem);
            }
            db.SaveChanges();
        }

        /**
         * Hàm sửa một khách hàng
         * Ng thực hiện: NDThien
         * Time: 8:09PM 03/08/2019
         */
        public void Edit(Customer refitem)
        {
            var item = db.Customers.Where(p => p.customerId == refitem.customerId).FirstOrDefault();
            item.customerId = refitem.customerId;
            item.customerName = refitem.customerName;
            item.phone = refitem.phone;
            item.company = refitem.company;
            item.taxCode = refitem.taxCode;
            item.andress = refitem.andress;
            item.email = refitem.email;
            item.membershipCard = refitem.membershipCard;
            item.levelCard = refitem.levelCard;
            item.born = refitem.born;
            item.note = refitem.note;
            item.member5food = refitem.member5food;
            item.status = refitem.status;
            db.SaveChanges();
        }

        /*
         * Hàm lấy dữ liệu từ một hàng
         * Người tạo: Nguyễn Đức Thiện
         * Ngày tạo: 24/08/2019
         * **/
        public Customer GetRow( Guid refid)
        {
            Customer refitem = db.Customers.Where(p => p.refID == refid).FirstOrDefault();
           // db.Customers.Add(refitem);
            return refitem;
            //db.SaveChanges();
        }
    }
}


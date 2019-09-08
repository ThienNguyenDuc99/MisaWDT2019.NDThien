using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Threading.Tasks;
using System.Web.Http.Description;
using MISA.Entities;
using MISA.DL;
using MISA.BL;

namespace MISA.WDT02.NDThien.Controllers
{
    public class CustomersController : ApiController
    {
        private CustomerDL db = new CustomerDL();
        private RefBL _refBL = new RefBL();
        /// <summary>
        /// Thực hiện lấy dữ liệu từ bảng dữ liệu REF
        /// Người tạo VDThang 24/07/2019
        /// </summary>
        /// <returns>Danh sách các phiếu thu</returns>
        [Route("refs/{pageIndex}/{pageSize}")]
        [HttpGet]
        public async Task<AjaxResult> GetRefs1([FromUri]int pageIndex, int pageSize)
        {
            await Task.Delay(100);
            var _ajaxResult = new AjaxResult();
            try
            {
                _ajaxResult.Data = _refBL.GetPagingData(pageIndex, pageSize);
            }
            catch (Exception ex)
            {
                _ajaxResult.Success = false;
                _ajaxResult.Message = "fail";
                _ajaxResult.Data = ex;
            }
            return _ajaxResult;
        }
        /// <summary>
        /// Thực hiện lấy dữ liệu từ bảng dữ liệu REF
        /// Người tạo VDThang 24/07/2019
        /// </summary>
        /// <returns>Danh sách các phiếu thu</returns>
        [Route("refs")]
        [HttpGet]
        public AjaxResult GetRefs()
        {
            var _ajaxResult = new AjaxResult();
            try
            {
                _ajaxResult.Data = db.GetData();
            }
            catch (Exception ex)
            {
                _ajaxResult.Success = false;
                _ajaxResult.Message = "fail";
                _ajaxResult.Data = ex;
            }
            return _ajaxResult;
        }

        /// <summary>
        /// Thực hiện lấy dữ liệu một hàng
        /// Người tạo VDThang 24/07/2019
        /// </summary>
        /// <returns>Danh sách các phiếu thu</returns>
        [Route("refs/getarow")]
        [HttpGet]
        public AjaxResult GetRef(Guid refid)
        {
            var _ajaxResult = new AjaxResult();
            try
            {
                _ajaxResult.Data = db.GetRow(refid);
            }
            catch (Exception ex)
            {
                _ajaxResult.Success = false;
                _ajaxResult.Message = "fail";
                _ajaxResult.Data = ex;
            }
            return _ajaxResult;
        }

        /// <summary>
        /// Thực hiện thêm mới 1 khách hàng
        /// Người tạo VDThang 24/07/2019
        /// </summary>
        /// <returns></returns>
        [Route("refs")]
        [HttpPost]
        public AjaxResult Post([FromBody] Customer _ref)
        {
            var _ajaxResult = new AjaxResult();
            try
            {
                db.AddRef(_ref);
            }
            catch (Exception ex)
            {
                _ajaxResult.Success = false;
                _ajaxResult.Message = "fail";
                _ajaxResult.Data = ex;
            }
            return _ajaxResult;
        }

        /// <summary>
        /// Thực hiện xóa khách hàng
        /// Người tạo NDthien 
        /// Time: 7:53PM 03/08/2019
        /// </summary>
        /// <returns></returns>
        [Route("refs")]
        [HttpDelete]
        public AjaxResult Delete([FromBody] List<Guid> refids)
        {
            var _ajaxResult = new AjaxResult();
            try
            {
                db.DeleteMultiple(refids);
            }
            catch (Exception ex)
            {
                _ajaxResult.Success = false;
                _ajaxResult.Message = "fail";
                _ajaxResult.Data = ex;
            }
            return _ajaxResult;
        }

        /// <summary>
        /// Thực hiện sửa khách hàng
        /// Người tạo NDthien 
        /// Time: 7:53PM 03/08/2019
        /// </summary>
        /// <returns></returns>
        [Route("refs")]
        [HttpPut]
        public AjaxResult Put([FromBody] Customer _ref)
        {
            var _ajaxResult = new AjaxResult();
            try
            {
                db.Edit(_ref);
            }
            catch (Exception ex)
            {
                _ajaxResult.Success = false;
                _ajaxResult.Message = "fail";
                _ajaxResult.Data = ex;
            }
            return _ajaxResult;
        }
    }
}

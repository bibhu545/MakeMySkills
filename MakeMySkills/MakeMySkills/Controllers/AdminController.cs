using MakeMySkills.Business;
using MakeMySkills.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using static MakeMySkills.Utils.Constants;

namespace MakeMySkills.Controllers
{
    public class AdminController : Controller
    {
        public JsonResult AddTopic(TopicModel model)
        {
            try
            {
                var result = AdminBusiness.AddTopic(model);
                var response = new ApiRespnoseWrapper { status = ApiRespnoseStatus.Success, results = new ArrayList() { result } };
                return new JsonResult { Data = response };
            }
            catch (Exception ex)
            {
                return CommonBusiness.GetErrorResponse(ex.Message);
            }
        }
        public JsonResult DeleteTopic(TopicModel model)
        {
            try
            {
                var result = AdminBusiness.DeleteTopic(model);
                var response = new ApiRespnoseWrapper { status = ApiRespnoseStatus.Success, results = new ArrayList() { result } };
                return new JsonResult { Data = response };
            }
            catch (Exception ex)
            {
                return CommonBusiness.GetErrorResponse(ex.Message);
            }
        }
        public JsonResult EditTopic(TopicModel model)
        {
            try
            {
                var result = AdminBusiness.EditTopic(model);
                var response = new ApiRespnoseWrapper { status = ApiRespnoseStatus.Success, results = new ArrayList() { result } };
                return new JsonResult { Data = response };
            }
            catch (Exception ex)
            {
                return CommonBusiness.GetErrorResponse(ex.Message);
            }
        }
        public JsonResult GetCommondataForAdmin()
        {
            try
            {
                var subjects = CommonBusiness.GetAllSubjects();
                var response = new ApiRespnoseWrapper { status = ApiRespnoseStatus.Success, results = new ArrayList() { subjects } };
                return new JsonResult { Data = response, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (Exception ex)
            {
                return CommonBusiness.GetErrorResponse(ex.Message);
            }
        }
    }
}
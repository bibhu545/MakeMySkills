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
    public class TestController : Controller
    {
        public JsonResult GetCommonDataForTest()
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
        public JsonResult GetTestBasicDetails(String id)
        {
            try
            {
                var testDetails = TestBusiness.GetTestBasicDetails(id);
                var response = new ApiRespnoseWrapper { status = ApiRespnoseStatus.Success, results = new ArrayList() { testDetails } };
                return new JsonResult { Data = response, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            catch (Exception ex)
            {
                return CommonBusiness.GetErrorResponse(ex.Message);
            }
        }
        public JsonResult CreateTest(TestModel model)
        {
            try
            {
                var result = TestBusiness.CreateTest(model);
                var response = new ApiRespnoseWrapper { status = ApiRespnoseStatus.Success, results = new ArrayList() { result } };
                return new JsonResult { Data = response };
            }
            catch (Exception ex)
            {
                return CommonBusiness.GetErrorResponse(ex.Message);
            }
        }
    }
}
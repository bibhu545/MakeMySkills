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
    public class CommonController : Controller
    {
        public JsonResult GetHomePageCommonData()
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
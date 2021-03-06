﻿using MakeMySkills.Business;
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
    public class AccountController : Controller
    {
        public string Hello()
        {
            return "Working";
        }
        public JsonResult Login(LoginRequestModel model)
        {
            try
            {
                var result = AccountBusiness.Login(model);
                var response = new ApiRespnoseWrapper { status = ApiRespnoseStatus.Success, results = new ArrayList() { result } };
                return new JsonResult { Data = response };
            }
            catch (Exception ex)
            {
                return CommonBusiness.GetErrorResponse(ex.Message);
            }
        }
        public JsonResult Signup(SignupModel model)
        {
            try
            {
                var result = AccountBusiness.SignUp(model);
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
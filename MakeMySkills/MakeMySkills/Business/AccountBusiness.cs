using MakeMySkills.EDMX;
using MakeMySkills.Models;
using MakeMySkills.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static MakeMySkills.Utils.Constants;

namespace MakeMySkills.Business
{
    public class AccountBusiness
    {
        public static LoginResponseModel Login(LoginRequestModel model)
        {
            using (var context = new MakeMySkillsEntities())
            {
                model.password = CommonFunctions.CustomEncryptString(model.password, EncryptionKey.LoginPartialEncKey);
                var user = context.User.FirstOrDefault(x => x.Email == model.email && x.Password == model.password && x.IsActive == ActiveStatus.IsActive);
                if (user != null)
                {
                    return new LoginResponseModel()
                    {
                        email = user.Email,
                        //rest properties
                    };
                }
                else
                {
                    return null;
                }
            }
        }
        public static LoginResponseModel SignUp(SignupModel model)
        {
            using (var context = new MakeMySkillsEntities())
            {
                var user = context.User.FirstOrDefault(x => x.Email == model.email);
                if (user != null)
                {
                    model.password = CommonFunctions.CustomEncryptString(model.password, EncryptionKey.LoginPartialEncKey);

                    //add user to db

                    return new LoginResponseModel()
                    {
                        email = user.Email,
                        //rest properties
                    };
                }
                else
                {
                    return null;
                }
            }
        }
    }
}
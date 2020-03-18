using MakeMySkills.Models;
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
                var user = context.User.FirstOrDefault(x => x.Email == model.email && x.Password == model.password && x.IsActive == ActiveStatus.IsActive);
                if (user != null)
                {
                    return new LoginResponseModel()
                    {
                        email = user.Email,
                        //rest data
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
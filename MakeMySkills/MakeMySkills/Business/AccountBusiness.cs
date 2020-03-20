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
                var user = context.Users.FirstOrDefault(x => x.Email == model.email && x.Password == model.password && x.IsActive == ActiveStatus.IsActive && x.IsLoggedIn == LoginStatus.NotLoggedIn);
                if (user != null)
                {
                    return new LoginResponseModel()
                    {
                        email = user.Email,
                        firstName = user.FirstName,
                        lastName = user.LastName,
                        userId = user.UserId,
                        userType = user.UserType,
                        joinedOn = user.JoinedOn
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
                LoginResponseModel response = new LoginResponseModel();
                var user = context.Users.FirstOrDefault(x => x.Email == model.email);
                if (user == null)
                {
                    model.password = CommonFunctions.CustomEncryptString(model.password, EncryptionKey.LoginPartialEncKey);

                    User newUser = new User();

                    newUser.Email = model.email;
                    newUser.FirstName = model.firstName;
                    newUser.LastName = model.lastName;
                    newUser.Password = model.password;
                    newUser.IsLoggedIn = LoginStatus.LoggedIn;
                    newUser.IsActive = ActiveStatus.IsActive;
                    newUser.JoinedOn = DateTime.UtcNow;
                    newUser.UserType = model.userType;

                    context.Users.Add(newUser);

                    if (context.SaveChanges() > 0)
                    {
                        return Login(new LoginRequestModel() { email = user.Email, password = user.Password });
                    }
                    else
                    {
                        response.message = "Some error occured while saving data.";
                    }
                }
                else
                {
                    response.message = "Email already exists.";
                }
                return response;
            }
        }
    }
}
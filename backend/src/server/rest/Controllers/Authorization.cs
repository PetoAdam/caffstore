using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CaffStore.REST.Controllers
{

    public static class Authorization 
    {

        public enum Auth{
            BadToken,
            User,
            Admin
        }

        public static async Task<Auth> IsAdmin(string auth_header){
            if(auth_header == null)
                return Auth.BadToken;
            string[] split = auth_header.Split(' ');
            if(split.Length < 2){
                return Auth.BadToken;
            }
            string idToken = split[1];
            FirebaseToken decodedToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(idToken);
            var user = await FirebaseAuth.DefaultInstance.GetUserAsync(decodedToken.Uid);
            if(user.CustomClaims["admin"].ToString() == "true"){
                return Auth.Admin;
            }
            return Auth.User;
        }
        
    }
}

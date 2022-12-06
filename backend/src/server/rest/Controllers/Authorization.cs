using CaffStore.REST.Dal;
using FirebaseAdmin.Auth;
using Google.Cloud.Firestore;
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

        public static string API_KEY = "AIzaSyAfdUUIzsM11swGfMVGyei-qLCs0FdV6es";

        public static async Task<Auth> IsAdmin(string auth_header, DataDrivenDbContext dbContext){
            FirebaseToken decodedToken = await DecodeToken(auth_header);
            if(decodedToken == null)
            {
                return Auth.BadToken;
            }
            var user = await FirebaseAuth.DefaultInstance.GetUserAsync(decodedToken.Uid);
            FirestoreDb db = FirestoreDb.Create("caff-store");
            CollectionReference collection = db.Collection("users");
            DocumentReference docRef = collection.Document(user.Uid);
            DocumentSnapshot snapshot = await docRef.GetSnapshotAsync();
            if(!snapshot.Exists){
                return Auth.BadToken;
            }

            Dictionary<string, object> firestoreUser = snapshot.ToDictionary();
            bool isAdmin = (bool)firestoreUser["isAdmin"];

            if(isAdmin){
                return Auth.Admin;
            }
            return Auth.User;
        }

        public static async Task<string> GetEmail(string auth_header){
            FirebaseToken decodedToken = await DecodeToken(auth_header);
            if(decodedToken == null)
            {
                return null;
            }
            var user = await FirebaseAuth.DefaultInstance.GetUserAsync(decodedToken.Uid);
            if(user == null)
            {
                return null;
            }
            return user.Email;

        }

        public static async Task<string> GetUid(string auth_header){
            FirebaseToken decodedToken = await DecodeToken(auth_header);
            if(decodedToken == null)
            {
                return null;
            }
            var user = await FirebaseAuth.DefaultInstance.GetUserAsync(decodedToken.Uid);
            if(user == null)
            {
                return null;
            }
            return user.Uid;
        }

        public static async Task<string> GetEmailFromId(string id){
            
            var user = await FirebaseAuth.DefaultInstance.GetUserAsync(id);
            if(user == null)
            {
                return "Anonymus";
            }
            return user.Email;
        }

        private static async Task<FirebaseToken> DecodeToken(string auth_header)
        {
            
            if(auth_header == null)
                return null;
            string[] split = auth_header.Split(' ');
            if(split.Length < 2){
                return null;
            }
            string idToken = split[1];
            
            FirebaseToken decodedToken;
            try {
                decodedToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(idToken);
            }
            catch(Exception ex){
                System.Diagnostics.Debug.WriteLine(ex);
                return null;
            }
            
            return decodedToken;
        }
        
    }
}

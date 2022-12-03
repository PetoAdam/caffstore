using System.Collections.Generic;
using System.Security.Claims;
using FirebaseAdmin;
using FirebaseAdmin.Auth;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace CaffStore.REST
{
    public class Program
    {
        public static void Main(string[] args)
        {

            FirebaseApp.Create(new AppOptions()
            {
                Credential = GoogleCredential.FromFile("Resources/caff-store-firebase-adminsdk-lu9y2-97f18fd13d.json") 
            });

            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}

using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace CaffStore.REST
{
    public class Program
    {
        public static void Main(string[] args)
        {
            //TODO: add credentials
            /*
            FirebaseApp.Create(new AppOptions()
            {
                //Credential = GoogleCredential.FromFile("Resources/secretkey.json") // json file should be set as envvar to keep it secret.
                
            });
            */
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}

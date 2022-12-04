using System.Collections.Generic;
using System.Security.Claims;
using FirebaseAdmin;
using FirebaseAdmin.Auth;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.Json;
using System.Security.Cryptography.X509Certificates;
using System;
using System.IO;
using static System.IO.File;
using System.Net;
using System.Security;

namespace CaffStore.REST
{
    public class Program
    {
        public static void Main(string[] args)
        {

            FirebaseApp.Create(new AppOptions()
            {
                Credential = GoogleCredential.FromFile("/home/ubuntu/caffstore-secret/caff-store-firebase-adminsdk-lu9y2-53f4bdc1f6.json")
            });
            
            
            var config = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddEnvironmentVariables()
            .AddJsonFile("backend/src/server/rest/certificate.json", optional: true, reloadOnChange: true)
            .AddJsonFile($"backend/src/server/rest/certificate.{Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")}.json", optional: true, reloadOnChange: true)
            .Build();

            var certificateSettings = config.GetSection("certificateSettings");
            string certificateFileName = certificateSettings.GetValue<string>("filename");
            string certificatePassword = certificateSettings.GetValue<string>("password");
            SecureString securePwd = ToSecureString(certificatePassword);

            //var certificate = new X509Certificate2(ReadAllBytes("backend/src/server/rest/localhost.pfx"), securePwd, X509KeyStorageFlags.MachineKeySet);
            var certificate = new X509Certificate2(ReadAllBytes(certificateFileName), securePwd, X509KeyStorageFlags.MachineKeySet);
        
            var host = new WebHostBuilder()
                .UseKestrel(
                    options =>
                    {
                        options.AddServerHeader = false;
                        options.Listen(IPAddress.Any, 44321, listenOptions =>
                        {
                            listenOptions.UseHttps(certificate);
                        });
                        options.Listen(IPAddress.Any, 5001, listenOptions =>
                        {
                            listenOptions.UseHttps(certificate);
                        });
                        options.Listen(IPAddress.Any, 5000);
                    }
                )
                .UseConfiguration(config)
                .UseContentRoot(Directory.GetCurrentDirectory())
                .UseStartup<Startup>()
                .UseUrls("https://localhost:44321", "https://localhost:5001", "http://localhost:5000")
                .Build();

            host.Run();
        }

        
        public static SecureString ToSecureString(string plainString)
        {
            if (plainString == null)
                return null;
 
            SecureString secureString = new SecureString();
            foreach (char c in plainString.ToCharArray())
            {
                secureString.AppendChar(c);
            }
            return secureString;
        }
    }
}

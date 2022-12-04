using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CaffStore.REST.Dal;
using CaffStore.REST.Models;
using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Authorization;

namespace CaffStore.REST.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly DataDrivenDbContext dbContext;

        public UsersController(DataDrivenDbContext context)
        {
            dbContext = context;
        }

        // Get the user's custom token
        // GET: api/users/login
        [HttpPost("login")]
        public async Task<ActionResult<CustomToken>> GetUserToken([FromBody] LoginInfo loginInfo)
        {
            var dbUsers = await dbContext.Users.ToListAsync();
            var dbUser = dbUsers.FirstOrDefault(u => u.Email == loginInfo.Email);
            if(dbUser == null)
            {
                return Ok("No user with given email exists");
            }

            if(dbUser.Password != loginInfo.Password)
            {
                return Unauthorized("Email and password does not match");
            }

            var additionalClaims = new Dictionary<string, object>()
            {
                { "admin", dbUser.Admin },
            };
            var firebaseUser = await FirebaseAuth.DefaultInstance.GetUserByEmailAsync(loginInfo.Email);
            var uid = firebaseUser.Uid;
            string customToken = await FirebaseAuth.DefaultInstance.CreateCustomTokenAsync(uid, additionalClaims);
            return new CustomToken{Token = customToken, IsAdmin = dbUser.Admin};
        }

        // GET: api/users
        //[Authorize]
        [HttpGet]
        public async Task<ActionResult<Models.User[]>> GetUser([FromHeader] string authorization)
        {
            var auth = await Authorization.IsAdmin(authorization);
            if(auth == Authorization.Auth.BadToken){
                return Unauthorized();
            }
            var dbUsers = await dbContext.Users.ToListAsync();
            return dbUsers.Select(u => new Models.User(u.Id, u.Email, u.Name, u.Admin)).ToArray();
        }

        // GET: api/users/5
        //[Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<Models.User>> GetUser(int id, [FromHeader] string authorization)
        {
            var auth = await Authorization.IsAdmin(authorization);
            if(auth == Authorization.Auth.BadToken){
                return Unauthorized();
            }

            var user = await dbContext.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return new Models.User(user.Id, user.Email, user.Name, user.Admin);
        }

        // PUT: api/users/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        //[Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser([FromRoute] int id, [FromBody] NewUser newUser, [FromHeader] string authorization)
        {
            var auth = await Authorization.IsAdmin(authorization);
            if(auth != Authorization.Auth.Admin){
                return Unauthorized();
            }

            var dbUser = await dbContext.Users.FindAsync(id);
            var firebaseUser = await FirebaseAuth.DefaultInstance.GetUserByEmailAsync(dbUser.Email);
            var uid = firebaseUser.Uid;
            dbContext.Entry(dbUser).State = EntityState.Modified;

            if(dbContext.Users.Where(u => u.Email == newUser.Email && u.Id != dbUser.Id).ToList().Count != 0)
            {
                return Ok("Email already in use");
            }

            dbUser.Email = newUser.Email;
            dbUser.Password = newUser.Password;
            dbUser.Name = newUser.Name;

            try
            {
                await dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            UserRecordArgs args = new UserRecordArgs()
            {
                Uid = uid,
                Email = dbUser.Email,
                Password = dbUser.Password,
                DisplayName = dbUser.Name,
            };
            UserRecord userRecord = await FirebaseAuth.DefaultInstance.UpdateUserAsync(args);


            return NoContent();
        }

        // POST: api/users
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Models.User>> PostUser([FromBody] NewUser newUser)
        {
            if(dbContext.Users.FirstOrDefault(u => u.Email == newUser.Email) != null)
            {
                return Ok("Email already in use");
            }

            var dbUser = new Dal.User
            {
                Email = newUser.Email,
                Password = newUser.Password,
                Name = newUser.Name,
                Admin = false
            };

            dbContext.Users.Add(dbUser);
            await dbContext.SaveChangesAsync();

            UserRecordArgs args = new UserRecordArgs()
            {
                Email = newUser.Email,
                EmailVerified = false,
                Password = newUser.Password,
                DisplayName = newUser.Name
            };
            UserRecord userRecord = await FirebaseAuth.DefaultInstance.CreateUserAsync(args);


            return CreatedAtAction("GetUser", new { id = dbUser.Id }, new Models.User(dbUser.Id, dbUser.Email, dbUser.Name, dbUser.Admin));
        }

        // DELETE: api/users/5
        //[Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Models.User>> DeleteUser(int id, [FromHeader] string authorization)
        {
            var auth = await Authorization.IsAdmin(authorization);
            if(auth != Authorization.Auth.Admin){
                return Unauthorized();
            }
            var user = await dbContext.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            var firebaseUser = await FirebaseAuth.DefaultInstance.GetUserByEmailAsync(user.Email);
            var uid = firebaseUser.Uid;

            var caffs = dbContext.Caffs.Where(c => c.UploaderId == id).ToArray();
            var comments = dbContext.Comments.Where(c => c.UserId == id).ToArray();

            if (comments.Length > 0)
                dbContext.Comments.RemoveRange(comments);

            if (caffs.Length > 0)
                dbContext.Caffs.RemoveRange(caffs);

            dbContext.Users.Remove(user);
            await dbContext.SaveChangesAsync();

            await FirebaseAuth.DefaultInstance.DeleteUserAsync(uid);

            return new Models.User(user.Id, user.Email, user.Name, user.Admin);
        }

        private bool UserExists(int id)
        {
            return dbContext.Users.Any(e => e.Id == id);
        }
    }
}

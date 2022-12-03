using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CaffStore.REST.Dal;
using CaffStore.REST.Models;

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

        // GET: api/users
        [HttpGet]
        public async Task<ActionResult<Models.User[]>> GetUser()
        {
            var dbUsers = await dbContext.Users.ToListAsync();
            return dbUsers.Select(u => new Models.User(u.Id, u.Email, u.Name, u.Admin)).ToArray();
        }

        // GET: api/users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Models.User>> GetUser(int id)
        {
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
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, NewUser newUser)
        {
            var dbUser = await dbContext.Users.FindAsync(id);
            dbContext.Entry(dbUser).State = EntityState.Modified;

            if(dbContext.Users.Where(u => u.Email == newUser.Email && u.Id != dbUser.Id).ToList().Count != 0)
            {
                return Ok("Email already in use");
            }
            dbUser.Name = newUser.Name;
            dbUser.Email = newUser.Email;

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

            return NoContent();
        }

        // POST: api/users
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Models.User>> PostUser(NewUser newUser)
        {
            var dbUser = new Dal.User
            {
                Email = newUser.Email,
                Name = newUser.Name,
                Admin = false
            };

            dbContext.Users.Add(dbUser);
            await dbContext.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = dbUser.Id }, new Models.User(dbUser.Id, dbUser.Email, dbUser.Name, dbUser.Admin));
        }

        // DELETE: api/users/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Models.User>> DeleteUser(int id)
        {
            var user = await dbContext.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            // TODO: Should we remove the caffs and comments of the deleted user?
            var caffs = dbContext.Caffs.Where(c => c.UploaderId == id).ToArray();
            var comments = dbContext.Comments.Where(c => c.UserId == id).ToArray();

            if (comments.Length > 0)
                dbContext.Comments.RemoveRange(comments);

            if (caffs.Length > 0)
                dbContext.Caffs.RemoveRange(caffs);

            dbContext.Users.Remove(user);
            await dbContext.SaveChangesAsync();

            return new Models.User(user.Id, user.Email, user.Name, user.Admin);
        }

        private bool UserExists(int id)
        {
            return dbContext.Users.Any(e => e.Id == id);
        }
    }
}

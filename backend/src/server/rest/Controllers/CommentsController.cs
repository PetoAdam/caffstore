using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CaffStore.REST.Dal;
using CaffStore.REST.Models;
using Microsoft.AspNetCore.Authorization;

namespace CaffStore.REST.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly DataDrivenDbContext dbContext;

        public CommentsController(DataDrivenDbContext context)
        {
            dbContext = context;
        }


        // GET: api/Comments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Models.Comment>> GetComment(int id, [FromHeader] string authorization)
        {
            var auth = await Authorization.IsAdmin(authorization);
            if(auth == Authorization.Auth.BadToken){
                return Unauthorized();
            }

            var comment = await dbContext.Comments.FindAsync(id);

            if (comment == null)
            {
                return NotFound();
            }

            return new Models.Comment(comment.Id, comment.Text, comment.CreationDate, comment.UserId, comment.CaffId, dbContext.Users.FirstOrDefault(u => u.Id == comment.UserId).Name);
        }

        // POST: api/Comments
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Models.Comment>> PostComment(NewComment newComment, [FromHeader] string authorization)
        {
            var auth = await Authorization.IsAdmin(authorization);
            if(auth == Authorization.Auth.BadToken){
                return Unauthorized();
            }

            var dbComment = new Dal.Comment
            {
                Text = newComment.Text,
                CreationDate = newComment.CreationDate,
                UserId = newComment.UserId,
                CaffId = newComment.CaffId,
            };
            dbContext.Comments.Add(dbComment);
            await dbContext.SaveChangesAsync();

            return CreatedAtAction("GetComment", new { id = dbComment.Id }, new Models.Comment(dbComment.Id, dbComment.Text, dbComment.CreationDate, dbComment.UserId, dbComment.CaffId, dbContext.Users.FirstOrDefault(u => u.Id == dbComment.UserId).Name));
        }

        // DELETE: api/Comments/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Models.Comment>> DeleteComment(int id, [FromHeader] string authorization)
        {
            var auth = await Authorization.IsAdmin(authorization);
            if(auth != Authorization.Auth.Admin){
                return Unauthorized();
            }

            var comment = await dbContext.Comments.FindAsync(id);
            if (comment == null)
            {
                return NotFound();
            }

            dbContext.Comments.Remove(comment);
            await dbContext.SaveChangesAsync();

            return new Models.Comment(comment.Id, comment.Text, comment.CreationDate, comment.UserId, comment.CaffId, dbContext.Users.FirstOrDefault(u => u.Id == comment.UserId).Name);
        }
    }
}

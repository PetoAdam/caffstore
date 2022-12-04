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

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CaffStore.REST.Controllers
{

    [Route("api/caffs")]
    [ApiController]
    public class CaffController : ControllerBase
    {

        private readonly Dal.DataDrivenDbContext dbContext;

        public CaffController(Dal.DataDrivenDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        // GET: api/caffs
        [HttpGet]
        public async Task<ActionResult<Models.CaffPreview[]>> List([FromHeader] string authorization)
        {
            var auth = await Authorization.IsAdmin(authorization, dbContext);
            if(auth == Authorization.Auth.BadToken){
                return Unauthorized();
            }

            var dbCaffs = await dbContext.Caffs.AsAsyncEnumerable().ToListAsync();
            List<Models.CaffPreview> caffs = new List<Models.CaffPreview>();
            foreach(var caff in dbCaffs){
                var caffPreview = new Models.CaffPreview();
                caffPreview.Id = caff.Id;
                caffPreview.Name = caff.Name;
                caffPreview.CreationDate = caff.CreationDate;
                caffPreview.File = caffPreview.Parse(caff.CaffFile);
                caffPreview.UploaderId = caff.UploaderId;
                caffPreview.Comments = new List<Models.Comment>();
                foreach(var comment in dbContext.Comments.AsQueryable().Where(c => c.CaffId == caff.Id))
                {
                    var email = await Authorization.GetEmailFromId(comment.UserId);
                    caffPreview.Comments.Add(new Models.Comment(comment.Id, comment.Text, comment.CreationDate, comment.UserId, comment.CaffId, email));
                }
        
                caffs.Add(caffPreview);
            }
            return caffs.ToArray();
        }

        // GET api/caffs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Models.CaffPreview>> Get(int id, [FromHeader] string authorization)
        {
            var auth = await Authorization.IsAdmin(authorization, dbContext);
            if(auth == Authorization.Auth.BadToken){
                return Unauthorized();
            }

            var caff = await dbContext.Caffs.AsAsyncEnumerable().SingleOrDefaultAsync(p => p.Id == id);
            if (caff == null)
            {
                return BadRequest();
            }

            var caffPreview = new Models.CaffPreview();
            caffPreview.Id = caff.Id;
            caffPreview.Name = caff.Name;
            caffPreview.CreationDate = caff.CreationDate;
            caffPreview.File = caffPreview.Parse(caff.CaffFile);
            caffPreview.UploaderId = caff.UploaderId;
            caffPreview.Comments = new List<Models.Comment>();
            foreach(var comment in dbContext.Comments.AsQueryable().Where(c => c.CaffId == caff.Id))
            {
                var email = await Authorization.GetEmailFromId(comment.UserId);
                caffPreview.Comments.Add(new Models.Comment(comment.Id, comment.Text, comment.CreationDate, comment.UserId, comment.CaffId, email));
            }
            return caffPreview;
        }

        // GET api/caffs/byName
        [HttpGet("byName")]
        public async Task<ActionResult<Models.CaffPreview[]>> GetByName([FromQuery] string name, [FromHeader] string authorization)
        {
            var auth = await Authorization.IsAdmin(authorization, dbContext);
            if(auth == Authorization.Auth.BadToken){
                return Unauthorized();
            }
            var dbCaffs = await dbContext.Caffs.AsAsyncEnumerable().ToListAsync();
            var sortedCaffs = dbCaffs.Where(caff => caff.Name.Contains(name));

            var caffs = new List<Models.CaffPreview>();
            foreach(var caff in sortedCaffs){
                var caffPreview = new Models.CaffPreview();
                caffPreview.Id = caff.Id;
                caffPreview.Name = caff.Name;
                caffPreview.CreationDate = caff.CreationDate;
                caffPreview.File = caffPreview.Parse(caff.CaffFile);
                caffPreview.UploaderId = caff.UploaderId;
                caffPreview.Comments = new List<Models.Comment>();
                foreach(var comment in dbContext.Comments.AsQueryable().Where(c => c.CaffId == caff.Id))
                {
                    var email = await Authorization.GetEmailFromId(comment.UserId);
                    caffPreview.Comments.Add(new Models.Comment(comment.Id, comment.Text, comment.CreationDate, comment.UserId, comment.CaffId, email));
                }
        
                caffs.Add(caffPreview);
            }
            return caffs.ToArray();
        }

        // GET api/caffs/byUserId
        [HttpGet("byUserId")]
        public async Task<ActionResult<Models.CaffPreview[]>> GetByUserId([FromQuery] string userId, [FromHeader] string authorization)
        {
            var auth = await Authorization.IsAdmin(authorization, dbContext);
            if(auth == Authorization.Auth.BadToken){
                return Unauthorized();
            }

            var dbCaffs = await dbContext.Caffs.AsAsyncEnumerable().ToListAsync();
            var sortedCaffs = dbCaffs.Where(caff => caff.UploaderId == userId);
            var caffs = new List<Models.CaffPreview>();
            foreach(var caff in sortedCaffs){
                var caffPreview = new Models.CaffPreview();
                caffPreview.Id = caff.Id;
                caffPreview.Name = caff.Name;
                caffPreview.CreationDate = caff.CreationDate;
                caffPreview.File = caffPreview.Parse(caff.CaffFile);
                caffPreview.UploaderId = caff.UploaderId;
                caffPreview.Comments = new List<Models.Comment>();
                foreach(var comment in dbContext.Comments.AsQueryable().Where(c => c.CaffId == caff.Id))
                {
                    var email = await Authorization.GetEmailFromId(comment.UserId);
                    caffPreview.Comments.Add(new Models.Comment(comment.Id, comment.Text, comment.CreationDate, comment.UserId, comment.CaffId, email));
                }
        
                caffs.Add(caffPreview);
            }
            return caffs.ToArray();
        }

        // GET api/caffs/download
        [HttpGet("download")]
        public async Task<ActionResult<Models.CaffFile>> GetCaff([FromQuery] int id, [FromHeader] string authorization)
        {
            var auth = await Authorization.IsAdmin(authorization, dbContext);
            if(auth == Authorization.Auth.BadToken){
                return Unauthorized();
            }

            var caff = await dbContext.Caffs.AsAsyncEnumerable().SingleOrDefaultAsync(p => p.Id == id);
            if (caff == null)
            {
                return BadRequest();
            }
            return new Models.CaffFile(caff.CaffFile);
        }

        // PUT api/caffs/5
        [HttpPut]
        [Route("{id}")]
        public async Task<ActionResult> Modify([FromRoute] int id, [FromBody] Models.NewCaff updated, [FromHeader] string authorization)
        {
            var auth = await Authorization.IsAdmin(authorization, dbContext);
            if(auth != Authorization.Auth.Admin){
                return Unauthorized();
            }

            if(updated.Name == null || updated.File == null){
                return BadRequest();
            }

            var dbProduct = await dbContext.Caffs.AsAsyncEnumerable().SingleOrDefaultAsync(p => p.Id == id);

            // If no instance with exists with given id, return
            if (dbProduct == null)
                return NotFound();

            // Modify data

            // Modifications -> What modifications do we allow?
            dbProduct.Name = updated.Name;
            //dbProduct.Date = DateTime.Now;
            dbProduct.CaffFile = Services.Base64Converter.ConvertToByteArray(updated.File);

            // Change the owner of the CAFF file
            dbProduct.UploaderId = updated.UploaderId;



            // Save to DB
            try
            {
                await dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CaffExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent(); // 204 NoContent response

        }

        // POST api/caffs
        [HttpPost]
        public async Task<ActionResult> Create([FromBody] Models.NewCaff newCaff, [FromHeader] string authorization)
        {
            var auth = await Authorization.IsAdmin(authorization, dbContext);
            if(auth == Authorization.Auth.BadToken){
                return Unauthorized();
            }

            if(newCaff.Name == null || newCaff.File == null){
                return BadRequest();
            }

            var userEmail = await Authorization.GetEmail(authorization);
            var dbCaff = new Dal.Caff()
            {
                Name = newCaff.Name,
                CreationDate = DateTime.Now,
                CaffFile = Services.Base64Converter.ConvertToByteArray(newCaff.File),
                UploaderId = await Authorization.GetUid(authorization)
            };

            // Save to DB
            dbContext.Caffs.Add(dbCaff);
            await dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = dbCaff.Id }, new Models.CaffPreview(dbCaff.Id, dbCaff.Name, dbCaff.CreationDate, dbCaff.CaffFile, dbCaff.UploaderId, null)); // telling where the inserted item can be found
        }

        // DELETE: api/caffs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Models.CaffPreview>> DeleteCaff(int id, [FromHeader] string authorization)
        {
            var auth = await Authorization.IsAdmin(authorization, dbContext);
            if(auth != Authorization.Auth.Admin){
                return Unauthorized();
            }

            var caff = await dbContext.Caffs.FindAsync(id);
            if (caff == null)
            {
                return NotFound();
            }
            var messages = dbContext.Comments.AsQueryable().Where(c => c.CaffId == caff.Id).ToArray();
            if(messages.Length > 0)
            {
                dbContext.Comments.RemoveRange(messages);
            }
            dbContext.Caffs.Remove(caff);
            await dbContext.SaveChangesAsync();

            return Ok();
        }

        private bool CaffExists(int id)
        {
            return dbContext.Caffs.Any(e => e.Id == id);
        }
    }
}

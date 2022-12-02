using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CaffStore.REST.Controllers
{
    //TODO: remove commented [Authorize] when firebase is ready.

    [Route("api/caffs")]
    [ApiController]
    public class CaffController : ControllerBase
    {

        private readonly Dal.DataDrivenDbContext dbContext;

        public CaffController(Dal.DataDrivenDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        // GET: api/<CaffController>
        //[Authorize]
        [HttpGet]
        public ActionResult<Models.CaffPreview[]> List()
        {
            IQueryable<Dal.Caff> list = dbContext.Caffs;
            return list
                    .Select(p => new Models.CaffPreview(p.Id, p.Name, p.CreationDate, p.CaffFile, p.UploaderId, dbContext.Comments.Where(m => m.CaffId == p.Id).Select(m => new Models.Comment(m.Id, m.Text, m.CreationDate, m.UserId, m.CaffId, dbContext.Users.FirstOrDefault(u => u.Id == m.UserId).Name)).ToList()))
                    .ToArray();
        }

        // GET api/<CaffController>/5
        //[Authorize]
        [HttpGet("{id}")]
        public ActionResult<Models.CaffPreview> Get(int id)
        {
            var parent = dbContext.Caffs.SingleOrDefault(p => p.Id == id);
            if (parent == null)
            {
                return BadRequest();
            }
            return new Models.CaffPreview(parent.Id, parent.Name, parent.CreationDate, parent.CaffFile, parent.UploaderId, dbContext.Comments.Where(m => m.CaffId == parent.Id).Select(m => new Models.Comment(m.Id, m.Text, m.CreationDate, m.UserId, m.CaffId, dbContext.Users.FirstOrDefault(u => u.Id == m.UserId).Name)).ToList());
        }

        //[Authorize]
        [HttpPut]
        [Route("{id}")]
        public ActionResult Modify([FromRoute] int id, [FromBody] Models.NewCaff updated)
        {
            var dbProduct = dbContext.Caffs.SingleOrDefault(p => p.Id == id);

            // If no instance with exists with given id, create a new one
            if (dbProduct == null)
                return NotFound();

            // Modify data
            else
            {
                // Modifications -> What modifications do we allow?
                dbProduct.Name = updated.Name;
                //dbProduct.Date = DateTime.Now;
                dbProduct.CaffFile = Services.Base64Converter.ConvertToByteArray(updated.File);
                dbProduct.UploaderId = updated.UploaderId;

                // Save to DB
                dbContext.SaveChanges();

                return NoContent(); // 204 NoContent response
            }

        }

        [HttpPost]
        public ActionResult Create([FromBody] Models.NewCaff newCaff)
        {

            var dbParent = new Dal.Caff()
            {
                Name = newCaff.Name,
                CreationDate = DateTime.Now,
                CaffFile = Services.Base64Converter.ConvertToByteArray(newCaff.File),
                UploaderId = newCaff.UploaderId
            };

            // Save to DB
            dbContext.Caffs.Add(dbParent);
            dbContext.SaveChanges();

            return CreatedAtAction(nameof(Get), new { id = dbParent.Id }, new Models.CaffPreview(dbParent.Id, dbParent.Name, dbParent.CreationDate, dbParent.CaffFile, dbParent.UploaderId, dbContext.Comments.Where(m => m.CaffId == dbParent.Id).Select(m => new Models.Comment(m.Id, m.Text, m.CreationDate, m.UserId, m.CaffId, dbContext.Users.FirstOrDefault(u => u.Id == m.UserId).Name)).ToList())); // telling where the inserted item can be found
        }
    }
}

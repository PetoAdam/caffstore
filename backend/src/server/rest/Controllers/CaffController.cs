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
        public ActionResult<Models.Caff[]> List()
        {
            IQueryable<Dal.Caff> list = dbContext.Caffs;
            return list
                    .Select(p => new Models.Caff(p.Id, p.Name, p.Date, p.File, p.UploaderId))
                    .ToArray();
        }

        // GET api/<CaffController>/5
        //[Authorize]
        [HttpGet("{id}")]
        public ActionResult<Models.Caff> Get(int id)
        {
            var parent = dbContext.Caffs.SingleOrDefault(p => p.Id == id);
            if (parent == null)
            {
                return BadRequest();
            }
            return new Models.Caff(parent.Id, parent.Name, parent.Date, parent.File, parent.UploaderId);
        }

        //[Authorize]
        [HttpPut]
        [Route("{id}")]
        public ActionResult Modify([FromRoute] int id, [FromBody] Models.Caff updated)
        {
            var dbProduct = dbContext.Caffs.SingleOrDefault(p => p.Id == id);

            // If no instance with exists with given id, create a new one
            if (dbProduct == null)
            {

                var dbParent = new Dal.Caff()
                {
                    Name = updated.Name,
                    Date = updated.Date,
                    File = updated.File,
                    UploaderId = updated.UploaderId
                };

                // Save to DB
                dbContext.Caffs.Add(dbParent);
                dbContext.SaveChanges();
                return CreatedAtAction(nameof(Get), new { id = dbParent.Id }, new Models.Caff(dbParent.Id, dbParent.Name, dbParent.Date, dbParent.File, dbParent.UploaderId)); // telling where the inserted item can be found
            }
            // Modify data
            else
            {
                // Modifications
                dbProduct.Name = updated.Name;
                dbProduct.Date = updated.Date;
                dbProduct.File = updated.File;
                dbProduct.UploaderId = updated.UploaderId;

                // Save to DB
                dbContext.SaveChanges();

                return NoContent(); // 204 NoContent response
            }

        }

        [HttpPost]
        public ActionResult Create([FromBody] Models.Caff newParent)
        {

            var dbParent = new Dal.Caff()
            {
                Name = newParent.Name,
                Date = newParent.Date,
                File = newParent.File,
                UploaderId = newParent.UploaderId
            };

            // Save to DB
            dbContext.Caffs.Add(dbParent);
            dbContext.SaveChanges();

            return CreatedAtAction(nameof(Get), new { id = dbParent.Id }, new Models.Caff(dbParent.Id, dbParent.Name, dbParent.Date, dbParent.File, dbParent.UploaderId)); // telling where the inserted item can be found
        }
    }
}

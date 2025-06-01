using Flowy.Server.Data;
using Flowy.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Flowy.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FlowyWorkFlowNameController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FlowyWorkFlowNameController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult CreateWorkflow([FromBody] FlowyWorkFlowNameList FlowyWorkFlowNameModel)
        {
            if (string.IsNullOrWhiteSpace(FlowyWorkFlowNameModel.WorkFlowName))
                return BadRequest("Workflow adı boş olamaz.");

            FlowyWorkFlowNameModel.CreateTime = DateTime.UtcNow;
            _context.FlowyWorkFlowNameList.Add(FlowyWorkFlowNameModel);

            _context.SaveChanges();

            return Ok(FlowyWorkFlowNameModel);
        }
    }
}

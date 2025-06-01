using Microsoft.AspNetCore.Mvc;
using Flowy.Server.Data;

namespace Flowy.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DbConnectionController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DbConnectionController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult CheckConnection()
        {
            try
            {
                _context.Database.CanConnect(); // Bağlantıyı test eder
                return Ok("Bağlantı başarılı");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Bağlantı Hatası: {ex.Message}");
            }
        }
    }
}

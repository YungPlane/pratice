using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

[Route("api/elements")]
[ApiController]
public class ElementsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ElementsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<object>> GetElements()
    {
        var elements = await _context.elements
                                     .Select(e => new
                                     {
                                         e.CategoryName,
                                         e.ImgPath
                                     })
                                     .ToListAsync();

        return Ok(new { elements });
    }
}

using Microsoft.AspNetCore.Mvc;
using TpProg2.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TpProg2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EspecieController : ControllerBase
    {
        private IEspecieRepository _repository;

        public EspecieController(IEspecieRepository repo)
        {
            _repository = repo;
        }
        // GET: api/<EspecieController>
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_repository.GetAll());
            }
            catch (Exception)
            {
                return StatusCode(500, "Error Interno.");
            }
        }

        // GET api/<EspecieController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                if(_repository.GetById(id) != null)
                {
                    return Ok(_repository.GetById(id));
                }
                else
                {
                    return NotFound("Especie no encontrada.");
                }
            }
            catch (Exception)
            {
                return StatusCode(500, "Error Interno.");
            }
        }
        
    }
}

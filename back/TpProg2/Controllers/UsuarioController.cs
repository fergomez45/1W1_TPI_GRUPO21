using Microsoft.AspNetCore.Mvc;
using TpProg2.Models;
using TpProg2.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TpProg2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private IUsuarioRepository _repository;

        public UsuarioController(IUsuarioRepository repo)
        {
            _repository = repo;
        }
        // GET: api/<UsuarioController>
        [HttpGet]
        public IActionResult Get(string nombre, string contra)
        {
            try
            {
                if (_repository.Get(nombre, contra) != null)
                {
                    return Ok(_repository.Get(nombre, contra));
                }
                else
                {
                    return NotFound("Usuario no encontrado.");
                }
            }
            catch (Exception) 
            {
                return StatusCode(500, "Error interno");
            }
        }

        // POST api/<UsuarioController>
        [HttpPost]
        public IActionResult Post([FromBody] Usuario usuario)
        {
            try
            {
                _repository.Create(usuario);
                return Ok("Usuario creado con exito.");
            }
            catch (Exception)
            {
                return StatusCode(500, "Error interno");
            }
        }
        
    }
}

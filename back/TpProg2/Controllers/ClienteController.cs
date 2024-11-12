using Microsoft.AspNetCore.Mvc;
using TpProg2.Models;
using TpProg2.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TpProg2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        private IClienteRepository _repository;

        public ClienteController(IClienteRepository repo)
        {
            _repository = repo;
        }
        // GET: api/<ClienteController>
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_repository.GetAll());
            }
            catch (Exception)
            {
                return StatusCode(500, "Error interno.");
            }
        }

        // GET api/<ClienteController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                if (_repository.GetById(id) != null)
                    return Ok(_repository.GetById(id));
                else
                    return NotFound("Cliente no encontrado.");
            }
            catch (Exception)
            {
                return StatusCode(500, "Error interno.");
            }
        }

        // POST api/<ClienteController>
        [HttpPost]
        public IActionResult Post([FromBody] Cliente cliente)
        {
            try
            {
                if (isValid(cliente))
                {
                    _repository.Create(cliente);
                    return Ok("Cliente guardado con exito.");
                }
                else
                {
                    return BadRequest("Debe ingresar todos los campos.");
                }
            }
            catch (Exception)
            {
                return StatusCode(500, "Error interno.");
            }
        }

        private bool isValid(Cliente cliente)
        {
            if (!string.IsNullOrEmpty(cliente.Nombre) && !string.IsNullOrEmpty(cliente.Apellido) && !string.IsNullOrEmpty(cliente.Sexo) && !string.IsNullOrEmpty(cliente.Dni) && !string.IsNullOrEmpty(cliente.Telefono))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        // PUT api/<ClienteController>/5
        [HttpPut("{id}")]
        public IActionResult Put([FromQuery]int id, [FromBody] Cliente cliente)
        {
            try
            {
                if (_repository.Update(cliente))
                    return Ok("Cliente actualizado con exito.");
                else
                    return NotFound("Cliente no encontrado.");
            }
            catch (Exception)
            {
                return StatusCode(500, "Error interno.");
            }
        }

        // DELETE api/<ClienteController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id, string motivoBaja)
        {
            try
            {
                if (_repository.Delete(id, motivoBaja))
                {
                    return Ok("Cliente dado de baja.");
                }
                else
                {
                    return NotFound("Cliente no encontrado.");
                }
            }
            catch (Exception)
            {
                return StatusCode(500, "Error interno.");
            }
        }
    }
}

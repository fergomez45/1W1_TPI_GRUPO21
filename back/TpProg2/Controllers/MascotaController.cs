using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;
//using ProduccionBack.Entities;
using TpProg2.Models;
using TpProg2.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TpProg2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MascotaController : ControllerBase
    {
        private IMascotaRepository _repository;
        //private IMascotaService _service;

        //public MascotaController(IMascotaService service)
        //{
        //    _service = service;
        //}

        public MascotaController(IMascotaRepository repository)
        {
            _repository = repository;
        }

        // GET: api/<MascotaController>
        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                return Ok(_repository.GetAll());
            }catch (Exception)
            {
                return StatusCode(500, "Error Interno.");
            }
        }

        // GET api/<MascotaController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            try
            {
                if(_repository.GetById(id) != null)
                    return Ok(_repository.GetById(id));
                else
                    return NotFound("Mascota no encontrada.");
            }
            catch (Exception)
            {
                return StatusCode(500, "Error Interno.");
            }
        }

        // POST api/<MascotaController>
        [HttpPost]
        public IActionResult Post([FromBody] Mascota mascota)
        {
            try
            {
                if (IsValid(mascota))
                {
                    _repository.Create(mascota);
                    return Ok("Macota insertada con exito");
                }
                else
                {
                    return BadRequest("Debe ingresar todos los campos.");
                }
            }
            catch(Exception)
            {
                return StatusCode(500, "Error interno.");
            }
        }

        private bool IsValid(Mascota mascota)
        {
            if(!string.IsNullOrEmpty(mascota.Nombre) && !string.IsNullOrEmpty(mascota.Sexo) && !string.IsNullOrEmpty(Convert.ToString(mascota.Anionacimiento)) && mascota.IdEspecie > 0 && mascota.IdCliente > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        // PUT api/<MascotaController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id,[FromBody] Mascota mascota)
        {
            try
            {
                if (_repository.Update(mascota))
                    return Ok("Mascota actualizada con exito.");
                else
                    return NotFound("Mascota no encontrada.");
            }
            catch (Exception)
            {
                return StatusCode(500, "Error Interno");
            }
        }

        

        // DELETE api/<MascotaController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id, string motivoBaja)
        {
            try
            {
                if (_repository.Delete(id, motivoBaja))
                {
                    return Ok("Mascota dada de baja.");
                }
                else
                {
                    return NotFound("Mascota no encontrada.");
                }
            }
            catch(Exception)
            {
                return StatusCode(500, "Error interno.");
            }
        }
    }
}

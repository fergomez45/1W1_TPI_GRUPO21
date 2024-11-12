using TpProg2.Utils;
using TpProg2.Models;

namespace TpProg2.Repositories
{
    public class MascotaRepository : IMascotaRepository
    {
        private VeterinariaDbContext _context;

        public MascotaRepository(VeterinariaDbContext context)
        {
            _context = context;
        }
        public bool Create(Mascota mascota)
        {
            _context.Mascotas.Add(mascota);
            return _context.SaveChanges() > 0;
        }

        public bool Delete(int id, string motivoBaja)
        {
            var m = GetById(id);
            if(m != null)
            {
                m.FechaBaja = DateOnly.FromDateTime(DateTime.Now);
                m.MotivoBaja = motivoBaja;
                
                _context.Mascotas.Update(m);
                return _context.SaveChanges() > 0;
            }
            else
            {
                return false;
            }
        }

        public List<Mascota> GetAll()
        {
            return _context.Mascotas.ToList();
        }

        public Mascota? GetById(int id)
        {
            return _context.Mascotas.Find(id);
        }

        public bool Update(Mascota mascota)
        {
            var lst = new List<ParameterSQL>();
            lst.Add(new ParameterSQL("@idMascota", mascota.IdMascota));
            lst.Add(new ParameterSQL("@nombre", mascota.Nombre));
            lst.Add(new ParameterSQL("@idEspecie", mascota.IdEspecie));
            lst.Add(new ParameterSQL("@sexo", mascota.Sexo));
            lst.Add(new ParameterSQL("@anioNacimiento", mascota.Anionacimiento));
            lst.Add(new ParameterSQL("@idCliente", mascota.IdCliente));
            var helper = DataHelper.GetInstance();
            return helper.ExecuteSPDML("SP_ACTUALIZAR_MASCOTA", lst) > 0;

        }
    }
}

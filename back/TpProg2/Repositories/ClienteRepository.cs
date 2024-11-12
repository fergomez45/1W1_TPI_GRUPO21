using TpProg2.Models;
using TpProg2.Utils;

namespace TpProg2.Repositories
{
    public class ClienteRepository : IClienteRepository
    {
        private VeterinariaDbContext _context;

        public ClienteRepository(VeterinariaDbContext context)
        {
            _context = context;
        }
        public bool Create(Cliente cliente)
        {
            _context.Clientes.Add(cliente);
            return _context.SaveChanges() > 0;
        }

        public bool Delete(int id, string motivoBaja)
        {
            var c = GetById(id);
            if (c != null)
            {
                c.FechaBaja = DateOnly.FromDateTime(DateTime.Now);
                c.MotivoBaja = motivoBaja;
                
                _context.Clientes.Update(c);
                return _context.SaveChanges() > 0;
            }
            else
            {
                return false;
            }
        }

        public List<Cliente> GetAll()
        {
            return _context.Clientes.ToList();
        }

        public Cliente? GetById(int id)
        {
            return _context.Clientes.Find(id);
        }

        public bool Update(Cliente cliente)
        {
            var lst = new List<ParameterSQL>();
            lst.Add(new ParameterSQL("@idCliente", cliente.IdCliente));
            lst.Add(new ParameterSQL("@nombre", cliente.Nombre));
            lst.Add(new ParameterSQL("@apellido", cliente.Apellido));
            lst.Add(new ParameterSQL("@sexo", cliente.Sexo));
            lst.Add(new ParameterSQL("@dni", cliente.Dni));
            lst.Add(new ParameterSQL("@telefono", cliente.Telefono));
            var helper = DataHelper.GetInstance();
            return helper.ExecuteSPDML("SP_ACTUALIZAR_CLIENTE", lst) > 0;
        }
    }
}

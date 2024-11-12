using TpProg2.Models;

namespace TpProg2.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private VeterinariaDbContext _context;

        public UsuarioRepository(VeterinariaDbContext contexto)
        {
            _context = contexto;
        }
        public bool Create(Usuario usuario)
        {
            _context.Usuarios.Add(usuario);
            return _context.SaveChanges() > 0;
        }

        public Usuario? Get(string nombre, string contra)
        {
             return _context.Usuarios.Where(u => u.Nombre == nombre && u.Contraseña == contra).FirstOrDefault();
        }
    }
}

using TpProg2.Models;

namespace TpProg2.Repositories
{
    public interface IUsuarioRepository
    {
        Usuario? Get(string nombre, string contra);
        bool Create(Usuario usuario);
    }
}

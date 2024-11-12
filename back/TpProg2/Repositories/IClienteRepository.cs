using TpProg2.Models;

namespace TpProg2.Repositories
{
    public interface IClienteRepository
    {
        List<Cliente> GetAll();
        bool Create(Cliente cliente);
        bool Update(Cliente cliente);
        bool Delete(int id, string motivoBaja);
        Cliente? GetById(int id);
    }
}

using TpProg2.Models;

namespace TpProg2.Repositories
{
    public interface IMascotaRepository
    {
        List<Mascota> GetAll();
        bool Create(Mascota mascota);
        bool Update(Mascota mascota);
        bool Delete(int id, string motivoBaja);
        Mascota? GetById(int id);
    }
}

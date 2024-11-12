using TpProg2.Models;

namespace TpProg2.Repositories
{
    public interface IEspecieRepository
    {
        List<Especie> GetAll();

        Especie? GetById(int id);
    }
}

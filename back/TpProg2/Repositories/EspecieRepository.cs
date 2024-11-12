using TpProg2.Models;

namespace TpProg2.Repositories
{
    public class EspecieRepository : IEspecieRepository
    {
        private VeterinariaDbContext _context;

        public EspecieRepository(VeterinariaDbContext context)
        {
            _context = context;
        }
        public List<Especie> GetAll()
        {
            return _context.Especies.ToList();
        }

        public Especie? GetById(int id)
        {
            return _context.Especies.Find(id);
        }
    }
}

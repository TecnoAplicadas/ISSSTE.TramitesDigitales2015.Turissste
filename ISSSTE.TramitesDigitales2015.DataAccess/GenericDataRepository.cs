using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;

namespace ISSSTE.TramitesDigitales2015.DataAccess
{
    public class GenericDataRepository<T> : IDisposable, IGenericDataRepository<T> where T : class
    {
        private TurisssteEntities _context;

        public GenericDataRepository()
        {
            _context = new TurisssteEntities();
        }

        public void Dispose()
        {
            _context.Dispose();
        }

        public int Add(T item)
        {
            int result;

            _context.Entry(item).State = EntityState.Added;
            result = _context.SaveChanges();

            return result;
        }

        public IList<T> GetAll(params Expression<Func<T, object>>[] navigationProperties)
        {
            List<T> list;

            IQueryable<T> dbQuery = _context.Set<T>();

            foreach (Expression<Func<T, object>> navigationProperty in navigationProperties)
            {
                dbQuery = dbQuery.Include(navigationProperty);
            }

            list = dbQuery.AsNoTracking().ToList();

            return list;
        }

        public IList<T> GetList(Func<T, bool> where, params Expression<Func<T, object>>[] navigationProperties)
        {
            List<T> list;

            IQueryable<T> dbQuery = _context.Set<T>();

            foreach (Expression<Func<T, object>> navigationProperty in navigationProperties)
            {
                dbQuery = dbQuery.Include(navigationProperty);
            }

            list = dbQuery.AsNoTracking()
                          .Where(where)
                          .ToList();

            return list;
        }

        public T GetSingle(Func<T, bool> where, params Expression<Func<T, object>>[] navigationProperties)
        {
            T item = null;

            IQueryable<T> dbQuery = _context.Set<T>();

            foreach (Expression<Func<T, object>> navigationProperty in navigationProperties)
            {
                dbQuery = dbQuery.Include(navigationProperty);
            }

            item = dbQuery.AsNoTracking()
                          .FirstOrDefault(where);

            return item;
        }

        public int Remove(T item)
        {
            int result;

            _context.Entry(item).State = EntityState.Deleted;
            result = _context.SaveChanges();

            return result;
        }

        public int Update(T item)
        {
            int result;

            _context.Entry(item).State = EntityState.Modified;
            result = _context.SaveChanges();

            return result;
        }
    }
}

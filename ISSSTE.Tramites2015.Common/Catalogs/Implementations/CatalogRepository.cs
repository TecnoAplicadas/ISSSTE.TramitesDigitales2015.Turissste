using ISSSTE.Tramites2015.Common.DataAccess;
using ISSSTE.Tramites2015.Common.Util;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace ISSSTE.Tramites2015.Common.Catalogs
{
    /// <summary>
    /// Defines methods for quering a generic entity in a database
    /// </summary>
    public class CatalogRepository : ICatalogRepository
    {
        #region Fields

        /// <summary>
        /// Represents the <see cref="DbContext"/> of the application
        /// </summary>
        protected IDbContext _dataContext;

        #endregion

        #region Constructor

        /// <summary>
        /// The contructor requires an open DataContext to work with
        /// </summary>
        /// <param name="context">An open DataContext</param>
        public CatalogRepository(IDbContext dataContext, ILogger logger)
        {
            _dataContext = dataContext;
        }

        #endregion

        #region ICatalogDomainService

        public async Task<TObject> GetAsync<TObject>(params object[] keyValues) where TObject : class
        {
            return await _dataContext.Set<TObject>().FindAsync(keyValues);
        }

        public async Task<ICollection<TObject>> GetAllAsync<TObject>() where TObject : class
        {
            return await _dataContext.Set<TObject>().ToListAsync();
        }

        public async Task<TObject> FindAsync<TObject>(Expression<Func<TObject, bool>> match) where TObject : class
        {
            return await _dataContext.Set<TObject>().SingleOrDefaultAsync(match);
        }

        public async Task<ICollection<TObject>> FindAllAsync<TObject>(Expression<Func<TObject, bool>> match) where TObject : class
        {
            return await _dataContext.Set<TObject>().Where(match).ToListAsync();
        }

        public async Task<TObject> AddAsync<TObject>(TObject t) where TObject : class
        {
            _dataContext.Set<TObject>().Add(t);

            await _dataContext.SaveChangesAsync();
            return t;
        }

        public async Task<IEnumerable<TObject>> AddAllAsync<TObject>(IEnumerable<TObject> tList) where TObject : class
        {
            _dataContext.Set<TObject>().AddRange(tList);
            await _dataContext.SaveChangesAsync();
            return tList;
        }

        public async Task<TObject> UpdateAsync<TObject>(TObject updated, int key) where TObject : class
        {
            if (updated == null)
                return null;

            TObject existing = await _dataContext.Set<TObject>().FindAsync(key);
            if (existing != null)
            {
                _dataContext.Entry(existing).CurrentValues.SetValues(updated);
                await _dataContext.SaveChangesAsync();
            }
            return existing;
        }

        public async Task<TObject> AddOrUpdateAsync<TObject>(TObject updated) where TObject : class
        {
            if (updated != null)
            {
                _dataContext.Set<TObject>().AddOrUpdate(updated);

                await _dataContext.SaveChangesAsync();
            }

            return updated;
        }

        public async Task<int> DeleteAsync<TObject>(TObject t) where TObject : class
        {
            var dbEntry = _dataContext.Entry(t);//.Set<TObject>().Remove(t);

            dbEntry.State = EntityState.Deleted;

            return await _dataContext.SaveChangesAsync();
        }

        public async Task<int> CountAsync<TObject>() where TObject : class
        {
            return await _dataContext.Set<TObject>().CountAsync();
        }

        #endregion
    }
}

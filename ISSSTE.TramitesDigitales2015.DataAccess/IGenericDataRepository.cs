using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace ISSSTE.TramitesDigitales2015.DataAccess
{
    public interface IGenericDataRepository<T> where T : class
    {
        IList<T> GetAll(params Expression<Func<T, object>>[] navigationProperties);
        IList<T> GetList(Func<T, bool> where, params Expression<Func<T, object>>[] navigationProperties);
        T GetSingle(Func<T, bool> where, params Expression<Func<T, object>>[] navigationProperties);
        int Add(T item);
        int Update(T item);
        int Remove(T item);
    }
}

using ISSSTE.Tramites2015.Common.Util;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace ISSSTE.TramitesDigitales2015.Turissste.Presentacion.Controllers.Base
{
    public abstract class BaseController : Controller
    {
        #region Fields

        private ILogger _logger;

        #endregion

        #region Constructor

        public BaseController(ILogger logger)
        {
            this._logger = logger;
        }

        #endregion

        #region Protected Methods

        protected async Task<R> HandleOperationExecutionAsync<R>(Func<Task<R>> operationBody) where R : ActionResult
        {
            ActionResult response = null;

            try
            {
                return await operationBody();
            }
            catch (Exception ex)
            {
                LogException(ex);

                throw;
            }
        }

        protected R HandleOperationExecution<R>(Func<R> operationBody) where R: ActionResult
        {
            var validationTask = this.HandleOperationExecutionAsync(async () => operationBody());

            validationTask.Wait();

            return validationTask.Result;
        }

        protected void LogException(Exception ex)
        {
            Elmah.ErrorSignal.FromCurrentContext().Raise(ex);

            this._logger.WriteEntry(ex);
        }

        #endregion
    }
}
using ISSSTE.Tramites2015.Common.Util;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace ISSSTE.TramitesDigitales2015.Turissste.Presentacion.Controllers.Base
{
    public abstract class BaseApiController : ApiController
    {
        #region Fields

        private ILogger _logger;

        #endregion

        #region Constructor

        public BaseApiController(ILogger logger)
        {
            this._logger = logger;
        }

        #endregion

        #region Protected Methods

        protected HttpResponseMessage CreateStringResponseMessage(HttpStatusCode statusCode, string message)
        {
            HttpResponseMessage responseMessage = new HttpResponseMessage(statusCode)
            {
                Content = new StringContent(message)
            };

            return responseMessage;
        }

        protected async Task<HttpResponseMessage> HandleOperationExecutionAsync(Func<Task<HttpResponseMessage>> operationBody)
        {
            HttpResponseMessage response = null;

            try
            {
                response = await operationBody();
            }
            catch (Exception ex)
            {
                LogException(ex);
#if DEBUG
                response = CreateStringResponseMessage(HttpStatusCode.InternalServerError,
                    JsonConvert.SerializeObject(ex));
#else
                response = CreateStringResponseMessage(HttpStatusCode.InternalServerError, 
                    String.Format("ID de error: {0}", DateTime.Now.ToString("yyyyMMddTHHmm")));
#endif
            }

            return response;
        }

        protected HttpResponseMessage HandleOperationExecution(Func<HttpResponseMessage> operationBody)
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

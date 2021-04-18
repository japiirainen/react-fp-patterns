import { pipe, RTE, TE } from '../../util/fpts';
import { HttpClient, HttpRequest, HttpResponse } from './HttpClient';
import { httpContentTypeError, httpRequestError } from './HttpError';

export const httpRequestoFetchRequest = (request: HttpRequest) =>
   new Request(request.url, { ...request });

export const fetchResponseToHttpResponse = (
   response: Response
): HttpResponse => {
   return {
      status: response.status,
      headers: {},

      getBodyAsJson: TE.tryCatch(
         () => response.clone().json(),
         error => httpContentTypeError<'json'>('json', error)
      ),

      getBodyAsText: TE.tryCatch(
         () => response.clone().json(),
         error => httpContentTypeError<'text'>('text', error)
      ),
   };
};

export const fetchHttpClient: HttpClient = {
   sendRequest: pipe(
      RTE.ask<HttpRequest>(),
      RTE.chainTaskEitherK(request =>
         TE.tryCatch(() => {
            return fetch(httpRequestoFetchRequest(request));
         }, httpRequestError)
      ),
      RTE.map(fetchResponseToHttpResponse)
   ),
};

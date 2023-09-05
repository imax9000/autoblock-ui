/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Lists } from '../../models/lists';

export interface ListsGet$Params {
}

export function listsGet(http: HttpClient, rootUrl: string, params?: ListsGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Lists>> {
  const rb = new RequestBuilder(rootUrl, listsGet.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Lists>;
    })
  );
}

listsGet.PATH = '/lists';

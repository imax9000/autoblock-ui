/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Lists } from '../../models/lists';

export interface ListsDelete$Params {
      body: Lists
}

export function listsDelete(http: HttpClient, rootUrl: string, params: ListsDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<Lists>> {
  const rb = new RequestBuilder(rootUrl, listsDelete.PATH, 'delete');
  if (params) {
    rb.body(params.body, 'application/json');
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

listsDelete.PATH = '/lists';

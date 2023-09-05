/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Lists } from '../../models/lists';

export interface ListsAdd$Params {
      body: Lists
}

export function listsAdd(http: HttpClient, rootUrl: string, params: ListsAdd$Params, context?: HttpContext): Observable<StrictHttpResponse<Lists>> {
  const rb = new RequestBuilder(rootUrl, listsAdd.PATH, 'patch');
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

listsAdd.PATH = '/lists';

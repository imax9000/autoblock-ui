/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface BlockCheck$Params {
  did: string;
}

export function blockCheck(http: HttpClient, rootUrl: string, params: BlockCheck$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'auto-blocked'?: (boolean | null);
}>> {
  const rb = new RequestBuilder(rootUrl, blockCheck.PATH, 'get');
  if (params) {
    rb.query('did', params.did, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<{
      'auto-blocked'?: (boolean | null);
      }>;
    })
  );
}

blockCheck.PATH = '/blocked';

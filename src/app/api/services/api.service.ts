/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { blockCheck } from '../fn/operations/block-check';
import { BlockCheck$Params } from '../fn/operations/block-check';
import { disable } from '../fn/operations/disable';
import { Disable$Params } from '../fn/operations/disable';
import { enable } from '../fn/operations/enable';
import { Enable$Params } from '../fn/operations/enable';
import { enabled } from '../fn/operations/enabled';
import { Enabled$Params } from '../fn/operations/enabled';
import { Lists } from '../models/lists';
import { listsAdd } from '../fn/operations/lists-add';
import { ListsAdd$Params } from '../fn/operations/lists-add';
import { listsDelete } from '../fn/operations/lists-delete';
import { ListsDelete$Params } from '../fn/operations/lists-delete';
import { listsGet } from '../fn/operations/lists-get';
import { ListsGet$Params } from '../fn/operations/lists-get';
import { listsOverwrite } from '../fn/operations/lists-overwrite';
import { ListsOverwrite$Params } from '../fn/operations/lists-overwrite';
import { whitelisted } from '../fn/operations/whitelisted';
import { Whitelisted$Params } from '../fn/operations/whitelisted';

@Injectable({ providedIn: 'root' })
export class ApiService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `whitelisted()` */
  static readonly WhitelistedPath = '/whitelisted';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `whitelisted()` instead.
   *
   * This method doesn't expect any request body.
   */
  whitelisted$Response(params?: Whitelisted$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'whitelisted'?: (boolean | null);
'message'?: string;
}>> {
    return whitelisted(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `whitelisted$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  whitelisted(params?: Whitelisted$Params, context?: HttpContext): Observable<{
'whitelisted'?: (boolean | null);
'message'?: string;
}> {
    return this.whitelisted$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
'whitelisted'?: (boolean | null);
'message'?: string;
}>): {
'whitelisted'?: (boolean | null);
'message'?: string;
} => r.body)
    );
  }

  /** Path part for operation `enabled()` */
  static readonly EnabledPath = '/enabled';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `enabled()` instead.
   *
   * This method doesn't expect any request body.
   */
  enabled$Response(params?: Enabled$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'enabled': (boolean | null);
'message'?: string;
}>> {
    return enabled(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `enabled$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  enabled(params?: Enabled$Params, context?: HttpContext): Observable<{
'enabled': (boolean | null);
'message'?: string;
}> {
    return this.enabled$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
'enabled': (boolean | null);
'message'?: string;
}>): {
'enabled': (boolean | null);
'message'?: string;
} => r.body)
    );
  }

  /** Path part for operation `enable()` */
  static readonly EnablePath = '/enable';

  /**
   * Enables autoblocking for your account. Tokens passed in the request body should be from a fresh call to com.atproto.server.createSession method. The tokens will be stored in a database and used to perform the blocking/unblocking and querying the lists.
   * Server will do some basic checks to validate the access token:
   *   - Not the same as the one passed as a bearer token
   *   - Corresponds to the same account
   *
   * TODO: investigate how to safely validate the refresh token.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `enable()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  enable$Response(params: Enable$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return enable(this.http, this.rootUrl, params, context);
  }

  /**
   * Enables autoblocking for your account. Tokens passed in the request body should be from a fresh call to com.atproto.server.createSession method. The tokens will be stored in a database and used to perform the blocking/unblocking and querying the lists.
   * Server will do some basic checks to validate the access token:
   *   - Not the same as the one passed as a bearer token
   *   - Corresponds to the same account
   *
   * TODO: investigate how to safely validate the refresh token.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `enable$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  enable(params: Enable$Params, context?: HttpContext): Observable<void> {
    return this.enable$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `disable()` */
  static readonly DisablePath = '/disable';

  /**
   * Disables autoblocking for your account and deletes your tokens from the database. Does not return an error if autoblocking was already disabled.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `disable()` instead.
   *
   * This method doesn't expect any request body.
   */
  disable$Response(params?: Disable$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return disable(this.http, this.rootUrl, params, context);
  }

  /**
   * Disables autoblocking for your account and deletes your tokens from the database. Does not return an error if autoblocking was already disabled.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `disable$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  disable(params?: Disable$Params, context?: HttpContext): Observable<void> {
    return this.disable$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `listsGet()` */
  static readonly ListsGetPath = '/lists';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listsGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  listsGet$Response(params?: ListsGet$Params, context?: HttpContext): Observable<StrictHttpResponse<Lists>> {
    return listsGet(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `listsGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listsGet(params?: ListsGet$Params, context?: HttpContext): Observable<Lists> {
    return this.listsGet$Response(params, context).pipe(
      map((r: StrictHttpResponse<Lists>): Lists => r.body)
    );
  }

  /** Path part for operation `listsOverwrite()` */
  static readonly ListsOverwritePath = '/lists';

  /**
   * Overwrites the set of lists for autoblocking
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listsOverwrite()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  listsOverwrite$Response(params: ListsOverwrite$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return listsOverwrite(this.http, this.rootUrl, params, context);
  }

  /**
   * Overwrites the set of lists for autoblocking
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `listsOverwrite$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  listsOverwrite(params: ListsOverwrite$Params, context?: HttpContext): Observable<void> {
    return this.listsOverwrite$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `listsDelete()` */
  static readonly ListsDeletePath = '/lists';

  /**
   * Removes given lists from the set used for autoblocking. Non-existent or duplicate entries are quietly ignored.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listsDelete()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  listsDelete$Response(params: ListsDelete$Params, context?: HttpContext): Observable<StrictHttpResponse<Lists>> {
    return listsDelete(this.http, this.rootUrl, params, context);
  }

  /**
   * Removes given lists from the set used for autoblocking. Non-existent or duplicate entries are quietly ignored.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `listsDelete$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  listsDelete(params: ListsDelete$Params, context?: HttpContext): Observable<Lists> {
    return this.listsDelete$Response(params, context).pipe(
      map((r: StrictHttpResponse<Lists>): Lists => r.body)
    );
  }

  /** Path part for operation `listsAdd()` */
  static readonly ListsAddPath = '/lists';

  /**
   * Adds given lists to the set used for autoblocking. Duplicate entries are quietly ignored.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listsAdd()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  listsAdd$Response(params: ListsAdd$Params, context?: HttpContext): Observable<StrictHttpResponse<Lists>> {
    return listsAdd(this.http, this.rootUrl, params, context);
  }

  /**
   * Adds given lists to the set used for autoblocking. Duplicate entries are quietly ignored.
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `listsAdd$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  listsAdd(params: ListsAdd$Params, context?: HttpContext): Observable<Lists> {
    return this.listsAdd$Response(params, context).pipe(
      map((r: StrictHttpResponse<Lists>): Lists => r.body)
    );
  }

  /** Path part for operation `blockCheck()` */
  static readonly BlockCheckPath = '/blocked';

  /**
   * Reports if a given DID was automatically blocked or not
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `blockCheck()` instead.
   *
   * This method doesn't expect any request body.
   */
  blockCheck$Response(params: BlockCheck$Params, context?: HttpContext): Observable<StrictHttpResponse<{
'auto-blocked'?: (boolean | null);
}>> {
    return blockCheck(this.http, this.rootUrl, params, context);
  }

  /**
   * Reports if a given DID was automatically blocked or not
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `blockCheck$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  blockCheck(params: BlockCheck$Params, context?: HttpContext): Observable<{
'auto-blocked'?: (boolean | null);
}> {
    return this.blockCheck$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
'auto-blocked'?: (boolean | null);
}>): {
'auto-blocked'?: (boolean | null);
} => r.body)
    );
  }

}

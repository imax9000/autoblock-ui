import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpContextToken } from '@angular/common/http';
import { Observable } from 'rxjs';

export const BEARER_TOKEN = new HttpContextToken<string | null>(() => null);

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    const token = req.context.get(BEARER_TOKEN);
    if (token) {
      req = req.clone({ setHeaders: { 'Authorization': `Bearer ${token}` } });
    }
    return next.handle(req);
  }
}

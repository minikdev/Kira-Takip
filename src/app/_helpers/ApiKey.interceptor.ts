import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'
@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with parse server

    request = request.clone({
      setHeaders: {
        'X-Parse-Application-Id': environment.applicationId,
        'X-Parse-Javascript-Key': environment.javascriptKey,
        'Content-Type': 'application/json',
      },
    })

    return next.handle(request)
  }
}

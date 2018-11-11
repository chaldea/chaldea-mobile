import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { AppSettings } from './settings.service';

export class TokenDto {
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
}

@Injectable()
export class TokenService {
    public setToken(token: TokenDto): void {
        localStorage.setItem('access_token', token.access_token);
        localStorage.setItem('refresh_token', token.refresh_token);
    }

    public getToken(): string {
        return localStorage.getItem('access_token');
    }

    public getRefreshToken(): string {
        return localStorage.getItem('refresh_token');
    }

    public hasToken(): boolean {
        const token = this.getToken();
        if (token) {
            return true;
        }
        return false;
    }

    public clean(): void {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    }
}

@Injectable()
export class RefreshTokenHttpInterceptor implements HttpInterceptor {
    private _tokenService = new TokenService();

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const self = this;
        const subject = new Subject<HttpEvent<any>>();
        const modifiedRequest = self.normalizeRequestHeaders(request);
        next.handle(modifiedRequest).subscribe((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                subject.next(event);
                subject.complete();
            }
        }, (error: HttpErrorResponse) => {
            if (error.status === 401) {
                self.refreshToken(request, next).subscribe(() => {
                    const newRequest = self.normalizeRequestHeaders(request);
                    next.handle(newRequest).subscribe((event: HttpEvent<any>) => {
                        if (event instanceof HttpResponse) {
                            subject.next(event);
                            subject.complete();
                        }
                    }, (reqError) => {
                        subject.error(reqError);
                        subject.complete();
                    });
                }, refreshError => {
                    subject.error(refreshError);
                    subject.complete();
                });
            } else {
                subject.error(error);
                subject.complete();
            }
        });
        return subject;
    }

    protected normalizeRequestHeaders(request: HttpRequest<any>): HttpRequest<any> {
        let modifiedHeaders = new HttpHeaders();
        modifiedHeaders = request.headers
            .set('Pragma', 'no-cache')
            .set('Cache-Control', 'no-cache')
            .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
            .set('X-Requested-With', 'XMLHttpRequest');

        const token = this._tokenService.getToken();
        if (token) {
            modifiedHeaders = modifiedHeaders.set('Authorization', `Bearer ${token}`);
        }

        return request.clone({
            headers: modifiedHeaders
        });
    }

    private refreshToken(request: HttpRequest<any>, next: HttpHandler): Subject<HttpEvent<any>> {
        const self = this;
        const subject = new Subject<HttpEvent<any>>();
        let headers = new HttpHeaders();
        headers = request.headers.set('Content-Type', 'application/x-www-form-urlencoded');
        const body = new URLSearchParams();
        body.set('refresh_token', self._tokenService.getRefreshToken());
        body.set('grant_type', 'refresh_token');
        body.set('client_id', AppSettings.clientId);
        body.set('client_secret', AppSettings.clientSecret);
        const tokenRequest = request.clone({
            method: 'POST',
            url: `${AppSettings.idServerUrl}/connect/token`,
            headers: headers,
            body: body.toString()
        });
        next.handle(tokenRequest).subscribe((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                self.blobToText(event.body).subscribe(json => {
                    const token = <TokenDto>JSON.parse(json);
                    self._tokenService.setToken(token);
                    subject.next(event);
                    subject.complete();
                });
            }
        }, error => {
            subject.error(error);
            subject.complete();
        });
        return subject;
    }

    private blobToText(blob: any): Observable<string> {
        return new Observable<string>((observer: any) => {
            if (!blob) {
                observer.next('');
                observer.complete();
            } else {
                const reader = new FileReader();
                reader.onload = function () {
                    observer.next(this.result);
                    observer.complete();
                }
                reader.readAsText(blob);
            }
        });
    }
}
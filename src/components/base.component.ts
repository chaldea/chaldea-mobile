import { Injector } from '@angular/core';
import { TokenService } from '../shared/services/token.service';

export class BaseComponent {
    tokenService: TokenService;
    isLogin: boolean;

    constructor(
        injector: Injector
    ) {
        this.tokenService = injector.get(TokenService);
        this.isLogin = this.tokenService.hasToken();
    }
}
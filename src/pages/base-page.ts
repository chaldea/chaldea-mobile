import { Injector } from "@angular/core";
import { ToastController } from 'ionic-angular';
import { TokenService } from "../shared/services/token.service";

export class BasePage {
    tokenService: TokenService;
    toastCtrl: ToastController;
    isLogin = false;

    constructor(injector: Injector) {
        this.tokenService = injector.get(TokenService);
        this.toastCtrl = injector.get(ToastController);
        this.isLogin = this.tokenService.hasToken();
    }
}
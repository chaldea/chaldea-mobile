import { Injector } from "@angular/core";
import { ToastController } from 'ionic-angular';

export class BasePage {
    toastCtrl: ToastController;

    constructor(injector: Injector) {
        this.toastCtrl = injector.get(ToastController);
    }

    trace(obj: any): void {
        console.log(obj);
    }
}
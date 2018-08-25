import { NgModule } from '@angular/core';

import * as ApiServiceProxies from './service-proxies';

@NgModule({
    providers: [
        ApiServiceProxies.BangumiServiceProxy,
        ApiServiceProxies.AnimeServiceProxy
    ]
})
export class ServiceProxyModule { }

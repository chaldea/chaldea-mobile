import { NgModule } from '@angular/core';

import * as ApiServiceProxies from './service-proxies';

@NgModule({
    providers: [
        ApiServiceProxies.AnimeServiceProxy,
        ApiServiceProxies.BangumiServiceProxy,
        ApiServiceProxies.BannerServiceProxy,
        ApiServiceProxies.VideoServiceProxy
    ]
})
export class ServiceProxyModule { }

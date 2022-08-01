import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import * as ApiServiceProxies from '../service-proxies/service-proxies';
import { AuthService } from '../auth/auth.service';
import { FakeBackendInterceptor } from '../_helpers/fake-backend';

@NgModule({
    providers: [
        ApiServiceProxies.AuthServiceProxy,
        ApiServiceProxies.BlogServiceProxy,
        { provide: HTTP_INTERCEPTORS, useClass: AuthService, multi: true },
        {
            // use fake backend in place of Http service for backend-less development
            provide: HTTP_INTERCEPTORS,
            useClass: FakeBackendInterceptor,
            multi: true
        }
    ]
})
export class ServiceProxyModule { }

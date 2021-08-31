import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfileServiceConfig } from '../config/config';
import { UserProfileResponseModel } from '../models/user-profile';
import * as i0 from "@angular/core";
export declare class UserProfileService {
    private config;
    private httpClient;
    constructor(config: UserProfileServiceConfig, httpClient: HttpClient);
    one(endpoint: string, id: string): Observable<UserProfileResponseModel>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UserProfileService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UserProfileService>;
}

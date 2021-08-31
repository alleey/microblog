import { HttpClient } from '@angular/common/http';
import * as i0 from "@angular/core";
export declare class ConfigService {
    private httpClient;
    private uriPrefix;
    private uriSuffix;
    constructor(httpClient: HttpClient);
    get(filename: string): Promise<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfigService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConfigService>;
}
//# sourceMappingURL=config.service.d.ts.map
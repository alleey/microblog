import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { OidcAuthModule } from 'auth-oidc';
import { UtilsModule } from 'utils';
import { ImageResourceComponent } from './components/image-resource/image-resource.component';
import { ResourceComponent } from './components/resource/resource.component';
import { ResourcesModuleConfig, ResourcesServiceConfigToken } from './config/config';
import { ResourcesService } from './services/resources.service';
import { ImageResourceUploadComponent } from './components/image-resource-upload/image-resource-upload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ResourceComponent,
    ImageResourceComponent,
    ImageResourceUploadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OidcAuthModule.forChild(),
    UtilsModule
  ],
  exports: [
    ResourceComponent,
    ImageResourceComponent,
    ImageResourceUploadComponent
  ]
})
export class ResourcesModule { 

  static forRoot(config: ResourcesModuleConfig): ModuleWithProviders<ResourcesModule> {
    return {
      ngModule: ResourcesModule,
      providers: [
        ResourcesService,
        {
          provide: ResourcesServiceConfigToken,
          useValue: config.resources
        }
      ]
    }
  }
}

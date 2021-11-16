import { Component, Input, TemplateRef } from '@angular/core';
import { AbstractResourceComponent } from '../abstract-resource.component';

@Component({
  selector: 'resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent extends AbstractResourceComponent {

  @Input() contentTemplate: TemplateRef<any> | undefined;

}

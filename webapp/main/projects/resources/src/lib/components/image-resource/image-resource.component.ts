import { Component, Input, TemplateRef } from '@angular/core';
import { AbstractResourceComponent } from '../abstract-resource.component';

@Component({
  selector: 'image-resource',
  templateUrl: './image-resource.component.html',
  styleUrls: ['./image-resource.component.css']
})
export class ImageResourceComponent extends AbstractResourceComponent {

  @Input() contentTemplate: TemplateRef<any> | undefined;
  @Input() noContentTemplate: TemplateRef<any> | undefined;

}

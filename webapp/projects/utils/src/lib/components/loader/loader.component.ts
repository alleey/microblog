import { Component, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'utils-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  @Input() controlTemplate: TemplateRef<any> | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ResourceComponent } from '../resource/resource.component';

@Component({
  selector: 'image-resource-upload',
  templateUrl: './image-resource-upload.component.html',
  styleUrls: ['./image-resource-upload.component.css']
})
export class ImageResourceUploadComponent implements OnInit {

  @Input() resource: string = "";
  @Input() key: string = "";

  @Input() contentTemplate: TemplateRef<any> | undefined;
  @Input() noContentTemplate: TemplateRef<any> | undefined;

  @ViewChild("picture")
  pictureEditor!: ResourceComponent;

  form!: FormGroup;
  fileSelected?: File;

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        "file": new FormControl("", [
            Validators.required
          ]),
      });
  }

  get file() { return this.form.get('file'); }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.fileSelected = event.target.files[0];
    }
  }

  updateProfilePicture(): void {
    if(this.fileSelected)
      this.pictureEditor.upload(this.fileSelected!);
  }
}

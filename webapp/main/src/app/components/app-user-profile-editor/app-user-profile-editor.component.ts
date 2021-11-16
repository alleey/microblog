import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile-editor',
  templateUrl: './app-user-profile-editor.component.html',
  styleUrls: ['./app-user-profile-editor.component.scss']
})
export class AppUserProfileEditorComponent implements OnInit {

  @Input("userId") paramUserId?: string;
  userId?: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location) 
  { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.userId = (params.get("userId") ?? this.paramUserId);
    });
  }

  cancel(): void {
    this.location.back();
  }
}

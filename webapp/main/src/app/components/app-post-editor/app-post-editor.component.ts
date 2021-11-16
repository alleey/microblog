import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-app-post-editor',
  templateUrl: './app-post-editor.component.html',
  styleUrls: ['./app-post-editor.component.scss']
})
export class AppPostEditorComponent implements OnInit {

  @Input("postId") paramPostId?: number;
  postId?: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location) 
  { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.postId = Number(params.get("postId")) || this.paramPostId;
      console.info(this.postId);
    });
  }

  cancel(): void {
    this.location.back();
  }
}

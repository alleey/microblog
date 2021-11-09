import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TopicModel } from 'projects/blog/src/public-api';

@Component({
  selector: 'app-topic-posts-list',
  templateUrl: './app-topic-posts-list.component.html',
  styleUrls: ['./app-topic-posts-list.component.scss']
})
export class AppTopicPostsListComponent implements OnInit {

  topic!: TopicModel;

  constructor(private router: Router) {
    const state: any = this.router.getCurrentNavigation()?.extras.state;
    this.topic = state.topic;
   }

  ngOnInit(): void {
  }
}

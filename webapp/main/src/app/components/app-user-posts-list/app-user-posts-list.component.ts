import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-posts-list',
  templateUrl: './app-user-posts-list.component.html',
  styleUrls: ['./app-user-posts-list.component.scss']
})
export class AppUserPostsListComponent implements OnInit {

  userId!: string;
  userName?: string;

  constructor(private router: Router) {
    const state: any = this.router.getCurrentNavigation()?.extras.state;
    this.userId = state.userId;
    this.userName = state.userName;
   }

  ngOnInit(): void {
  }
}

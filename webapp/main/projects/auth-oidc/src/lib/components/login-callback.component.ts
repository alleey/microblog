import { Component, OnInit } from '@angular/core';
import { OidcAuthService } from '../services/auth.service';

@Component({
  template: ``
})
export class LoginCallbackComponent implements OnInit {

  constructor(private authService: OidcAuthService) { }

  ngOnInit(): void {
    this.authService.completeSignin();
  }
}

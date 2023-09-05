import { Component } from '@angular/core';
import { BskyAgentService } from '../bsky-agent.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})

export class LoginFormComponent {
  constructor(private bsky: BskyAgentService) { }

  public login: string = "";
  public password: string = "";

  async doLogin() {
    await this.bsky.agent.login({
      identifier: this.login,
      password: this.password,
    });
    window.localStorage.setItem('app-password', this.password);
  }
}

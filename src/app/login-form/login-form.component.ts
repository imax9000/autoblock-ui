import { Component } from '@angular/core';
import { BskyAgentService } from '../bsky-agent.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})

export class LoginFormComponent {
  constructor(private bsky: BskyAgentService,
    public snackBar: MatSnackBar) { }

  public login: string = "";
  public password: string = "";

  async doLogin() {
    try {
      await this.bsky.agent.login({
        identifier: this.login,
        password: this.password,
      });
    } catch (e) {
      this.snackBar.open(`Сталася помилка: ${e.message}`, 'Закрити');
    }
    window.localStorage.setItem('app-password', this.password);
  }
}

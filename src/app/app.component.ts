import { Component } from '@angular/core';
import { Observable, of, map, shareReplay } from 'rxjs';
import { HttpContext } from '@angular/common/http';

import { BskyAgentService } from './bsky-agent.service';
import { ApiService } from './api/services';
import { BEARER_TOKEN } from './auth-interceptor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'autoblock';
  private whitelistedObservable?: Observable<boolean>;
  loadingDone = false;

  constructor(
    private bsky: BskyAgentService,
    private api: ApiService
  ) {
    this.bsky.tryResumeSession().finally(() => setTimeout(() => this.loadingDone = true, 1));
  }

  get loggedIn() {
    return this.bsky.agent.hasSession;
  }

  whitelisted(): Observable<boolean> {
    if (!this.loggedIn) {
      return of(false);
    }
    if (!this.whitelistedObservable) {
      this.whitelistedObservable = this.api.whitelisted(null, this.bsky.authContext).pipe(
        map((v) => v.whitelisted),
        shareReplay(1),
      );
    }
    return this.whitelistedObservable;
  }

  async logout() {
    this.whitelistedObservable = null;
    window.localStorage.clear();
    return this.bsky.logout();
  }
}

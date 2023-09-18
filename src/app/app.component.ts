import { Component } from '@angular/core';
import { Observable, of, map, shareReplay, catchError, finalize } from 'rxjs';
import { HttpContext } from '@angular/common/http';

import { BskyAgentService } from './bsky-agent.service';
import { ApiService } from './api/services';
import { BEARER_TOKEN } from './auth-interceptor';

interface Response {
  whitelisted?: boolean;
  message?: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'autoblock';
  private whitelistedObservable?: Observable<Response>;
  loadingDone = false;
  whitelistCheckDone = false;

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
        finalize(() => this.whitelistCheckDone = true),
        shareReplay(1),
      );
    }
    return this.whitelistedObservable.pipe(map((v) => v.whitelisted));
  }

  whitelistedMessage(): Observable<string | null> {
    if (!this.whitelistedObservable) {
      return of(null);
    }
    return this.whitelistedObservable.pipe(
      map(v => v.message),
      catchError(err => JSON.stringify(err, null, 2)),
    );
  }

  async logout() {
    this.whitelistedObservable = null;
    await this.bsky.logout();
    window.localStorage.clear();
  }
}

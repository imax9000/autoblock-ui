import { Injectable } from '@angular/core';
import { HttpContext } from '@angular/common/http';

import { BskyAgent, AtpSessionEvent, AtpSessionData } from '@atproto/api'

import { BEARER_TOKEN } from './auth-interceptor';

@Injectable({
  providedIn: 'root'
})
export class BskyAgentService {
  public agent: BskyAgent;

  constructor() {
    this.agent = new BskyAgent({
      service: 'https://bsky.social',
      persistSession: this.persistSession,
    });
  }

  private async persistSession(evt: AtpSessionEvent, session?: AtpSessionData) {
    if (evt == 'create' || evt == 'update') {
      window.localStorage.setItem('session', JSON.stringify(session));
    }
  }

  public async tryResumeSession(): Promise<boolean> {
    const savedSession = window.localStorage.getItem('session');
    if (!savedSession) {
      return false;
    }
    try {
      await this.agent.resumeSession(JSON.parse(savedSession));
    } catch (e) {
      return false;
    }
    return true;
  }

  public async logout() {
    try {
      await this.agent.com.atproto.server.deleteSession();
    } catch (e) { }
    this.agent.session = undefined;
    window.localStorage.removeItem("session");
  }

  public get authContext() {
    if (!this.agent.hasSession) {
      return undefined;
    }
    return new HttpContext().set(BEARER_TOKEN, this.agent.session?.accessJwt)
  }
}

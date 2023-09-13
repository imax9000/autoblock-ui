import { Component } from '@angular/core';
import { firstValueFrom, from } from 'rxjs';

import { ApiService } from '../api/services';
import { BskyAgentService } from '../bsky-agent.service';
import { ListView } from '@atproto/api/dist/client/types/app/bsky/graph/defs';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-manage-lists',
  templateUrl: './manage-lists.component.html',
  styleUrls: ['./manage-lists.component.scss']
})
export class ManageListsComponent {
  constructor(public api: ApiService,
    public bsky: BskyAgentService,
    public snackBar: MatSnackBar) {
    this.refreshData();
  }

  autoblockEnabled?: boolean = undefined;
  loadingDone = false;

  lists?: ListView[];
  subscribedLists: string[] = [];
  autoblockedLists: string[] = [];
  toAdd: string[] = [];
  toRemove: string[] = [];

  private queryEnabled() {
    this.api.enabled(null, this.bsky.authContext).subscribe({
      next: (resp) => this.autoblockEnabled = resp.enabled,
      error: (err) => this.snackBar.open(`Сталася помилка: ${err.message || err}`, 'Закрити'),
    });
  }

  public enableToggled() {
    const enable = this.autoblockEnabled;
    this.autoblockEnabled = undefined;

    if (enable) {
      this.enableAutoblock()
    } else {
      this.disableAutoblock()
    }
  }

  private disableAutoblock() {
    this.api.disable(null, this.bsky.authContext).subscribe({
      next: () => this.autoblockEnabled = false,
      error: err => {
        console.log(err);
        this.queryEnabled();
      },
    })
  }

  private enableAutoblock() {
    from(this.bsky.agent.com.atproto.server.createSession({
      identifier: this.bsky.agent.session!.handle,
      password: window.localStorage.getItem('app-password'),
    })).subscribe(resp => {
      this.api.enable({
        body: {
          accessJwt: resp.data.accessJwt,
          refreshJwt: resp.data.refreshJwt,
        }
      }, this.bsky.authContext).subscribe({
        next: () => this.autoblockEnabled = true,
        error: err => {
          console.log(err);
          this.queryEnabled();
        },
      });
    });
  }

  private async refreshData() {
    this.queryEnabled();

    let lists: ListView[] = [];

    let cursor = undefined;
    do {
      let resp = await this.bsky.agent.app.bsky.graph.getListMutes({ cursor, limit: 100 });
      cursor = resp.data.cursor;

      lists = lists.concat(resp.data.lists);
    } while (cursor);
    const listsByUri = lists.reduce((acc, l) => ({ ...acc, [l.uri]: l }), {});
    this.subscribedLists = lists.map(l => l.uri);

    const autoblockedLists = await firstValueFrom(this.api.listsGet(null, this.bsky.authContext));
    this.autoblockedLists = autoblockedLists.lists;

    const missing = autoblockedLists.lists.filter(uri => !listsByUri[uri]);
    const missingLists = await Promise.all(missing.map(uri => this.bsky.agent.app.bsky.graph.getList({ list: uri, limit: 1 })));

    this.lists = lists.concat(missingLists.map(l => l.data.list))
      .sort((a, b) => a.name.localeCompare(b.name));

    this.loadingDone = true;
  }

  public webUrlForList(list: ListView) {
    const parts = list.uri.replace('at://', '').split('/');
    return `https://bsky.app/profile/${parts[0]}/lists/${parts[2]}`
  }

  get haveUnsavedChanges() {
    return this.toAdd.length > 0 || this.toRemove.length > 0;
  }

  public onCheckboxChange(e: MatCheckboxChange) {
    const listUri = e.source.value;
    this.toRemove = this.toRemove.filter(u => u != listUri);
    this.toAdd = this.toAdd.filter(u => u != listUri);

    if (e.checked) {
      if (!this.autoblockedLists.includes(listUri)) {
        this.toAdd.push(listUri);
      }
    } else {
      if (this.autoblockedLists.includes(listUri)) {
        this.toRemove.push(listUri);
      }
    }
  }

  public async saveChanges() {
    this.loadingDone = false;

    try {
      if (this.toAdd.length > 0) {
        const resp1 = await firstValueFrom(this.api.listsAdd({ body: { lists: this.toAdd } }, this.bsky.authContext));
        this.toAdd = [];
        this.autoblockedLists = resp1.lists;
      }

      if (this.toRemove.length > 0) {
        const resp2 = await firstValueFrom(this.api.listsDelete({ body: { lists: this.toRemove } }, this.bsky.authContext));
        this.toRemove = [];
        this.autoblockedLists = resp2.lists;
      }
    } catch (e) {
      this.snackBar.open(`Сталася помилка: ${e.error?.message}`, 'Закрити');
      console.error(e);
    } finally {
      this.loadingDone = true;
    }
  }
}

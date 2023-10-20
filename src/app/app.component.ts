import { Component, OnInit } from '@angular/core';
import * as fromRoot from './store';
import * as fromDictionaries from './store/dictionaries';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'job-search';

  constructor(private store: Store<fromRoot.State>) {}
  
  ngOnInit(): void {
    this.store.dispatch(new fromDictionaries.Read());
  }
}
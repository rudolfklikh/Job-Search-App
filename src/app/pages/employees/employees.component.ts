import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './store/list';
import { Store, select } from '@ngrx/store';

import * as fromRoot from '@app/store';
import * as fromList from './store/list';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent {
  employees$!: Observable<User[] | null>;

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit(): void {
    this.employees$ = this.store.pipe(select(fromList.getItems));
    this.store.dispatch(new fromList.Read());
  }
}

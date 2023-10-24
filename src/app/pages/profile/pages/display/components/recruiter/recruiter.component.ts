import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Employee, Recruiter } from '../../../../store/user';


@Component({
    selector: 'app-recruiter',
    templateUrl: './recruiter.component.html',
    styleUrls: ['./recruiter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecruiterComponent implements OnInit {

    @Input() role!: any; // @TODO temporary

    constructor() { }

    ngOnInit(): void {
    }

}

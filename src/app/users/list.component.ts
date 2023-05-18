import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from '@app/_services';
import { PlanerService } from '@app/_services/planer.service';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    users = null;
    comments = null;

    constructor(private accountService: AccountService, private planerService: PlanerService) {}

    ngOnInit() {
        this.accountService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);


            this.planerService.getAllComments()
            .pipe(first())
            .subscribe(comments => this.comments = comments);
    }

    deleteUser(id: string) {
        const user = this.users.find(x => x.id === id);
        user.isDeleting = true;
        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => this.users = this.users.filter(x => x.id !== id));
    }


    deleteKomentar(id: string) {
        const kom = this.comments.find(x => x.id === id);
        kom.isDeleting = true;
        this.planerService.deleteKomentar(id)
            .pipe(first())
            .subscribe(() => this.comments = this.comments.filter(x => x.id !== id));
    }
}
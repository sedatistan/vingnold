import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
  filterData: any;
  signed: boolean = false;

  @Output() filterDataEvent = new EventEmitter<any>();

  constructor(private router: Router) { }

  ngOnInit(): void {
    let currentUser: any = localStorage.getItem('currentUser');
    if (currentUser) {
      this.signed = true
    }
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.router.navigate(["auth/signin"]);
  }

  routerLink() {
    this.router.navigate(["auth/signin"]);
  }

  changeFilterData() {
    debugger;
    this.filterDataEvent.emit(this.filterData);
  }
}

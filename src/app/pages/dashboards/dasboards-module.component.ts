import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dasboard-module',
  template: `
  <router-outlet></router-outlet>
  `,
  styles: [
  ]
})
export class DasboardModuleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

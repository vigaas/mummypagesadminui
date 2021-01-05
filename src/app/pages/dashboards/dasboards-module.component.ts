import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dasboard-module',
  template: `
  <router-outlet></router-outlet>
  `,
  styles: [
  ]
})
export class DasboardsModuleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

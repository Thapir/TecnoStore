import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <p-toast position="top-right"></p-toast>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}

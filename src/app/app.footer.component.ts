import { Component } from '@angular/core';

@Component({
  selector: 'safi-footer',
  template: `
    <div class="footer">
      <div class="card clearfix">
        <app-version-tag cssClass="footer-text-left"></app-version-tag>
        <span class="footer-text-left">Empresa Fictícia</span>
        <span class="footer-text-right">
          <span class="ui-icon ui-icon-copyright"></span>
          <span>All Rights Reserved</span>
        </span>
      </div>
    </div>
  `
})
export class AppFooterComponent {}

import { Component, OnInit, Input } from '@angular/core';

/**
 * @type {any}
 */
declare var require: any;

/**
 * Componente responsável por expor o seletor <app-version-tag></app-version-tag> para reuso
 * @class
 */
@Component({
  selector: 'app-version-tag',
  templateUrl: './version-tag.component.html'
})
export class VersionTagComponent implements OnInit {
  /**
   * Propriedade de para definição para classe CSS
   * @public
   * @type {string}
   */
  @Input() cssClass: string;

  /**
   * Propriedade para definição de versão
   * @public
   * @type {string}
   */
  version: string;

  /**
   * Metodo executado ao carregar o componente responsável por carregar o arquivo 'package.json'
   * @return void
   */
  ngOnInit() {
    const pjson = require('package.json');
    this.version = pjson.version;
  }
}

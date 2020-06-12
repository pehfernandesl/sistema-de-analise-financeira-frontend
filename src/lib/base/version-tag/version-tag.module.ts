import { VersionTagComponent } from './version-tag.component';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * O componente VersionTag exibe o atributo `version` do arquivo `package.json` do sistema,
 * com o intuito de informar o usuário a versão atual da aplicação. Inicialmente foi feito para
 * ser utilizado no rodapé das aplicações conforme o exemplo a seguir.
 * @module
 */
@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        VersionTagComponent
    ],
    exports: [
        VersionTagComponent
    ]
})
export class VersionTagModule {
}

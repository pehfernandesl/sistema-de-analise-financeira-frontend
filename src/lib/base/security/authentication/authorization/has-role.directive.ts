import { Directive, Input, TemplateRef, ViewContainerRef, OnDestroy } from '@angular/core';
import { Authorization } from './authorization';
import { Authentication } from '../authentication';
import { User } from '../user';
import { Subscription } from 'rxjs';

/**
 * HasRoleDirective diretiva para checagem da existência de permissões de acesso para o usuário logado.
 * @class
 */
@Directive( {
    selector: '[hasRole]'
})
export class HasRoleDirective implements OnDestroy {

    private loginNotifications: Subscription;

    /**
     * Método construtor responsável por carregar o serviço de autorização e serviço de identificação de mudança
     * @param {TemplateRef<any>} templateRef
     * @param {ViewContainerRef} viewContainer
     * @param {Authorization} authorization
     * @param {Authentication<User>} authentication
     */
    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private authorization: Authorization,
        private authentication: Authentication<User>) { }

    /**
     * Propriedade para identificar regras de acesso aos itens
     * @type {string}
     */
    @Input() set hasRole(hasRole: string | string[]) {
        this.viewContainer.clear();
        if (hasRole) {
            if (this.loginNotifications) this.loginNotifications.unsubscribe();
            this.loginNotifications = this.authentication.getLoginNotifications().subscribe(() => {
                if (this.authorization.hasRole(hasRole)) {
                    this.viewContainer.clear();
                    this.viewContainer.createEmbeddedView(this.templateRef);
                }
            });
        } else {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
    }


    ngOnDestroy(): void {
        this.loginNotifications.unsubscribe();
    }

}

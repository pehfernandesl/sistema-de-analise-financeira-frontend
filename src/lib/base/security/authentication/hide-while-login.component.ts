import { Component, ElementRef, OnDestroy, OnInit, Input, AfterViewInit, AfterContentInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Authentication } from './authentication';
import { User } from './user';
import { BlockUiService } from '../../block-ui/block-ui.service';

/**
 * 
 * Componente HideWhileLoginComponent, utilizado para não apresentar a tela da aplicação enquanto a fase de login não terminou.
 * 
 * @class
 */
@Component({
    selector: '[hide-while-login]',
    templateUrl: './hide-while-login.component.html'
})
export class HideWhileLoginComponent implements OnInit, AfterViewInit, AfterContentInit, OnDestroy {

    /**
     * Carrega conteúdo
     * @type {loadingString}
     */
    @Input()
    public loadingContent: string = "";

    private loginNotifications: Subscription;

    public waitingLogin: boolean = false;

    /**
     * constructor method
     * @param {ElementRef} hostComponent
     * @param {AbstractAuthentication} auth
     * @param {BlockUiService} blockUiService
     * @constructor
     */
    constructor(
        private hostComponent: ElementRef,
        private auth: Authentication<User>,
        private blockUiService: BlockUiService
    ) {
    }

    ngOnInit(): void {
        this.waitingLogin = !this.auth.isAuthenticated();
    }

    ngAfterContentInit(): void {
        if (!this.auth.isAuthenticated()) {
            this.blockUiService.show();
        }
    }

    ngAfterViewInit(): void {
        if (!this.auth.isAuthenticated()) {
            for (let i = 1; i < this.hostComponent.nativeElement.children.length; i++) {
                this.hostComponent.nativeElement.children[i].style.display = 'none';
            }
        }
        
        this.loginNotifications = this.auth.getLoginNotifications().subscribe(() => {
            for (let i = 1; i < this.hostComponent.nativeElement.children.length; i++) {
                this.hostComponent.nativeElement.children[i].style.display = 'inherit';
            }
            this.waitingLogin = false;
            this.blockUiService.hide();
        });
    }

    /**
     * ngOnDestroy method
     * @returns void
     */
    ngOnDestroy() {
        this.loginNotifications.unsubscribe();
    }

}

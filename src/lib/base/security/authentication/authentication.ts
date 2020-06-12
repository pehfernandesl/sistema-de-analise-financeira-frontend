import { User } from "./user";
import { Observable } from "rxjs";

/**
 * Classe abstrata para serviço de autenticação
 * @class
 */
export abstract class Authentication<U extends User> {

    /**
     * Metodo responsável por checar se o usuário esta autenticado na aplicação
     * @returns boolean
     * @abstract
     * @public
     */
    abstract isAuthenticated(): boolean;

    /**
     * Metodo responsável pelo login da aplicação
     * @public
     */
    abstract login();

    /**
     * Metodo responsável pelo logou da aplicação
     * @public
     * @returns void
     */
    abstract logout();

    /**
     * Metodo responsável por obter os dados do usuário logado
     * @public
     * @return User
     */
    abstract getUser(): U;

    abstract redirect();

    abstract getLoginNotifications(): Observable<User>;

}

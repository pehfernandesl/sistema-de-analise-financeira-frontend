import { AuthConfig } from "../config/auth-config";
import { isAuthenticated as ia, redirect } from "./authentication.service";

export function bootstrapSecurity(
    config: AuthConfig, authenticated: () => void, isAuthenticated = ia, notAuthenticated = redirect) {
    if (window.location.href.includes(config.loginSuccessRoute) || isAuthenticated(config)) {
        authenticated();
    } else {
        notAuthenticated(config);
    }
}

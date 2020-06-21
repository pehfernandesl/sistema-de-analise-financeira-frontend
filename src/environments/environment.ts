// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
  auth: {
    baseUrl: '',
    authUrl: '/login/cas',
    // loginUrl: '/login/cas',
    loginUrl: 'http://localhost:8080/authenticate',
    logoutUrl: '/cas/logout',
    detailsUrl: '/api/user/details',
    tokenValidationUrl: 'http://localhost:8080/authenticate',
    storage: localStorage,
    tokenStorageIndex: 'token',
    userStorageIndex: 'user',
    loginSuccessRoute: '',
  },
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

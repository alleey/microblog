// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  oidc: {
    clientId: 'zabardast-public-client',
    filterProtocolClaims: true,
    issuer: 'http://localhost:8080/auth/realms/zabardast',
    loadUserInfo: true,
    redirectUri: 'http://localhost:4200/oidc-auth/login-callback',
    postLogoutRedirectUri: 'http://localhost:4200/oidc-auth/logout-callback',
    responseType: 'code',
    scope: 'openid profile address email phone offline_access',
    // remove the underscore to mock a login
    // mock: {
    //   acr: "0",
    //   azp: "zabardast-public-client",
    //   email_verified: true,
    //   family_name: "Mock",
    //   given_name: "Zabardast",
    //   jti: "a7caef5e-b2c8-4694-a9ca-2113429604ff",
    //   name: "Zabardast Mock",
    //   preferred_username: "zabardast",
    //   roles: ["offline_access", "uma_authorization", "user"],
    //   sub: "e7deac8e-56b7-4741-a119-757bbb00b999",
    //   typ: "ID",
    // }
  },

  services: {
    posts: {
      serviceBaseUrl: "http://localhost:9081/api/v1",
      defaultEndpoint: "posts",
      pageSize: 10,
      maxTitleLength: 256,
      maxContentLength: 4096,
    },
    comments: {
      serviceBaseUrl: "http://localhost:9081/api/v1",
      defaultEndpoint: "posts",
      pageSize: 25,
      maxContentLength: 1024,
    },
    topics: {
      serviceBaseUrl: "http://localhost:9081/api/v1",
      defaultEndpoint: "topics",
      pageSize: 25,
    },
    bookmarks: {
      serviceBaseUrl: "http://localhost:9080/api/v1",
      defaultEndpoint: "bookmarks",
      pageSize: 25,
    },
    userProfiles: {
      serviceBaseUrl: "http://localhost:9082/api/v1",
      defaultEndpoint: "users",
      pageSize: 10,
    },
    followers: {
      serviceBaseUrl: "http://localhost:9083/api/v1",
      defaultEndpoint: "users",
      pageSize: 10,
    },
    counters: {
      serviceBaseUrl: "http://localhost:9084/api/v1",
      defaultEndpoint: "stats/counters"
    },
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

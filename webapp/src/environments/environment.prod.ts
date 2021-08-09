
export const environment = {
  production: true,

  oidc: {
    clientId: 'zabardast-public-client',
    filterProtocolClaims: true,
    issuer: 'http://localhost:8080/auth/realms/zabardast',
    loadUserInfo: true,
    redirectUri: 'http://localhost:4200/oidc-auth/login-callback',
    postLogoutRedirectUri: 'http://localhost:4200/oidc-auth/logout-callback',
    responseType: 'code',
    scope: 'openid profile address email phone offline_access'
  },

  services: {
    posts: {
      serviceBaseUrl: "http://localhost:3000",
      defaultEndpoint: "posts",
      pageSize: 10,
    },
    comments: {
      serviceBaseUrl: "http://localhost:9081/api/v1",
      defaultEndpoint: "posts",
      pageSize: 25,
    },
    topics: {
      serviceBaseUrl: "http://localhost:3000",
      defaultEndpoint: "topics",
      pageSize: 25,
    },
    bookmarks: {
      serviceBaseUrl: "http://localhost:3000",
      defaultEndpoint: "bookmarks",
      pageSize: 25,
    },
    userProfiles: {
      serviceBaseUrl: "http://localhost:3000",
      defaultEndpoint: "users",
      pageSize: 10,
    },
  }
};
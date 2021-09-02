
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
      serviceBaseUrl: "http://localhost:9000/api/v1",
      defaultEndpoint: "posts",
      pageSize: 10,
      maxTitleLength: 256,
      maxContentLength: 4096,
    },
    comments: {
      serviceBaseUrl: "http://localhost:9000/api/v1",
      defaultEndpoint: "posts",
      pageSize: 25,
      maxContentLength: 1024,
    },
    topics: {
      serviceBaseUrl: "http://localhost:9000/api/v1",
      defaultEndpoint: "topics",
      pageSize: 25,
    },
    bookmarks: {
      serviceBaseUrl: "http://localhost:9000/api/v1",
      defaultEndpoint: "bookmarks",
      pageSize: 25,
    },
    userProfiles: {
      serviceBaseUrl: "http://localhost:9000/api/v1",
      defaultEndpoint: "users",
      pageSize: 10,
    },
    followers: {
      serviceBaseUrl: "http://localhost:9000/api/v1",
      defaultEndpoint: "followers",
      pageSize: 10,
    },
    counters: {
      serviceBaseUrl: "http://localhost:9000/api/v1",
      defaultEndpoint: "counters"
    },
  }
};

// Config object to be passed to Msal on creation
export const msalConfig = {
  auth: {
    clientId: process.env.VITE_MSAL_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.VITE_MSAL_TENANT_ID}`,
    redirectUri: process.env.VITE_MSAL_REDIRECT_URI,
    postLogoutRedirectUri: "/",
  },
  system: {
    allowPlatformBroker: false, // Disables WAM Broker
  },
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
  scopes: ["User.Read", process.env.VITE_MSAL_SCOPE],
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};

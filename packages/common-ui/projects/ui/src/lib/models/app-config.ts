export interface IAppConfig {
  production: boolean;
  geoApiKey: string;
  backendUrl: string;
  apiKey: string;
  remotesUrl: {
    watchApp: string;
    likesApp: string;
    historyApp: string;
  };
}

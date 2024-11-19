export interface Environment {
  production: boolean;
  api: {
    baseUrl: string;
    endpoints: {
      search: string;
      random: string;
    };
  };
}

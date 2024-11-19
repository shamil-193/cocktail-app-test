export interface ApiEndpoints {
  search: string;
  random: string;
}

export interface ApiConfig {
  baseUrl: string;
  endpoints: ApiEndpoints;
}

import { Environment } from '../types';

export const environment: Environment = {
  production: true,
  api: {
    baseUrl: 'https://www.thecocktaildb.com/api/json/v1/1',
    endpoints: {
      search: '/search.php',
      random: '/random.php'
    }
  }
} as const;

import CONSTANTS  from 'expo-constants';
const env = CONSTANTS.expoConfig?.extra;
export default  {
  API_URL: env?.apiUrl as string,
  API_KEY: env?.apiKey as string,
  APP_ENV: env?.appEnv as string,
  IS_DEV: env?.appEnv === 'development',
  IS_PROD: env?.appEnv === 'production',
};
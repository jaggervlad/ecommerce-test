export const IS_PRODUCTION = process.env.NODE_ENV === 'production';

export const BASE_URL_API = IS_PRODUCTION
  ? 'https://ecommerce-test-ruddy.vercel.app/api'
  : 'http://localhost:3000/api';

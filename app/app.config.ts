/* eslint-disable node/prefer-global/process */
export default defineAppConfig({
  domain: process.env.NODE_ENV === 'production' ? 'meow.com' : 'localhost',
  port: process.env.NODE_ENV === 'production' ? '' : ':3000',
});

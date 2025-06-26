import process from 'node:process';

const OUR_DOMAIN = process.env.NODE_ENV === 'production' ? 'meow.com' : 'localhost';
const PORT = process.env.NODE_ENV === 'production' ? '' : ':3000';

export { OUR_DOMAIN, PORT };

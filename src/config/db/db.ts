import 'dotenv/config';
import {Pool} from 'pg';

const {
  LC_POSTGRES_USER,
  LC_POSTGRES_PASSWORD,
  LC_POSTGRES_HOST,
  LC_DEV_DB,
  LC_TEST_DB,
  LC_DEV_PORT,
  LC_TEST_PORT,
} = process.env;

const devConfig = {
    user: LC_POSTGRES_USER,
    password: LC_POSTGRES_PASSWORD,
    host: LC_POSTGRES_HOST,
    database: LC_DEV_DB,
    port: parseInt(LC_DEV_PORT as string),
};
const testConfig = {
    user: LC_POSTGRES_USER,
    password: LC_POSTGRES_PASSWORD,
    host: LC_POSTGRES_HOST,
    database: LC_TEST_DB,
    port: parseInt(LC_TEST_PORT as string),
};

const client = new Pool(devConfig);

export default client;
import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  // PRODUCTS_MICROSERVICES_PORT: number;
  // PRODUCTS_MICROSERVICES_HOST: string;

  ORDERS_MICROSERVICES_PORT: number;
  ORDERS_MICROSERVICES_HOST: string;

  NATS_SERVERS: string[];
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    // PRODUCTS_MICROSERVICES_PORT: joi.number().required(),
    // PRODUCTS_MICROSERVICES_HOST: joi.string().required(),
    ORDERS_MICROSERVICES_PORT: joi.number().required(),
    ORDERS_MICROSERVICES_HOST: joi.string().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS.split(','),
});

if (error) {
  throw new Error(`Config validation error ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  // productsPort: envVars.PRODUCTS_MICROSERVICES_PORT,
  // productsHost: envVars.PRODUCTS_MICROSERVICES_HOST,
  ordersPort: envVars.ORDERS_MICROSERVICES_PORT,
  ordersHost: envVars.ORDERS_MICROSERVICES_HOST,

  natsServers: envVars.NATS_SERVERS,
};

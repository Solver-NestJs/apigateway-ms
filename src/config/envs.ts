import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  PRODUCTS_MICROSERVICES_PORT: number;
  PRODUCTS_MICROSERVICES_HOST: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    PRODUCTS_MICROSERVICES_PORT: joi.number().required(),
    PRODUCTS_MICROSERVICES_HOST: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  productsPort: envVars.PRODUCTS_MICROSERVICES_PORT,
  productsHost: envVars.PRODUCTS_MICROSERVICES_HOST,
};

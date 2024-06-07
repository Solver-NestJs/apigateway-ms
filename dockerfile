#1 GENERANDO LAS DEPENDENCIAS DE LA APLICACION
FROM node:21-alpine3.19 as dependencias

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./

RUN yarn install
 # EL RESULTADO FINAL DE LA EJECUCION DEL PRIMER PASO --->    /usr/src/app/node_modules

# ================================================================================================
#2  BUILDER O CONSTRUCCION DE LA IMAGEN
# ================================================================================================

FROM node:21-alpine3.19 as builder

WORKDIR /usr/src/app

COPY --from=dependencias /usr/src/app/node_modules ./node_modules

COPY . .

RUN yarn build

RUN yarn install --force  && yarn cache clean --force

# npm ci -f --only=production && npm cache clean --force

# EL RESULTADO FINAL DE LA EJECUCION DEL SEGUNDO PASO --->    /usr/src/app/dist

# ================================================================================================
# 3 SE CREA LA IMAGEN FINAL
# ================================================================================================

FROM node:21-alpine3.19 as prod

WORKDIR /usr/src/app

COPY --from=builder  /usr/src/app/node_modules ./node_modules   
                                              #/usr/src/app/node_modules

COPY --from=builder /usr/src/app/dist ./dist
                                              #/usr/src/app/dist

USER node


EXPOSE 3000

CMD ["node", "dist/main.js"]

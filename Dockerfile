FROM node:lts AS build

# Jump through some hoops to run the build as the node user instead of root.
RUN mkdir -p /srv/logo-exercise && chown -R node:node /srv/logo-exercise

USER node

WORKDIR /srv/logo-exercise

COPY --chown=node:node package.json package-lock.json ./

RUN npm install --quiet --production

FROM node:lts-slim

USER node

WORKDIR /srv/logo-exercise

COPY --from=build --chown=root:root /srv/logo-exercise/node_modules ./node_modules

COPY . .

CMD ["node", "server.js"]

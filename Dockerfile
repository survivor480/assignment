
#FROM node:18-alpine As development
FROM node:lts-bullseye-slim


# Create app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
#COPY --chown=node:node package*.json ./
COPY package*.json ./

# Install Nestjs CLI.
# RUN npm install -g @nestjs/cli
# Install Typescript Node and pm2 latest
RUN npm install -g @nestjs/cli yarn --force

RUN npm install

# Install app dependencies using the `npm ci` command instead of `npm install`
# RUN npm ci
# RUN npm install

# Bundle app source
#COPY --chown=node:node . .
COPY . .

RUN nest build

CMD ["yarn", "start:prod"]

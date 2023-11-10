FROM node:18.14.0
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install pm2 -g
RUN ./node_modules/.bin/pm2 install typescript
COPY . .
EXPOSE 8080
# CMD [ "npm", "start" ]
# CMD [ "npm", "run", "pm2" ]
CMD ["pm2-runtime", "start", "ecosystem.config.cjs"]
FROM node:16.13.1
WORKDIR /saki-ui

COPY . .
COPY ./.npmrc /root/.npmrc
RUN \
  npm install && \
  npm run build

EXPOSE 32300

CMD ["npm","start"]

FROM node:18.4-alpine3.15
RUN apk add curl
COPY ./ /src
WORKDIR /src
CMD ["npm", "start"]
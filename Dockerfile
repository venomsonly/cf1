FROM node:18.4-alpine3.15
RUN apk add curl
COPY ./ /src
# RUN rm -rf .DS_Store .git node_modules .next build .swc
# RUN cd /src && yarn install && yarn build
# RUN cd /src && yarn build
WORKDIR /src
CMD ["yarn", "start"]
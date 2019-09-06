FROM node:10.16
WORKDIR /usr/src/
COPY package.json /usr/src/
RUN npm install
COPY . /usr/src/
RUN bash set_env.sh
EXPOSE 8545
ENTRYPOINT ["bash", "./entrypoint.sh"]
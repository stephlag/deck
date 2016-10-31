FROM node:4.4.1

COPY . deck/

RUN useradd -ms /bin/bash node

RUN chown -R node deck

RUN chown -R node /usr/

ENV HOME /home/node

ENV API_HOST http://localhost:8084 

ENV DECK_HOST 0.0.0.0

USER node

WORKDIR deck

RUN rm -rf .git

RUN npm install

CMD npm start

FROM node:4.4.1

ENV HOME /home/node
ENV API_HOST http://localhost:8084 
ENV DECK_HOST 0.0.0.0

RUN useradd -ms /bin/bash node && \
  chown -R node /usr/ && \
  chown -R node deck

USER node

COPY . deck/

WORKDIR deck

RUN rm -rf .git && npm install

CMD ["npm", "start"]
